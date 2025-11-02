import { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Replace with your EmailJS credentials (service_id, template_id, public_key)
    emailjs
      .send("service_xxxxxxx", "template_xxxxxxx", form, "public_key_xxxxx")
      .then(() => {
        setLoading(false);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setLoading(false));
  };

  return (
    <SectionWrapper
      id="contact"
      title="📩 Contact Us"
      subtitle="Have questions or want to plan a trip? Send us a message!"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          aria-label="contact form"
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            whileFocus={{ scale: 1.01 }}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {sent && (
            <p className="text-green-600 text-center mt-4">
              ✅ Message sent successfully! We’ll be in touch soon.
            </p>
          )}
        </form>

        {/* 🔗 Mailto fallback (in case JS disabled) */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Or reach us directly at 
          <a
            href="mailto:info@jumuiyatours.ug"
            className="text-green-600 hover:underline"
          >
            info@jumuiyatours.ug
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
