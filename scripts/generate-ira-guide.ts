/**
 * Generate the public IRA Investing Guide PDF at
 * `public/documents/diversyfund-ira-investing-guide.pdf`.
 *
 * Builds a minimal, standards-compliant PDF (PDF 1.4) without external
 * dependencies — useful so the home-page IRA lead-magnet has a real,
 * downloadable placeholder until DiversyFund supplies a designed PDF.
 *
 * Run:   bun run scripts/generate-ira-guide.ts
 */

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const TARGET = join(process.cwd(), "public/documents/diversyfund-ira-investing-guide.pdf");

// ---------- PDF builder ----------

interface PdfPart {
  id: number;
  data: Buffer;
}

class PdfBuilder {
  private parts: PdfPart[] = [];
  private nextId = 1;

  newId(): number {
    return this.nextId++;
  }

  addObject(id: number, body: string): void {
    const data = Buffer.from(`${id} 0 obj\n${body}\nendobj\n`, "binary");
    this.parts.push({ id, data });
  }

  build(rootId: number): Buffer {
    const header = Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "binary");
    const chunks: Buffer[] = [header];
    const offsets = new Map<number, number>();
    let offset = header.length;

    this.parts.sort((a, b) => a.id - b.id);
    for (const p of this.parts) {
      offsets.set(p.id, offset);
      chunks.push(p.data);
      offset += p.data.length;
    }

    const xrefStart = offset;
    let xref = `xref\n0 ${this.nextId}\n0000000000 65535 f \n`;
    for (let i = 1; i < this.nextId; i++) {
      const off = offsets.get(i) ?? 0;
      xref += `${String(off).padStart(10, "0")} 00000 n \n`;
    }
    chunks.push(Buffer.from(xref, "binary"));

    const trailer = Buffer.from(
      `trailer\n<< /Size ${this.nextId} /Root ${rootId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`,
      "binary"
    );
    chunks.push(trailer);

    return Buffer.concat(chunks);
  }
}

function escapePdfString(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r?\n/g, " ");
}

/**
 * Convert smart quotes/em dashes to ASCII so WinAnsiEncoding renders cleanly.
 */
function asciifyCopy(s: string): string {
  return s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2013/g, "-")
    .replace(/\u2014/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u2022/g, "-");
}

