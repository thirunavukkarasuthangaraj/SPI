import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORY_META, formatDate, getPostBySlug } from "@/lib/posts";

export default async function BlogDetailPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug("BLOG", slug);
  if (!post) notFound();

  const meta = CATEGORY_META.BLOG;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/blog" className="text-sm font-medium text-brand hover:underline">
        ← {meta.label}
      </Link>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-brand">
        <span className="rounded-full bg-blue-50 px-2 py-0.5">{meta.label}</span>
        {post.eventDate && <span className="text-neutral-400">{formatDate(post.eventDate)}</span>}
      </div>
      <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">{post.title}</h1>
      <div className="prose prose-neutral mt-6 max-w-none whitespace-pre-wrap text-neutral-800">
        {post.content}
      </div>
    </article>
  );
}
