"use client";

import { usePathname } from "next/navigation";
import { setLangAction } from "@/app/actions";
import type { Lang } from "@/lib/i18n";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  return (
    <form action={setLangAction} className="flex overflow-hidden rounded-md border border-neutral-300 text-xs font-semibold">
      <input type="hidden" name="path" value={pathname} />
      <button
        type="submit"
        name="lang"
        value="ta"
        className={`px-2 py-1.5 ${lang === "ta" ? "bg-brand text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"}`}
      >
        தமிழ்
      </button>
      <button
        type="submit"
        name="lang"
        value="en"
        className={`px-2 py-1.5 ${lang === "en" ? "bg-brand text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"}`}
      >
        EN
      </button>
    </form>
  );
}
