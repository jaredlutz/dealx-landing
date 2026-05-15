"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "17", completions: 330, absorption: 335, vacancy: 5.2 },
  { label: "18", completions: 320, absorption: 315, vacancy: 4.6 },
  { label: "19", completions: 315, absorption: 305, vacancy: 4.5 },
  { label: "20", completions: 360, absorption: 370, vacancy: 4.6 },
  { label: "21", completions: 370, absorption: 690, vacancy: 2.8 },
  { label: "22", completions: 350, absorption: -120, vacancy: 5.1 },
  { label: "23", completions: 430, absorption: 240, vacancy: 6.0 },
  { label: "24", completions: 580, absorption: 700, vacancy: 5.0 },
  { label: "25*", completions: 410, absorption: 510, vacancy: 4.8 },
  { label: "26**", completions: 290, absorption: 250, vacancy: 4.9 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 58, bottom: 62, left: 72 };
const BAR_MIN = -250;
const BAR_MAX = 800;

function barY(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - BAR_MIN) / (BAR_MAX - BAR_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

function vacY(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const min = 0;
  const max = 8;
  const ratio = (value - min) / (max - min);
  return MARGIN.top + innerH - ratio * innerH;
}

export default function MultifamilySupplyDemandTrendsChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);
  const active = DATA[activeIndex] ?? DATA[DATA.length - 1];

  const { step, groupWidth, barWidth, linePath, points, zeroY } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / DATA.length;
    const groupW = stepValue * 0.75;
    const bw = groupW / 2;
    const mapped = DATA.map((d, i) => ({
      ...d,
      x: MARGIN.left + i * stepValue + stepValue / 2,
      y: vacY(d.vacancy),
    }));
    const path = mapped.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    return { step: stepValue, groupWidth: groupW, barWidth: bw, linePath: path, points: mapped, zeroY: barY(0) };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Multifamily Supply and Demand Trends</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            {active.label}
          </div>
          <div className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            Completions: {active.completions}
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Net Absorption: {active.absorption}
          </div>
          <div className="rounded-md border border-orange-200 bg-orange-50 px-2.5 py-1 font-medium text-orange-700">
            Vacancy: {active.vacancy.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Multifamily supply and demand trends">
        {[-250, 0, 250, 500, 750].map((tick) => {
          const y = barY(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                {tick}
              </text>
            </g>
          );
        })}

        <line x1={MARGIN.left} y1={zeroY} x2={WIDTH - MARGIN.right} y2={zeroY} stroke="#94A3B8" strokeWidth="1" />
        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />
        <line x1={WIDTH - MARGIN.right} y1={MARGIN.top} x2={WIDTH - MARGIN.right} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />

        {DATA.map((d, i) => {
          const gx = MARGIN.left + i * step + (step - groupWidth) / 2;
          const compY = barY(d.completions);
          const absY = barY(d.absorption);
          return (
            <g key={d.label}>
              <rect
                x={gx + 2}
                y={Math.min(compY, zeroY)}
                width={barWidth - 4}
                height={Math.abs(zeroY - compY)}
                fill="#334155"
                rx="3"
                opacity={activeIndex === i ? 1 : 0.8}
                onMouseEnter={() => setActiveIndex(i)}
              />
              <rect
                x={gx + barWidth + 2}
                y={Math.min(absY, zeroY)}
                width={barWidth - 4}
                height={Math.abs(zeroY - absY)}
                fill="#D1D5DB"
                rx="3"
                opacity={activeIndex === i ? 1 : 0.85}
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
              <text x={MARGIN.left + i * step + step / 2} y={HEIGHT - 24} textAnchor="middle" fontSize="10.5" fill="#475569">
                {d.label}
              </text>
            </g>
          );
        })}

        <path d={linePath} fill="none" stroke="#F97316" strokeWidth="3.1" />
        {points.map((p, i) => (
          <circle
            key={`pt-${p.label}`}
            cx={p.x}
            cy={p.y}
            r={activeIndex === i ? 5 : 3.6}
            fill="#F97316"
            stroke="#fff"
            strokeWidth={activeIndex === i ? 2 : 1.2}
            onMouseEnter={() => setActiveIndex(i)}
          />
        ))}

        {[0, 2, 4, 6, 8].map((tick) => (
          <text key={`rv-${tick}`} x={WIDTH - MARGIN.right + 8} y={vacY(tick) + 4} fontSize="11" fill="#64748B">
            {tick}%
          </text>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#334155]" />
          Completions
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#D1D5DB]" />
          Net Absorption
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#F97316]" />
          Vacancy Rate
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: Marcus &amp; Millichap</p>
    </div>
  );
}
