"use client";

import { useState } from "react";

const DATA = [
  { label: "Maturing 2024", rate: 4.3, color: "#0369A1" },
  { label: "Originated 2024", rate: 6.2, color: "#D97706" },
];

const WIDTH = 760;
const HEIGHT = 420;
const MARGIN = { top: 26, right: 24, bottom: 58, left: 66 };
const Y_MIN = 0;
const Y_MAX = 7.5;
const Y_TICKS = [0, 1, 2, 3, 4, 5, 6, 7];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function RefinancingRateGapChart() {
  const [activeIdx, setActiveIdx] = useState(1);
  const active = DATA[activeIdx] ?? DATA[1];
  const spread = (DATA[1].rate - DATA[0].rate).toFixed(1);

  const innerW = WIDTH - MARGIN.left - MARGIN.right;
  const step = innerW / DATA.length;
  const barW = step * 0.56;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Average CRE Mortgage Interest Rate Comparison</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            {active.label}: {active.rate.toFixed(1)}%
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
            Gap: +{spread} pts
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Refinancing rate gap chart">
        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                {tick}%
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
          const x = MARGIN.left + i * step + (step - barW) / 2;
          const y = yScale(row.rate);
          const isActive = i === activeIdx;
          return (
            <g key={row.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={HEIGHT - MARGIN.bottom - y}
                fill={row.color}
                rx="4"
                opacity={isActive ? 1 : 0.8}
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="11" fill="#0F172A" fontWeight="600">
                {row.rate.toFixed(1)}%
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
                {row.label}
              </text>
            </g>
          );
        })}

        <line
          x1={MARGIN.left + step / 2}
          y1={yScale(DATA[0].rate)}
          x2={MARGIN.left + step + step / 2}
          y2={yScale(DATA[1].rate)}
          stroke="#94A3B8"
          strokeDasharray="4 4"
        />
      </svg>

      <p className="mt-2 text-right text-xs text-slate-500">Source: S&amp;P Global Market Intelligence</p>
    </div>
  );
}
