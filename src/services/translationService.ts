const LANGUAGE_MAP: Record<string, string> = {
  lg: "sw", // fallback Luganda → Swahili
  rw: "sw", // if you add Kinyarwanda later
  zu: "sw", // Zulu fallback
};

export const translationService = {
  async translate(
    text: string,
    targetLang: string,
    sourceLang = "en"
  ): Promise<string> {
    if (!text.trim()) return text;

    const resolvedLang = LANGUAGE_MAP[targetLang] || targetLang;

    const cacheKey = `trans_${sourceLang}_${resolvedLang}_${text}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${resolvedLang}&dt=t&q=${encodeURIComponent(
        text
      )}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to reach Google Translate");

      const data: [Array<[string, string | null, null, string?]>] = await res.json();
      const translated = data?.[0]?.map((seg) => seg?.[0]).join("") || text;

      localStorage.setItem(cacheKey, translated);
      console.info(`✅ Translated via Google (to ${resolvedLang})`);
      return translated;
    } catch (err) {
      console.error("⚠️ Translation failed:", err);
      return text;
    }
  },
};
