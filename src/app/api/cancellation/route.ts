import { NextResponse } from "next/server";
import { cancellationSchema } from "@/lib/schemas";
import { getStripe, getRefundPercentage } from "@/lib/stripe";
import { sendCancellationNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = cancellationSchema.parse(body);

    // Calculate refund percentage based on cancellation policy
    const eventDate = new Date(data.bookingDate);
    const refundPercent = getRefundPercentage(eventDate);

    let refundInfo = {
      refundPercent,
      refundAmount: 0,
      originalAmount: 0,
      cancellationFee: 0,
      stripeRefundId: "",
    };

    // Try to find the Stripe session and process refund
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        // Search for the checkout session by customer email
        const sessions = await getStripe().checkout.sessions.list({
          customer_details: { email: data.email },
          limit: 10,
        });

        const matchingSession = sessions.data.find(
          (s) =>
            s.metadata?.date === data.bookingDate &&
            s.payment_status === "paid"
        );

        if (matchingSession && matchingSession.payment_intent) {
          const paymentIntentId =
            typeof matchingSession.payment_intent === "string"
              ? matchingSession.payment_intent
              : matchingSession.payment_intent.id;

          const paymentIntent =
            await getStripe().paymentIntents.retrieve(paymentIntentId);
          const originalAmount = paymentIntent.amount;
          const refundAmount = Math.round((originalAmount * refundPercent) / 100);

          refundInfo.originalAmount = originalAmount;
          refundInfo.cancellationFee = originalAmount - refundAmount;

          if (refundAmount > 0) {
            const refund = await getStripe().refunds.create({
              payment_intent: paymentIntentId,
              amount: refundAmount,
            });
            refundInfo.refundAmount = refundAmount;
            refundInfo.stripeRefundId = refund.id;
          }
        }
      } catch (stripeError) {
        console.error("Stripe refund error:", stripeError);
        // Continue to send notification even if Stripe lookup fails
      }
    }

    // Send notification email
    if (process.env.RESEND_API_KEY) {
      await sendCancellationNotification({
        ...data,
        ...refundInfo,
      } as Parameters<typeof sendCancellationNotification>[0]);
    }

    return NextResponse.json({
      success: true,
      refundPercent: refundInfo.refundPercent,
      message:
        refundPercent === 100
          ? "Full refund will be processed."
          : refundPercent > 0
          ? `A ${refundPercent}% refund will be processed. A ${100 - refundPercent}% cancellation fee applies.`
          : "No refund is available for this cancellation per our policy.",
    });
  } catch (error) {
    console.error("Cancellation error:", error);
    return NextResponse.json(
      { error: "Invalid cancellation data" },
      { status: 400 }
    );
  }
}
