import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getLatestPosts } from "@/lib/posts";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const [posts, lang] = await Promise.all([getLatestPosts(9), getLang()]);
  const en = lang === "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-xl bg-gradient-to-br from-brand-dark to-brand px-6 py-10 text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {en ? "Satta Panchayat Iyakkam" : "சட்ட பஞ்சாயத்து இயக்கம்"}
        </h1>
        <p className="mt-2 max-w-2xl text-blue-100">
          {en
            ? "A movement working towards the rule of law and upholding people's rights. Follow our news, ideology and daily activities here."
            : "சட்டத்தின் ஆட்சி நோக்கில், மக்களின் உரிமைகளை நிலைநாட்ட செயல்படும் இயக்கம். எங்கள் செய்திகள், கருத்தாக்கம் மற்றும் நாளாந்த செயல்பாடுகளை இங்கே பின்தொடரவும்."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/news" className="rounded-md bg-white/15 px-4 py-2 hover:bg-white/25">
            {en ? "News →" : "செய்திகள் →"}
          </Link>
          <Link href="/blog" className="rounded-md bg-white/15 px-4 py-2 hover:bg-white/25">
            {en ? "Blog →" : "கருத்தாக்கம் →"}
          </Link>
          <Link href="/activity" className="rounded-md bg-white/15 px-4 py-2 hover:bg-white/25">
            {en ? "Daily Activity →" : "நாளாந்த செயல்பாடு →"}
          </Link>
          <Link href="/donate" className="rounded-md bg-white text-brand-dark px-4 py-2 font-semibold hover:bg-blue-50">
            {en ? "Donate →" : "நன்கொடை →"}
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-neutral-900">
          {en ? "Latest Posts" : "சமீபத்திய பதிவுகள்"}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-neutral-500">
            {en ? "No posts yet." : "இதுவரை பதிவுகள் இல்லை."}
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
