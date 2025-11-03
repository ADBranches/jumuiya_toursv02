import type { Booking } from "../types/booking";

const BASE_RATES = {
  budget: 80,     // USD per traveler per day
  midrange: 150,
  luxury: 300,
};

export function estimatePrice(booking: Booking): number {
  if (!booking.startDate || !booking.endDate) return 0;
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  const rate = BASE_RATES[booking.accommodation] || BASE_RATES.midrange;
  const subtotal = days * rate * booking.travelers;

  // Apply promo code discount (if present)
  const discount = booking.requests?.toLowerCase().includes("promo10") ? 0.1 : 0;
  const total = subtotal - subtotal * discount;
  return Math.round(total);
}
