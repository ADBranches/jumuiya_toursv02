import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ✅ added import
import LanguageSwitcher from "./LanguageSwitcher";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = useSmoothScroll();

  const navLinks = [
    { name: "Home", id: "hero", path: "/" },
    { name: "Destinations", id: "destinations", path: "/destinations" },
    { name: "Gallery", id: "gallery", path: "/gallery" },
    { name: "About", id: "about", path: "/about" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  const handleNavClick = (link: { id: string; path: string }) => {
    if (location.pathname === "/" && link.path === "/") {
      scrollToSection(link.id);
    } else {
      navigate(link.path);
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🔹 Logo */}
        <button
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            else scrollToSection("hero");
          }}
          className="text-2xl font-bold text-green-700 dark:text-lime-400 focus:outline-none"
        >
          Jumuiya<span className="text-yellow-500">Tours</span>
        </button>

        {/* 🔹 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`font-medium ${
                location.pathname === link.path
                  ? "text-green-600 dark:text-lime-400"
                  : "text-gray-700 dark:text-gray-200"
              } hover:text-green-600 dark:hover:text-lime-400 transition-colors`}
            >
              {link.name}
            </button>
          ))}
          <LanguageSwitcher />
          {/* ❌ ThemeToggle removed as requested */}
        </div>

        {/* 🔹 Animated Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`relative md:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300
            ${
              open
                ? "bg-green-600 text-white shadow-lg shadow-green-900/30 scale-110 rotate-90"
                : "bg-white/70 dark:bg-gray-800/60 text-green-600 dark:text-lime-400 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:scale-105"
            }`}
        >
          <motion.div
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </motion.div>
        </button>
      </div>

      {/* 🔹 Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 absolute top-full left-0 w-full shadow-lg"
          >
            <div className="max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`block w-full text-left py-4 px-6 ${
                    location.pathname === link.path
                      ? "text-green-600 dark:text-lime-400 bg-green-50 dark:bg-gray-800"
                      : "text-gray-800 dark:text-gray-200"
                  } hover:bg-green-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0`}
                >
                  {link.name}
                </button>
              ))}

              {/* ✅ Simplified bottom controls (LanguageSwitcher only) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="w-full sm:w-auto">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
