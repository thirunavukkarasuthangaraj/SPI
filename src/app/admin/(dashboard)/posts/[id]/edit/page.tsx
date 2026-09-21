import { notFound } from "next/navigation";
import PostForm from "../../PostForm";
import { updatePostAction } from "@/app/actions";
import { getPostById } from "@/lib/posts";

export default async function EditPostPage(props: PageProps<"/admin/posts/[id]/edit">) {
  const { id } = await props.params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">பதிவை திருத்து</h1>
      <div className="mt-4 max-w-2xl">
        <PostForm action={updatePostAction} post={post} />
      </div>
    </div>
  );
}
