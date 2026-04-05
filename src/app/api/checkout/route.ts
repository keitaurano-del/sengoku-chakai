import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { bookingSchema } from "@/lib/schemas";
import { PLANS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const plan = PLANS.find((p) => p.id === data.plan);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        plan: data.plan,
        date: data.date,
        timeSlot: data.timeSlot,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country,
        requests: data.requests || null,
      },
    });

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: `Tea Ceremony — ${plan.nameJa} ${plan.nameEn}`,
              description: `${data.date} | ${data.timeSlot} | ${data.guests} guest(s)`,
            },
            unit_amount: plan.price,
          },
          quantity: data.guests,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/en/booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/en/booking?canceled=true`,
      customer_email: data.email,
      metadata: {
        bookingId: booking.id,
        plan: data.plan,
        date: data.date,
        timeSlot: data.timeSlot,
        guests: String(data.guests),
        name: data.name,
        phone: data.phone || "",
        country: data.country,
        requests: data.requests || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
