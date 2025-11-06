import { motion } from "framer-motion";
import { gallery } from "../../utils/constants";
import placeholderWebp from "../../assets/images/placeholder.webp";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background overlay for cinematic tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 pointer-events-none" />

      <h2 className="relative text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
        Gallery
      </h2>

      <div className="relative max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {gallery.map((img, i) => (
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
