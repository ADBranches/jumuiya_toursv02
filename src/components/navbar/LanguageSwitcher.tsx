// components/LanguageSwitcher.tsx
import { useLanguageStore } from "../../store/useLanguageStore";
import { translationService } from "../../services/translationService";

export default function LanguageSwitcher() {
  const { lang, setLang, rehydrated } = useLanguageStore();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "sw", label: "Kiswahili" },
    { code: "lg", label: "Luganda" },
  ];

  const handleLanguageChange = async (newLang: string) => {
    if (newLang === lang) {
      console.log('🔄 Same language selected, ignoring');
      return;
    }

    console.log(`🔄 Language switcher: Changing from ${lang} to ${newLang}`);
    
    // Show loading state
    const select = document.activeElement as HTMLSelectElement;
    const originalValue = select?.value;

    try {
      // Clear all caches before changing language
      translationService.clearCache();
      
      // Force state update
      await setLang(newLang);
      
      console.log(`✅ Language changed to ${newLang}`);
      
    } catch (error) {
      console.error('❌ Language change failed:', error);
      // Revert the select value if change failed
      if (select) {
        select.value = originalValue;
      }
    }
  };

  if (!rehydrated) {
    return (
      <select disabled className="opacity-50">
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      data-no-translate
      value={lang}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="bg-white/20 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-500 rounded-md px-2 py-1 text-sm focus:outline-none"
      title={`Current: ${lang}`}
      translate="no"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code} translate="no">
          {l.label} ({l.code})
        </option>
      ))}
    </select>
  );
}