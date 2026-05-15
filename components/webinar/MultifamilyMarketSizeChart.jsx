"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: 2025, value: 918.5 },
  { year: 2026, value: 1002.6 },
  { year: 2027, value: 1125.4 },
  { year: 2028, value: 1268.2 },
  { year: 2029, value: 1396.3 },
  { year: 2030, value: 1507.5 },
];

const WIDTH = 840;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 58, left: 64 };
const Y_MIN = 800;
const Y_MAX = 1600;
const Y_TICKS = [800, 1000, 1200, 1400, 1600];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function MultifamilyMarketSizeChart() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = DATA[activeIndex] ?? DATA[1];

  const { step, barWidth, cagr } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const start = DATA[1].value;
    const end = DATA[DATA.length - 1].value;
    const years = DATA.length - 2;
    const growth = (Math.pow(end / start, 1 / years) - 1) * 100;
    return { step: stepValue, barWidth: stepValue * 0.62, cagr: growth.toFixed(1) };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Multifamily Housing Construction Market Outlook</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
            CAGR 2026-2030: {cagr}%
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            {active.year}: ${active.value.toLocaleString()}B
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Multifamily market size outlook chart">
        <defs>
          <linearGradient id="mfMarketBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#115E59" />
            <stop offset="100%" stopColor="#0F766E" />
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
          const y = yScale(row.value);
          const isActive = index === activeIndex;
          return (
            <g key={row.year}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={HEIGHT - MARGIN.bottom - y}
                fill="url(#mfMarketBar)"
                rx="4"
                opacity={isActive ? 1 : 0.78}
                onMouseEnter={() => setActiveIndex(index)}
              />
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="10.8" fill="#0F172A" fontWeight="600">
                ${Math.round(row.value)}
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

      <p className="mt-2 text-right text-xs text-slate-500">Source: Business Research Company</p>
    </div>
  );
}
