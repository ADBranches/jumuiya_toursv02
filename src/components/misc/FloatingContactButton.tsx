import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingContactButton() {
  const whatsappUrl =
    "https://wa.me/256701234567?text=Hello%20Jumuiya%20Tours!%20I'm%20interested%20in%20planning%20a%20trip.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
