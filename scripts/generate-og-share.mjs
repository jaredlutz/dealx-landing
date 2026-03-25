/**
 * One-off / CI: rasterize logo onto 1200×630 for Open Graph & iMessage previews.
 * Run: bun run scripts/generate-og-share.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public/images/diversyfund-logo-white.svg");
const outPath = join(root, "public/images/og-diversyfund-share.png");

const svg = await readFile(svgPath);
const logo = await sharp(svg).resize({ width: 720, fit: "inside" }).png().toBuffer();

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: { r: 10, g: 11, b: 13, alpha: 1 },
  },
})
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile(outPath);

console.log("Wrote", outPath);
