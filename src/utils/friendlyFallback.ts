// src/utils/friendlyFallback.ts
export function showPaymentFallback() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]";
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 p-8 rounded-2xl max-w-md text-center shadow-xl">
      <h2 class="text-2xl font-bold text-green-600 mb-4">
        Oops! Payment Couldn't Be Completed
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        It seems our payment service is temporarily unavailable.<br/>
        But don't worry — you can reach us directly to confirm your booking.
      </p>

      <div class="flex flex-col gap-3">
        <a
          href="https://wa.me/256757236140?text=Hello%20Jumuiya%20Tours!%20I%20was%20trying%20to%20book%20a%20tour%20and%20need%20assistance."
          target="_blank"
          class="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
        >
          💬 Chat with Jumuiya Tours
        </a>

        <a
          href="/destinations"
          class="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg font-semibold transition"
        >
          🌍 Continue Exploring Destinations
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
