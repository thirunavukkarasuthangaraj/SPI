"use client";

import { useActionState } from "react";
import VoiceDictationButton from "@/components/VoiceDictationButton";
import type { Post } from "@/generated/prisma/client";
import type { ActionState } from "@/app/actions";

const CATEGORIES = [
  { value: "NEWS", label: "செய்திகள்" },
  { value: "POLITICS", label: "அரசியல் செய்திகள்" },
  { value: "BLOG", label: "கருத்தாக்கம்" },
  { value: "ACTIVITY", label: "நாளாந்த செயல்பாடு" },
] as const;

export default function PostForm({
  action,
  post,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  post?: Post;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  const eventDateValue = post?.eventDate
    ? new Date(post.eventDate).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="space-y-5">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label className="block text-sm font-medium text-neutral-700">தலைப்பு</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={post?.title}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">வகை</label>
          <select
            name="category"
            defaultValue={post?.category ?? "NEWS"}
            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">தேதி</label>
          <input
            type="date"
            name="eventDate"
            defaultValue={eventDateValue}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {!post && (
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Slug <span className="text-neutral-400">(விருப்பம் — காலியாக விட்டால் தலைப்பிலிருந்து உருவாகும்)</span>
          </label>
          <input
            type="text"
            name="slug"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700">சுருக்கம்</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="content" className="block text-sm font-medium text-neutral-700">
            உள்ளடக்கம்
          </label>
          <VoiceDictationButton targetId="content" />
        </div>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={post?.content}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
        <p className="mt-1 text-xs text-neutral-400">
          குரல் மூலம் உள்ளிட, மேலே உள்ள பொத்தானை சொடுக்கி பேசவும் (Chrome browser இல் சிறப்பாக இயங்கும்).
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          YouTube வீடியோ URL <span className="text-neutral-400">(விருப்பம்)</span>
        </label>
        <input
          type="url"
          name="videoUrl"
          defaultValue={post?.videoUrl ?? ""}
          placeholder="https://youtu.be/..."
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-neutral-300"
          />
          உடனடியாக வெளியிடவும்
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured ?? false}
            className="h-4 w-4 rounded border-neutral-300"
          />
          முகப்பு பேனர் ஸ்லைடரில் காட்டு (Featured)
        </label>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "சேமிக்கிறது…" : "சேமி"}
      </button>
    </form>
  );
}
