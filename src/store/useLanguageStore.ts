// store/useLanguageStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translationService } from "../services/translationService";

interface LanguageState {
  lang: string;
  setLang: (lang: string) => void;
  rehydrated: boolean;
  trigger: number;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: "en", // ✅ Ensure English is default
      rehydrated: false,
      trigger: 0,
      setLang: async (newLang: string) => {
        const currentLang = get().lang;
        
        console.log(`🔄 Language change: ${currentLang} → ${newLang}`);
        
        if (currentLang === newLang) return;
        
        // Clear ALL caches aggressively
        translationService.clearCache();
        
        // Clear any React query caches if you're using them
        localStorage.removeItem('language-storage');
        
        // Force state update with proper trigger
        set({ 
          lang: newLang, 
          trigger: get().trigger + 1 
        });
        
        // Force page refresh to ensure clean state
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
    }),
    {
      name: "language-storage",
      version: 1, // ✅ Add version to force migration if needed
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Rehydrating language store:', state);
        if (state) {
          state.rehydrated = true;
          // Ensure default is English if undefined
          if (!state.lang) {
            state.lang = "en";
          }
        }
      },
    }
  )
);