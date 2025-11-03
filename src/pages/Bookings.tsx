import BookingForm from "../components/booking/BookingForm";
import BookingConfirmation from "../components/booking/BookingConfirmation";
import { useState } from "react";

export default function BookingsPage() {
  const [submitted] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">
              Plan Your Trip with Jumuiya Tours
            </h1>
            <BookingForm />
          </>
        ) : (
          <BookingConfirmation />
        )}
      </div>
    </main>
  );
}
