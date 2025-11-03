// src/components/booking/BookingForm.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "../../hooks/useBooking";
import { bookingService } from "../../services/bookingService";
import { countries } from "../../utils/constants";
import { generateReceipt } from "../../services/paymentService";
import DatePicker from "./DatePicker";
import BookingSummary from "./BookingSummary";
import InputField from "../ui/InputField";
import type { Booking } from "../../types/booking";

export default function BookingForm() {
  const { booking, updateBooking, resetBooking, closeBooking, nextStep } = useBooking();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const [formData, setFormData] = useState<Booking>(
    booking || {
      fullName: "",
      email: "",
      travelers: 1,
      startDate: "",
      endDate: "",
      accommodation: "midrange",
      transport: "van",
      requests: "",
      countryCode: "+256",
      paymentMethod: "arrival",
    }
  );

  const [selectedCode, setSelectedCode] = useState(formData.countryCode || "+256");
  const [paymentMethod, setPaymentMethod] = useState<"arrival" | "visa">(formData.paymentMethod || "arrival");

  const handleChange = (field: keyof Booking, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = bookingService.validate(formData);
    if (errs.length > 0) return setErrors(errs);

    setLoading(true);
    setConfirmationMsg("");

    const updated: Booking = { ...formData, countryCode: selectedCode, paymentMethod };
    updateBooking(updated);

    if (paymentMethod === "visa") {
      setConfirmationMsg("💳 Processing Visa payment...");
      await new Promise((res) => setTimeout(res, 2000));

      const receiptUrl = await generateReceipt({
        ...updated,
        paid: true,
        amount: 1500,
      });
      updateBooking({ ...updated, paid: true, receiptUrl });

      setConfirmationMsg("✅ Payment successful! Preparing receipt...");
      setTimeout(() => {
        bookingService.saveToLocal(updated);
        bookingService.sendViaMailto(updated);
        nextStep();
        setLoading(false);
      }, 1500);
    } else {
      setConfirmationMsg("🕒 Payment will be made upon arrival.");
      bookingService.saveToLocal(updated);
      bookingService.sendViaMailto(updated);
      setTimeout(() => {
        nextStep();
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6 text-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center text-green-400"
      >
        {step === 1 && "Traveler Information"}
        {step === 2 && "Trip Details"}
        {step === 3 && "Preferences & Payment"}
        {step === 4 && "Review & Confirm"}
      </motion.h2>

      {errors.length > 0 && (
        <div className="bg-red-800/20 text-red-300 p-3 rounded-lg">
          {errors.map((err, i) => (
            <p key={i}>• {err}</p>
          ))}
        </div>
      )}

      {/* Step 1 – Traveler Info */}
      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-6">
          <InputField label="Full Name" value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
          <InputField label="Email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Country Code</label>
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.dial_code}>
                  {c.name} ({c.dial_code})
                </option>
              ))}
            </select>
          </div>
          <InputField label="Phone" value={formData.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} />
          <InputField
            label="Number of Travelers"
            type="number"
            value={formData.travelers}
            min={1}
            onChange={(e) => handleChange("travelers", parseInt(e.target.value) || 1)}
          />
        </div>
      )}

      {/* Step 2 – Dates & Tour */}
      {step === 2 && (
        <div className="grid gap-6">
          <DatePicker
            label="Travel Dates"
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(start, end) => {
              handleChange("startDate", start);
              handleChange("endDate", end);
            }}
          />
          <InputField
            label="Tour Name / Destination"
            value={formData.tourName || ""}
            onChange={(e) => handleChange("tourName", e.target.value)}
          />
        </div>
      )}

      {/* Step 3 – Preferences & Payment */}
      {step === 3 && (
        <div className="grid gap-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Payment Method</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("arrival")}
                className={`px-4 py-2 rounded-lg border transition ${
                  paymentMethod === "arrival" ? "bg-green-600" : "bg-gray-700 border-gray-600"
                }`}
              >
                Pay on Arrival
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("visa")}
                className={`px-4 py-2 rounded-lg border transition ${
                  paymentMethod === "visa" ? "bg-blue-600" : "bg-gray-700 border-gray-600"
                }`}
              >
                Pay with Visa
              </button>
            </div>
            {paymentMethod === "visa" && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg text-sm text-gray-300">
                <p>
                  💳 Card Number: <span className="font-mono">5316 9226 3101 2419</span>
                </p>
                <p>This is a simulated card for testing only.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmationMsg && (
        <motion.p
          className="text-center text-green-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {confirmationMsg}
        </motion.p>
      )}

      {/* Step 4 – Summary */}
      {step === 4 && <BookingSummary data={formData} />}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="ml-auto px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`ml-auto px-6 py-2 rounded-lg font-semibold ${
              loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        )}
      </div>
    </form>
  );
}
