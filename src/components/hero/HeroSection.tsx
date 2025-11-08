import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import heroWebp from "../../assets/images/hero.webp";
import heroFallbackWebp from "../../assets/images/hero-fallback.webp";
import heroVideo from "../../assets/videos/background.mp4";

export default function HeroSection() {
  const { openBooking } = useBooking();
  const scrollToSection = useSmoothScroll();
  const navigate = useNavigate();

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ Detect mobile for video optimization
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (videoRef.current && mobile) {
        videoRef.current.preload = "metadata";
        videoRef.current.playsInline = true;
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Lazy load video fade-in
  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center bg-black text-white"
      style={{
        height: isMobile ? "calc(var(--vh, 1vh) * 100)" : undefined,
      }}
    >
      {/* 🎥 Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={heroWebp}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        } ${isMobile ? "object-contain sm:object-cover" : "object-cover"}`}
        style={{
          height: "100%",
          width: "100%",
          objectPosition: "center center",
          backgroundColor: "black",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
        <img src={heroFallbackWebp} alt="Uganda landscape" className="w-full h-full object-cover" />
      </video>

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          isMobile
            ? "bg-gradient-to-b from-black/80 via-black/40 to-black/20"
            : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
        }`}
      />

      {/* 🎉 Seasonal Banner - NEW ADDITION */}
      {/* <motion.div
        className="relative z-20 bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <span className="font-semibold">🎊 Early Bird Special:</span> 
          <span className="ml-2 font-bold">Book 2025 Adventures Now & Save 15%!</span>
        </div>
      </motion.div> */}

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 text-center max-w-3xl mx-auto mb-16 md:mb-20"
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

        {/* 🔹 Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          {/* Plan Trip opens Booking modal */}
          <button
            onClick={() => openBooking()}
            className="px-8 py-4 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-105 active:scale-95"
          >
            Plan Trip
          </button>

          {/* View Tours navigates to /destinations */}
          <button
            onClick={() => navigate("/destinations")}
            className="px-8 py-4 rounded-xl font-semibold bg-white/80 text-green-700 hover:bg-white transition-transform hover:scale-105 active:scale-95"
          >
            View Tours
          </button>

          {/* Contact Us scrolls if section exists, else routes */}
          <button
            onClick={() => {
              const onHomePage = window.location.pathname === "/";
              if (onHomePage) {
                scrollToSection("contact");
              } else {
                navigate("/contact");
              }
            }}
            className="px-8 py-4 rounded-xl font-semibold border border-white/40 hover:bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 translate-y-8 md:translate-y-0"
          >
            Contact Us
          </button>
        </motion.div>
      </motion.div>

      {/* Footer gradient + scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900" />
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