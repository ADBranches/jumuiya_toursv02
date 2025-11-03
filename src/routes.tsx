import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./components/misc/WhatsAppButton"; // ✅ import added

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {/* ✅ Fancy floating WhatsApp button visible everywhere */}
      <WhatsAppButton />
    </BrowserRouter>
  );
}
