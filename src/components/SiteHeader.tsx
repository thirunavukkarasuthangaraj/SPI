import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
import MobileNav from "@/components/MobileNav";
import { t, type Lang } from "@/lib/i18n";

export default function SiteHeader({ isAdmin, lang }: { isAdmin: boolean; lang: Lang }) {
  const navLinks: { href: string; label: string }[] = [
    { href: "/", label: t("home", lang) },
    { href: "/news", label: t("news", lang) },
    { href: "/politics", label: t("politics", lang) },
    { href: "/blog", label: t("blog", lang) },
    { href: "/activity", label: t("activity", lang) },
    { href: "/videos", label: t("videos", lang) },
    { href: "/donate", label: t("donate", lang) },
  ];
  const adminLabel = isAdmin ? t("admin", lang) : t("adminLogin", lang);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link href="/" className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-base font-bold text-brand-dark sm:text-lg">{t("orgName", lang)}</span>
          <span className="truncate text-xs text-neutral-500">{t("tagline", lang)}</span>
        </Link>

        {/* Desktop nav — only shown once there's enough width for Tamil labels to fit on one line */}
        <nav className="hidden flex-nowrap items-center gap-1 whitespace-nowrap text-sm xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100 hover:text-brand-dark"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={isAdmin ? "/admin" : "/admin/login"}
            className="ml-1 rounded-md bg-brand px-3 py-2 font-medium text-white hover:bg-brand-dark"
          >
            {adminLabel}
          </Link>
          <LanguageToggle lang={lang} />
        </nav>

        {/* Mobile nav */}
        <MobileNav navLinks={navLinks} isAdmin={isAdmin} adminLabel={adminLabel} lang={lang} />
      </div>
    </header>
  );
}
