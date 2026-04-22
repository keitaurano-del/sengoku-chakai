import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = () => process.env.FROM_EMAIL || "onboarding@resend.dev";
const OPERATOR_EMAIL = () => process.env.OPERATOR_EMAIL || "info@en-chakai.com";

export async function sendBookingNotification(data: {
  plan: string;
  date: string;
  timeSlot: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
  country: string;
  requests?: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL(),
    to: OPERATOR_EMAIL(),
    subject: `New Booking: ${data.name} — ${data.plan} on ${data.date}`,
    html: `
      <h2>New Booking Request</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Plan</td><td style="padding:4px 12px;">${data.plan}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Date</td><td style="padding:4px 12px;">${data.date}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Time</td><td style="padding:4px 12px;">${data.timeSlot}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Guests</td><td style="padding:4px 12px;">${data.guests}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${data.name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${data.email}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${data.phone || "—"}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Country</td><td style="padding:4px 12px;">${data.country}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Requests</td><td style="padding:4px 12px;">${data.requests || "—"}</td></tr>
      </table>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL(),
    to: data.email,
    subject: "Reservation Received — En Chakai",
    html: `
      <div style="font-family:serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <h1 style="color:#2d4a2d;border-bottom:2px solid #c8a45c;padding-bottom:12px;">円茶会</h1>
        <p>Dear ${data.name},</p>
        <p>Thank you for your reservation request. We have received the following details:</p>
        <ul>
          <li><strong>Plan:</strong> ${data.plan}</li>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.timeSlot}</li>
          <li><strong>Guests:</strong> ${data.guests}</li>
        </ul>
        <p>We will confirm your reservation within 24 hours. If you have any questions, please reply to this email.</p>
        <p style="color:#c8a45c;font-style:italic;">一期一会 — Treasure every encounter, for it will never recur.</p>
        <hr style="border:none;border-top:1px solid #e8e0d0;margin:24px 0;" />
        <p style="font-size:12px;color:#888;">En Chakai | Bunkyo-ku, Tokyo</p>
      </div>
    `,
  });
}

export async function sendCancellationNotification(data: {
  email: string;
  name: string;
  bookingDate: string;
  reason?: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL(),
    to: OPERATOR_EMAIL(),
    subject: `Cancellation Request: ${data.name} — ${data.bookingDate}`,
    html: `
      <h2>Cancellation Request</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${data.name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${data.email}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Booking Date</td><td style="padding:4px 12px;">${data.bookingDate}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Reason</td><td style="padding:4px 12px;">${data.reason || "—"}</td></tr>
      </table>
    `,
  });
}
