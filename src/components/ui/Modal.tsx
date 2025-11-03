import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string; // optional width control e.g. "max-w-2xl"
  gradient?: boolean; // enable gradient background style
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "max-w-2xl",
  gradient = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative w-[90%] ${maxWidth} rounded-2xl shadow-2xl overflow-hidden border 
              ${gradient
                ? "bg-gradient-to-br from-white/20 to-black/30 text-white border-white/20 backdrop-blur-xl"
                : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-100 dark:border-gray-800"
              }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-300 hover:text-red-500 text-2xl font-light"
              aria-label="Close Modal"
            >
              ×
            </button>

            {/* Title */}
            {title && (
              <h3 className="text-2xl font-semibold mb-6 mt-4 text-center bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                {title}
              </h3>
            )}

            {/* Body */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
