import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useBooking } from "../../hooks/useBooking";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import heroWebp from "../../assets/images/hero.webp";
import heroFallbackWebp from "../../assets/images/hero-fallback.webp";
import heroVideo from '../../assets/videos/background.mp4'


export default function HeroSection() {
  const { openBooking } = useBooking();
  const scrollToSection = useSmoothScroll();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🔹 MOBILE VIDEO OPTIMIZATION ONLY
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Only optimize video settings for mobile
      if (videoRef.current && mobile) {
        videoRef.current.preload = "metadata"; // Reduce initial load
        videoRef.current.playsInline = true; // Essential for iOS
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep your existing video load delay
  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black text-white"
    >
      {/* 🔹 ENHANCED RESPONSIVE VIDEO ELEMENT */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={heroWebp}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        } ${
          isMobile 
            ? "scale-125 md:scale-110" // More zoom on mobile, slightly less on tablet
            : "lg:scale-100 xl:scale-105" // Normal on desktop, slight zoom on large screens
        }`}
      >
        <source src={heroVideo} type="video/mp4" />
        <img 
          src={heroFallbackWebp} 
          alt="Uganda landscape" 
          className="w-full h-full object-cover"
        />
      </video>
      {/* 🔹 ENHANCED OVERLAY FOR MOBILE READABILITY */}
      <div className={`absolute inset-0 ${
        isMobile 
          ? "bg-gradient-to-b from-black/80 via-black/60 to-black/40" // 🔥 Darker overlay for mobile
          : "bg-gradient-to-b from-black/70 via-black/40 to-transparent" // Keep original for desktop
      }`} />

      {/* 🔹 KEEP YOUR EXISTING DESKTOP CONTENT - NO CHANGES */}
      <motion.div
        className="relative z-10 px-6 text-center max-w-3xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-lime-300 to-green-500 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          Explore the Pearl of Africa
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          Discover breathtaking landscapes, wildlife, and culture with
          <span className="font-semibold text-lime-300"> Jumuiya Tours</span>.
        </motion.p>

        {/* 🔹 KEEP ORIGINAL DESKTOP BUTTONS - NO CHANGES */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <button
            onClick={() => openBooking()}
            className="px-8 py-4 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-105 active:scale-95"
          >
            Plan Trip
          </button>

          <button
            onClick={() => scrollToSection("destinations")}
            className="px-8 py-4 rounded-xl font-semibold bg-white/80 text-green-700 hover:bg-white transition-transform hover:scale-105 active:scale-95"
          >
            View Tours
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 rounded-xl font-semibold border border-white/40 hover:bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
          >
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* 🔹 KEEP EXISTING BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900" />

      {/* 🔹 KEEP EXISTING SCROLL HINT */}
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