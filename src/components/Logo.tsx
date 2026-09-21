export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <rect x="6" y="24" width="6" height="10" rx="1.5" fill="#16a34a" />
      {/* Horn */}
      <polygon points="12,18 12,28 34,36 34,10" fill="#16a34a" />
      {/* Sound waves */}
      <path d="M38 16a10 10 0 0 1 0 16" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      <path d="M43 12a17 17 0 0 1 0 24" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
