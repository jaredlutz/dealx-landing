"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: 2015, starts: 300 },
  { year: 2016, starts: 320 },
  { year: 2017, starts: 340 },
  { year: 2018, starts: 360 },
  { year: 2019, starts: 400 },
  { year: 2020, starts: 450 },
  { year: 2021, starts: 480 },
  { year: 2022, starts: 500 },
  { year: 2023, starts: 420 },
  { year: 2024, starts: 390 },
  { year: 2025, starts: 370 },
];

const WIDTH = 820;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 56, left: 64 };
const Y_MIN = 280;
const Y_MAX = 500;
const Y_TICKS = [300, 325, 350, 375, 400, 425, 450, 475, 500];

function yScale(value) {
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerHeight - ratio * innerHeight;
}

export default function MultifamilyHousingStartsChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);

  const { points, areaPath, linePath, step } = useMemo(() => {
    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerWidth / (DATA.length - 1);
    const mapped = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue,
      y: yScale(d.starts),
    }));
    const lp = mapped.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const ap = `${lp} L${mapped[mapped.length - 1].x} ${HEIGHT - MARGIN.bottom} L${mapped[0].x} ${HEIGHT - MARGIN.bottom} Z`;
    return { points: mapped, areaPath: ap, linePath: lp, step: stepValue };
  }, []);

  const active = points[activeIndex] ?? points[points.length - 1];
  const peak = DATA.reduce((best, row) => (row.starts > best.starts ? row : best), DATA[0]);
  const latest = DATA[DATA.length - 1];
  const drawdownFromPeakPct = Math.round(((peak.starts - latest.starts) / peak.starts) * 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Multifamily Housing Starts</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-cyan-200 bg-cyan-50 px-2.5 py-1 font-semibold text-cyan-700">
            {active.year}: {active.starts.toLocaleString()}k
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Peak: {peak.year} ({peak.starts.toLocaleString()}k)
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
            Drawdown: -{drawdownFromPeakPct}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Multifamily housing starts trend">
        <defs>
          <linearGradient id="startsFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="startsLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="60%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#075985" />
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

        <path d={areaPath} fill="url(#startsFill)" />
        <path d={linePath} fill="none" stroke="url(#startsLine)" strokeWidth="3.2" />

        {active && (
          <line
            x1={active.x}
            y1={MARGIN.top}
            x2={active.x}
            y2={HEIGHT - MARGIN.bottom}
            stroke="#0284C7"
            strokeOpacity="0.25"
            strokeDasharray="4 4"
          />
        )}

        {points.map((point, index) => (
          <g key={point.year}>
            <circle
              cx={point.x}
              cy={point.y}
              r={activeIndex === index ? 5.2 : 3.6}
              fill={activeIndex === index ? "#0891B2" : "#22D3EE"}
              stroke="#FFFFFF"
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

        {points.map((point) => (
          <text key={`x-${point.year}`} x={point.x} y={HEIGHT - 24} textAnchor="middle" fontSize="10.8" fill="#475569">
            {point.year}
          </text>
        ))}

        {points
          .filter((point) => point.year === peak.year || point.year === latest.year)
          .map((point) => {
            const isPeak = point.year === peak.year;
            return (
              <g key={`note-${point.year}`}>
                <circle cx={point.x} cy={point.y} r="5.3" fill={isPeak ? "#0369A1" : "#0E7490"} stroke="#fff" strokeWidth="2" />
                <rect
                  x={point.x - 44}
                  y={point.y - (isPeak ? 40 : 34)}
                  width="88"
                  height="22"
                  rx="6"
                  fill={isPeak ? "#0C4A6E" : "#155E75"}
                  opacity="0.95"
                />
                <text x={point.x} y={point.y - (isPeak ? 25 : 19)} textAnchor="middle" fontSize="10.5" fill="#FFFFFF" fontWeight="600">
                  {point.year}: {point.starts}k
                </text>
              </g>
            );
          })}

        <text x={WIDTH / 2} y={HEIGHT - 6} textAnchor="middle" fontSize="12" fill="#1E293B" fontWeight="500">
          Year
        </text>
        <text
          x="18"
          y={(MARGIN.top + HEIGHT - MARGIN.bottom) / 2}
          textAnchor="middle"
          transform={`rotate(-90 18 ${(MARGIN.top + HEIGHT - MARGIN.bottom) / 2})`}
          fontSize="12"
          fill="#1E293B"
          fontWeight="500"
        >
          Starts (thousands)
        </text>
      </svg>

      <p className="mt-3 text-right text-xs text-slate-500">Source: U.S. Census / HUD (multifamily starts series)</p>
    </div>
  );
}
