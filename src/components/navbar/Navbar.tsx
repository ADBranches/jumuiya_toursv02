import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "../misc/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          Jumuiya<span className="text-yellow-500">Tours</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium hover:text-green-600 ${
                  isActive ? "text-green-700 underline underline-offset-4" : "text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block py-3 px-6 text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              {link.name}
            </NavLink>
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
