import type { Metadata } from "next";
import { Geist, Noto_Sans_Tamil } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSessionAdminId } from "@/lib/auth";
import { getLang } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "சட்ட பஞ்சாயத்து இயக்கம் | Satta Panchayat Iyakkam",
  description:
    "சட்டத்தின் ஆட்சி நோக்கில் இயங்கும் சட்ட பஞ்சாயத்து இயக்கத்தின் செய்திகள், கட்டுரைகள் மற்றும் நாளாந்த செயல்பாடுகள்.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const adminId = await getSessionAdminId();
  const lang = await getLang();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
        <SiteHeader isAdmin={Boolean(adminId)} lang={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
