// Client-safe post metadata/helpers — no Prisma import here, so client
// components (e.g. HeroSlider) can use this without pulling the DB client
// into the browser bundle.
import type { PostCategory } from "@/generated/prisma/client";

export const CATEGORY_META: Record<
  PostCategory,
  { label: string; labelEn: string; path: string; description: string; color: string }
> = {
  NEWS: {
    label: "செய்திகள்",
    labelEn: "News",
    path: "news",
    description: "ஊடகங்களில் வெளியான சட்ட பஞ்சாயத்து இயக்கம் தொடர்பான செய்திகள்.",
    color: "blue",
  },
  POLITICS: {
    label: "அரசியல் செய்திகள்",
    labelEn: "Politics",
    path: "politics",
    description: "அரசியல் மற்றும் கொள்கை தொடர்பான செய்திகள், நிலைப்பாடுகள்.",
    color: "red",
  },
  BLOG: {
    label: "கருத்தாக்கம்",
    labelEn: "Blog",
    path: "blog",
    description: "இயக்கத்தின் கருத்துகள், கருத்தரங்குகள் மற்றும் விரிவான கட்டுரைகள்.",
    color: "purple",
  },
  ACTIVITY: {
    label: "நாளாந்த செயல்பாடு",
    labelEn: "Daily Activity",
    path: "activity",
    description: "இயக்கத்தின் நாளாந்த களப்பணிகள் மற்றும் நிகழ்வுகள்.",
    color: "amber",
  },
};

export const CATEGORY_COLOR_CLASSES: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-700",
  purple: "bg-purple-50 text-purple-700",
  amber: "bg-amber-50 text-amber-700",
};

export function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function slugify(title: string) {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return base || `post-${Date.now()}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ta-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
