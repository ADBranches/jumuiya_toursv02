import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function WhatsAppButton() {
  const phoneNumber = "256756775911";
  const message =
    "Hello Jumuiya Tours! 👋 I'm interested in exploring your Uganda tour packages.";

  const handleClick = () => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, "_blank");
  };

  return (
    <motion.div
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg cursor-pointer shadow-green-700/40 transition-transform hover:scale-105 active:scale-95 z-50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MessageCircle size={26} />
      <span className="font-semibold text-sm hidden sm:inline">
        Chat with Us
      </span>
    </motion.div>
  );
}
