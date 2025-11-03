import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useBooking } from "../../hooks/useBooking";

export default function Footer() {
  const { openBooking } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-14 px-6 grid md:grid-cols-4 gap-10">
        {/* 🔹 Brand */}
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-3">
            Jumuiya Tours
          </h3>
          <p className="text-sm leading-relaxed">
            Discover Uganda’s breathtaking nature, wildlife, and culture through
            curated adventures crafted for explorers and dreamers alike.
          </p>
          <button
            onClick={() => openBooking()}
            className="mt-6 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            Book a Tour
          </button>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-green-500 transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-green-500 transition">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>Email: <span className="text-green-400">info@jumuiyatours.ug</span></li>
            <li>Phone: +256 701 234 567</li>
            <li>Location: Kampala, Uganda</li>
          </ul>
        </div>

        {/* 🔹 Socials */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex gap-4 text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <Twitter size={22} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 py-5 text-center text-sm">
        © {year} <span className="text-green-500 font-semibold">Jumuiya Tours</span> — 
        Built with ❤️ in Uganda. All rights reserved.
      </div>
    </footer>
  );
}
