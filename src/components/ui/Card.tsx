import { motion } from "framer-motion";
import React from "react";
import type { Destination } from "../../types/destination";
import { useBooking } from "../../hooks/useBooking"; // ⬅️ Add this import

interface CardProps {
  data: any;
  onClick?: () => void;
  variant?: "destination" | "tour" | "testimonial" | "gallery";
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Card: React.FC<CardProps> = ({ data, variant = "destination", onClick }) => {
  if (!data) return null; // Prevent crash if data is undefined
  const { openBooking } = useBooking();

  // Fallback-friendly destructuring
  const {
    title,
    name,
    image,
    description,
    badge,
    quote,
    duration,
    price,
    location,
  } = data;

  const displayTitle = title || name || "Untitled";
  const displayDesc =
    description ||
    quote ||
    "Discover Uganda’s incredible sights and experiences.";

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-400/60 transition-all duration-300 ${
        variant === "testimonial" ? "p-6 flex flex-col justify-center" : ""
      }`}
      onClick={onClick}
    >
      {/* --- Image --- */}
      {image && variant !== "testimonial" && (
        <img
          src={image}
          alt={displayTitle}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* --- Badge (optional) --- */}
      {badge && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      )}

      {/* --- Text Content --- */}
      <div className="p-5 text-left space-y-3">
        {variant === "testimonial" ? (
          <>
            <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed">
              “{displayDesc}”
            </p>
            <h3 className="mt-4 text-lg font-bold text-green-700 dark:text-green-400">
              {displayTitle}
            </h3>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
              {displayTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {displayDesc}
            </p>

            {/* --- Tour-specific details --- */}
            {variant === "tour" && (
              <div className="flex flex-col gap-2 mt-3">
                {duration && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ⏱ {duration}
                  </p>
                )}
                {price && (
                  <p className="font-semibold text-green-700 dark:text-yellow-400">
                    💰 {price}
                  </p>
                )}
                {variant === "tour" && (
                  <button
                    onClick={() =>
                      openBooking({
                        tourName: title || name,
                        tourId: data.id,
                        travelers: 1,
                      })
                    }
                    className="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                  >
                    Book Tour
                  </button>
                )}
              </div>
            )}

            {/* --- Destination location --- */}
            {variant === "destination" && location && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                📍 {location}
              </p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
