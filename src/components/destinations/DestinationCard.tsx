import { motion } from "framer-motion";
import type { Destination } from "../../types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden bg-gray-800/40 hover:bg-gray-800/60 shadow-lg"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-green-400 mb-1">
          {destination.name}
        </h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-3">
          {destination.description}
        </p>
        <div className="flex justify-between text-sm text-gray-400">
          <span>📍 {destination.region}</span>
          <span>⛰️ {destination.difficulty}</span>
        </div>
      </div>
    </motion.div>
  );
}
