import { motion } from "framer-motion";
// ✅ Correct import for Vite-managed assets:
import cultureImage from "../../assets/images/ugandan-culture.webp";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        <motion.img
          src={cultureImage} // ✅ use imported variable
          alt="Ugandan culture"
          className="w-full md:w-1/2 rounded-2xl shadow-2xl border border-white/10 object-cover brightness-110 hover:brightness-125 transition"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="text-white md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Jumuiya Tours is a Ugandan-owned community travel agency connecting explorers to
            authentic African experiences. We promote eco-friendly safaris, cultural immersion,
            and sustainable tourism that empowers local communities.
          </p>
          <p className="text-gray-400">
            From the Rwenzori peaks to Lake Victoria’s shores, we curate personalized
            adventures that blend nature, culture, and conservation. Explore Uganda
            — the Pearl of Africa — with us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
