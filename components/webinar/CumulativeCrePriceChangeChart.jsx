"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "Apr-22", appraisal: -1, transaction: 0 },
  { label: "Jul-22", appraisal: -6, transaction: -2 },
  { label: "Oct-22", appraisal: -13, transaction: -9 },
  { label: "Jan-23", appraisal: -14, transaction: -11 },
  { label: "Apr-23", appraisal: -16, transaction: -11 },
  { label: "Jul-23", appraisal: -17, transaction: -11.5 },
  { label: "Oct-23", appraisal: -22, transaction: -12 },
  { label: "Jan-24", appraisal: -22, transaction: -12.2 },
  { label: "Apr-24", appraisal: -21, transaction: -11.4 },
  { label: "Jul-24", appraisal: -19, transaction: -10.5 },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 60, left: 70 };
const Y_MIN = -25;
const Y_MAX = 1;
const Y_TICKS = [0, -5, -10, -15, -20, -25];

function yScale(v) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const r = (v - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - r * innerH;
}

function path(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

export default function CumulativeCrePriceChangeChart() {
  const [activeIdx, setActiveIdx] = useState(DATA.length - 1);
  const active = DATA[activeIdx] ?? DATA[DATA.length - 1];

  const { step, apprPts, txnPts, apprPath, txnPath } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / (DATA.length - 1);
    const a = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.appraisal) }));
    const t = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.transaction) }));
    return { step: stepValue, apprPts: a, txnPts: t, apprPath: path(a), txnPath: path(t) };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Cumulative CRE Price Change Since Peak</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-yellow-200 bg-yellow-50 px-2.5 py-1 font-medium text-yellow-700">
            Appraisal-based: {active.appraisal.toFixed(1)}%
          </div>
          <div className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 font-medium text-sky-700">
            Transaction-based: {active.transaction.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Cumulative CRE price change lines">
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

        <path d={apprPath} fill="none" stroke="#FACC15" strokeWidth="3.1" />
        <path d={txnPath} fill="none" stroke="#38BDF8" strokeWidth="3.1" />

        {apprPts.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeIdx === i ? 4.8 : 3.4}
              fill="#FACC15"
              stroke="#fff"
              strokeWidth={activeIdx === i ? 1.8 : 1.1}
              onMouseEnter={() => setActiveIdx(i)}
            />
            <circle
              cx={txnPts[i].x}
              cy={txnPts[i].y}
              r={activeIdx === i ? 4.8 : 3.4}
              fill="#38BDF8"
              stroke="#fff"
              strokeWidth={activeIdx === i ? 1.8 : 1.1}
              onMouseEnter={() => setActiveIdx(i)}
            />
            <rect
              x={p.x - step * 0.42}
              y={MARGIN.top}
              width={step * 0.84}
              height={HEIGHT - MARGIN.top - MARGIN.bottom}
              fill="transparent"
              onMouseEnter={() => setActiveIdx(i)}
            />
            <text x={p.x} y={HEIGHT - 24} textAnchor="middle" fontSize="10.3" fill="#475569">
              {i % 2 === 0 ? p.label : ""}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#FACC15]" />
          Appraisal-based
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#38BDF8]" />
          Transaction-based
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: FS Investments</p>
    </div>
  );
}
