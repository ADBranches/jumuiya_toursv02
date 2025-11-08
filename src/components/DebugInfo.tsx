// components/DebugInfo.tsx
import { useLanguageStore } from "../store/useLanguageStore";

export default function DebugInfo() {
  const { lang, trigger, rehydrated } = useLanguageStore();
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded text-xs z-50">
      <div>Lang: {lang}</div>
      <div>Trigger: {trigger}</div>
      <div>Rehydrated: {rehydrated ? 'Yes' : 'No'}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
}

// Add this to your Home component temporarily:
// <DebugInfo />