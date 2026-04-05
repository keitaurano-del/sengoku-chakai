import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-03-31.basil",
    });
  }
  return _stripe;
}

export const CANCELLATION_POLICY = {
  7: 100,   // 7+ days: full refund
  3: 50,    // 3-6 days: 50% refund
  1: 20,    // 1-2 days: 80% cancellation fee (20% refund)
  0: 0,     // Same day / no-show: no refund
} as const;

export function getRefundPercentage(eventDate: Date): number {
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 7) return 100;
  if (diffDays >= 3) return 50;
  if (diffDays >= 1) return 20;
  return 0;
}
