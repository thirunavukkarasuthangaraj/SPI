import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
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

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-brand-dark">{t("orgName", lang)}</span>
          <span className="text-xs text-neutral-500">{t("tagline", lang)}</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1 text-sm">
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
            {isAdmin ? t("admin", lang) : t("adminLogin", lang)}
          </Link>
          <LanguageToggle lang={lang} />
        </nav>
      </div>
    </header>
  );
}
