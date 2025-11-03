import { motion } from "framer-motion";
import { useBooking } from "../../hooks/useBooking";
import { bookingService } from "../../services/bookingService";

export default function BookingConfirmation() {
  const { booking, resetBooking } = useBooking();

  const handleReset = () => {
    bookingService.clearLocal();
    resetBooking();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-gray-900">
      {/* ✅ Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl shadow-lg"
      >
        ✓
      </motion.div>

      {/* ✅ Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-3xl font-extrabold text-green-700 dark:text-green-400"
      >
        Booking Confirmed!
      </motion.h2>

      {/* ✅ Message */}
      <p className="mt-4 max-w-lg text-gray-600 dark:text-gray-300">
        🎉 Thank you for booking with <strong>Jumuiya Tours</strong>!  
        We’ve received your request and will contact you shortly to confirm your travel plan.
      </p>

      {/* ✅ Show Receipt Download if available */}
      {booking?.receiptUrl && (
        <motion.a
          href={booking.receiptUrl}
          download
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 inline-block bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 shadow-md transition"
        >
          Download Receipt
        </motion.a>
      )}

      {/* ✅ Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="mailto:info@jumuiyatours.ug"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Contact Support
        </a>

        <button
          onClick={handleReset}
          className="px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Book Another Trip
        </button>
      </div>
    </section>
  );
}
