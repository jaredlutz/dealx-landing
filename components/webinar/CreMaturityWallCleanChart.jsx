"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: "2023", value: 709 },
  { year: "2024", value: 946 },
  { year: "2025", value: 998 },
  { year: "2026", value: 1148 },
  { year: "2027", value: 1257 },
  { year: "2028", value: 1138 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 60, left: 72 };
const Y_MIN = 0;
const Y_MAX = 1400;
const Y_TICKS = [0, 300, 600, 900, 1200, 1400];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

export default function CreMaturityWallCleanChart() {
  const [activeIdx, setActiveIdx] = useState(4);
  const active = DATA[activeIdx] ?? DATA[4];
  const peak = DATA.reduce((best, row) => (row.value > best.value ? row : best), DATA[0]);

  const { step, barWidth } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const s = innerW / DATA.length;
    return { step: s, barWidth: s * 0.58 };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">CRE Maturity Wall (Clean View)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 font-semibold text-rose-700">
            {active.year}: ${active.value}B
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Peak: {peak.year} (${peak.value}B)
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Clean-view CRE maturity wall">
        <defs>
          <linearGradient id="maturityCleanBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>

        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                ${tick.toLocaleString()}B
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

        {DATA.map((row, i) => {
          const x = MARGIN.left + i * step + (step - barWidth) / 2;
          const y = yScale(row.value);
          const isActive = i === activeIdx;
          return (
            <g key={row.year}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={HEIGHT - MARGIN.bottom - y}
                rx="4"
                fill="url(#maturityCleanBar)"
                opacity={isActive ? 1 : 0.8}
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11" fill="#0F172A" fontWeight="600">
                {row.value}B
              </text>
              <rect
                x={MARGIN.left + i * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="#475569">
                {row.year}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-right text-xs text-slate-500">Source: S&amp;P Global Market Intelligence</p>
    </div>
  );
}
