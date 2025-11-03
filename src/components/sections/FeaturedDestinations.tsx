import { motion } from "framer-motion";
import Card from "../ui/Card";
import { destinations } from "../../utils/constants";

export default function FeaturedDestinations() {
  return (
    <section
      id="destinations"
      className="pt-32 pb-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-8 text-green-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Uganda’s Top Destinations
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          From lush rainforests to wildlife parks — discover Uganda’s breathtaking natural diversity.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card destination={dest} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
