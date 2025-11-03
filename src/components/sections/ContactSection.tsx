import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  // toggle logic
  const USE_MAILTO_MODE = true;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const targetEmail = "jumuiyatours101@gmail.com";
    const subject = encodeURIComponent(`Inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    console.group("📨 Jumuiya Tours | Contact Form Log");
    console.log("Sender:", form.name);
    console.log("Email:", form.email);
    console.log("Message:", form.message);
    console.log("Attempt mode:", USE_MAILTO_MODE ? "Mail App" : "EmailJS direct");
    console.groupEnd();

    if (USE_MAILTO_MODE) {
      try {
        window.location.href = mailtoLink;
        // Detect if the client probably has no handler
        setTimeout(async () => {
          const fallback =
            document.hasFocus() || navigator.userAgent.includes("Linux");
          if (fallback) {
            console.warn("⚠️ No mail handler detected. Using EmailJS fallback...");
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

  // ---------- EmailJS sending ----------
  const sendViaEmailJS = async () => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          tourName: "General Inquiry",
          travelers: "N/A",
          paymentMethod: "N/A",
          amount: "N/A",
          receiptUrl: "",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );

      setStatus("sent");
      console.info("✅ Email successfully sent through EmailJS.");
    } catch (err) {
      console.error("❌ EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6 text-green-700 dark:text-green-400"
        >
          Get in Touch
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Have a question or want to plan your next adventure? We’re here to help.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
            />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows={5}
            className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 dark:text-gray-100"
          />

          {/* Feedback status */}
          {status === "sending" && (
            <p className="text-sm text-blue-400 font-medium">📤 Sending message...</p>
          )}
          {status === "sent" && (
            <p className="text-sm text-green-500 font-semibold">
              ✅ Message sent successfully! We’ll reach out shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 font-semibold">
              ⚠️ Something went wrong. Please email us directly at{" "}
              <a href="mailto:jumuiyatours101@gmail.com" className="underline text-green-400">
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
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Or email us directly at{" "}
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
