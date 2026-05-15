"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: "2025", loans: 957 },
  { year: "2026", loans: 539 },
  { year: "2027", loans: 550 },
  { year: "20Y Avg", loans: 350 },
];

const WIDTH = 820;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 58, left: 68 };
const Y_MIN = 0;
const Y_MAX = 1000;
const Y_TICKS = [0, 250, 500, 750, 1000];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function MultifamilyMaturityWallChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = DATA[activeIndex] ?? DATA[0];

  const { step, barWidth, aboveAvg } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const bw = stepValue * 0.58;
    const spread = DATA[0].loans - DATA[3].loans;
    return { step: stepValue, barWidth: bw, aboveAvg: spread };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">CRE Loan Maturity Wall (2025-2027)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
            {active.year}: ${active.loans}B
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
            2025 vs 20Y Avg: +${aboveAvg}B
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="CRE loan maturity wall chart">
        <defs>
          <linearGradient id="maturityBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E88FF" />
            <stop offset="100%" stopColor="#0B67EA" />
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

        {DATA.map((row, index) => {
          const x = MARGIN.left + index * step + (step - barWidth) / 2;
          const y = yScale(row.loans);
          const isActive = index === activeIndex;
          return (
            <g key={row.year}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={HEIGHT - MARGIN.bottom - y}
                fill="url(#maturityBar)"
                rx="4"
                opacity={isActive ? 1 : 0.78}
                onMouseEnter={() => setActiveIndex(index)}
              />
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11" fill="#0F172A" fontWeight="600">
                ${row.loans}B
              </text>
              <rect
                x={MARGIN.left + index * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(index)}
              />
              <text x={MARGIN.left + index * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="#475569">
                {row.year}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-right text-xs text-slate-500">Source: Buchanan Street Partners / Kaplan Group</p>
    </div>
  );
}
