import PostCard from "@/components/PostCard";
import { CATEGORY_META, getPublishedPosts } from "@/lib/posts";
import { getLang } from "@/lib/i18n";

export default async function PoliticsPage() {
  const [posts, lang] = await Promise.all([getPublishedPosts("POLITICS"), getLang()]);
  const meta = CATEGORY_META.POLITICS;
  const en = lang === "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900">{en ? meta.labelEn : meta.label}</h1>
      <p className="mt-1 text-neutral-600">
        {en ? "Political and policy news and statements." : meta.description}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="mt-6 text-neutral-500">{en ? "No political news yet." : "இதுவரை அரசியல் செய்திகள் இல்லை."}</p>
      )}
    </div>
  );
}
