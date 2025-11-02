import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper";
import { galleryImages } from "../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="gallery"
      title="📸 Gallery Showcase"
      subtitle="A visual journey through Uganda’s landscapes, wildlife, and people."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Uganda scene ${idx + 1}`}
            className="rounded-xl cursor-pointer hover:opacity-80 object-cover h-56 w-full"
            onClick={() => setSelected(img)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt="Expanded gallery view"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
