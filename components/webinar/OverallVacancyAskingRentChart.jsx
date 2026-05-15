"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "2020 Q1", rent: 1450, vacancy: 7.1 },
  { label: "2020 Q3", rent: 1460, vacancy: 7.2 },
  { label: "2021 Q1", rent: 1480, vacancy: 7.1 },
  { label: "2021 Q3", rent: 1660, vacancy: 6.0 },
  { label: "2022 Q1", rent: 1720, vacancy: 6.1 },
  { label: "2022 Q3", rent: 1760, vacancy: 6.0 },
  { label: "2023 Q1", rent: 1780, vacancy: 6.8 },
  { label: "2023 Q3", rent: 1760, vacancy: 7.3 },
  { label: "2024 Q1", rent: 1810, vacancy: 8.1 },
  { label: "2024 Q3", rent: 1860, vacancy: 8.3 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 58, bottom: 62, left: 72 };

const RENT_MIN = 1300;
const RENT_MAX = 2000;
const VAC_MIN = 3;
const VAC_MAX = 9;

function rentY(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - RENT_MIN) / (RENT_MAX - RENT_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

function vacY(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - VAC_MIN) / (VAC_MAX - VAC_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function OverallVacancyAskingRentChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);
  const active = DATA[activeIndex] ?? DATA[DATA.length - 1];

  const { step, barWidth, linePath, points } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const bw = stepValue * 0.56;
    const mapped = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue + stepValue / 2,
      y: vacY(d.vacancy),
    }));
    const path = mapped.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    return { step: stepValue, barWidth: bw, linePath: path, points: mapped };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Overall Vacancy and Asking Rent</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
            Rent: ${active.rent.toLocaleString()}
          </div>
          <div className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-semibold text-sky-700">
            Vacancy: {active.vacancy.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Overall vacancy and asking rent trend">
        {[1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000].map((tick) => {
          const y = rentY(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                ${tick}
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
          const x = MARGIN.left + i * step + (step - barWidth) / 2;
          const y = rentY(d.rent);
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={HEIGHT - MARGIN.bottom - y}
                fill="#FACC15"
                rx="4"
                opacity={activeIndex === i ? 1 : 0.8}
                onMouseEnter={() => setActiveIndex(i)}
              />
              <rect
                x={MARGIN.left + i * step}
                y={MARGIN.top}
                width={step}
                height={HEIGHT - MARGIN.top - MARGIN.bottom}
                fill="transparent"
                onMouseEnter={() => setActiveIndex(i)}
              />
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="10.4" fill="#475569">
                {i % 2 === 0 ? d.label : ""}
              </text>
            </g>
          );
        })}

        <path d={linePath} fill="none" stroke="#0EA5E9" strokeWidth="3.2" />
        {points.map((p, i) => (
          <circle
            key={`pt-${p.label}`}
            cx={p.x}
            cy={p.y}
            r={activeIndex === i ? 5 : 3.4}
            fill="#0EA5E9"
            stroke="#fff"
            strokeWidth={activeIndex === i ? 2 : 1.2}
            onMouseEnter={() => setActiveIndex(i)}
          />
        ))}

        {[3, 4, 5, 6, 7, 8, 9].map((tick) => {
          const y = vacY(tick);
          return (
            <text key={`rt-${tick}`} x={WIDTH - MARGIN.right + 8} y={y + 4} fontSize="11" fill="#64748B">
              {tick}%
            </text>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#FACC15]" />
          Asking Rent (Monthly)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#0EA5E9]" />
          Vacancy Rate
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: Cushman & Wakefield</p>
    </div>
  );
}
