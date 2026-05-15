"use client";

import { useState } from "react";

const DATA = [
  { label: "Market cap publicly traded companies", labelLines: ["Market cap", "publicly traded", "companies"], value: 50.8, color: "#38BDF8" },
  { label: "Value of commercial real estate", labelLines: ["Value", "of commercial", "real estate"], value: 22.5, color: "#F43F5E" },
];

const WIDTH = 980;
const HEIGHT = 360;
const MARGIN = { top: 56, right: 42, bottom: 40, left: 240 };
const X_MAX = 55;

function xScale(v) {
  const innerW = WIDTH - MARGIN.left - MARGIN.right;
  return MARGIN.left + (v / X_MAX) * innerW;
}

export default function UsCreValueComparisonChart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = DATA[activeIdx] ?? DATA[0];
  const spread = (DATA[0].value - DATA[1].value).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-2 flex flex-wrap items-end justify-end gap-3">
        <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">Spread: {spread}T</div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="US CRE value comparison bars">
        <line x1={MARGIN.left} y1={MARGIN.top + 12} x2={MARGIN.left} y2={HEIGHT - MARGIN.bottom - 20} stroke="#111827" strokeWidth="2.1" />

        {DATA.map((row, i) => {
          const y = MARGIN.top + i * 108 + 36;
          const xEnd = xScale(row.value);
          const isActive = i === activeIdx;
          return (
            <g key={row.label}>
              <text x={MARGIN.left - 18} y={y + 10} textAnchor="end" fontSize="15" fill="#1F2937" fontWeight={isActive ? "700" : "600"}>
                {row.labelLines.map((line, idx) => (
                  <tspan key={`${row.label}-${line}`} x={MARGIN.left - 18} dy={idx === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
              <rect
                x={MARGIN.left}
                y={y}
                width={xEnd - MARGIN.left}
                height="56"
                rx="2"
                fill={row.color}
                opacity={isActive ? 1 : 0.95}
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={xEnd + 12} y={y + 35} fontSize="31" fill="#111827" fontWeight="700">
                ${row.value.toFixed(1)}T
              </text>
              <rect
                x={MARGIN.left}
                y={y - 10}
                width={WIDTH - MARGIN.left - MARGIN.right}
                height="76"
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-right text-xs text-slate-500">Source: The Real Estate Roundtable</p>
    </div>
  );
}
