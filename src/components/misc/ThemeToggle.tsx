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
      className="fixed bottom-6 left-6 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-300 dark:border-gray-700 text-green-600 dark:text-yellow-400 z-50"
      title="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </motion.button>
  );
}
