import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas";
import { sendBookingNotification } from "@/lib/email";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

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

    if (process.env.RESEND_API_KEY) {
      await sendBookingNotification(data);
    }

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Invalid booking data" },
      { status: 400 }
    );
  }
}
