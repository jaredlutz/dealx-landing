"use client";

import { useMemo, useState } from "react";

const DATA = [
  { q: "Q1", year: "2023", supply: 2.4, rent: 3.2, forecast: false },
  { q: "Q2", year: "2023", supply: 2.7, rent: 1.6, forecast: false },
  { q: "Q3", year: "2023", supply: 2.9, rent: 1.1, forecast: false },
  { q: "Q4", year: "2023", supply: 3.1, rent: 1.2, forecast: false },
  { q: "Q1", year: "2024", supply: 3.2, rent: 1.1, forecast: false },
  { q: "Q2", year: "2024", supply: 3.4, rent: 1.2, forecast: false },
  { q: "Q3", year: "2024", supply: 3.4, rent: 1.2, forecast: false },
  { q: "Q4", year: "2024", supply: 3.5, rent: 1.1, forecast: false },
  { q: "Q1", year: "2025", supply: 3.2, rent: 1.2, forecast: false },
  { q: "Q2", year: "2025", supply: 2.8, rent: 1.0, forecast: true },
  { q: "Q3", year: "2025", supply: 2.4, rent: 1.4, forecast: true },
  { q: "Q4", year: "2025", supply: 2.2, rent: 1.5, forecast: true },
  { q: "Q1", year: "2026", supply: 2.0, rent: 1.55, forecast: true },
  { q: "Q2", year: "2026", supply: 2.1, rent: 1.58, forecast: true },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 28, right: 62, bottom: 94, left: 66 };
const RENT_MIN = 0;
const RENT_MAX = 3.5;
const RENT_TICKS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
const SUPPLY_MIN = 0;
const SUPPLY_MAX = 12;
const SUPPLY_TICKS = [0, 2, 4, 6, 8, 10, 12];

function supplyY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - SUPPLY_MIN) / (SUPPLY_MAX - SUPPLY_MIN);
  return MARGIN.top + innerH - r * innerH;
}

function rentY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - RENT_MIN) / (RENT_MAX - RENT_MIN);
  return MARGIN.top + innerH - r * innerH;
}

export default function NationalRentSupplyGrowthChart() {
  const [activeIdx, setActiveIdx] = useState(DATA.length - 1);
  const active = DATA[activeIdx] ?? DATA[DATA.length - 1];

  const { step, barW, points, historicalPath, forecastPath } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const bw = stepValue * 0.56;
    const pts = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue + stepValue / 2, y: rentY(d.rent) }));
    const splitIdx = DATA.findIndex((d) => d.forecast);
    const hist = pts.slice(0, splitIdx);
    const fc = pts.slice(splitIdx - 1);
    const histPath = hist.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const fcPath = fc.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    return { step: stepValue, barW: bw, points: pts, historicalPath: histPath, forecastPath: fcPath };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">National Rent and Supply Growth</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
            Supply: {active.supply.toFixed(1)}%
          </div>
          <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 font-medium text-red-700">
            Rent: {active.rent.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="National rent and supply growth chart">
        {RENT_TICKS.map((tick) => {
          const y = rentY(tick);
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
        <line x1={WIDTH - MARGIN.right} y1={MARGIN.top} x2={WIDTH - MARGIN.right} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />

        {DATA.map((d, i) => {
          const x = MARGIN.left + i * step + (step - barW) / 2;
          const y = supplyY(d.supply);
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={HEIGHT - MARGIN.bottom - y}
                fill={d.forecast ? "#B4AEAB" : "#003A5D"}
                rx="4"
                opacity={activeIdx === i ? 1 : 0.82}
                onMouseEnter={() => setActiveIdx(i)}
              />
              <rect
                x={MARGIN.left + i * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 42} textAnchor="middle" fontSize="10.5" fill="#475569">
                {d.q}
              </text>
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="10.5" fill="#475569">
                {d.year}
              </text>
            </g>
          );
        })}

        <path d={historicalPath} fill="none" stroke="#C10000" strokeWidth="3.2" />
        <path d={forecastPath} fill="none" stroke="#C10000" strokeWidth="3.2" strokeDasharray="7 5" />
        {points.map((p, i) => (
          <circle
            key={`pt-${p.q}-${p.year}`}
            cx={p.x}
            cy={p.y}
            r={activeIdx === i ? 4.5 : 0}
            fill="#C10000"
            stroke="#fff"
            strokeWidth={1.3}
            onMouseEnter={() => setActiveIdx(i)}
          />
        ))}

        {SUPPLY_TICKS.map((tick) => (
          <text key={`rt-${tick}`} x={WIDTH - MARGIN.right + 8} y={supplyY(tick) + 4} fontSize="11" fill="#64748B">
            {tick.toFixed(1)}%
          </text>
        ))}

        <text x={MARGIN.left - 34} y={MARGIN.top + 4} fontSize="11" fill="#64748B" fontWeight="600">
          Rent
        </text>
        <text x={MARGIN.left - 34} y={MARGIN.top + 18} fontSize="11" fill="#64748B" fontWeight="600">
          Growth
        </text>
        <text x={WIDTH - MARGIN.right + 28} y={MARGIN.top + 4} fontSize="11" fill="#64748B" fontWeight="600">
          Supply
        </text>
        <text x={WIDTH - MARGIN.right + 28} y={MARGIN.top + 18} fontSize="11" fill="#64748B" fontWeight="600">
          Growth
        </text>
      </svg>

      <div className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-7 rounded-sm bg-[#B4AEAB]" />
          National Supply Growth Forecast
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-7 rounded-sm bg-[#003A5D]" />
          National Supply Growth
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-8 border-t-2 border-dashed border-[#C10000]" />
          National Rent Growth Forecast
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-8 bg-[#C10000]" />
          National Rent Growth
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: CoStar / BLS / Gray Capital Analysis</p>
    </div>
  );
}
