"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORY_META } from "@/lib/postMeta";
import type { Lang } from "@/lib/i18n";
import type { Post } from "@/generated/prisma/client";

const SLIDE_MS = 6000;

const GRADIENTS = [
  "from-blue-900 via-blue-800 to-blue-700",
  "from-red-900 via-red-800 to-red-700",
  "from-emerald-900 via-emerald-800 to-emerald-700",
  "from-purple-900 via-purple-800 to-purple-700",
  "from-amber-900 via-amber-800 to-amber-700",
];

export default function HeroSlider({ posts, lang }: { posts: Post[]; lang: Lang }) {
  const [index, setIndex] = useState(0);
  const en = lang === "en";

  useEffect(() => {
    if (posts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl">
      {posts.map((post, i) => {
        const meta = CATEGORY_META[post.category];
        return (
          <Link
            key={post.id}
            href={`/${meta.path}/${post.slug}`}
            className={`block bg-gradient-to-br px-6 py-12 text-white transition-opacity duration-700 sm:px-10 sm:py-16 ${
              GRADIENTS[i % GRADIENTS.length]
            } ${i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
          >
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              {en ? meta.labelEn : meta.label}
            </span>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-snug sm:text-4xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{post.excerpt}</p>
            )}
            <span className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">
              {en ? "Read more →" : "மேலும் படிக்க →"}
            </span>
          </Link>
        );
      })}

      {posts.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {posts.map((post, i) => (
            <button
              key={post.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
