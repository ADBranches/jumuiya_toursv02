import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  lang: string;
  setLang: (lang: string) => void;
  rehydrated: boolean;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      rehydrated: false,
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.rehydrated = true;
      },
    }
  )
);
