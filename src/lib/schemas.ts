import { z } from "zod";

export const bookingSchema = z.object({
  plan: z.enum(["ume", "take", "matsu"]),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.enum(["morning", "afternoon", "evening"]),
  guests: z.number().min(1).max(6),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  requests: z.string().optional(),
  agreeToPolicy: z.literal(true, {
    error: "You must agree to the cancellation policy",
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const cancellationSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  bookingDate: z.string().min(1, "Booking date is required"),
  reason: z.string().optional(),
});

export type CancellationFormData = z.infer<typeof cancellationSchema>;
