import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlanTripModal() {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState({ name: "", destination: "", days: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTrip({ ...trip, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Your trip plan request has been noted!\n${JSON.stringify(trip, null, 2)}`);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 bg-yellow-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition z-40"
      >
        🧭 Plan Trip
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Plan Your Adventure
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={trip.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  name="destination"
                  placeholder="Preferred Destination"
                  value={trip.destination}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="number"
                  name="days"
                  placeholder="Number of Days"
                  value={trip.days}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3"
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
