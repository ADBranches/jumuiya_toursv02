import { useState, useEffect } from "react";
import { useLanguageStore } from "../store/useLanguageStore";
import { translationService } from "../services/translationService";

export function useTranslate(text: string, sourceLang = "en") {
  const { lang, trigger } = useLanguageStore(); // ✅ Added trigger to dependencies
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let active = true;

    async function run() {
      if (!lang || lang.toLowerCase() === sourceLang.toLowerCase()) {
        setTranslated(text);
        return;
      }

      // 🟡 OPTIMISTIC UPDATE — show instant feedback
      setTranslated("⏳ Translating...");

      try {
        const result = await translationService.translate(text, lang, sourceLang);
        if (active) setTranslated(result);
      } catch {
        if (active) setTranslated(text); // fallback if translation fails
      }
    }

    run();
    
    return () => {
      active = false;
    };
  }, [text, lang, sourceLang, trigger]); // ✅ FIX: Added trigger to force re-translation

  return translated;
}
