import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useBooking } from "../../hooks/useBooking";

export default function Footer() {
  const { openBooking } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-4 gap-10">
        {/* 🔹 Brand */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            Jumuiya Tours
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Discover Uganda’s breathtaking wildlife, nature, and culture through
            guided adventures crafted for explorers, families, and dreamers alike.
          </p>
          <button
            onClick={() => openBooking()}
            className="mt-5 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-green-700/20"
          >
            Book a Tour
          </button>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white tracking-wide uppercase text-sm">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-green-400 transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-green-400 transition">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h4 className="font-semibold mb-3 text-white tracking-wide uppercase text-sm">
            Contact
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-gray-400">Email:</span>{" "}
              <a
                href="mailto:info@jumuiyatours.ug"
                className="text-green-400 hover:underline"
              >
                info@jumuiyatours.ug
              </a>
            </li>
            <li>
              <span className="text-gray-400">Phone:</span> +256 786 673 468
            </li>
            <li>
              <span className="text-gray-400">Location:</span> Kampala, Uganda
            </li>
          </ul>
        </div>

        {/* 🔹 Social Media */}
        <div>
          <h4 className="font-semibold mb-3 text-white tracking-wide uppercase text-sm">
            Follow Us
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            Stay connected for travel deals, stories, and breathtaking moments.
          </p>
          <div className="flex gap-5 text-gray-300">
            <a
              href="https://facebook.com/JumuiyaTours"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 hover:scale-110 transition transform"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://instagram.com/JumuiyaTours"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 hover:scale-110 transition transform"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://x.com/JumuiyaTours"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 hover:scale-110 transition transform"
            >
              <Twitter size={22} />
            </a>
            <a
              href="https://youtube.com/@JumuiyaTours"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 hover:scale-110 transition transform"
            >
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-400">
        © {year}{" "}
        <span className="text-green-500 font-semibold">Jumuiya Tours</span> —{" "}
        Built with ❤️ in Uganda.{" "}
        <span className="block md:inline text-gray-500">
          Explore | Experience | Enjoy
        </span>
      </div>

      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 opacity-75"></div>
    </footer>
  );
}
