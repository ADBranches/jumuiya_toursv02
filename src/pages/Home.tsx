import { Helmet } from "react-helmet-async";
import HeroSection from "../components/hero/HeroSection";
import FeaturedDestinations from "../components/sections/FeaturedDestinations";
import PopularTours from "../components/sections/PopularTours";
import Testimonials from "../components/sections/Testimonials";
import AboutSection from "../components/sections/AboutSection";
import GallerySection from "../components/sections/GallerySection";
import ContactSection from "../components/sections/ContactSection";
import FloatingContactButton from "../components/misc/FloatingContactButton";
// import PlanTripModal from "../components/misc/PlanTripModal";
import ThemeToggle from "../components/misc/ThemeToggle";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Helmet>
        <title>Jumuiya Tours — Explore Uganda’s Natural Beauty</title>
        <meta
          name="description"
          content="Discover Uganda’s national parks, wildlife, and cultural heritage with Jumuiya Tours. Plan your next adventure today!"
        />
        <meta name="keywords" content="Uganda tours, safaris, travel, Africa, adventure, gorillas" />
        <meta property="og:title" content="Jumuiya Tours" />
        <meta property="og:description" content="Explore Uganda’s hidden gems — from gorilla trekking to cultural tours." />
        <meta property="og:image" content="/src/assets/images/hero.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jumuiya-tours.vercel.app" />
      </Helmet>

      <HeroSection />
      <FeaturedDestinations />
      <PopularTours />
      <Testimonials />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <FloatingContactButton />
      {/* <PlanTripModal /> */}
      <ThemeToggle />
    </main>
  );
}
