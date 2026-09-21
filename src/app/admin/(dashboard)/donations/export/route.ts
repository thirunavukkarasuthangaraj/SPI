import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { getSessionAdminId } from "@/lib/auth";
import { formatDate } from "@/lib/posts";

export async function GET() {
  const adminId = await getSessionAdminId();
  if (!adminId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } });

  const rows = donations.map((d) => ({
    Name: d.name,
    Email: d.email,
    Phone: d.phone ?? "",
    "Amount (INR)": d.amount,
    Status: d.status,
    "Payment ID": d.razorpayPaymentId,
    Date: formatDate(d.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

  const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as ArrayBuffer;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="donations-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
