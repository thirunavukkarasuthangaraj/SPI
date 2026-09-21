import Link from "next/link";
import { CATEGORY_COLOR_CLASSES, CATEGORY_META, formatDate } from "@/lib/posts";
import type { Lang } from "@/lib/i18n";
import type { Post } from "@/generated/prisma/client";

export default function PostCard({ post, lang = "ta" }: { post: Post; lang?: Lang }) {
  const meta = CATEGORY_META[post.category];
  return (
    <Link
      href={`/${meta.path}/${post.slug}`}
      className="block rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className={`rounded-full px-2 py-0.5 ${CATEGORY_COLOR_CLASSES[meta.color]}`}>
          {lang === "en" ? meta.labelEn : meta.label}
        </span>
        {post.videoUrl && <span className="text-neutral-400">▶ {lang === "en" ? "Video" : "வீடியோ"}</span>}
        {post.eventDate && <span className="text-neutral-400">{formatDate(post.eventDate)}</span>}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900">{post.title}</h3>
      {post.excerpt && (
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>
      )}
    </Link>
  );
}
