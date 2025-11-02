import { useState } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("EN");
  const languages = ["EN", "SW", "LG"];

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm focus:outline-none"
      title="Change language"
    >
      {languages.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
