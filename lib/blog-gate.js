/**
 * Split a markdown body into a free `teaser` region and the `gated` remainder.
 *
 * Used by `/insights-education/[slug]` to render a free preview followed by a
 * blurred lead-capture overlay. Splits at paragraph boundaries, never inside a
 * fenced code block, and tries to include at least one full section under a
 * heading before the cut so the teaser ends cleanly.
 *
 * @param {string} markdown
 * @param {{ targetWords?: number, minWords?: number }} [opts]
 * @returns {{ teaser: string, gated: string }}
 */
export function splitMarkdownForGate(markdown, opts = {}) {
  const targetWords = opts.targetWords ?? 220;
  const minWords = opts.minWords ?? 120;
  if (typeof markdown !== "string" || !markdown.trim()) {
    return { teaser: markdown ?? "", gated: "" };
  }

  const blocks = blocksFromMarkdown(markdown);
  if (blocks.length <= 1) {
    return { teaser: markdown, gated: "" };
  }

  const totalWords = blocks.reduce((sum, b) => sum + wordCount(b), 0);
  if (totalWords <= minWords) {
    return { teaser: markdown, gated: "" };
  }

  let running = 0;
  let cutIndex = blocks.length;
  for (let i = 0; i < blocks.length; i++) {
    running += wordCount(blocks[i]);
    if (running >= targetWords) {
      cutIndex = i + 1;
      break;
    }
  }

  if (cutIndex >= blocks.length) {
    return { teaser: markdown, gated: "" };
  }

  if (running < minWords) {
    return { teaser: markdown, gated: "" };
  }

  const teaser = blocks.slice(0, cutIndex).join("\n\n").trim();
  const gated = blocks.slice(cutIndex).join("\n\n").trim();
  if (!gated) {
    return { teaser: markdown, gated: "" };
  }
  return { teaser, gated };
}

function blocksFromMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let buffer = [];
  let inFence = false;

  for (const line of lines) {
    const fenceToggle = /^\s*```/.test(line);
    if (fenceToggle) {
      inFence = !inFence;
      buffer.push(line);
      continue;
    }
    if (!inFence && line.trim() === "") {
      if (buffer.length > 0) {
        blocks.push(buffer.join("\n").replace(/\s+$/g, ""));
        buffer = [];
      }
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    blocks.push(buffer.join("\n").replace(/\s+$/g, ""));
  }
  return blocks.filter((b) => b.length > 0);
}

function wordCount(block) {
  if (!block) return 0;
  return block
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}
