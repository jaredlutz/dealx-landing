"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "Jan 21", permits: 1680, starts: 1570 },
  { label: "Jan 22", permits: 1900, starts: 1750 },
  { label: "Jan 23", permits: 1310, starts: 1400 },
  { label: "Jan 24", permits: 1480, starts: 1420 },
  { label: "Jan 25", permits: 1460, starts: 1370 },
  { label: "Feb 25", permits: 1370, starts: 1460 },
  { label: "Mar 26", permits: 1372, starts: 1502 },
];

const WIDTH = 820;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 60, left: 64 };

const Y_MIN = 1100;
const Y_MAX = 1950;
const Y_TICKS = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function BuildingPermitsVsStartsChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);

  const { bars, points, step, barWidth } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const barW = stepValue * 0.56;
    const barData = DATA.map((d, i) => {
      const x = MARGIN.left + i * stepValue + (stepValue - barW) / 2;
      const y = yScale(d.permits);
      return { ...d, x, y };
    });
    const pointData = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue + stepValue / 2,
      y: yScale(d.starts),
    }));
    return { bars: barData, points: pointData, step: stepValue, barWidth: barW };
  }, []);

  const active = DATA[activeIndex] ?? DATA[DATA.length - 1];
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Building Permits vs Housing Starts (2021-Mar 2026)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            {active.label}
          </div>
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
            Permits: {active.permits.toLocaleString()}k
          </div>
          <div className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
            Starts: {active.starts.toLocaleString()}k
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Building permits versus housing starts trend">
        <defs>
          <linearGradient id="permitsBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D8CFF" />
            <stop offset="100%" stopColor="#0B67EA" />
          </linearGradient>
        </defs>

        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                {tick.toLocaleString()}
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

        {bars.map((bar, index) => (
          <g key={`bar-${bar.label}`}>
            <rect
              x={bar.x}
              y={bar.y}
              width={barWidth}
              height={HEIGHT - MARGIN.bottom - bar.y}
              rx="4"
              fill="url(#permitsBar)"
              opacity={activeIndex === index ? 1 : 0.82}
              onMouseEnter={() => setActiveIndex(index)}
            />
            <rect
              x={MARGIN.left + index * step}
              y={MARGIN.top}
              width={step}
              height={HEIGHT - MARGIN.top - MARGIN.bottom}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(index)}
            />
          </g>
        ))}

        <path d={linePath} fill="none" stroke="#111827" strokeWidth="3.2" />
        {points.map((point, index) => (
          <circle
            key={`point-${point.label}`}
            cx={point.x}
            cy={point.y}
            r={activeIndex === index ? 5 : 3.6}
            fill="#111827"
            stroke="#FFFFFF"
            strokeWidth={activeIndex === index ? 2 : 1.2}
            onMouseEnter={() => setActiveIndex(index)}
          />
        ))}

        {points.map((point, index) => (
          <text key={`label-${point.label}`} x={point.x} y={HEIGHT - 26} textAnchor="middle" fontSize="10.8" fill="#475569">
            {index % 2 === 0 ? point.label : ""}
          </text>
        ))}

        {points.map((point, index) =>
          index % 2 === 1 ? (
            <text key={`label-alt-${point.label}`} x={point.x} y={HEIGHT - 14} textAnchor="middle" fontSize="10.8" fill="#475569">
              {point.label}
            </text>
          ) : null
        )}

        <text x={WIDTH / 2} y={HEIGHT - 2} textAnchor="middle" fontSize="12" fill="#1E293B" fontWeight="500">
          Time
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
          Units (thousands, SAAR)
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
        <div className="inline-flex items-center gap-2 text-slate-700">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#0B67EA]" />
          Permits Issued
        </div>
        <div className="inline-flex items-center gap-2 text-slate-700">
          <span className="inline-block h-[2px] w-4 bg-slate-900" />
          Starts
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: U.S. Census Bureau / HUD (Apr 2026)</p>
    </div>
  );
}
