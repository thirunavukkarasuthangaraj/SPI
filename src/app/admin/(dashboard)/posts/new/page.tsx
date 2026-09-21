import PostForm from "../PostForm";
import { createPostAction } from "@/app/actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">புதிய பதிவு</h1>
      <div className="mt-4 max-w-2xl">
        <PostForm action={createPostAction} />
      </div>
    </div>
  );
}
