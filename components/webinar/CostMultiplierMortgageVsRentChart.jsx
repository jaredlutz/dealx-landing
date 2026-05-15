"use client";

import { useMemo, useState } from "react";

const DATA = [
  { city: "Los Angeles", v2024: 2.50, v2029: 2.25 },
  { city: "Austin", v2024: 2.50, v2029: 2.30 },
  { city: "Orange County", v2024: 2.45, v2029: 2.30 },
  { city: "SF Bay Area", v2024: 2.32, v2029: 2.20 },
  { city: "Salt Lake City", v2024: 2.32, v2029: 2.22 },
  { city: "Seattle", v2024: 2.24, v2029: 2.00 },
  { city: "San Diego", v2024: 2.22, v2029: 2.00 },
  { city: "Phoenix", v2024: 2.16, v2029: 2.00 },
  { city: "Nashville", v2024: 2.14, v2029: 1.78 },
  { city: "Dallas", v2024: 2.12, v2029: 1.84 },
  { city: "Las Vegas", v2024: 2.02, v2029: 1.78 },
  { city: "Raleigh", v2024: 1.96, v2029: 1.79 },
  { city: "Houston", v2024: 1.96, v2029: 1.74 },
  { city: "Denver", v2024: 1.95, v2029: 1.76 },
  { city: "Boston", v2024: 1.92, v2029: 1.75 },
  { city: "Minneapolis", v2024: 1.88, v2029: 1.65 },
  { city: "Atlanta", v2024: 1.78, v2029: 1.60 },
  { city: "Washington, D.C.", v2024: 1.70, v2029: 1.48 },
  { city: "Orlando", v2024: 1.64, v2029: 1.45 },
  { city: "New York", v2024: 1.55, v2029: 1.39 },
  { city: "Philadelphia", v2024: 1.53, v2029: 1.28 },
  { city: "Chicago", v2024: 1.38, v2029: 1.19 },
  { city: "Miami", v2024: 1.34, v2029: 1.19 },
  { city: "Nation", v2024: 1.29, v2029: 1.15 },
];

const WIDTH = 980;
const HEIGHT = 470;
const MARGIN = { top: 24, right: 24, bottom: 120, left: 72 };
const Y_MIN = 1.0;
const Y_MAX = 2.8;
const Y_TICKS = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

export default function CostMultiplierMortgageVsRentChart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = DATA[activeIdx] ?? DATA[0];
  const gap = (active.v2024 - active.v2029).toFixed(2);

  const { step } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    return { step: innerW / DATA.length };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Cost Multiplier: New Mortgage Payment vs Multifamily Rent</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">{active.city}</div>
          <div className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-medium text-slate-700">2024: {active.v2024.toFixed(2)}x</div>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">2029: {active.v2029.toFixed(2)}x</div>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 font-medium text-teal-700">Compression: {gap}x</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Cost multiplier dumbbell chart by city">
        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#DCECF0" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="10.5" fill="#64748B">
                {tick.toFixed(2)}x
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
          const x = MARGIN.left + i * step + step / 2;
          const y24 = yScale(row.v2024);
          const y29 = yScale(row.v2029);
          const isActive = i === activeIdx;
          return (
            <g key={row.city}>
              <line x1={x} y1={y24} x2={x} y2={y29} stroke="#A8C7C4" strokeWidth={isActive ? 2.6 : 2} />
              <circle cx={x} cy={y24} r={isActive ? 4.2 : 3.4} fill="#A3D7CF" stroke="#fff" strokeWidth="1.1" onMouseEnter={() => setActiveIdx(i)} />
              <circle cx={x} cy={y29} r={isActive ? 4.2 : 3.4} fill="#2FE58A" stroke="#fff" strokeWidth="1.1" onMouseEnter={() => setActiveIdx(i)} />
              <rect
                x={x - step * 0.42}
                y={MARGIN.top}
                width={step * 0.84}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text
                x={x}
                y={HEIGHT - 34}
                textAnchor="middle"
                fontSize="10.2"
                fill="#475569"
                transform={`rotate(-42 ${x} ${HEIGHT - 34})`}
              >
                {row.city}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A3D7CF]" />
          2024
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2FE58A]" />
          2029
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: CBRE</p>
    </div>
  );
}
