import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "../misc/ThemeToggle";
import { useSmoothScroll } from "../../hooks/useSmoothScroll"; // ✅ new import

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollToSection = useSmoothScroll(); // ✅ reusable hook

  // ✅ Define links with target section IDs
  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Destinations", id: "destinations" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  // ✅ Handle click: scroll & close mobile menu
  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🔹 Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="text-2xl font-bold text-green-700 focus:outline-none"
        >
          Jumuiya<span className="text-yellow-500">Tours</span>
        </button>

        {/* 🔹 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors"
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
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-3 px-6 text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="flex justify-between items-center px-6 py-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
