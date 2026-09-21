import type { Lang } from "@/lib/i18n";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const headOfficeLabel = lang === "en" ? "State Head Office" : "மாநில தலைமை அலுவலகம்";
  const helpline = lang === "en" ? "Helpline" : "உதவி மையம்";
  const office = lang === "en" ? "Office" : "அலுவலகம்";

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600">
        <p className="font-semibold text-neutral-800">
          {lang === "en" ? "Satta Panchayat Iyakkam — " : "சட்ட பஞ்சாயத்து இயக்கம் — "}
          {headOfficeLabel}
        </p>
        <p className="mt-1">
          H42/3, West Avenue, கமராஜ் நகர், திருவான்மியூர், சென்னை - 600041
        </p>
        <p className="mt-1">
          {helpline}: 7667 100 100 · {office}: 87545-80269 (10am - 5pm) ·
          sattapanchayat@gmail.com
        </p>
        <p className="mt-4 text-xs text-neutral-400">
          © {new Date().getFullYear()} Satta Panchayat Iyakkam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
