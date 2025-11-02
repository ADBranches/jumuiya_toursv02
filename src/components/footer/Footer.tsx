import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-green-700 mb-3">Jumuiya Tours</h3>
          <p className="text-sm">
            Discover Uganda’s nature, wildlife, and culture through curated adventures.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-green-600">Destinations</Link></li>
            <li><Link to="/gallery" className="hover:text-green-600">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-green-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p>Email: info@jumuiyatours.ug</p>
          <p>Phone: +256 701 234 567</p>
          <p>Location: Kampala, Uganda</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={22} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={22} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={22} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube size={22} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {year} Jumuiya Tours — Built with ❤️ in Uganda.
      </div>
    </footer>
  );
}