/** Word-wrap to ~maxChars chars per line, preserving forced line breaks. */
function wrapText(text: string, maxChars: number): string[] {
  const paragraphs = text.split(/\n/);
  const lines: string[] = [];
  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    let current = "";
    for (const w of words) {
      if (!current) {
        current = w;
      } else if (current.length + 1 + w.length <= maxChars) {
        current = `${current} ${w}`;
      } else {
        lines.push(current);
        current = w;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

// ---------- Content / layout ----------

type Block =
  | { kind: "title"; text: string }
  | { kind: "subtitle"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "para"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "spacer"; px: number }
  | { kind: "rule" }
  | { kind: "callout"; text: string };

const CONTENT: Block[] = [
  { kind: "title", text: "Investing with an IRA" },
  { kind: "subtitle", text: "How private real-estate income fits inside a self-directed IRA" },
  { kind: "rule" },
  { kind: "spacer", px: 6 },
  {
    kind: "para",
    text:
      "An Individual Retirement Account can hold a private-market investment. The mechanics, however, are not the same as a personal allocation. The most common confusion has nothing to do with returns - it is about who actually owns the subscription.",
  },

  { kind: "heading", text: "The custodian is the account holder" },
  {
    kind: "para",
    text:
      "Inside an IRA, the custodian is the legal account holder. The investor directs the allocation; the custodian signs, transmits funds, and receives distributions on the account's behalf. Subscription documents are completed in the name of the IRA, not the individual.",
  },
  { kind: "para", text: "This sounds bureaucratic. It is. It is also non-negotiable." },

  { kind: "heading", text: "Most IRAs need to be self-directed" },
  {
    kind: "para",
    text:
      "Many traditional IRAs only hold publicly traded securities. To hold a private investment, the IRA usually has to be a self-directed IRA (SDIRA) held with a custodian that supports private placements. Not every custodian does. Choosing - or moving to - the right custodian is part of the setup, not a footnote.",
  },
  { kind: "para", text: "The choice of custodian affects:" },
  { kind: "bullet", text: "Whether the firm can issue subscription documents in the IRA's name at all" },
  { kind: "bullet", text: "How long funding takes" },
  { kind: "bullet", text: "How distributions and reporting are handled" },

  { kind: "heading", text: "How capital actually reaches the offering" },
  { kind: "para", text: "A typical funding path:" },
  { kind: "bullet", text: "Open or confirm a self-directed IRA at a qualifying custodian." },
  {
    kind: "bullet",
    text:
      "Fund the SDIRA - most often by transfer from another IRA or rollover from a 401(k). Direct contributions are allowed within annual limits but rarely meet the minimums of a private placement on their own.",
  },
  {
    kind: "bullet",
    text:
      "Direct the custodian to allocate to the offering. The custodian wires funds from the IRA to the issuer.",
  },
  {
    kind: "bullet",
    text:
      "Subscription documents are signed by the custodian, on behalf of the IRA, with the investor's direction.",
  },
  {
    kind: "para",
    text:
      "After the subscription closes, distributions and reporting flow through the custodian. The investor sees them inside the SDIRA, not in a personal bank account.",
  },

  { kind: "heading", text: "What the firm does and does not do" },
  { kind: "bullet", text: "Issues subscription documents in the name of the IRA, never the individual." },
  { kind: "bullet", text: "Communicates with the custodian for funding, distributions, and reporting." },
  { kind: "bullet", text: "Does not act as custodian, plan administrator, or tax advisor." },
  { kind: "bullet", text: "Does not provide tax or estate-planning advice. A qualified advisor handles that conversation." },

  { kind: "heading", text: "Eligibility - the accredited-investor standard" },
  {
    kind: "para",
    text:
      "Most private real-estate offerings require accredited investor status. Under SEC Regulation D, an accredited investor is generally defined as having:",
  },
  { kind: "bullet", text: "Annual income above $200,000 (individual) or $300,000 (joint) for the last two years, with the same expected this year, or" },
  { kind: "bullet", text: "Net worth above $1,000,000, excluding the value of a primary residence, or" },
  { kind: "bullet", text: "Other categories as defined by SEC Regulation D." },

  { kind: "heading", text: "Considerations before allocating" },
  {
    kind: "para",
    text:
      "These are not reasons not to allocate. They are the parameters that frame the conversation with a qualified advisor and the custodian.",
  },
  { kind: "bullet", text: "Custodian fees: setup fees, transaction fees, annual fees based on asset value or complexity." },
  { kind: "bullet", text: "Liquidity constraints: real estate is illiquid; allocations are multi-year commitments." },
  { kind: "bullet", text: "Due diligence: evaluate property quality, market conditions, sponsor track record, operator execution." },
  {
    kind: "bullet",
    text:
      "IRS regulations: prohibited transactions can disqualify the IRA. The custodian helps administer, but compliance is the owner's responsibility.",
  },

  { kind: "heading", text: "Before the eligibility review" },
  { kind: "para", text: "If you are considering an IRA allocation, three things make the conversation faster:" },
  { kind: "bullet", text: "Confirm whether the current custodian holds private placements. If not, identify an SDIRA custodian." },
  { kind: "bullet", text: "Confirm accreditation status (Regulation D, Rule 506(c))." },
  { kind: "bullet", text: "Decide the funding path - transfer, rollover, or contribution." },

  { kind: "rule" },
  {
    kind: "callout",
    text:
      "This guide is educational only. It is not investment, tax, or legal advice and does not constitute an offer to sell or a solicitation to buy securities. Offerings are described in their official offering documents and are available only where lawfully offered. Always consult qualified financial and tax professionals before allocating.",
  },
];

// Page geometry
const PAGE_W = 612;
const PAGE_H = 792;
const ML = 72;
const MR = 72;
const MT = 72;
const MB = 72;
const TOP_Y = PAGE_H - MT;
const BOTTOM_Y = MB;
const CONTENT_W = PAGE_W - ML - MR; // 468

// Font / leading tuning (Helvetica metrics)
const TITLE_SIZE = 22;
const SUBTITLE_SIZE = 12;
const HEADING_SIZE = 13;
const PARA_SIZE = 10.5;
const BULLET_SIZE = 10.5;
const CALLOUT_SIZE = 9;

// Conservative character-per-line cutoffs (Helvetica ~ 0.5em avg)
const CHARS_PARA = 85;
const CHARS_HEADING = 70;
const CHARS_CALLOUT = 95;
const CHARS_BULLET = 80;

function leadingFor(size: number): number {
  return Math.round(size * 1.45);
}

interface DrawInstruction {
  stream: string;
  height: number; // pt consumed
}

function drawTextLines(opts: {
  lines: string[];
  size: number;
  font: "F1" | "F2";
  x: number;
  startY: number;
  leading?: number;
  gray?: number;
}): DrawInstruction {
  const lead = opts.leading ?? leadingFor(opts.size);
  const gray = opts.gray ?? 0.12;
  const parts: string[] = [];
  parts.push("BT");
  parts.push(`${gray.toFixed(2)} ${gray.toFixed(2)} ${gray.toFixed(2)} rg`);
  parts.push(`/${opts.font} ${opts.size} Tf`);
  parts.push(`${opts.x} ${opts.startY} Td`);
  parts.push(`${lead} TL`);
  opts.lines.forEach((line, i) => {
    if (i === 0) parts.push(`(${escapePdfString(line)}) Tj`);
    else parts.push(`T* (${escapePdfString(line)}) Tj`);
  });
  parts.push("ET");
  return { stream: parts.join("\n") + "\n", height: lead * opts.lines.length };
}

function drawRule(y: number): DrawInstruction {
  const stream = [
    "q",
    "0.7 0.7 0.7 RG",
    "0.5 w",
    `${ML} ${y} m`,
    `${PAGE_W - MR} ${y} l`,
    "S",
    "Q",
  ].join("\n") + "\n";
  return { stream, height: 8 };
}

interface PageState {
  streams: string[];
  y: number;
}

function newPage(initialY = TOP_Y): PageState {
  return { streams: [], y: initialY };
}

function paginate(): string[] {
  const pages: PageState[] = [];
  let page = newPage();
  pages.push(page);

  function ensureSpace(needed: number) {
    if (page.y - needed < BOTTOM_Y) {
      page = newPage();
      pages.push(page);
    }
  }

  for (const block of CONTENT) {
    switch (block.kind) {
      case "title": {
        // Title gets large leading and only renders on the first page
        const lines = wrapText(asciifyCopy(block.text), 40);
        const lead = leadingFor(TITLE_SIZE);
        ensureSpace(lead * lines.length);
        const draw = drawTextLines({
          lines,
          size: TITLE_SIZE,
          font: "F2",
          x: ML,
          startY: page.y,
          leading: lead,
          gray: 0.08,
        });
        page.streams.push(draw.stream);
        page.y -= draw.height + 4;
        break;
      }
      case "subtitle": {
        const lines = wrapText(asciifyCopy(block.text), 70);
        const lead = leadingFor(SUBTITLE_SIZE);
        ensureSpace(lead * lines.length + 12);
        const draw = drawTextLines({
          lines,
          size: SUBTITLE_SIZE,
          font: "F1",
          x: ML,
          startY: page.y,
          leading: lead,
          gray: 0.35,
        });
        page.streams.push(draw.stream);
        page.y -= draw.height + 12;
        break;
      }
      case "heading": {
        const lines = wrapText(asciifyCopy(block.text), CHARS_HEADING);
        const lead = leadingFor(HEADING_SIZE);
        // space above
        page.y -= 14;
        ensureSpace(lead * lines.length + 4);
        const draw = drawTextLines({
          lines,
          size: HEADING_SIZE,
          font: "F2",
          x: ML,
          startY: page.y,
          leading: lead,
          gray: 0.08,
        });
        page.streams.push(draw.stream);
        page.y -= draw.height + 4;
        break;
      }
      case "para": {
        const lines = wrapText(asciifyCopy(block.text), CHARS_PARA);
        const lead = leadingFor(PARA_SIZE);
        ensureSpace(lead * lines.length + 6);
        const draw = drawTextLines({
          lines,
          size: PARA_SIZE,
          font: "F1",
          x: ML,
          startY: page.y,
          leading: lead,
          gray: 0.2,
        });
        page.streams.push(draw.stream);
        page.y -= draw.height + 4;
        break;
      }
      case "bullet": {
        const indent = 18;
        const lines = wrapText(asciifyCopy(block.text), CHARS_BULLET);
        const lead = leadingFor(BULLET_SIZE);
        ensureSpace(lead * lines.length + 4);
        // dot
        const dot = drawTextLines({
          lines: ["-"],
          size: BULLET_SIZE,
          font: "F2",
          x: ML + 2,
          startY: page.y,
          leading: lead,
          gray: 0.4,
        });
        page.streams.push(dot.stream);
        const text = drawTextLines({
          lines,
          size: BULLET_SIZE,
          font: "F1",
          x: ML + indent,
          startY: page.y,
          leading: lead,
          gray: 0.2,
        });
        page.streams.push(text.stream);
        page.y -= text.height + 2;
        break;
      }
      case "spacer": {
        page.y -= block.px;
        break;
      }
      case "rule": {
        page.y -= 6;
        ensureSpace(8);
        const draw = drawRule(page.y);
        page.streams.push(draw.stream);
        page.y -= draw.height;
        break;
      }
      case "callout": {
        const lines = wrapText(asciifyCopy(block.text), CHARS_CALLOUT);
        const lead = leadingFor(CALLOUT_SIZE);
        page.y -= 8;
        ensureSpace(lead * lines.length + 8);
        const draw = drawTextLines({
          lines,
          size: CALLOUT_SIZE,
          font: "F1",
          x: ML,
          startY: page.y,
          leading: lead,
          gray: 0.45,
        });
        page.streams.push(draw.stream);
        page.y -= draw.height + 6;
        break;
      }
    }
  }

  // Footer (page numbers, brand line)
  return pages.map((p, i) => {
    const footer = drawTextLines({
      lines: [`DiversyFund - Investing with an IRA - Page ${i + 1} of ${pages.length}`],
      size: 8,
      font: "F1",
      x: ML,
      startY: 40,
      leading: 12,
      gray: 0.55,
    });
    return p.streams.join("") + footer.stream;
  });
}

// ---------- Assemble ----------

const pdf = new PdfBuilder();
const catalogId = pdf.newId();
const pagesId = pdf.newId();
const fontRegularId = pdf.newId();
const fontBoldId = pdf.newId();

const pageStreams = paginate();
const pageIds: number[] = [];

for (const stream of pageStreams) {
  const contentId = pdf.newId();
  const buf = Buffer.from(stream, "binary");
  pdf.addObject(
    contentId,
    `<< /Length ${buf.length} >>\nstream\n${stream}\nendstream`
  );
  const pageId = pdf.newId();
  pdf.addObject(
    pageId,
    `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Contents ${contentId} 0 R ` +
      `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> >>`
  );
  pageIds.push(pageId);
}

pdf.addObject(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
pdf.addObject(
  pagesId,
  `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`
);
pdf.addObject(
  fontRegularId,
  `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`
);
pdf.addObject(
  fontBoldId,
  `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`
);

const buffer = pdf.build(catalogId);

mkdirSync(dirname(TARGET), { recursive: true });
writeFileSync(TARGET, buffer);

console.log(`Wrote ${buffer.length} bytes to ${TARGET} (${pageStreams.length} pages)`);
