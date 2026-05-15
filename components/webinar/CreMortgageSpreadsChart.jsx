"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "Jan", year: 2018, cre: 3.9, tsy: 2.5 },
  { label: "Mar", year: 2018, cre: 4.1, tsy: 2.7 },
  { label: "May", year: 2018, cre: 4.3, tsy: 2.8 },
  { label: "Jul", year: 2018, cre: 4.4, tsy: 2.8 },
  { label: "Sept", year: 2018, cre: 4.3, tsy: 2.8 },
  { label: "Nov", year: 2018, cre: 4.4, tsy: 2.9 },
  { label: "Jan", year: 2019, cre: 4.6, tsy: 2.9 },
  { label: "Mar", year: 2019, cre: 4.4, tsy: 2.6 },
  { label: "May", year: 2019, cre: 4.1, tsy: 2.4 },
  { label: "Jul", year: 2019, cre: 3.9, tsy: 2.3 },
  { label: "Sept", year: 2019, cre: 3.6, tsy: 1.8 },
  { label: "Nov", year: 2019, cre: 3.5, tsy: 1.4 },
  { label: "Jan", year: 2020, cre: 3.5, tsy: 1.6 },
  { label: "Mar", year: 2020, cre: 3.4, tsy: 1.5 },
  { label: "May", year: 2020, cre: 3.3, tsy: 0.5 },
  { label: "Jul", year: 2020, cre: 3.1, tsy: 0.4 },
  { label: "Sept", year: 2020, cre: 3.0, tsy: 0.3 },
  { label: "Nov", year: 2020, cre: 2.8, tsy: 0.4 },
  { label: "Jan", year: 2021, cre: 2.7, tsy: 0.5 },
  { label: "Mar", year: 2021, cre: 2.8, tsy: 0.9 },
  { label: "May", year: 2021, cre: 2.7, tsy: 0.8 },
  { label: "Jul", year: 2021, cre: 2.6, tsy: 0.8 },
  { label: "Sept", year: 2021, cre: 2.7, tsy: 1.1 },
  { label: "Nov", year: 2021, cre: 2.9, tsy: 1.3 },
  { label: "Jan", year: 2022, cre: 3.5, tsy: 2.1 },
  { label: "Mar", year: 2022, cre: 4.2, tsy: 2.9 },
  { label: "May", year: 2022, cre: 4.8, tsy: 3.1 },
  { label: "Jul", year: 2022, cre: 4.7, tsy: 2.9 },
  { label: "Sept", year: 2022, cre: 6.1, tsy: 4.0 },
  { label: "Nov", year: 2022, cre: 6.1, tsy: 3.8 },
  { label: "Jan", year: 2023, cre: 5.6, tsy: 3.5 },
  { label: "Mar", year: 2023, cre: 5.7, tsy: 3.9 },
  { label: "May", year: 2023, cre: 6.1, tsy: 3.6 },
  { label: "Jul", year: 2023, cre: 6.2, tsy: 4.0 },
  { label: "Sept", year: 2023, cre: 6.6, tsy: 4.3 },
  { label: "Nov", year: 2023, cre: 6.8, tsy: 4.7 },
  { label: "Jan", year: 2024, cre: 7.2, tsy: 4.0 },
  { label: "Mar", year: 2024, cre: 6.9, tsy: 4.1 },
  { label: "May", year: 2024, cre: 6.3, tsy: 4.5 },
  { label: "Jul", year: 2024, cre: 6.4, tsy: 4.4 },
  { label: "Sept", year: 2024, cre: 6.6, tsy: 4.2 },
  { label: "Nov", year: 2024, cre: 6.7, tsy: 4.1 },
];

const WIDTH = 980;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 104, left: 72 };
const Y_MIN = 0;
const Y_MAX = 8;
const Y_TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

function path(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

export default function CreMortgageSpreadsChart() {
  const [activeIdx, setActiveIdx] = useState(DATA.length - 1);
  const active = DATA[activeIdx] ?? DATA[DATA.length - 1];
  const spread = (active.cre - active.tsy).toFixed(1);

  const { step, crePts, tsyPts, crePath, tsyPath, yearMarkers } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / (DATA.length - 1);
    const c = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.cre) }));
    const t = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.tsy) }));
    const markers = [];
    for (let i = 0; i < DATA.length; i += 6) {
      const year = DATA[i].year;
      const yearEnd = Math.min(i + 5, DATA.length - 1);
      markers.push({
        year,
        startX: MARGIN.left + i * stepValue,
        centerX: MARGIN.left + ((i + yearEnd) / 2) * stepValue,
      });
    }
    return { step: stepValue, crePts: c, tsyPts: t, crePath: path(c), tsyPath: path(t), yearMarkers: markers };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">CRE Mortgage Spreads vs U.S. Treasury</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">
            CRE: {active.cre.toFixed(1)}%
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
            5Y Tsy: {active.tsy.toFixed(1)}%
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Spread: {spread} pts
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="CRE mortgage spreads line chart">
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

        <path d={crePath} fill="none" stroke="#0284C7" strokeWidth="3.1" />
        <path d={tsyPath} fill="none" stroke="#D97706" strokeWidth="3.1" />

        {crePts.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeIdx === i ? 4.8 : 2.4}
              fill="#0284C7"
              stroke="#fff"
              strokeWidth={activeIdx === i ? 1.4 : 0.8}
              onMouseEnter={() => setActiveIdx(i)}
            />
            <circle
              cx={tsyPts[i].x}
              cy={tsyPts[i].y}
              r={activeIdx === i ? 4.8 : 2.4}
              fill="#D97706"
              stroke="#fff"
              strokeWidth={activeIdx === i ? 1.4 : 0.8}
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
            <text x={p.x} y={HEIGHT - 54} textAnchor="middle" fontSize="9.4" fill="#475569" transform={`rotate(-90 ${p.x} ${HEIGHT - 54})`}>
              {p.label}
            </text>
          </g>
        ))}

        {yearMarkers.map((marker) => (
          <g key={`year-${marker.year}`}>
            <line
              x1={marker.startX}
              y1={HEIGHT - MARGIN.bottom + 2}
              x2={marker.startX}
              y2={HEIGHT - MARGIN.bottom + 14}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            <text x={marker.centerX} y={HEIGHT - 24} textAnchor="middle" fontSize="10.8" fill="#475569">
              {marker.year}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#0284C7]" />
          Average CRE mortgage rate
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#D97706]" />
          Average 5-year U.S. Treasury
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: S&amp;P Global Market Intelligence</p>
    </div>
  );
}
