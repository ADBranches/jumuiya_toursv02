import { motion } from "framer-motion";
import React from "react";
import type { Destination } from "../../types/destination";

interface CardProps {
  data: Destination;
  onClick?: () => void;
  variant?: "destination" | "tour" | "testimonial" | "gallery";
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Card: React.FC<CardProps> = ({ data, variant = "destination", onClick }) => {
  const { title, image, description, badge, quote, name } = data;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 hover:border-green-400/50 transition-all duration-300 ${
        variant === "testimonial" ? "p-6 flex flex-col justify-center" : ""
      }`}
      onClick={onClick}
    >
      {/* --- Image --- */}
      {image && variant !== "testimonial" && (
        <img
          src={image}
          alt={title || name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* --- Badge --- */}
      {badge && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      )}

      {/* --- Text --- */}
      <div className="p-5 text-left space-y-3">
        {variant === "testimonial" ? (
          <>
            <p className="text-gray-700 italic text-sm leading-relaxed">“{quote}”</p>
            <h3 className="mt-4 text-lg font-bold text-green-700">{name}</h3>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-green-700">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
            {variant === "tour" && (
              <button className="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                Book Tour
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
