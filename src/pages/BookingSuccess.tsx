import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle } from "lucide-react";
import { useBooking } from "../hooks/useBooking";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { booking } = useBooking();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/", { replace: true }), 7000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const message = encodeURIComponent(
    `Hello Jumuiya Tours 👋,\n\nI'm ${
      booking?.fullName || "a traveler"
    } and my booking for *${booking?.tourName || "a custom trip"}* is confirmed!\n` +
      `• Travelers: ${booking?.travelers || 1}\n• Dates: ${booking?.startDate} → ${booking?.endDate}\n` +
      `• Accommodation: ${booking?.accommodation}\n• Payment: ${
        booking?.paymentMethod === "visa" ? "Visa (Paid)" : "Arrival"
      }\n\nPlease confirm further details.`
  );

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6" />
      </motion.div>

      <motion.h1
        className="text-4xl font-extrabold mb-3 text-green-400"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Booking Confirmed!
      </motion.h1>

      <p className="text-gray-300 mb-6 max-w-lg">
        Thank you, <span className="font-semibold text-green-300">{booking?.fullName || "traveler"}</span>!
        <br />
        Your trip to <span className="text-yellow-400">{booking?.tourName || "Uganda"}</span> has been successfully booked.
        Our agent will reach out to you shortly on WhatsApp to discuss the itinerary and finalize your travel plans.
      </p>

      {booking?.receiptUrl && (
        <a
          href={booking.receiptUrl}
          download
          className="inline-block bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold text-white mb-6"
        >
          📄 Download Receipt
        </a>
      )}

      <a
        href={`https://wa.me/256756775911?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold text-white transition"
      >
        <MessageCircle className="w-5 h-5" />
        Continue on WhatsApp
      </a>

      <p className="text-sm text-gray-400 mt-8">
        You’ll be redirected to the homepage shortly...
      </p>
    </motion.div>
  );
}
