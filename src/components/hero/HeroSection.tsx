import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black text-white"
    >
      {/* 🔹 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/src/assets/images/hero.webp"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/src/assets/videos/background.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      {/* 🔹 Text Content */}
      <motion.div
        className="relative z-10 px-6 text-center max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-lime-300 to-green-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          Discover Uganda’s Natural Wonders
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          From the majestic Rwenzori Mountains to the serene Lake Victoria,
          experience the Pearl of Africa like never before.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <a
            href="#destinations"
            className="px-8 py-4 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-105 active:scale-95"
          >
            Explore Destinations
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-xl font-semibold border border-white/40 hover:bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* 🔹 Floating scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-sm mb-2">Scroll Down</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-white"
        />
      </motion.div>
    </section>
  );
}
