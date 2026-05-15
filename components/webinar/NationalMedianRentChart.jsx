"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "2019", rent: 1045 },
  { label: "Early 2020", rent: 1050 },
  { label: "Late 2020", rent: 1070 },
  { label: "2021", rent: 1195 },
  { label: "Early 2022", rent: 1340 },
  { label: "Mid 2022 (peak)", rent: 1420 },
  { label: "2023", rent: 1390 },
  { label: "Early 2024", rent: 1390 },
  { label: "Mid 2024", rent: 1385 },
  { label: "Late 2024", rent: 1378 },
  { label: "2025", rent: 1370 },
];

const WIDTH = 840;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 66, left: 68 };
const Y_MIN = 900;
const Y_MAX = 1550;
const Y_TICKS = [900, 1000, 1100, 1200, 1300, 1400, 1500];

function yScale(value) {
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerHeight - ratio * innerHeight;
}

export default function NationalMedianRentChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);

  const { points, linePath, areaPath, step } = useMemo(() => {
    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerWidth / (DATA.length - 1);
    const mapped = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue,
      y: yScale(d.rent),
    }));
    const line = mapped.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const area = `${line} L${mapped[mapped.length - 1].x} ${HEIGHT - MARGIN.bottom} L${mapped[0].x} ${HEIGHT - MARGIN.bottom} Z`;
    return { points: mapped, linePath: line, areaPath: area, step: stepValue };
  }, []);

  const active = points[activeIndex] ?? points[points.length - 1];
  const peak = DATA.reduce((best, row) => (row.rent > best.rent ? row : best), DATA[0]);
  const latest = DATA[DATA.length - 1];
  const offPeak = peak.rent - latest.rent;
  const offPeakPct = ((offPeak / peak.rent) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">National Median Asking Rent (2019-2025)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
            {active.label}: ${active.rent.toLocaleString()}
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Peak: ${peak.rent.toLocaleString()}
          </div>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
            Off peak: -${offPeak} ({offPeakPct}%)
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="National median asking rent trend">
        <defs>
          <linearGradient id="rentLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="rentFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                ${tick.toLocaleString()}
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

        <path d={areaPath} fill="url(#rentFill)" />
        <path d={linePath} fill="none" stroke="url(#rentLine)" strokeWidth="3.1" />

        {active && (
          <line
            x1={active.x}
            y1={MARGIN.top}
            x2={active.x}
            y2={HEIGHT - MARGIN.bottom}
            stroke="#D97706"
            strokeOpacity="0.24"
            strokeDasharray="4 4"
          />
        )}

        {points.map((point, index) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r={activeIndex === index ? 5.2 : 3.8}
              fill={activeIndex === index ? "#B45309" : "#D97706"}
              stroke="#fff"
              strokeWidth={activeIndex === index ? 2 : 1.2}
              onMouseEnter={() => setActiveIndex(index)}
            />
            <rect
              x={point.x - step * 0.42}
              y={MARGIN.top}
              width={step * 0.84}
              height={HEIGHT - MARGIN.top - MARGIN.bottom}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(index)}
            />
          </g>
        ))}

        {points
          .filter((p) => p.label === peak.label || p.label === latest.label)
          .map((p) => {
            const isPeak = p.label === peak.label;
            return (
              <g key={`badge-${p.label}`}>
                <rect x={p.x - 56} y={p.y - 38} width="112" height="22" rx="6" fill={isPeak ? "#92400E" : "#B45309"} opacity="0.95" />
                <text x={p.x} y={p.y - 23} textAnchor="middle" fontSize="10.5" fill="#fff" fontWeight="600">
                  {isPeak ? "Peak" : "Current"} ${p.rent}
                </text>
              </g>
            );
          })}

        {points.map((point, index) => (
          <text key={`x-${point.label}`} x={point.x} y={HEIGHT - 25} textAnchor="middle" fontSize="10.2" fill="#475569">
            {index % 2 === 0 ? point.label.replace("Mid 2022 (peak)", "Mid 2022") : ""}
          </text>
        ))}
        {points.map((point, index) =>
          index % 2 === 1 ? (
            <text key={`x-alt-${point.label}`} x={point.x} y={HEIGHT - 13} textAnchor="middle" fontSize="10.2" fill="#475569">
              {point.label.replace("Mid 2022 (peak)", "Peak")}
            </text>
          ) : null
        )}

        <text x={WIDTH / 2} y={HEIGHT - 2} textAnchor="middle" fontSize="12" fill="#1E293B" fontWeight="500">
          Time
        </text>
      </svg>

      <div className="mt-3 text-right text-xs text-slate-500">Source: Apartment List / Rentec Direct</div>
    </div>
  );
}
