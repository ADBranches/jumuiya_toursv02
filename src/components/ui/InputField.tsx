interface InputFieldProps {
  label: string;
  name?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  textarea?: boolean;
  error?: string;
  pattern?: string; // ✅ added
}

export default function InputField({
  label,
  name,
  value = "",
  onChange,
  onBlur,            // ✅ include
  type = "text",
  placeholder = "",
  inputMode,         // ✅ include
  pattern,           // ✅ include
  textarea = false,
  error,
}: InputFieldProps) {
  const safeValue = value ?? "";

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-200 dark:text-gray-100"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={safeValue as string}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg bg-gray-900/60 text-white border border-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-3 py-2 placeholder-gray-400 resize-none"
          rows={4}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={safeValue}
          onChange={onChange}
          onBlur={onBlur}
          inputMode={inputMode}
          pattern={pattern}
          placeholder={placeholder}
          className="w-full rounded-lg bg-gray-900/60 text-white border border-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-3 py-2 placeholder-gray-400"
        />
      )}

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
