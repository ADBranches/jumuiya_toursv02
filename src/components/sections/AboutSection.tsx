import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";

export default function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      title="About Jumuiya Tours"
      subtitle="Empowering travelers to explore Uganda with purpose, passion, and community spirit."
    >
      <div className="grid md:grid-cols-2 gap-10 items-center text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We connect explorers to authentic Ugandan experiences — spanning
            eco-tourism, cultural heritage, and adventure trails — while
            supporting local communities.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Eco-friendly and sustainable tourism practices.</li>
            <li>Certified local guides and storytellers.</li>
            <li>Partnerships with national parks and cultural villages.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="/src/assets/images/hero.webp"
            alt="Uganda culture"
            className="rounded-2xl shadow-xl"
          />
          <span className="absolute bottom-4 right-4 bg-green-700 text-white text-sm px-3 py-1 rounded-full">
            Since 2018
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
