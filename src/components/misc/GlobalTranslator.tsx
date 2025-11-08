import { useEffect, useCallback, useRef } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { translationService } from "../../services/translationService";

export default function GlobalTranslator() {
  const { lang, trigger } = useLanguageStore();
  const observerRef = useRef<MutationObserver | null>(null);
  const isTranslatingRef = useRef(false);
  const currentLangRef = useRef(lang);
  const translationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingTranslationRef = useRef(false);

  // ✅ Update ref when lang changes
  useEffect(() => {
    currentLangRef.current = lang;
    console.log(`🌍 GlobalTranslator: Language changed to ${lang}, trigger: ${trigger}`);
  }, [lang, trigger]);

  // ✅ Proper debounce function
  const debounce = useCallback((func: Function, delay: number) => {
    return (...args: any[]) => {
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
      translationTimeoutRef.current = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const collectVisibleNodes = useCallback((): Text[] => {
    console.log(`🔍 Collecting nodes for language: ${currentLangRef.current}`);
    
    const walker = document.createTreeWalker(
      document.body, 
      NodeFilter.SHOW_TEXT, 
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          // Skip translation-excluded elements
          if (parent.closest("[data-no-translate], script, style, noscript, [translate='no']")) {
            return NodeFilter.FILTER_REJECT;
          }

          // ✅ FIX: ONLY skip buttons that are language/theme toggles, NOT nav links
          const isUIToggle = parent.closest("select, [role='combobox'], .theme-toggle, .language-switcher");
          if (isUIToggle) {
            return NodeFilter.FILTER_REJECT;
          }

          // ✅ ALLOW navigation buttons to be translated
          // Only skip actual UI control buttons, not content buttons
          const isNavButton = parent.closest("nav, header, .navbar, .navigation");
          if (isNavButton && (parent.tagName === 'BUTTON' || parent.getAttribute('role') === 'button')) {
            // Allow these through for translation - they contain navigational text
            return NodeFilter.FILTER_ACCEPT;
          }

          const text = node.textContent?.trim();
          if (!text || text.length < 2) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip content that's already in target language
          if (currentLangRef.current === "fr") {
            const frenchPattern = /\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles)\b/i;
            if (frenchPattern.test(text)) {
              return NodeFilter.FILTER_REJECT;
            }
          }

          // Only include nodes with letters
          const hasLetters = /[a-zA-Z]/.test(text);
          if (!hasLetters) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node as Text);
    }
    
    console.log(`📝 Found ${nodes.length} nodes to translate to ${currentLangRef.current}`);
    return nodes;
  }, []);

  const translateBatch = useCallback(
    async (nodes: Text[]): Promise<void> => {
      if (isTranslatingRef.current) {
        console.log('⏳ Batch translation skipped - already in progress');
        return;
      }

      isTranslatingRef.current = true;
      console.log(`🔄 Translating batch of ${nodes.length} nodes to ${currentLangRef.current}`);
      
      const batch = nodes.slice(0, 20); // Smaller batches
      
      try {
        const translationPromises = batch.map(async (node) => {
          const originalText = node.textContent?.trim();
          if (!originalText) return;

          try {
            const translated = await translationService.translate(
              originalText, 
              currentLangRef.current, 
              "en"
            );
            
            // Only update if different and node hasn't changed
            if (translated && 
                translated !== originalText && 
                node.textContent === originalText) {
              node.textContent = translated;
            }
          } catch (error) {
            console.warn('Translation failed for node:', originalText.substring(0, 50));
          }
        });

        await Promise.allSettled(translationPromises);
      } catch (error) {
        console.error('❌ Batch translation error:', error);
      } finally {
        isTranslatingRef.current = false;
      }
    },
    []
  );

  const runFullTranslation = useCallback(async () => {
    const currentLang = currentLangRef.current;
    
    if (!currentLang || currentLang === "en") {
      console.log('🔄 Skipping translation - English or no language set');
      return;
    }

    if (isTranslatingRef.current) {
      console.log('⏳ Translation already in progress, queuing next attempt');
      pendingTranslationRef.current = true;
      return;
    }

    console.log(`🚀 Starting full translation to: ${currentLang}`);
    
    try {
      let nodes = collectVisibleNodes();
      
      if (nodes.length === 0) {
        console.log('ℹ️ No nodes found to translate');
        return;
      }

      // ✅ SINGLE PASS ONLY to prevent rapid firing
      console.log(`🔄 Single translation pass for ${currentLang}`);
      
      // Process in chunks with proper delays
      for (let i = 0; i < nodes.length; i += 20) {
        if (currentLangRef.current !== currentLang) {
          console.log('🛑 Language changed during translation, aborting');
          break;
        }
        
        const chunk = nodes.slice(i, i + 20);
        await translateBatch(chunk);
        
        // ✅ Longer delay between batches to prevent rapid firing
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      console.log(`✅ Completed translation to ${currentLang}`);
      
      // ✅ Check if there's a pending translation request
      if (pendingTranslationRef.current) {
        console.log('🔄 Processing pending translation request');
        pendingTranslationRef.current = false;
        setTimeout(() => runFullTranslation(), 1000);
      }
      
    } catch (error) {
      console.error('❌ Full translation failed:', error);
    } finally {
      isTranslatingRef.current = false;
    }
  }, [collectVisibleNodes, translateBatch]);

  // ✅ Debounced translation runner
  const debouncedTranslation = useCallback(
    debounce(() => {
      runFullTranslation();
    }, 1000), // Increased debounce time
    [runFullTranslation]
  );

  useEffect(() => {
    // Cleanup previous operations
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Reset flags
    isTranslatingRef.current = false;
    pendingTranslationRef.current = false;

    if (!lang || lang === "en") {
      console.log('🌍 Language set to English, clearing caches');
      translationService.clearCache();
      return;
    }

    // ✅ Less aggressive mutation observer
    const observer = new MutationObserver((mutations) => {
      if (isTranslatingRef.current) {
        pendingTranslationRef.current = true;
        return;
      }

      const hasNewContent = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );

      if (hasNewContent) {
        console.log('🔄 New content detected, scheduling debounced translation');
        debouncedTranslation();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    observerRef.current = observer;

    // ✅ Single initial translation with longer delay
    const timeoutId = setTimeout(() => {
      runFullTranslation();
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lang, trigger, runFullTranslation, debouncedTranslation]);

  // Debug effect
  useEffect(() => {
    console.log(`🎯 GlobalTranslator mounted/updated - Language: ${lang}, Trigger: ${trigger}`);
  }, [lang, trigger]);

  return null;
}