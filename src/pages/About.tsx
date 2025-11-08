import { motion } from "framer-motion";
import cultureImage from "../assets/images/ugandan-culture.webp";

export default function About() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src={cultureImage}
          alt="Ugandan culture"
          className="w-full rounded-2xl shadow-2xl border border-white/10 object-cover brightness-110 hover:brightness-125 transition"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            About Jumuiya Tours
          </h1>

          <p className="text-gray-300 leading-relaxed text-lg">
            Jumuiya Tours is Uganda’s leading community-based travel agency promoting sustainable
            and cultural tourism experiences. We connect travelers with authentic adventures while
            supporting local communities.
          </p>

          <p className="text-gray-400 leading-relaxed">
            From the Rwenzori peaks to Lake Victoria’s shores, we curate personalized journeys that
            blend nature, wildlife, and cultural encounters. Our mission is to empower local guides
            and communities through eco-friendly tourism.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Whether you’re exploring the misty jungles of Bwindi, trekking the Mountains of the Moon,
            or relaxing by the tranquil waters of Lake Bunyonyi — Jumuiya Tours guarantees a meaningful
            and sustainable adventure experience.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
