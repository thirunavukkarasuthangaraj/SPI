"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import type { Lang } from "@/lib/i18n";

export default function MobileNav({
  navLinks,
  isAdmin,
  adminLabel,
  lang,
}: {
  navLinks: { href: string; label: string }[];
  isAdmin: boolean;
  adminLabel: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[80vh] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-3 shadow-lg">
          <nav className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 font-medium text-neutral-700 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAdmin ? "/admin" : "/admin/login"}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-brand px-3 py-2.5 text-center font-medium text-white"
            >
              {adminLabel}
            </Link>
            <div className="mt-2">
              <LanguageToggle lang={lang} />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
