import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "../misc/ThemeToggle";
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
          <ThemeToggle />
        </div>

        {/* 🔹 Mobile Toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 absolute top-full left-0 w-full shadow-lg">
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
            {/* ✅ FIX: Better mobile controls layout */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="w-full sm:w-auto">
                <LanguageSwitcher />
              </div>
              <div className="w-full sm:w-auto">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
