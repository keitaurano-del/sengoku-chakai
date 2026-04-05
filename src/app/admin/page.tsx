import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300",
  confirmed: "bg-green-500/20 text-green-300",
  cancelled: "bg-red-500/20 text-red-300",
};

const PLAN_LABELS: Record<string, string> = {
  ume: "梅 Ume",
  take: "竹 Take",
  matsu: "松 Matsu",
};

const TIME_LABELS: Record<string, string> = {
  morning: "10:00",
  afternoon: "14:00",
  evening: "16:00",
};

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#1a1a1a] text-[#f5f0e8] font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold tracking-wide">
              予約管理 <span className="text-[#c8a45c]">Admin</span>
            </h1>
            <span className="text-sm text-[#f5f0e8]/50">
              {bookings.length} 件
            </span>
          </div>

          {bookings.length === 0 ? (
            <p className="text-center text-[#f5f0e8]/50 py-20">
              予約はまだありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#f5f0e8]/10 text-left text-xs uppercase tracking-wider text-[#c8a45c]">
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Time</th>
                    <th className="pb-3 pr-4">Plan</th>
                    <th className="pb-3 pr-4">Guests</th>
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Country</th>
                    <th className="pb-3 pr-4">Paid</th>
                    <th className="pb-3">Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-[#f5f0e8]/5 hover:bg-[#f5f0e8]/5"
                    >
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[b.status] || "text-[#f5f0e8]/50"}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono">{b.date}</td>
                      <td className="py-3 pr-4">{TIME_LABELS[b.timeSlot] || b.timeSlot}</td>
                      <td className="py-3 pr-4">{PLAN_LABELS[b.plan] || b.plan}</td>
                      <td className="py-3 pr-4 text-center">{b.guests}</td>
                      <td className="py-3 pr-4">{b.name}</td>
                      <td className="py-3 pr-4 text-[#f5f0e8]/70">{b.email}</td>
                      <td className="py-3 pr-4">{b.country}</td>
                      <td className="py-3 pr-4">
                        {b.paid ? (
                          <span className="text-green-400">Yes</span>
                        ) : (
                          <span className="text-[#f5f0e8]/30">No</span>
                        )}
                      </td>
                      <td className="py-3 text-[#f5f0e8]/50 font-mono text-xs">
                        {b.createdAt.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
