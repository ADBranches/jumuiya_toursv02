import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 bg-white/20 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-green-600 dark:text-yellow-400 hover:bg-white/30 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      translate="no"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      <span className="hidden sm:inline text-sm font-medium">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </motion.button>
  );
}