interface InputFieldProps {
  label: string;
  name?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  error?: string;
}

export default function InputField({
  label,
  name,
  value = "", // ✅ default value ensures controlled component
  onChange,
  type = "text",
  placeholder = "",
  textarea = false,
}: InputFieldProps) {
  const safeValue = value ?? ""; // ✅ double safety for undefined/null
  
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
          placeholder={placeholder}
          className="w-full rounded-lg bg-gray-900/60 text-white border border-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-3 py-2 placeholder-gray-400"
        />
      )}
    </div>
  );
}
