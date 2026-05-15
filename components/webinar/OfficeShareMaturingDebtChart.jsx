"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: "2023", officeAmount: 63, officeShare: 9.0 },
  { year: "2024", officeAmount: 87, officeShare: 9.5 },
  { year: "2025", officeAmount: 77, officeShare: 7.6 },
  { year: "2026", officeAmount: 91, officeShare: 7.6 },
  { year: "2027", officeAmount: 84, officeShare: 7.2 },
  { year: "2028", officeAmount: 82, officeShare: 7.4 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 58, bottom: 60, left: 72 };
const AMOUNT_MIN = 0;
const AMOUNT_MAX = 110;
const AMOUNT_TICKS = [0, 20, 40, 60, 80, 100];

function amountY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - AMOUNT_MIN) / (AMOUNT_MAX - AMOUNT_MIN);
  return MARGIN.top + innerH - r * innerH;
}

function shareY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const min = 0;
  const max = 12;
  const r = (v - min) / (max - min);
  return MARGIN.top + innerH - r * innerH;
}

export default function OfficeShareMaturingDebtChart() {
  const [activeIdx, setActiveIdx] = useState(1);
  const active = DATA[activeIdx] ?? DATA[1];

  const { step, barW, points, linePath } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const bw = stepValue * 0.58;
    const pts = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue + stepValue / 2, y: shareY(d.officeShare) }));
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    return { step: stepValue, barW: bw, points: pts, linePath: path };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Office Share of Maturing CRE Debt</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">
            Amount: ${active.officeAmount}B
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
            Share: {active.officeShare.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Office share of maturing debt chart">
        {AMOUNT_TICKS.map((tick) => {
          const y = amountY(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={MARGIN.left}
          y1={HEIGHT - MARGIN.bottom}
          x2={WIDTH - MARGIN.right}
          y2={HEIGHT - MARGIN.bottom}
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />
        <line x1={WIDTH - MARGIN.right} y1={MARGIN.top} x2={WIDTH - MARGIN.right} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />

        {DATA.map((d, i) => {
          const x = MARGIN.left + i * step + (step - barW) / 2;
          const y = amountY(d.officeAmount);
          return (
            <g key={d.year}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={HEIGHT - MARGIN.bottom - y}
                fill="#0369A1"
                rx="4"
                opacity={activeIdx === i ? 1 : 0.82}
                onMouseEnter={() => setActiveIdx(i)}
              />
              <rect
                x={MARGIN.left + i * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="#475569">
                {d.year}
              </text>
            </g>
          );
        })}

        <path d={linePath} fill="none" stroke="#D97706" strokeWidth="3.1" />
        {points.map((p, i) => (
          <circle
            key={`pt-${p.year}`}
            cx={p.x}
            cy={p.y}
            r={activeIdx === i ? 5 : 3.5}
            fill="#D97706"
            stroke="#fff"
            strokeWidth={activeIdx === i ? 1.8 : 1.1}
            onMouseEnter={() => setActiveIdx(i)}
          />
        ))}

        {[0, 2, 4, 6, 8, 10, 12].map((tick) => (
          <text key={`rt-${tick}`} x={WIDTH - MARGIN.right + 8} y={shareY(tick) + 4} fontSize="11" fill="#64748B">
            {tick}%
          </text>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#0369A1]" />
          Amount of office mortgages maturing ($B)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#D97706]" />
          Office / total CRE maturing (%)
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: S&amp;P Global Market Intelligence</p>
    </div>
  );
}
