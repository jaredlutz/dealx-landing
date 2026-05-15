"use client";

import { useMemo, useState } from "react";

const LABELS = ["Q1 2024", "Q2 2024", "Q3 2024", "Q1 2025"];
const SERIES = [
  { key: "office", name: "Office", color: "#1E88FF", values: [19.0, 19.0, 19.1, 19.6] },
  { key: "multifamily", name: "Multifamily", color: "#111827", values: [7.8, 7.6, 8.0, 8.1] },
  { key: "industrial", name: "Industrial", color: "#16A34A", values: [5.0, 5.6, 6.2, 6.8] },
  { key: "retail", name: "Retail", color: "#A16207", values: [3.9, 3.9, 3.9, 3.8] },
];

const WIDTH = 840;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 66, left: 64 };
const Y_MIN = 0;
const Y_MAX = 25;
const Y_TICKS = [0, 5, 10, 15, 20, 25];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function CreVacancyBySectorChart() {
  const [activeQuarter, setActiveQuarter] = useState(LABELS.length - 1);

  const { step, groupWidth, barWidth } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / LABELS.length;
    const groupW = stepValue * 0.76;
    const barW = groupW / SERIES.length;
    return { step: stepValue, groupWidth: groupW, barWidth: barW };
  }, []);

  const activeLabel = LABELS[activeQuarter];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">CRE Vacancy Rates by Sector</h4>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          Active quarter: {activeLabel}
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="CRE vacancy by sector grouped bar chart">
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

        {LABELS.map((label, quarterIdx) => {
          const gx = MARGIN.left + quarterIdx * step + (step - groupWidth) / 2;
          return (
            <g key={label}>
              {SERIES.map((series, seriesIdx) => {
                const value = series.values[quarterIdx];
                const y = yScale(value);
                const isActive = quarterIdx === activeQuarter;
                return (
                  <rect
                    key={`${label}-${series.key}`}
                    x={gx + seriesIdx * barWidth + 2}
                    y={y}
                    width={barWidth - 4}
                    height={HEIGHT - MARGIN.bottom - y}
                    fill={series.color}
                    rx="3"
                    opacity={isActive ? 1 : 0.72}
                    onMouseEnter={() => setActiveQuarter(quarterIdx)}
                  />
                );
              })}
              <rect
                x={MARGIN.left + quarterIdx * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveQuarter(quarterIdx)}
              />
              <text x={MARGIN.left + quarterIdx * step + step / 2} y={HEIGHT - 28} textAnchor="middle" fontSize="11" fill="#475569">
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
            <span className="font-medium">{series.name}:</span> {series.values[activeQuarter].toFixed(1)}%
          </div>
        ))}
      </div>

      <p className="mt-2 text-right text-xs text-slate-500">Source: CBRE / Federal Reserve / NAR</p>
    </div>
  );
}
