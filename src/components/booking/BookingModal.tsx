import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../../hooks/useBooking";
import BookingForm from "./BookingForm";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            <button
              onClick={closeBooking}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <BookingForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
