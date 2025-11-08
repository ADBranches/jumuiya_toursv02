// services/translationService.ts
export const translationService = {
  async translate(
    text: string,
    targetLang: string,
    sourceLang = "en"
  ): Promise<string> {
    // ✅ STRICT validation - don't translate if source/target are same
    if (!text?.trim() || targetLang === sourceLang || targetLang === "en") {
      console.log(`🔄 Skipping translation: ${targetLang}→${sourceLang}`, text.substring(0, 20));
      return text;
    }

    // ✅ More specific cache key
    const cacheKey = `trans_v2_${sourceLang}_${targetLang}_${btoa(encodeURIComponent(text))}`;
    
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        // Only use cache if it's recent (30 minutes)
        if (Date.now() - cachedData.timestamp < 1800000) {
          return cachedData.text;
        }
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }

    try {
      console.log(`🌐 Translating to ${targetLang}:`, text.substring(0, 30));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // ✅ Better response parsing
      let translatedText = text;
      
      if (Array.isArray(data) && Array.isArray(data[0])) {
        translatedText = data[0]
          .map((item: any) => item?.[0] || '')
          .filter(Boolean)
          .join(' ')
          .trim();
      }

      // ✅ Strict validation - only cache if translation is different and valid
      if (translatedText && translatedText !== text && translatedText.length > 1) {
        const cacheData = {
          text: translatedText,
          timestamp: Date.now(),
          source: sourceLang,
          target: targetLang
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        console.log(`✅ Translated: "${text.substring(0, 20)}" → "${translatedText.substring(0, 20)}"`);
        return translatedText;
      }

      console.log(`❌ Translation unchanged: ${text.substring(0, 20)}`);
      return text;
    } catch (err) {
      console.warn(`⚠️ Translation failed for ${targetLang}:`, text.substring(0, 30), err);
      return text;
    }
  },

  clearCache() {
    // ✅ Clear ALL translation caches aggressively
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trans_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('🧹 Cleared all translation caches');
  },

  // ✅ Debug method to check current cache state
  debugCache() {
    const translationKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trans_')) {
        translationKeys.push(key);
      }
    }
    console.log('📊 Current translation cache:', translationKeys);
    return translationKeys;
  }
};