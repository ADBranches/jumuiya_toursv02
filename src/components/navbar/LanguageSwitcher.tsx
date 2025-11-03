import { useState } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("EN");
  const languages = ["EN", "SW", "LG"];

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="bg-white/20 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-500 rounded-md px-2 py-1 text-sm focus:outline-none"
      title="Change Language"
    >
      {languages.map((l) => (
        <option
          key={l}
          value={l}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {l}
        </option>
      ))}
    </select>
  );
}
