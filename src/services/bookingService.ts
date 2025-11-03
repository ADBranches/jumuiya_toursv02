import type { Booking } from "../types/booking";
import emailjs from "@emailjs/browser";

const BOOKING_KEY = "jumuiya_booking_draft";

// ⚙️ Configure with your actual EmailJS credentials
const SERVICE_ID = "service_jumuiyaTours";
const TEMPLATE_ID = "template_bookingConfirm";
const PUBLIC_KEY = "your_public_key_here"; // e.g. "2KfFzAbc123xyz"

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
    if (!booking.fullName) errors.push("Full name is required");
    if (!booking.email) errors.push("Email is required");
    if (!booking.startDate || !booking.endDate)
      errors.push("Please select your travel dates");
    if (booking.travelers <= 0)
      errors.push("Number of travelers must be at least 1");
    return errors;
  },

  /**
   * Send booking confirmation email via EmailJS
   * Automatically includes receipt link if payment is completed
   */
  async sendViaMailto(booking: Booking) {
    const emailPayload = {
      fullName: booking.fullName,
      email: booking.email,
      phone: `${booking.countryCode || ""} ${booking.phone || ""}`,
      tourName: booking.tourName || "Custom Trip",
      travelers: booking.travelers,
      startDate: booking.startDate,
      endDate: booking.endDate,
      accommodation: booking.accommodation,
      transport: booking.transport,
      paymentMethod: booking.paymentMethod,
      amount: booking.amount || (booking.paymentMethod === "visa" ? 1500 : "N/A"),
      paid: booking.paid ? "Yes" : "No",
      receiptUrl: booking.receiptUrl || "Not available",
      message: booking.paid
        ? `Payment received successfully via Visa. Booking confirmed for ${booking.tourName}.`
        : `Booking received successfully. Please complete payment upon arrival.`,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailPayload, PUBLIC_KEY);
      console.log("✅ Booking confirmation email sent successfully!");
    } catch (error) {
      console.warn("⚠️ EmailJS failed, using mailto fallback:", error);

      // --- fallback to mailto if EmailJS fails ---
      const body = `
Name: ${booking.fullName}
Email: ${booking.email}
Phone: ${booking.countryCode || ""} ${booking.phone || ""}
Tour: ${booking.tourName ?? "Custom Trip"}
Dates: ${booking.startDate} → ${booking.endDate}
Accommodation: ${booking.accommodation}
Transport: ${booking.transport}
Travelers: ${booking.travelers}
Payment: ${booking.paymentMethod} (${booking.paid ? "Paid" : "Unpaid"})
Receipt: ${booking.receiptUrl ?? "N/A"}
`.trim();

      const mailtoLink = `mailto:info@jumuiyatours.ug?subject=Booking Confirmation - ${booking.fullName}&body=${encodeURIComponent(
        body
      )}`;
      window.location.href = mailtoLink;
    }
  },
};
