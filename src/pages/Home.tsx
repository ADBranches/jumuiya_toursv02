import { Helmet } from "react-helmet-async";
import HeroSection from "../components/hero/HeroSection";
// import FeaturedDestinations from "../components/sections/FeaturedDestinations";
// import PopularTours from "../components/sections/PopularTours";
import Testimonials from "../components/sections/Testimonials";
import AboutSection from "../components/sections/AboutSection";
import GallerySection from "../components/sections/GallerySection";
import ContactSection from "../components/sections/ContactSection";
import FloatingContactButton from "../components/misc/FloatingContactButton";
import ThemeToggle from "../components/misc/ThemeToggle";
import { useTranslate } from "../hooks/useTranslate"; // ✅ new import
import DebugInfo from "../components/DebugInfo";

import heroWebp from "../assets/images/hero.webp";

export default function Home() {
  // 🌐 Dynamic translations using LibreTranslate API
  const title = useTranslate("Explore the Pearl of Africa");
  const description = useTranslate(
    "Discover Uganda’s national parks, wildlife, and cultural heritage with Jumuiya Tours. Plan your next adventure today!"
  );
  const metaDesc = useTranslate(
    "Explore Uganda’s hidden gems — from gorilla trekking to cultural tours."
  );

  return (
    <main className="relative w-full overflow-x-hidden">
      <Helmet>
        <title>Jumuiya Tours — {title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Uganda tours, safaris, travel, Africa, adventure, gorillas"
        />
        <meta property="og:title" content={`Jumuiya Tours — ${title}`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={heroWebp} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jumuiyatours.com" />
      </Helmet>

      {/* 🌍 Main site sections */}
      <HeroSection />
      {/* <FeaturedDestinations /> */}
      {/* <PopularTours /> */}
      <AboutSection />
      <Testimonials />
      <GallerySection />
      <ContactSection />
      <FloatingContactButton />
      <ThemeToggle />
      <DebugInfo />
    </main>
  );
}
