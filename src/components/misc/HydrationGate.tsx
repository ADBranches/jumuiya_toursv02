import { ReactNode } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";

export default function HydrationGate({ children }: { children: ReactNode }) {
  const { rehydrated } = useLanguageStore();

  if (!rehydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-400">
        <span>🌐 Loading language preferences...</span>
      </div>
    );
  }

  return <>{children}</>;
}
