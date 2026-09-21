import Link from "next/link";
import PostCard from "@/components/PostCard";
import HeroSlider from "@/components/HeroSlider";
import { CATEGORY_META, getFeaturedPosts, getPublishedPosts, getVideoPosts, youtubeEmbedUrl } from "@/lib/posts";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const [featured, news, politics, videos, lang] = await Promise.all([
    getFeaturedPosts(5),
    getPublishedPosts("NEWS"),
    getPublishedPosts("POLITICS"),
    getVideoPosts(3),
    getLang(),
  ]);
  const en = lang === "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <HeroSlider posts={featured} lang={lang} />

      <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/news" className="rounded-md border border-neutral-300 px-4 py-2 hover:border-brand hover:text-brand">
          {en ? "News" : "செய்திகள்"} →
        </Link>
        <Link href="/politics" className="rounded-md border border-neutral-300 px-4 py-2 hover:border-brand hover:text-brand">
          {en ? "Politics" : "அரசியல்"} →
        </Link>
        <Link href="/blog" className="rounded-md border border-neutral-300 px-4 py-2 hover:border-brand hover:text-brand">
          {en ? "Blog" : "கருத்தாக்கம்"} →
        </Link>
        <Link href="/activity" className="rounded-md border border-neutral-300 px-4 py-2 hover:border-brand hover:text-brand">
          {en ? "Daily Activity" : "நாளாந்த செயல்பாடு"} →
        </Link>
        <Link href="/donate" className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-dark">
          {en ? "Donate" : "நன்கொடை"} →
        </Link>
      </div>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-neutral-900">{en ? CATEGORY_META.NEWS.labelEn : CATEGORY_META.NEWS.label}</h2>
          <Link href="/news" className="text-sm font-medium text-brand hover:underline">
            {en ? "View all" : "அனைத்தும்"} →
          </Link>
        </div>
        {news.length === 0 ? (
          <p className="mt-4 text-neutral-500">{en ? "No posts yet." : "இதுவரை பதிவுகள் இல்லை."}</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
        )}
      </section>

      {politics.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-neutral-900">{en ? CATEGORY_META.POLITICS.labelEn : CATEGORY_META.POLITICS.label}</h2>
            <Link href="/politics" className="text-sm font-medium text-brand hover:underline">
              {en ? "View all" : "அனைத்தும்"} →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {politics.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-neutral-900">{en ? "Videos" : "வீடியோக்கள்"}</h2>
            <Link href="/videos" className="text-sm font-medium text-brand hover:underline">
              {en ? "View all" : "அனைத்தும்"} →
            </Link>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {videos.map((post) => {
              const meta = CATEGORY_META[post.category];
              const embedUrl = post.videoUrl ? youtubeEmbedUrl(post.videoUrl) : null;
              return (
                <div key={post.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
                  {embedUrl && (
                    <div className="aspect-video">
                      <iframe src={embedUrl} className="h-full w-full" allowFullScreen />
                    </div>
                  )}
                  <Link href={`/${meta.path}/${post.slug}`} className="block p-3 text-sm font-semibold text-neutral-900 hover:text-brand">
                    {post.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
