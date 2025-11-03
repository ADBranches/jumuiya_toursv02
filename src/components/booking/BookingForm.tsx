import { useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "../../hooks/useBooking";
import { bookingService } from "../../services/bookingService";
import { countries, destinations } from "../../utils/constants";
import { generateReceipt } from "../../services/paymentService";
import DatePicker from "./DatePicker";
import BookingSummary from "./BookingSummary";
import InputField from "../ui/InputField";
import {
  validateBookingForm,
  hasErrors,
} from "../../utils/validation";
import type { ValidationError } from "../../utils/validation";
import type { Booking } from "../../types/booking";

export default function BookingForm() {
  const { booking, updateBooking, resetBooking, closeBooking } = useBooking();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const [formData, setFormData] = useState<Booking>(
    booking || {
      fullName: "",
      email: "",
      phone: "",
      travelers: 1,
      startDate: "",
      endDate: "",
      accommodation: "midrange",
      transport: "van",
      requests: "",
      countryCode: "+256",
      paymentMethod: "arrival",
      tourName: "",
      paid: false,
      amount: 0,
      receiptUrl: "",
    }
  );

  const [selectedCode, setSelectedCode] = useState(formData.countryCode || "+256");
  const [paymentMethod, setPaymentMethod] = useState<"arrival" | "visa">(
    formData.paymentMethod || "arrival"
  );

  // ---------- Helpers ----------

  const handleChange = (field: keyof Booking, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    const validation = validateBookingForm(updated);
    setErrors(validation);
  };

  const fieldError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = destinations.find((d) => d.name === e.target.value);
    if (selected) {
      const price = (selected as any).price ?? 0;
      const updated = {
        ...formData,
        tourName: selected.name,
        amount: price * (formData.travelers || 1),
      };
      setFormData(updated);
      setErrors(validateBookingForm(updated));
    }
  };

  const handleTravelersChange = (value: number) => {
    const selected = destinations.find((d) => d.name === formData.tourName);
    const basePrice = selected ? (selected as any).price ?? 0 : 0;
    const updated = { ...formData, travelers: value, amount: basePrice * value };
    setFormData(updated);
    setErrors(validateBookingForm(updated));
  };

  const goNextStep = () => {
    const stepValidation = validateBookingForm(formData);
    if (hasErrors(stepValidation)) {
      setErrors(stepValidation);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
    setErrors([]);
  };

  const goPrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ---------- Submit ----------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateBookingForm(formData);
    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    const selected = destinations.find((d) => d.name === formData.tourName);
    if (!selected) {
      setErrors([{ field: "tourName", message: "Please choose a destination." }]);
      return;
    }

    const basePrice = (selected as any).price ?? 0;
    const requiredAmount = basePrice * (formData.travelers || 1);

    if (
      paymentMethod === "visa" &&
      (formData.amount ?? 0) > 0 &&
      (formData.amount ?? 0) < requiredAmount
    ) {
      setErrors([
        {
          field: "amount",
          message: `Payment Error: Minimum payable amount for ${selected.name} is $${requiredAmount}.`,
        },
      ]);
      return;
    }

    setLoading(true);
    setConfirmationMsg("");

    const updated: Booking = {
      ...formData,
      countryCode: selectedCode,
      paymentMethod,
    };

    try {
      const receiptUrl = await generateReceipt({
        ...updated,
        paid: paymentMethod === "visa",
        amount: updated.amount || requiredAmount,
      });

      const finalBooking: Booking = {
        ...updated,
        paid: paymentMethod === "visa",
        amount: updated.amount || requiredAmount,
        receiptUrl,
      };

      updateBooking(finalBooking);
      bookingService.saveToLocal(finalBooking);
      bookingService.sendViaMailto(finalBooking);

      setConfirmationMsg(
        paymentMethod === "visa"
          ? "✅ Payment successful! Receipt is ready for download."
          : "🕒 Booking confirmed. Please pay on arrival. Receipt draft prepared."
      );

      // WhatsApp notification
      const message = encodeURIComponent(
        `Hello Jumuiya Tours 👋,\n\nI’ve just booked *${finalBooking.tourName}*.\n` +
          `• Name: ${finalBooking.fullName}\n• Travelers: ${finalBooking.travelers}\n` +
          `• Dates: ${finalBooking.startDate} → ${finalBooking.endDate}\n` +
          `• Payment: ${
            paymentMethod === "visa" ? "Visa (Simulated)" : "Arrival"
          }\n\nPlease confirm my booking.`
      );

      setTimeout(() => {
        window.open(`https://wa.me/256756775911?text=${message}`, "_blank");
      }, 1500);

      setTimeout(() => {
        try {
          resetBooking();
          closeBooking();
          window.location.href = "/booking-success";
        } catch (err) {
          console.error("Finalization error:", err);
          setErrors([
            {
              field: "system",
              message:
                "⚠️ Your booking was saved, but something went wrong while finishing the flow.",
            },
          ]);
        }
      }, 3000);
    } catch (err) {
      console.error("Booking submit error:", err);
      setErrors([
        { field: "system", message: "❌ Something went wrong while processing your booking." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Render ----------

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

      {/* Error banner */}
      {errors.length > 0 && (
        <div className="bg-red-800/20 text-red-300 p-3 rounded-lg">
          {errors.map((err, i) => (
            <p key={i}>• {err.message}</p>
          ))}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            value={formData.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            error={fieldError("fullName")}
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            error={fieldError("email")}
          />

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

          <InputField
            label="Phone"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={fieldError("phone")}
          />

          <InputField
            label="Number of Travelers"
            type="number"
            value={formData.travelers || 1}
            onChange={(e) =>
              handleTravelersChange(parseInt(e.target.value) || 1)
            }
            error={fieldError("travelers")}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="grid gap-6">
          <DatePicker
            label="Travel Dates"
            startDate={formData.startDate || ""}
            endDate={formData.endDate || ""}
            onChange={(start, end) => {
              handleChange("startDate", start || "");
              handleChange("endDate", end || "");
            }}
          />

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Select Destination
            </label>
            <select
              value={formData.tourName || ""}
              onChange={handleDestinationChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="">-- Choose Destination --</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                  {typeof (d as any).price === "number"
                    ? ` ($${(d as any).price})`
                    : ""}
                </option>
              ))}
            </select>
            {fieldError("tourName") && (
              <p className="text-red-400 text-sm mt-1">{fieldError("tourName")}</p>
            )}
          </div>

          {(formData.amount ?? 0) > 0 && (
            <p className="text-green-400 font-medium">
              💰 Total Estimated Cost: ${(formData.amount ?? 0).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="grid gap-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Payment Method
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("arrival")}
                className={`px-4 py-2 rounded-lg border transition ${
                  paymentMethod === "arrival"
                    ? "bg-green-600 border-green-700 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-200"
                }`}
              >
                Pay on Arrival
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("visa")}
                className={`px-4 py-2 rounded-lg border transition ${
                  paymentMethod === "visa"
                    ? "bg-blue-600 border-blue-700 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-200"
                }`}
              >
                Pay with Visa
              </button>
            </div>

            {paymentMethod === "visa" && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg text-sm text-gray-300">
                <p>
                  💳 Payments are simulated for now while the secure gateway is being finalized.
                </p>
                <p>
                  You’ll still receive a downloadable receipt and WhatsApp follow-up.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && <BookingSummary data={formData} />}

      {/* Confirmation text */}
      {confirmationMsg && (
        <motion.p
          className="text-center text-green-400 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {confirmationMsg}
        </motion.p>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={goPrevStep}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
          >
            Back
          </button>
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={goNextStep}
            className="ml-auto px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`ml-auto px-6 py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        )}
      </div>
    </form>
  );
}
