import { useState, useEffect } from "react";
import { useLanguageStore } from "../store/useLanguageStore";
import { translationService } from "../services/translationService";

export function useTranslate(text: string, sourceLang = "en") {
  const { lang } = useLanguageStore();
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
        setTranslated(text); // fallback if translation fails
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [text, lang, sourceLang]);

  return translated;
}
