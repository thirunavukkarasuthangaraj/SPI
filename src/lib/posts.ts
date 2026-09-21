import { prisma } from "@/lib/prisma";
import type { PostCategory } from "@/generated/prisma/client";

export { CATEGORY_META, CATEGORY_COLOR_CLASSES, youtubeEmbedUrl, slugify, formatDate } from "@/lib/postMeta";

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

export async function getFeaturedPosts(limit = 5) {
  const featured = await prisma.post.findMany({
    where: { published: true, featured: true },
    orderBy: [{ eventDate: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  if (featured.length > 0) return featured;
  // Fall back to latest posts so the slider is never empty.
  return getLatestPosts(limit);
}

export async function getVideoPosts(limit = 12) {
  return prisma.post.findMany({
    where: { published: true, videoUrl: { not: null } },
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
