import { motion } from "framer-motion";
import { testimonials } from "../../utils/constants";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-green-900 to-green-700 text-white text-center"
    >
      <h2 className="text-4xl font-extrabold mb-12">Traveler Experiences</h2>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="italic text-green-50">“{t.comment}”</p>
            <h4 className="mt-4 font-semibold text-yellow-300">{t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
