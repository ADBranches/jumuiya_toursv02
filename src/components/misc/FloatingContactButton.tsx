import React, { useState } from "react";
import Modal from "../ui/Modal";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", destination: "", days: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Trip planned for ${form.name} to ${form.destination} (${form.days} days)`
    );
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black font-medium px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all flex items-center gap-2"
      >
        ✨ Plan Trip
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Plan Your Adventure">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Preferred Destination"
            required
            className="p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="days"
            value={form.days}
            onChange={handleChange}
            placeholder="Number of Days"
            required
            className="p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg shadow-green-500/30"
            >
              Submit
            </button>
          </div>
        </form>

      </Modal>
    </>
  );
}
