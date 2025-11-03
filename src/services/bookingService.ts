import type { Booking } from "../types/booking";

const BOOKING_KEY = "jumuiya_booking_draft";

export const bookingService = {
  /** Save booking locally (for draft persistence) */
  saveToLocal(booking: Booking) {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
  },

  /** Load draft booking if any */
  loadFromLocal(): Booking | null {
    const data = localStorage.getItem(BOOKING_KEY);
    return data ? (JSON.parse(data) as Booking) : null;
  },

  /** Clear saved booking */
  clearLocal() {
    localStorage.removeItem(BOOKING_KEY);
  },

  /** Basic client-side validation */
  validate(booking: Booking): string[] {
    const errors: string[] = [];
    if (!booking.name) errors.push("Name is required");
    if (!booking.email) errors.push("Email is required");
    if (!booking.startDate || !booking.endDate)
      errors.push("Please select your travel dates");
    if (booking.travelers <= 0)
      errors.push("Number of travelers must be at least 1");
    return errors;
  },

  /** Mailto: fallback for quick inquiry */
  sendViaMailto(booking: Booking) {
    const body = `
Name: ${booking.name}
Email: ${booking.email}
Travelers: ${booking.travelers}
Tour: ${booking.tourName ?? "Custom Trip"}
Dates: ${booking.startDate} → ${booking.endDate}
Accommodation: ${booking.accommodation}
Transport: ${booking.transport}
Requests: ${booking.requests ?? "None"}
`.trim();

    const mailtoLink = `mailto:info@jumuiyatours.ug?subject=Booking Inquiry - ${booking.name}&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = mailtoLink;
  },
};
