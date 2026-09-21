import Link from "next/link";
import { CATEGORY_META, formatDate, getAllPostsForAdmin } from "@/lib/posts";
import { deletePostAction } from "@/app/actions";

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">அனைத்து பதிவுகள் ({posts.length})</h1>

      <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-2">தலைப்பு</th>
              <th className="px-4 py-2">வகை</th>
              <th className="px-4 py-2">தேதி</th>
              <th className="px-4 py-2">நிலை</th>
              <th className="px-4 py-2 text-right">செயல்கள்</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-neutral-100">
                <td className="px-4 py-2 font-medium text-neutral-800">{post.title}</td>
                <td className="px-4 py-2 text-neutral-600">{CATEGORY_META[post.category].label}</td>
                <td className="px-4 py-2 text-neutral-500">
                  {post.eventDate ? formatDate(post.eventDate) : "-"}
                </td>
                <td className="px-4 py-2">
                  {post.published ? (
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      வெளியிடப்பட்டது
                    </span>
                  ) : (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                      வரைவு
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-medium text-brand hover:underline"
                    >
                      திருத்து
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="font-medium text-red-600 hover:underline">
                        நீக்கு
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="px-4 py-6 text-center text-neutral-500">இதுவரை பதிவுகள் இல்லை.</p>
        )}
      </div>
    </div>
  );
}
