"use client";

import { useMemo, useState } from "react";

const MARKETS = [
  { market: "Austin", phases: [4, 5, 2, 2], peakIndex: 4 },
  { market: "Tampa", phases: [5, 3, 3, 2], peakIndex: 5 },
  { market: "Raleigh", phases: [4, 5, 2, 2], peakIndex: 6 },
  { market: "Atlanta", phases: [3, 5, 2, 3], peakIndex: 3 },
  { market: "San Antonio", phases: [2, 6, 2, 3], peakIndex: 6 },
  { market: "Jacksonville", phases: [2, 6, 2, 3], peakIndex: 3 },
  { market: "Dallas", phases: [3, 5, 3, 2], peakIndex: 3 },
  { market: "Charlotte", phases: [4, 4, 3, 2], peakIndex: 8 },
  { market: "Salt Lake City", phases: [1, 6, 4, 2], peakIndex: 1 },
  { market: "Nashville", phases: [2, 5, 3, 3], peakIndex: 4 },
  { market: "Fort Worth", phases: [2, 5, 3, 3], peakIndex: 2 },
  { market: "Fort Lauderdale", phases: [2, 4, 3, 4], peakIndex: 8 },
  { market: "Orlando", phases: [2, 4, 2, 5], peakIndex: 2 },
  { market: "Denver", phases: [2, 4, 1, 6], peakIndex: 4 },
  { market: "Phoenix", phases: [2, 4, 1, 6], peakIndex: 8 },
  { market: "Riverside", phases: [2, 4, 1, 6], peakIndex: 8 },
];

const SEGMENTS = [
  { key: "a", label: "Increasing vacancy, negative rent growth", color: "#99F6E4" },
  { key: "b", label: "Declining vacancy, negative rent growth", color: "#334155" },
  { key: "c", label: "Declining vacancy, positive rent growth", color: "#FCA17D" },
  { key: "d", label: "Stable vacancy, positive rent growth", color: "#E7E8A3" },
];

const QUARTERS = [
  "Q3 '23",
  "Q4 '23",
  "Q1 '24",
  "Q2 '24",
  "Q3 '24",
  "Q4 '24",
  "Q1 '25",
  "Q2 '25",
  "Q3 '25",
  "Q4 '25",
  "Q1 '26",
  "Q2 '26",
  "Q3 '26",
];

const WIDTH = 980;
const HEIGHT = 620;
const MARGIN = { top: 34, right: 24, bottom: 92, left: 170 };

export default function RecoveryTimelineHighSupplyChart() {
  const [activeIdx, setActiveIdx] = useState(7);
  const active = MARKETS[activeIdx] ?? MARKETS[0];

  const { innerW, rowH, quarterW } = useMemo(() => {
    const iW = WIDTH - MARGIN.left - MARGIN.right;
    const rH = (HEIGHT - MARGIN.top - MARGIN.bottom) / MARKETS.length;
    return { innerW: iW, rowH: rH, quarterW: iW / QUARTERS.length };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Recovery Timeline for High-Supply Markets</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Active market: {active.market}
          </div>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
            Peak deliveries: {QUARTERS[active.peakIndex] ?? "n/a"}
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="High-supply market recovery timeline chart">
        {QUARTERS.map((quarter, idx) => {
          const x = MARGIN.left + idx * quarterW;
          return (
            <g key={quarter}>
              <line x1={x} y1={MARGIN.top} x2={x} y2={HEIGHT - MARGIN.bottom} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={x + quarterW * 0.5} y={HEIGHT - 46} textAnchor="middle" fontSize="10.5" fill="#64748B" transform={`rotate(-40 ${x + quarterW * 0.5} ${HEIGHT - 46})`}>
                {quarter}
              </text>
            </g>
          );
        })}

        {MARKETS.map((row, i) => {
          const y = MARGIN.top + i * rowH + rowH * 0.2;
          let accum = 0;
          const isActive = i === activeIdx;
          return (
            <g key={row.market}>
              <text x={MARGIN.left - 12} y={y + rowH * 0.35} textAnchor="end" fontSize="11" fill={isActive ? "#0F172A" : "#334155"} fontWeight={isActive ? "600" : "500"}>
                {row.market}
              </text>
              {row.phases.map((val, segIdx) => {
                const w = val * quarterW;
                const x = MARGIN.left + accum * quarterW;
                accum += val;
                return (
                  <rect
                    key={`${row.market}-${SEGMENTS[segIdx].key}`}
                    x={x}
                    y={y}
                    width={w}
                    height={rowH * 0.55}
                    fill={SEGMENTS[segIdx].color}
                    rx="3"
                    opacity={isActive ? 1 : 0.8}
                    onMouseEnter={() => setActiveIdx(i)}
                  />
                );
              })}
              <polygon
                points={`${MARGIN.left + (row.peakIndex + 0.5) * quarterW},${y - 8} ${MARGIN.left + (row.peakIndex + 0.3) * quarterW},${y + 2} ${MARGIN.left + (row.peakIndex + 0.7) * quarterW},${y + 2}`}
                fill="#34D399"
              />
              <rect
                x={MARGIN.left}
                y={y - 2}
                width={innerW}
                height={rowH * 0.62}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {SEGMENTS.map((seg) => (
          <div key={seg.key} className="inline-flex items-center gap-2 text-xs text-slate-700">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
            {seg.label}
          </div>
        ))}
        <div className="inline-flex items-center gap-2 text-xs text-slate-700">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <polygon points="6,1 1,10 11,10" fill="#34D399" />
          </svg>
          Peak annual deliveries
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: CBRE</p>
    </div>
  );
}
