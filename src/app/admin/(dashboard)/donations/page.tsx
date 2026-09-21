import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/posts";

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } });
  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-neutral-900">
          நன்கொடைகள் ({donations.length}) — மொத்தம் ₹{total.toLocaleString("en-IN")}
        </h1>
        <a
          href="/admin/donations/export"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          ⬇ Excel Sheet பதிவிறக்கு
        </a>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-2">பெயர்</th>
              <th className="px-4 py-2">மின்னஞ்சல்</th>
              <th className="px-4 py-2">தொலைபேசி</th>
              <th className="px-4 py-2">தொகை</th>
              <th className="px-4 py-2">தேதி</th>
              <th className="px-4 py-2">Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t border-neutral-100">
                <td className="px-4 py-2 font-medium text-neutral-800">{d.name}</td>
                <td className="px-4 py-2 text-neutral-600">{d.email}</td>
                <td className="px-4 py-2 text-neutral-600">{d.phone ?? "-"}</td>
                <td className="px-4 py-2 font-medium text-green-700">₹{d.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-2 text-neutral-500">{formatDate(d.createdAt)}</td>
                <td className="px-4 py-2 text-neutral-400">{d.razorpayPaymentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <p className="px-4 py-6 text-center text-neutral-500">இதுவரை நன்கொடைகள் இல்லை.</p>
        )}
      </div>
    </div>
  );
}
