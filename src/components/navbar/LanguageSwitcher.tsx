import { useLanguageStore } from "../../store/useLanguageStore";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "sw", label: "Kiswahili" },
    { code: "lg", label: "Luganda" },
  ];

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="bg-white/20 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-500 rounded-md px-2 py-1 text-sm focus:outline-none"
      title="Change Language"
      translate="no" // ✅ prevent the dropdown from being translated
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code} translate="no">
          {l.label}
        </option>
      ))}
    </select>
  );
}
