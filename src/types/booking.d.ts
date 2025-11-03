export interface Booking {
  /** Unique identifier, optional until persisted */
  id?: string;

  /** Traveler’s full name */
  fullName: string;

  /** Email address for booking confirmation */
  email: string;

  /** Optional phone contact */
  phone?: string;

  /** Optional international dialing code */
  countryCode?: string;

  /** Number of travelers */
  travelers: number;

  /** Linked tour details */
  tourId?: number;
  tourName?: string;

  /** Trip schedule */
  startDate: string;
  endDate: string;

  /** Trip preferences */
  accommodation: "budget" | "midrange" | "luxury";
  transport: "van" | "4x4" | "selfdrive";

  /** Optional user special requests */
  requests?: string;

  /** Payment information */
  paymentMethod?: "arrival" | "visa";
  paid?: boolean;
  amount?: number;
  receiptUrl?: string;

  /** Metadata */
  createdAt?: string;
}
