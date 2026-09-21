export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Megaphone horn */}
      <path
        d="M6 20v6a2 2 0 0 0 2 2h1l1.6 8.2a1.5 1.5 0 0 0 1.47 1.2h2.06a1.5 1.5 0 0 0 1.46-1.86L14.2 28H15l19-9v-5L15 5H9a2 2 0 0 0-2 2v6a2 2 0 0 0-2 2v5Z"
        fill="#16a34a"
      />
      <path d="M34 15v13" stroke="#16a34a" strokeWidth="2.6" strokeLinecap="round" />
      {/* Sound waves */}
      <path d="M38 17.5a5 5 0 0 1 0 8" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M41.5 15a9.5 9.5 0 0 1 0 13" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
      {/* Stand/pole */}
      <rect x="7.2" y="28" width="1.6" height="15" rx="0.8" fill="#16a34a" />
    </svg>
  );
}
