// src/services/paymentService.ts
import { jsPDF } from "jspdf";
import type { Booking } from "../types/booking";

/**
 * Simulates a Visa payment and returns a downloadable receipt URL.
 */
export async function generateReceipt(data: Booking): Promise<string> {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Jumuiya Tours — Booking Receipt", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.fullName}`, 20, 40);
  doc.text(`Email: ${data.email}`, 20, 50);
  doc.text(`Phone: ${data.countryCode || ""} ${data.phone || ""}`, 20, 60);
  doc.text(`Tour: ${data.tourName || "N/A"}`, 20, 70);
  doc.text(`Travelers: ${data.travelers}`, 20, 80);
  doc.text(`Payment Method: ${data.paymentMethod}`, 20, 90);
  doc.text(`Amount Paid: $${data.amount || 1500}`, 20, 100);
  doc.text(`Status: ${data.paid ? "Paid" : "Pending"}`, 20, 110);

  doc.setFontSize(10);
  doc.text("Thank you for booking with Jumuiya Tours!", 20, 130);
  doc.text("This is a system-generated receipt.", 20, 137);

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  return url;
}
