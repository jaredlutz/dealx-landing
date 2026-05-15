"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: 2015, permits: 1100 },
  { year: 2016, permits: 1200 },
  { year: 2017, permits: 1250 },
  { year: 2018, permits: 1300 },
  { year: 2019, permits: 1400 },
  { year: 2020, permits: 1600 },
  { year: 2021, permits: 1750 },
  { year: 2022, permits: 1800 },
  { year: 2023, permits: 1500 },
  { year: 2024, permits: 1400 },
  { year: 2025, permits: 1350 },
];

const WIDTH = 760;
const HEIGHT = 430;
const MARGIN = { top: 30, right: 28, bottom: 54, left: 66 };

const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

const Y_MIN = 1050;
const Y_MAX = 1850;
const Y_TICKS = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800];

function xScale(index, total) {
  if (total <= 1) return MARGIN.left;
  return MARGIN.left + (index / (total - 1)) * INNER_WIDTH;
}

function yScale(value) {
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + INNER_HEIGHT - ratio * INNER_HEIGHT;
}

function buildPath(points) {
  if (points.length === 0) return "";
  return points
    .map((point, idx) => {
      const cmd = idx === 0 ? "M" : "L";
      return `${cmd}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    })
    .join(" ");
}

export default function HousingPermitsChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);

  const points = useMemo(
    () =>
      DATA.map((d, index) => ({
        ...d,
        x: xScale(index, DATA.length),
        y: yScale(d.permits),
      })),
    []
  );

  const active = points[activeIndex] ?? points[points.length - 1];
  const linePath = useMemo(() => buildPath(points), [points]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">U.S. Housing Permits (Thousands of Units)</h4>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          {active.year}: {active.permits.toLocaleString()}k
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="U.S. housing permits trend">
        <defs>
          <linearGradient id="permitsLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B67EA" />
            <stop offset="100%" stopColor="#005EE0" />
          </linearGradient>
          <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#FFFFFF" />

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
          y1={MARGIN.top + INNER_HEIGHT}
          x2={WIDTH - MARGIN.right}
          y2={MARGIN.top + INNER_HEIGHT}
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + INNER_HEIGHT} stroke="#94A3B8" strokeWidth="1" />

        <path d={linePath} stroke="url(#permitsLine)" strokeWidth="3.2" fill="none" filter="url(#lineGlow)" />

        {points.map((point, index) => (
          <g key={point.year}>
            <circle
              cx={point.x}
              cy={point.y}
              r={activeIndex === index ? 5.6 : 3.8}
              fill={activeIndex === index ? "#005EE0" : "#60A5FA"}
              stroke="#FFFFFF"
              strokeWidth={activeIndex === index ? 2.2 : 1.4}
              onMouseEnter={() => setActiveIndex(index)}
            />
            <rect
              x={point.x - 15}
              y={MARGIN.top}
              width="30"
              height={INNER_HEIGHT}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(index)}
            />
          </g>
        ))}

        {active && (
          <line
            x1={active.x}
            y1={MARGIN.top}
            x2={active.x}
            y2={MARGIN.top + INNER_HEIGHT}
            stroke="#005EE0"
            strokeOpacity="0.22"
            strokeDasharray="4 4"
          />
        )}

        {points.map((point) => (
          <text key={`x-${point.year}`} x={point.x} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="#475569">
            {point.year}
          </text>
        ))}

        <text x={WIDTH / 2} y={HEIGHT - 6} textAnchor="middle" fontSize="12" fill="#1E293B" fontWeight="500">
          Year
        </text>
        <text
          x="16"
          y={MARGIN.top + INNER_HEIGHT / 2}
          textAnchor="middle"
          transform={`rotate(-90 16 ${MARGIN.top + INNER_HEIGHT / 2})`}
          fontSize="12"
          fill="#1E293B"
          fontWeight="500"
        >
          Permits
        </text>
      </svg>

      <p className="mt-3 text-right text-xs text-slate-500">Source: U.S. Census / HUD</p>
    </div>
  );
}
