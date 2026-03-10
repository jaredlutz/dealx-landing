"use client";

import { useTransition } from "react";
import { saveContentBlock } from "./actions";

export default function ContentBlockEditor({ page, blocks, allBlocks }) {
  return (
    <div className="mt-4 space-y-4">
      {blocks.map((b) => (
        <BlockRow
          key={b.blockKey}
          page={page}
          blockKey={b.blockKey}
          content={b.content ?? ""}
        />
      ))}
    </div>
  );
}

function BlockRow({ page, blockKey, content }) {
  const [isPending, startTransition] = useTransition();
  const label = blockKey
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const rows = blockKey === "fund_bullets" ? 6 : 3;

  return (
    <form
      action={(formData) => {
        const c = formData.get("content")?.toString() ?? "";
        startTransition(() => saveContentBlock(page, blockKey, c));
      }}
      className="flex flex-col gap-2"
    >
      <label className="text-sm font-medium text-stone-700">{label}</label>
      <textarea
        name="content"
        defaultValue={content}
        rows={rows}
        className="rounded border border-stone-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded bg-diversy-primary px-3 py-1 text-sm text-white hover:bg-diversy-primary-hover disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
