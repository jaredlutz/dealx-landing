"use client";

import { useMemo, useState } from "react";

const LABELS = ["2023", "2024", "2025", "2026", "2027", "2028"];
const SERIES = [
  { key: "banks", name: "Banks", color: "#111827", values: [210, 220, 230, 245, 255, 240] },
  { key: "cmbs", name: "CMBS", color: "#EC4899", values: [90, 70, 50, 45, 40, 35] },
  { key: "life", name: "Life Companies", color: "#38BDF8", values: [40, 45, 48, 52, 58, 62] },
  { key: "gse", name: "GSE", color: "#FACC15", values: [50, 55, 70, 85, 95, 90] },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 60, left: 72 };
const Y_MIN = 0;
const Y_MAX = 300;
const Y_TICKS = [0, 50, 100, 150, 200, 250, 300];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

export default function DebtExposureLenderCohortChart() {
  const [activeYearIdx, setActiveYearIdx] = useState(LABELS.length - 1);
  const activeYear = LABELS[activeYearIdx];

  const { step, groupWidth, barWidth, totalAtActive } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const s = innerW / LABELS.length;
    const gw = s * 0.78;
    const bw = gw / SERIES.length;
    const total = SERIES.reduce((acc, series) => acc + series.values[activeYearIdx], 0);
    return { step: s, groupWidth: gw, barWidth: bw, totalAtActive: total };
  }, [activeYearIdx]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Debt Exposure by Lender Cohort</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">{activeYear}</div>
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
            Total shown: ${totalAtActive}B
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Debt exposure by lender cohort grouped bars">
        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                ${tick}B
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

        {LABELS.map((label, yearIdx) => {
          const gx = MARGIN.left + yearIdx * step + (step - groupWidth) / 2;
          const active = yearIdx === activeYearIdx;
          return (
            <g key={label}>
              {SERIES.map((series, si) => {
                const val = series.values[yearIdx];
                const y = yScale(val);
                return (
                  <rect
                    key={`${label}-${series.key}`}
                    x={gx + si * barWidth + 2}
                    y={y}
                    width={barWidth - 4}
                    height={HEIGHT - MARGIN.bottom - y}
                    fill={series.color}
                    rx="3"
                    opacity={active ? 1 : 0.8}
                    onMouseEnter={() => setActiveYearIdx(yearIdx)}
                  />
                );
              })}
              <rect
                x={MARGIN.left + yearIdx * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveYearIdx(yearIdx)}
              />
              <text x={MARGIN.left + yearIdx * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="#475569">
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {SERIES.map((series) => (
          <div key={series.key} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700">
            <span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm align-middle" style={{ backgroundColor: series.color }} />
            <span className="font-medium">{series.name}:</span> ${series.values[activeYearIdx]}B
          </div>
        ))}
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: Bloomberg / Trepp / Federal Reserve</p>
    </div>
  );
}
