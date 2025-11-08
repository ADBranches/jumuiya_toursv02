import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { destinationService } from "../services/destinationService";
import type { Destination } from "../types/destination";
import {
  DestinationFilters,
  DestinationsGrid,
} from "../components/destinations";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = useCallback(async (filters?: {
    region?: string;
    difficulty?: string;
    search?: string;
  }) => {
    setLoading(true);
    const data = await destinationService.getAll(filters);
    setDestinations(data);
    setLoading(false);
  }, []);


  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations ]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-16 px-6 text-gray-100 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-green-500 mb-2">
          Uganda’s Top Destinations
        </h2>
        <p className="text-gray-400">
          From lush rainforests to wildlife parks — discover Uganda’s
          breathtaking natural diversity.
        </p>
      </div>

      <DestinationFilters onFilter={fetchDestinations} />
      <DestinationsGrid destinations={destinations} loading={loading} />
    </motion.main>
  );
}
