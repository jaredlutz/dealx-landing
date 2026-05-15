"use client";

import { useMemo, useState } from "react";

const PROPERTY_ROWS = [
  { name: "Hotel", values: { y2024: 36, y2025: 19, y2026: 13, y2027: 12, y2028: 8, later: 12 } },
  { name: "Industrial", values: { y2024: 27, y2025: 11, y2026: 13, y2027: 10, y2028: 9, later: 30 } },
  { name: "Office", values: { y2024: 26, y2025: 14, y2026: 9, y2027: 8, y2028: 8, later: 35 } },
  { name: "Retail", values: { y2024: 17, y2025: 14, y2026: 12, y2027: 11, y2028: 12, later: 34 } },
  { name: "Multifamily", values: { y2024: 12, y2025: 10, y2026: 9, y2027: 12, y2028: 10, later: 47 } },
];

const LENDER_ROWS = [
  { name: "Credit", values: { y2024: 36, y2025: 24, y2026: 12, y2027: 10, y2028: 8, later: 10 } },
  { name: "CMBS", values: { y2024: 31, y2025: 14, y2026: 9, y2027: 11, y2028: 9, later: 26 } },
  { name: "Banks", values: { y2024: 26, y2025: 14, y2026: 12, y2027: 11, y2028: 10, later: 27 } },
  { name: "LifeCo", values: { y2024: 8, y2025: 9, y2026: 10, y2027: 14, y2028: 17, later: 42 } },
  { name: "GSE", values: { y2024: 4, y2025: 7, y2026: 9, y2027: 12, y2028: 16, later: 52 } },
];

const SEGMENTS = [
  { key: "y2024", label: "2024", color: "#1E3A8A" },
  { key: "y2025", label: "2025", color: "#2563EB" },
  { key: "y2026", label: "2026", color: "#0EA5E9" },
  { key: "y2027", label: "2027", color: "#F59E0B" },
  { key: "y2028", label: "2028", color: "#FDBA74" },
  { key: "later", label: "Later", color: "#D1D5DB" },
];

const WIDTH = 980;
const HEIGHT = 520;
const MARGIN = { top: 56, right: 28, bottom: 86, left: 44 };
const PANEL_GAP = 42;
const PANEL_LABEL_COL = 66;

export default function PropertyDebtMaturitiesByTypeChart() {
  const [active, setActive] = useState({ group: "property", index: 4 });

  const { panelPlotW, rowH, plotTop, plotBottom, panelAStart, panelBStart, activeRow, nearTermShare } = useMemo(() => {
    const usableW = WIDTH - MARGIN.left - MARGIN.right;
    const panelW = (usableW - PANEL_GAP) / 2;
    const plotW = panelW - PANEL_LABEL_COL;
    const pTop = MARGIN.top + 22;
    const pBottom = HEIGHT - MARGIN.bottom;
    const rH = (pBottom - pTop) / 5;
    const aStart = MARGIN.left;
    const bStart = MARGIN.left + panelW + PANEL_GAP;
    const rows = active.group === "property" ? PROPERTY_ROWS : LENDER_ROWS;
    const current = rows[active.index] ?? rows[0];
    const near = current.values.y2024 + current.values.y2025 + current.values.y2026;
    return {
      panelPlotW: plotW,
      rowH: rH,
      plotTop: pTop,
      plotBottom: pBottom,
      panelAStart: aStart,
      panelBStart: bStart,
      activeRow: current,
      nearTermShare: near,
    };
  }, [active]);

  const ticks = [0, 20, 40, 60, 80, 100];

  function drawPanel({ rows, group, xStart, heading }) {
    return (
      <g>
        <text x={xStart + PANEL_LABEL_COL + panelPlotW / 2} y={MARGIN.top + 4} textAnchor="middle" fontSize="11" fill="#334155" fontWeight="600">
          {heading}
        </text>

        {ticks.map((tick) => {
          const x = xStart + PANEL_LABEL_COL + (tick / 100) * panelPlotW;
          return (
            <g key={`${group}-tick-${tick}`}>
              <line x1={x} y1={plotTop} x2={x} y2={plotBottom} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={x} y={plotBottom + 18} textAnchor="middle" fontSize="10" fill="#64748B">
                {tick}%
              </text>
            </g>
          );
        })}

        {rows.map((row, idx) => {
          let accum = 0;
          const y = plotTop + idx * rowH + rowH * 0.2;
          const isActive = active.group === group && active.index === idx;
          return (
            <g key={`${group}-${row.name}`}>
              <text
                x={xStart + PANEL_LABEL_COL - 10}
                y={y + rowH * 0.35}
                textAnchor="end"
                fontSize="11"
                fill={isActive ? "#0F172A" : "#334155"}
                fontWeight={isActive ? "600" : "500"}
              >
                {row.name}
              </text>
              {SEGMENTS.map((seg) => {
                const value = row.values[seg.key];
                const w = (value / 100) * panelPlotW;
                const x = xStart + PANEL_LABEL_COL + (accum / 100) * panelPlotW;
                accum += value;
                return (
                  <rect
                    key={`${group}-${row.name}-${seg.key}`}
                    x={x}
                    y={y}
                    width={w}
                    height={rowH * 0.56}
                    fill={seg.color}
                    rx="3"
                    opacity={isActive ? 1 : 0.82}
                    onMouseEnter={() => setActive({ group, index: idx })}
                  />
                );
              })}
              <rect
                x={xStart + PANEL_LABEL_COL}
                y={y - 2}
                width={panelPlotW}
                height={rowH * 0.62}
                fill="transparent"
                onMouseEnter={() => setActive({ group, index: idx })}
              />
            </g>
          );
        })}
      </g>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">A Look at CRE Loan Maturities by Property and Lending Type</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Active: {activeRow.name} ({active.group === "property" ? "Property" : "Lender"})
          </div>
          <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
            2024-2026 share: {nearTermShare}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="CRE maturities by property and lender type stacked bars">
        {drawPanel({ rows: PROPERTY_ROWS, group: "property", xStart: panelAStart, heading: "Percent of Total By Property Type" })}
        {drawPanel({ rows: LENDER_ROWS, group: "lender", xStart: panelBStart, heading: "Percent of Total By Lender Type" })}
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {SEGMENTS.map((seg) => (
          <div key={seg.key} className="inline-flex items-center gap-2 text-xs text-slate-700">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
            {seg.label}
          </div>
        ))}
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: CoStar / Mortgage Bankers Association</p>
    </div>
  );
}
