/**
 * JumuiyaTours – Unified Field Validation Utility
 * Author: Edwin Bwambale
 * Purpose: Centralized, professional-grade form validation logic
 */

export interface ValidationError {
  field: string;
  message: string;
}

// -------------------------
// Email validation helper
// -------------------------
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// -------------------------
// Phone validation helper
// -------------------------
const phoneRegex =
  /^\+?[0-9]{7,15}$/;

// -------------------------
// Common field validations
// -------------------------
export const validateContactForm = (data: {
  name: string;
  email: string;
  message: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name.trim())
    errors.push({ field: "name", message: "Name is required." });
  else if (data.name.length < 3)
    errors.push({
      field: "name",
      message: "Name must be at least 3 characters long.",
    });

  if (!data.email.trim())
    errors.push({ field: "email", message: "Email is required." });
  else if (!emailRegex.test(data.email))
    errors.push({ field: "email", message: "Invalid email address." });

  if (!data.message.trim())
    errors.push({ field: "message", message: "Message cannot be empty." });
  else if (data.message.length < 10)
    errors.push({
      field: "message",
      message: "Message must contain at least 10 characters.",
    });

  return errors;
};

// -------------------------
// Booking form validation
// -------------------------
export const validateBookingForm = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.fullName?.trim())
    errors.push({ field: "fullName", message: "Full Name is required." });

  if (!data.email?.trim())
    errors.push({ field: "email", message: "Email is required." });
  else if (!emailRegex.test(data.email))
    errors.push({ field: "email", message: "Invalid email format." });

  if (!data.phone?.trim())
    errors.push({ field: "phone", message: "Phone number is required." });
  else if (!phoneRegex.test(data.countryCode + data.phone))
    errors.push({ field: "phone", message: "Invalid phone number." });

  if (!data.startDate || !data.endDate)
    errors.push({
      field: "dates",
      message: "Please select both start and end travel dates.",
    });

  if (!data.tourName)
    errors.push({ field: "tourName", message: "Destination is required." });

  if (data.travelers <= 0)
    errors.push({
      field: "travelers",
      message: "Number of travelers must be at least 1.",
    });

  if (data.paymentMethod === "visa" && (!data.amount || data.amount <= 0))
    errors.push({
      field: "payment",
      message: "Payment amount must be greater than 0 for Visa method.",
    });

  return errors;
};

// -------------------------
// Generic helper
// -------------------------
export const hasErrors = (errs: ValidationError[]) => errs.length > 0;
