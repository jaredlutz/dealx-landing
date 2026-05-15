"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: 2015, deliveries: 255 },
  { year: 2016, deliveries: 275 },
  { year: 2017, deliveries: 300 },
  { year: 2018, deliveries: 320 },
  { year: 2019, deliveries: 350 },
  { year: 2020, deliveries: 380 },
  { year: 2021, deliveries: 420 },
  { year: 2022, deliveries: 440 },
  { year: 2023, deliveries: 430 },
  { year: 2024, deliveries: 410 },
  { year: 2025, deliveries: 392 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 56, left: 68 };
const Y_MIN = 240;
const Y_MAX = 450;
const Y_TICKS = [250, 300, 350, 400, 450];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

export default function MultifamilyDeliveriesOversupplyChart() {
  const [activeIdx, setActiveIdx] = useState(DATA.length - 1);
  const active = DATA[activeIdx] ?? DATA[DATA.length - 1];
  const peak = DATA.reduce((best, row) => (row.deliveries > best.deliveries ? row : best), DATA[0]);

  const { points, linePath, areaPath, step } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / (DATA.length - 1);
    const pts = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.deliveries) }));
    const lp = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const ap = `${lp} L${pts[pts.length - 1].x} ${HEIGHT - MARGIN.bottom} L${pts[0].x} ${HEIGHT - MARGIN.bottom} Z`;
    return { points: pts, linePath: lp, areaPath: ap, step: stepValue };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Multifamily Deliveries (Oversupply Story)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-semibold text-sky-700">
            {active.year}: {active.deliveries}k
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Peak: {peak.year} ({peak.deliveries}k)
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Multifamily deliveries trend">
        <defs>
          <linearGradient id="deliveriesFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
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

        <path d={areaPath} fill="url(#deliveriesFill)" />
        <path d={linePath} fill="none" stroke="#0EA5E9" strokeWidth="3.1" />

        {points.map((p, i) => (
          <g key={p.year}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeIdx === i ? 5.2 : 3.6}
              fill={activeIdx === i ? "#0284C7" : "#38BDF8"}
              stroke="#fff"
              strokeWidth={activeIdx === i ? 1.8 : 1.1}
              onMouseEnter={() => setActiveIdx(i)}
            />
            <rect
              x={p.x - step * 0.42}
              y={MARGIN.top}
              width={step * 0.84}
              height={HEIGHT - MARGIN.top - MARGIN.bottom}
              fill="transparent"
              onMouseEnter={() => setActiveIdx(i)}
            />
            <text x={p.x} y={HEIGHT - 24} textAnchor="middle" fontSize="10.8" fill="#475569">
              {p.year}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-right text-xs text-slate-500">Source: Multifamily deliveries trend</p>
    </div>
  );
}
