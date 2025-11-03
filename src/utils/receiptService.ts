import jsPDF from "jspdf";
import "jspdf-autotable";
import type { Booking } from "../types/booking";

export async function generateReceipt(booking: Booking): Promise<string> {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Jumuiya Tours - Booking Receipt", 20, 20);

  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Name: ${booking.fullName}`, 20, 40);
  doc.text(`Email: ${booking.email}`, 20, 50);
  doc.text(`Phone: ${booking.countryCode || ""} ${booking.phone || ""}`, 20, 60);
  doc.text(`Travelers: ${booking.travelers}`, 20, 70);
  doc.text(`Tour: ${booking.tourName || "N/A"}`, 20, 80);
  doc.text(`Payment Method: ${booking.paymentMethod}`, 20, 90);
  doc.text(`Amount: USD ${booking.amount || 0}`, 20, 100);
  doc.text(`Payment Status: ${booking.paid ? "Paid ✅" : "Pending"}`, 20, 110);

  doc.text("Thank you for choosing Jumuiya Tours!", 20, 130);

  const fileName = `receipt_${booking.fullName.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);

  return fileName;
}
