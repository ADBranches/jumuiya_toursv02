/**
 * JumuiyaTours – Unified Field Validation Utility
 * Updated with proper Uganda phone validation
 */

export interface ValidationError {
  field: string;
  message: string;
}

// -------------------------
// Email validation helper
// -------------------------
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// -------------------------
// Phone validation helper - UPDATED FOR UGANDA
// -------------------------
export function isPhone(value: string): boolean {
  console.log("📞 Validating phone:", value);
  const cleaned = value.replace(/\s+/g, "");
  
  // Uganda phone validation: +2567xxxxxxxx, 2567xxxxxxxx, 07xxxxxxxx
  // Allow partial validation during typing
  if (cleaned.length < 10) {
    console.log("📞 Partial phone - allowing during typing");
    return true; // Allow partial numbers during input
  }
  
  const ugandaRegex = /^(?:\+?256|0)?7\d{8}$/;
  const isValid = ugandaRegex.test(cleaned);
  
  console.log("📞 Validation result:", isValid, "for:", cleaned);
  return isValid;
}

export function isEmail(value: string): boolean {
  return emailRegex.test(value);
}

export function validatePassword(value: string): string | null {
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
  if (!/[0-9]/.test(value)) return "Include at least one number";
  return null;
}

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
  else if (!isEmail(data.email))
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
// Original Booking form validation (KEEP THIS!)
// -------------------------
export const validateBookingForm = (data: Record<string, unknown>): ValidationError[] => { 
  const errors: ValidationError[] = [];

  if (!(data.fullName as string)?.trim())
    errors.push({ field: "fullName", message: "Full Name is required." });

  if (!(data.email as string)?.trim())
    errors.push({ field: "email", message: "Email is required." });
  else if (!isEmail(data.email as string))
    errors.push({ field: "email", message: "Invalid email format." });

  // FIXED: Use the new isPhone function with combined countryCode + phone
  const fullPhone = ((data.countryCode as string) || '+256') + ((data.phone as string) || '');
  if (!(data.phone as string)?.trim())
    errors.push({ field: "phone", message: "Phone number is required." });
  else if (!isPhone(fullPhone))
    errors.push({ field: "phone", message: "Invalid phone number." });

  if (!data.startDate || !data.endDate)
    errors.push({
      field: "dates",
      message: "Please select both start and end travel dates.",
    });

  if (!data.tourName)
    errors.push({ field: "tourName", message: "Destination is required." });

  if ((data.travelers as number) <= 0)
    errors.push({
      field: "travelers",
      message: "Number of travelers must be at least 1.",
    });

  if (data.paymentMethod === "visa" && (!data.amount || (data.amount as number) <= 0))
    errors.push({
      field: "payment",
      message: "Payment amount must be greater than 0 for Visa method.",
    });

  return errors;
};

// -------------------------
// Step-specific validation (NEW - for real-time validation)
// -------------------------
export const validateBookingFormStep = (data: Record<string, unknown>, step: number): ValidationError[] => {
  const errors: ValidationError[] = [];

  // STEP 1: Only validate contact info
  if (step === 1) {
    if (!(data.fullName as string)?.trim())
      errors.push({ field: "fullName", message: "Full Name is required." });

    if (!(data.email as string)?.trim())
      errors.push({ field: "email", message: "Email is required." });
    else if (!isEmail(data.email as string))
      errors.push({ field: "email", message: "Invalid email format." });

    const fullPhone = ((data.countryCode as string) || '+256') + ((data.phone as string) || '');
    if (!(data.phone as string)?.trim())
      errors.push({ field: "phone", message: "Phone number is required." });
    else if (!isPhone(fullPhone))
      errors.push({ field: "phone", message: "Invalid phone number." });

    if ((data.travelers as number) <= 0)
      errors.push({
        field: "travelers",
        message: "Number of travelers must be at least 1.",
      });
  }

  // STEP 2: Only validate trip details
  else if (step === 2) {
    // FIX: More robust date validation
    const startDate = data.startDate as string;
    const endDate = data.endDate as string;
    const hasStartDate = startDate && startDate.trim() !== '' && startDate !== 'Invalid Date';
    const hasEndDate = endDate && endDate.trim() !== '' && endDate !== 'Invalid Date';
    
    console.log("📅 VALIDATION DEBUG:", {
      startDate: data.startDate,
      endDate: data.endDate,
      hasStartDate,
      hasEndDate
    });
    
    if (!hasStartDate || !hasEndDate) {
      errors.push({
        field: 'dates',
        message: 'Please select both start and end travel dates.'
      });
    }

    if (!data.tourName)
      errors.push({ field: 'tourName', message: 'Destination is required.' });
  }

  // STEP 3+: Use full validation
  else {
    return validateBookingForm(data);
  }

  return errors;
};

// -------------------------
// Generic helper
// -------------------------
export const hasErrors = (errs: ValidationError[]) => errs.length > 0;