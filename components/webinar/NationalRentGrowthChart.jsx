"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: 2015, growth: 3.5 },
  { year: 2016, growth: 3.8 },
  { year: 2017, growth: 4.0 },
  { year: 2018, growth: 3.9 },
  { year: 2019, growth: 4.2 },
  { year: 2020, growth: 5.5 },
  { year: 2021, growth: 7.0 },
  { year: 2022, growth: 6.4 },
  { year: 2023, growth: 2.9 },
  { year: 2024, growth: 2.2 },
  { year: 2025, growth: 2.5 },
];

const WIDTH = 840;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 56, left: 64 };
const Y_MIN = 2;
const Y_MAX = 7.2;
const Y_TICKS = [2, 3, 4, 5, 6, 7];

function yScale(value) {
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerHeight - ratio * innerHeight;
}

export default function NationalRentGrowthChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);

  const { points, linePath, areaPath, step } = useMemo(() => {
    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerWidth / (DATA.length - 1);
    const mapped = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue,
      y: yScale(d.growth),
    }));
    const line = mapped.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const area = `${line} L${mapped[mapped.length - 1].x} ${HEIGHT - MARGIN.bottom} L${mapped[0].x} ${HEIGHT - MARGIN.bottom} Z`;
    return { points: mapped, linePath: line, areaPath: area, step: stepValue };
  }, []);

  const active = points[activeIndex] ?? points[points.length - 1];
  const peak = DATA.reduce((best, row) => (row.growth > best.growth ? row : best), DATA[0]);
  const troughRecent = DATA.slice(8).reduce((best, row) => (row.growth < best.growth ? row : best), DATA[8]);
  const rebound = (active.growth - troughRecent.growth).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">National Rent Growth (%)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
            {active.year}: {active.growth.toFixed(1)}%
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Peak: {peak.year} ({peak.growth.toFixed(1)}%)
          </div>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
            Rebound vs trough: +{rebound} pts
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="National rent growth trend">
        <defs>
          <linearGradient id="rentGrowthLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B67EA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="rentGrowthFill" x1="0%" y1="0%" x2="0%" y2="100%">
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
                {tick.toFixed(1)}%
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

        <path d={areaPath} fill="url(#rentGrowthFill)" />
        <path d={linePath} fill="none" stroke="url(#rentGrowthLine)" strokeWidth="3.1" />

        {active && (
          <line
            x1={active.x}
            y1={MARGIN.top}
            x2={active.x}
            y2={HEIGHT - MARGIN.bottom}
            stroke="#0B67EA"
            strokeOpacity="0.24"
            strokeDasharray="4 4"
          />
        )}

        {points.map((point, index) => (
          <g key={point.year}>
            <circle
              cx={point.x}
              cy={point.y}
              r={activeIndex === index ? 5.2 : 3.8}
              fill={activeIndex === index ? "#0B67EA" : "#60A5FA"}
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
          .filter((p) => p.year === peak.year || p.year === troughRecent.year)
          .map((p) => {
            const isPeak = p.year === peak.year;
            return (
              <g key={`note-${p.year}`}>
                <rect x={p.x - 48} y={p.y - 36} width="96" height="22" rx="6" fill={isPeak ? "#1E3A8A" : "#1D4ED8"} opacity="0.95" />
                <text x={p.x} y={p.y - 21} textAnchor="middle" fontSize="10.5" fill="#fff" fontWeight="600">
                  {isPeak ? "Peak" : "Trough"} {p.growth.toFixed(1)}%
                </text>
              </g>
            );
          })}

        {points.map((point) => (
          <text key={`x-${point.year}`} x={point.x} y={HEIGHT - 24} textAnchor="middle" fontSize="10.8" fill="#475569">
            {point.year}
          </text>
        ))}
      </svg>

      <div className="mt-3 text-right text-xs text-slate-500">Source: National rent trend series</div>
    </div>
  );
}
