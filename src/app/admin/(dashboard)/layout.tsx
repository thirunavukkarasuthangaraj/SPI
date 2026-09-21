import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionAdminId } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminId = await getSessionAdminId();
  if (!adminId) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <nav className="flex gap-2 text-sm font-medium">
          <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-neutral-100">
            பதிவுகள்
          </Link>
          <Link href="/admin/donations" className="rounded-md px-3 py-2 hover:bg-neutral-100">
            நன்கொடைகள்
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-md bg-brand px-3 py-2 text-white hover:bg-brand-dark"
          >
            + புதிய பதிவு
          </Link>
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="text-sm font-medium text-neutral-500 hover:text-red-600">
            வெளியேறு
          </button>
        </form>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
