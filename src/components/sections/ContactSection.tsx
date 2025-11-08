import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  validateContactForm,
  hasErrors,
} from "../../utils/validation";
import type { ValidationError } from "../../utils/validation";

export default function ContactSection() {
  const USE_MAILTO_MODE = true;

  // ✅ UPDATED: Enhanced form state with trip planning fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    tripType: "",
    travelDates: "",
    groupSize: "",
    budgetRange: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    if (status === "sent") {
      setForm({
        name: "",
        email: "",
        tripType: "",
        travelDates: "",
        groupSize: "",
        budgetRange: "",
        message: "",
      });
    }
  }, [status]); // This will run every time status changes

  // -------------------- Input handling --------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // Real-time validation feedback (only for required fields)
    const validation = validateContactForm(updated);
    setErrors(validation);
  };

  // -------------------- Form submission --------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate only required fields
    const validation = validateContactForm(form);
    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    setErrors([]);
    setStatus("sending");

    const targetEmail = "jumuiyatours101@gmail.com";
    const subject = encodeURIComponent(`Trip Inquiry from ${form.name}`);

    // ✅ UPDATED: Enhanced email body with trip planning info
    const body = encodeURIComponent(
      `TRIP PLANNING DETAILS:
Trip Type: ${form.tripType || "Not specified"}
Preferred Travel Dates: ${form.travelDates || "Flexible"}
Group Size: ${form.groupSize || "Not specified"}
Budget Range: ${form.budgetRange || "Not specified"}

MESSAGE:
${form.message}

CONTACT INFORMATION:
Name: ${form.name}
Email: ${form.email}`
    );

    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    console.group("📨 Jumuiya Tours | Enhanced Contact Form Log");
    console.log("Sender:", form.name);
    console.log("Email:", form.email);
    console.log("Trip Type:", form.tripType);
    console.log("Travel Dates:", form.travelDates);
    console.log("Group Size:", form.groupSize);
    console.log("Budget:", form.budgetRange);
    console.log("Message:", form.message);
    console.log(
      "Attempt mode:",
      USE_MAILTO_MODE ? "Mail App" : "EmailJS direct"
    );
    console.groupEnd();

    if (USE_MAILTO_MODE) {
      try {
        window.location.href = mailtoLink;

        // Fallback detection
        setTimeout(async () => {
          const fallback =
            document.hasFocus() || navigator.userAgent.includes("Linux");
          if (fallback) {
            console.warn(
              "⚠️ No mail handler detected. Using EmailJS fallback..."
            );
            await sendViaEmailJS();
          } else {
            setStatus("sent");
          }
        }, 1200);
      } catch (err) {
        console.error("❌ Mail handler failed. Using fallback.", err);
        await sendViaEmailJS();
      }
    } else {
      await sendViaEmailJS();
    }
  };

  // -------------------- EmailJS fallback --------------------
  const sendViaEmailJS = async () => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          tripType: form.tripType,
          travelDates: form.travelDates,
          groupSize: form.groupSize,
          budgetRange: form.budgetRange,
          message: form.message,
          tourName: "Trip Planning Inquiry",
          travelers: form.groupSize || "N/A",
          paymentMethod: "N/A",
          amount: form.budgetRange || "N/A",
          receiptUrl: "",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );

      setStatus("sent");

      console.info("✅ Enhanced contact form successfully sent through EmailJS.");
    } catch (err) {
      console.error("❌ EmailJS send failed:", err);
      setStatus("error");
    }
  };

  // -------------------- Helper for inline errors --------------------
  const fieldError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  // -------------------- UI --------------------
  return (
    <section
      id="contact"
      className="relative pt-24 pb-6 -mb-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6 text-green-700 dark:text-green-400"
        >
          Plan Your Adventure
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Have a question or want to plan your next adventure? We'll help you
          create the perfect Ugandan experience.
        </p>

        {/* Error banner */}
        {errors.length > 0 && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg p-4 mb-6 text-left">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100 dark:border-gray-800"
        >
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="text-left">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className={`p-4 w-full bg-gray-50 dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100 ${
                  fieldError("name")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              />
              {fieldError("name") && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldError("name")}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email *"
                className={`p-4 w-full bg-gray-50 dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100 ${
                  fieldError("email")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              />
              {fieldError("email") && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldError("email")}
                </p>
              )}
            </div>
          </div>

          {/* ✅ ENHANCED: Trip Planning Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Trip Type */}
            <div className="text-left">
              <select
                name="tripType"
                value={form.tripType}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
              >
                <option value="">Select Trip Type</option>
                <option value="Safari & Wildlife">Safari & Wildlife</option>
                <option value="Cultural Experience">Cultural Experience</option>
                <option value="Adventure & Hiking">Adventure & Hiking</option>
                <option value="Family Vacation">Family Vacation</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Travel Dates */}
            <div className="text-left">
              <input
                type="text"
                name="travelDates"
                value={form.travelDates}
                onChange={handleChange}
                placeholder="Preferred Travel Dates"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Group Size */}
            <div className="text-left">
              <select
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
              >
                <option value="">Group Size</option>
                <option value="Solo Traveler">Solo Traveler</option>
                <option value="Couple">Couple</option>
                <option value="Family (3-4)">Family (3-4)</option>
                <option value="Small Group (5-8)">Small Group (5-8)</option>
                <option value="Large Group (9+)">Large Group (9+)</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="text-left">
              <select
                name="budgetRange"
                value={form.budgetRange}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
              >
                <option value="">Budget Range</option>
                <option value="Economy ($500-$1,000)">
                  Economy ($500-$1,000)
                </option>
                <option value="Standard ($1,000-$2,500)">
                  Standard ($1,000-$2,500)
                </option>
                <option value="Premium ($2,500-$5,000)">
                  Premium ($2,500-$5,000)
                </option>
                <option value="Luxury ($5,000+)">Luxury ($5,000+)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="text-left">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your dream adventure, specific interests, or any questions... *"
              rows={5}
              className={`w-full p-4 bg-gray-50 dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100 ${
                fieldError("message")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {fieldError("message") && (
              <p className="text-red-500 text-sm mt-1">
                {fieldError("message")}
              </p>
            )}
          </div>

          {/* Feedback status */}
          {status === "sending" && (
            <p className="text-sm text-blue-400 font-medium">
              📤 Planning your adventure...
            </p>
          )}
          {status === "sent" && (
            <p className="text-sm text-green-500 font-semibold">
              ✅ Adventure planned! We'll reach out shortly to discuss your
              perfect trip.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 font-semibold">
              ⚠️ Something went wrong. Please email us directly at{" "}
              <a
                href="mailto:jumuiyatours101@gmail.com"
                className="underline text-green-400"
              >
                jumuiyatours101@gmail.com
              </a>
              .
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={status === "sending"}
            className={`w-full py-3 font-semibold rounded-lg shadow transition-all ${
              status === "sending"
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {status === "sending" ? "Planning Your Trip..." : "Plan My Adventure"}
          </motion.button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Prefer to email directly? Contact us at{" "}
            <a
              href="mailto:jumuiyatours101@gmail.com"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              jumuiyatours101@gmail.com
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
