import { prisma } from "@/lib/prisma";
import type { PostCategory } from "@/generated/prisma/client";

export const CATEGORY_META: Record<
  PostCategory,
  { label: string; labelEn: string; path: string; description: string }
> = {
  NEWS: {
    label: "செய்திகள்",
    labelEn: "News",
    path: "news",
    description: "ஊடகங்களில் வெளியான சட்ட பஞ்சாயத்து இயக்கம் தொடர்பான செய்திகள்.",
  },
  BLOG: {
    label: "கருத்தாக்கம்",
    labelEn: "Blog",
    path: "blog",
    description: "இயக்கத்தின் கருத்துகள், கருத்தரங்குகள் மற்றும் விரிவான கட்டுரைகள்.",
  },
  ACTIVITY: {
    label: "நாளாந்த செயல்பாடு",
    labelEn: "Daily Activity",
    path: "activity",
    description: "இயக்கத்தின் நாளாந்த களப்பணிகள் மற்றும் நிகழ்வுகள்.",
  },
};

export async function getPublishedPosts(category: PostCategory) {
  return prisma.post.findMany({
    where: { category, published: true },
    orderBy: [{ eventDate: "desc" }, { createdAt: "desc" }],
  });
}

export async function getLatestPosts(limit = 6) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: [{ eventDate: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getPostBySlug(category: PostCategory, slug: string) {
  return prisma.post.findFirst({
    where: { category, slug, published: true },
  });
}

export async function getAllPostsForAdmin() {
  return prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
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
