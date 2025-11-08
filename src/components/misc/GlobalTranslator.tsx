import { useEffect, useCallback, useRef } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { translationService } from "../../services/translationService";

/**
 * 🌍 GlobalTranslator
 * Enforces live, app-wide translation in all React components — even dynamic or lazy content.
 */
export default function GlobalTranslator() {
  const { lang } = useLanguageStore();
  const observerRef = useRef<MutationObserver | null>(null);
  const sweepTimer = useRef<number | null>(null);

  // ✅ Translate a single text node
  const translateNode = useCallback(
    async (node: Text, original: string) => {
      if (!original.trim() || lang === "en") return;
      try {
        const translated = await translationService.translate(original, lang, "en");
        if (node.textContent === original) node.textContent = translated;
      } catch (err) {
        console.warn("Auto-translate failed:", original, err);
      }
    },
    [lang]
  );

  // ✅ Scan the entire DOM for untranslated English text
  const translateAllVisibleText = useCallback(async () => {
    if (!lang || lang === "en") return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const jobs: Promise<void>[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const text = node.textContent?.trim();
      if (text && /[a-zA-Z]/.test(text)) {
        jobs.push(translateNode(node, text));
      }
    }
    await Promise.all(jobs);
  }, [lang, translateNode]);

  // ✅ Observer callback for new or changed nodes
  const handleMutations = useCallback(
    (mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent?.trim();
              if (text && /[a-zA-Z]/.test(text)) {
                translateNode(node as Text, text);
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              el.querySelectorAll("*").forEach((child) => {
                child.childNodes.forEach((n) => {
                  if (n.nodeType === Node.TEXT_NODE) {
                    const t = n.textContent?.trim();
                    if (t && /[a-zA-Z]/.test(t)) {
                      translateNode(n as Text, t);
                    }
                  }
                });
              });
            }
          });
        } else if (mutation.type === "characterData") {
          const node = mutation.target as Text;
          const text = node.textContent?.trim();
          if (text && /[a-zA-Z]/.test(text)) translateNode(node, text);
        }
      }
    },
    [translateNode]
  );

  // ✅ Main effect
  useEffect(() => {
    if (!lang) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (lang === "en") {
      localStorage.clear(); // reset cache for clarity
      return;
    }

    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true, // ✅ detect text updates too
    });
    observerRef.current = observer;

    // Initial sweep after hydration
    const initialDelay = setTimeout(() => {
      translateAllVisibleText();
    }, 800);

    // ✅ Continuous sweep every 10s (catches any missed text)
    sweepTimer.current = window.setInterval(() => {
      translateAllVisibleText();
    }, 10000);

    return () => {
      clearTimeout(initialDelay);
      if (sweepTimer.current) clearInterval(sweepTimer.current);
      observer.disconnect();
    };
  }, [lang, translateAllVisibleText, handleMutations]);

  return null;
}
