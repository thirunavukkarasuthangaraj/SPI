import Link from "next/link";
import { CATEGORY_META, formatDate, getVideoPosts, youtubeEmbedUrl } from "@/lib/posts";
import { getLang } from "@/lib/i18n";

export default async function VideosPage() {
  const [posts, lang] = await Promise.all([getVideoPosts(), getLang()]);
  const en = lang === "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900">{en ? "Videos" : "வீடியோக்கள்"}</h1>
      <p className="mt-1 text-neutral-600">
        {en ? "Seminars, speeches and field videos from the movement." : "இயக்கத்தின் கருத்தரங்குகள், உரைகள் மற்றும் களப்பணி வீடியோக்கள்."}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => {
          const embedUrl = post.videoUrl ? youtubeEmbedUrl(post.videoUrl) : null;
          const meta = CATEGORY_META[post.category];
          return (
            <div key={post.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
              {embedUrl && (
                <div className="aspect-video">
                  <iframe src={embedUrl} className="h-full w-full" allowFullScreen />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <span>{en ? meta.labelEn : meta.label}</span>
                  {post.eventDate && <span>· {formatDate(post.eventDate)}</span>}
                </div>
                <Link href={`/${meta.path}/${post.slug}`} className="mt-1 block font-semibold text-neutral-900 hover:text-brand">
                  {post.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="mt-6 text-neutral-500">{en ? "No videos yet." : "இதுவரை வீடியோக்கள் இல்லை."}</p>
      )}
    </div>
  );
}
