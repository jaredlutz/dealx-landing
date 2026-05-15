"use client";

import { useMemo, useState } from "react";

const DATA = [
  { year: "2019", units: 370, vacancy: 5.0 },
  { year: "2020", units: 335, vacancy: 5.5 },
  { year: "2021", units: 345, vacancy: 5.0 },
  { year: "2022", units: 420, vacancy: 5.8 },
  { year: "2023", units: 570, vacancy: 6.5 },
  { year: "2024", units: 605, vacancy: 6.9 },
  { year: "2025 est.", units: 480, vacancy: 7.2 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 58, bottom: 58, left: 72 };
const U_MIN = 0;
const U_MAX = 750;
const U_TICKS = [0, 100, 200, 300, 400, 500, 600, 700, 750];

function unitsY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - U_MIN) / (U_MAX - U_MIN);
  return MARGIN.top + innerH - r * innerH;
}

function vacY(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const min = 3;
  const max = 10;
  const r = (v - min) / (max - min);
  return MARGIN.top + innerH - r * innerH;
}

export default function MultifamilySupplyWaveVacancyChart() {
  const [activeIdx, setActiveIdx] = useState(DATA.length - 1);
  const active = DATA[activeIdx] ?? DATA[DATA.length - 1];

  const { step, barW, points, linePath } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const bw = stepValue * 0.58;
    const pts = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue + stepValue / 2, y: vacY(d.vacancy) }));
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    return { step: stepValue, barW: bw, points: pts, linePath: path };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Chart 5 - Multifamily New Supply Deliveries and Vacancy Rate (2019-2025)</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-violet-200 bg-violet-50 px-2.5 py-1 font-medium text-violet-700">
            New units: {active.units}k
          </div>
          <div className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 font-medium text-rose-700">
            Vacancy: {active.vacancy.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Multifamily supply and vacancy">
        {U_TICKS.map((tick) => {
          const y = unitsY(tick);
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
        <line x1={WIDTH - MARGIN.right} y1={MARGIN.top} x2={WIDTH - MARGIN.right} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />

        {DATA.map((d, i) => {
          const x = MARGIN.left + i * step + (step - barW) / 2;
          const y = unitsY(d.units);
          return (
            <g key={d.year}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={HEIGHT - MARGIN.bottom - y}
                fill="#A8A6F2"
                rx="4"
                opacity={activeIdx === i ? 1 : 0.8}
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
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="10.8" fill="#475569">
                {d.year}
              </text>
            </g>
          );
        })}

        <path d={linePath} fill="none" stroke="#E11D48" strokeWidth="3.1" />
        {points.map((p, i) => (
          <circle
            key={`pt-${p.year}`}
            cx={p.x}
            cy={p.y}
            r={activeIdx === i ? 5 : 3.6}
            fill="#E11D48"
            stroke="#fff"
            strokeWidth={activeIdx === i ? 1.8 : 1.1}
            onMouseEnter={() => setActiveIdx(i)}
          />
        ))}

        {[3, 4, 5, 6, 7, 8].map((tick) => (
          <text key={`rv-${tick}`} x={WIDTH - MARGIN.right + 8} y={vacY(tick) + 4} fontSize="11" fill="#64748B">
            {tick}%
          </text>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#A8A6F2]" />
          New units delivered
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#E11D48]" />
          Vacancy rate
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: Fannie Mae / Apartment List / Census</p>
    </div>
  );
}
