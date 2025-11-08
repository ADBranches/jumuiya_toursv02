import { motion } from "framer-motion";
import { useState } from "react"; // ✅ NEW: For filters
import { gallery } from "../../utils/constants";
import placeholderWebp from "../../assets/images/placeholder.webp";

export default function GallerySection() {
  // ✅ NEW: Filter state
  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ NEW: Filter categories based on your gallery data
  const filters = ["All", "Wildlife", "Culture", "Adventure", "Landscape"];

  // ✅ NEW: Filter function (you'll need to add categories to your gallery data)
  const filteredGallery = gallery.filter(item => 
    activeFilter === "All" || item.category === activeFilter
  );

  return (
    <section
      id="gallery"
      className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background overlay for cinematic tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 pointer-events-none" />

      <h2 className="relative text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
        Gallery
      </h2>

      {/* ✅ NEW: Filter buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === filter
                ? "bg-green-500 text-white shadow-lg shadow-green-500/25"
                : "bg-white/10 text-gray-200 hover:bg-white/20 backdrop-blur-sm"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <div className="relative max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {filteredGallery.map((img, i) => (
          <motion.div
            key={i}
            className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-green-400/40 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-80 object-cover brightness-110 contrast-110 saturate-125 group-hover:scale-105 group-hover:brightness-125 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = placeholderWebp;
              }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white font-semibold text-center text-lg drop-shadow-md">
                {img.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}