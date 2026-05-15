"use client";

import { useMemo, useState } from "react";

const PERIODS = ["Dec-17", "Dec-18", "Dec-19", "Dec-20", "Dec-21", "Dec-22", "Dec-23", "Dec-24"];

const TOP_SERIES = [
  { key: "office", label: "Office", color: "#0F172A", values: [36, 44, 42, 28, 78, 55, 34, 38] },
  { key: "industrial", label: "Industrial", color: "#0369A1", values: [24, 33, 32, 22, 88, 63, 27, 30] },
  { key: "retail", label: "Retail", color: "#A16207", values: [26, 30, 34, 18, 60, 47, 26, 29] },
  { key: "multifamily", label: "Multifamily", color: "#FACC15", values: [30, 42, 45, 30, 112, 68, 40, 45] },
];

const YOY_SERIES = [
  { key: "office-cbd", label: "Office - CBD", color: "#9CA3AF", values: [3, 2, 1, -2, 6, 0, -35, -12] },
  { key: "office-suburban", label: "Office - Suburban", color: "#64748B", values: [4, 3, 2, -1, 10, 3, -14, -2] },
  { key: "industrial", label: "Industrial", color: "#1F766E", values: [5, 6, 7, 6, 16, 12, 2, 5] },
  { key: "retail", label: "Retail", color: "#B45309", values: [1, 2, 3, 2, 18, 8, -6, 3] },
  { key: "multifamily", label: "Multifamily", color: "#B59A2E", values: [7, 8, 9, 7, 23, 15, -12, 1] },
];

const WIDTH = 980;
const HEIGHT = 560;
const MARGIN = { top: 24, right: 34, bottom: 38, left: 62 };

export default function FirstAmericanSnapshotChart() {
  const [activeIdx, setActiveIdx] = useState(PERIODS.length - 1);

  const {
    topStep,
    topBarW,
    topTotals,
    yoyPaths,
    topPanel,
    bottomPanel,
    recessionStartX,
    recessionEndX,
    activeYear,
  } = useMemo(() => {
    const chartW = WIDTH - MARGIN.left - MARGIN.right;
    const panelGap = 56;
    const panelHeight = (HEIGHT - MARGIN.top - MARGIN.bottom - panelGap) / 2;
    const top = { x: MARGIN.left, y: MARGIN.top, w: chartW, h: panelHeight };
    const bottom = { x: MARGIN.left, y: MARGIN.top + panelHeight + panelGap, w: chartW, h: panelHeight };

    const step = top.w / PERIODS.length;
    const barW = step * 0.55;

    const topY = (v) => top.y + top.h - (v / 360) * top.h;
    const yoyY = (v) => bottom.y + bottom.h - ((v + 40) / 70) * bottom.h;

    const totals = PERIODS.map((_, i) => TOP_SERIES.reduce((acc, s) => acc + s.values[i], 0));

    const paths = YOY_SERIES.map((series) => {
      const pts = PERIODS.map((_, i) => ({
        x: bottom.x + i * step + step / 2,
        y: yoyY(series.values[i]),
      }));
      const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
      return { key: series.key, d, points: pts };
    });

    const recessionStart = bottom.x + 3 * step - step * 0.25;
    const recessionEnd = bottom.x + 3 * step + step * 0.35;
    return {
      topStep: step,
      topBarW: barW,
      topTotals: totals,
      yoyPaths: paths,
      topPanel: top,
      bottomPanel: bottom,
      recessionStartX: recessionStart,
      recessionEndX: recessionEnd,
      activeYear: PERIODS[activeIdx],
    };
  }, [activeIdx]);

  const activeTotal = topTotals[activeIdx] ?? 0;
  const activeMultifamilyYoy = YOY_SERIES.find((series) => series.key === "multifamily")?.values[activeIdx] ?? 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">First American Transaction and Pricing Snapshot</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-yellow-200 bg-yellow-50 px-2.5 py-1 font-medium text-yellow-700">
            {activeYear}: Volume ${activeTotal}B
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
            Multifamily YoY: {activeMultifamilyYoy.toFixed(1)}%
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="First American two-panel snapshot">
        <text x={topPanel.x + 2} y={topPanel.y - 8} fontSize="13" fill="#334155" fontWeight="600">
          Transaction Volume Has Increased Gradually Compared to 2024
        </text>
        <text x={topPanel.x + 2} y={topPanel.y + 8} fontSize="10.5" fill="#64748B">
          Quarterly Transaction Volume by Asset Class (USD in Billions)
        </text>

        {[0, 50, 100, 150, 200, 250, 300, 350].map((tick) => {
          const y = topPanel.y + topPanel.h - (tick / 360) * topPanel.h;
          return (
            <g key={`top-${tick}`}>
              <line x1={topPanel.x} y1={y} x2={topPanel.x + topPanel.w} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={topPanel.x - 8} y={y + 3.5} textAnchor="end" fontSize="10.5" fill="#64748B">
                {tick}
              </text>
            </g>
          );
        })}

        <line x1={topPanel.x} y1={topPanel.y} x2={topPanel.x} y2={topPanel.y + topPanel.h} stroke="#94A3B8" />
        <line x1={topPanel.x} y1={topPanel.y + topPanel.h} x2={topPanel.x + topPanel.w} y2={topPanel.y + topPanel.h} stroke="#94A3B8" />

        {PERIODS.map((label, i) => {
          const x = topPanel.x + i * topStep + (topStep - topBarW) / 2;
          const baseY = topPanel.y + topPanel.h;
          let accumulated = 0;
          return (
            <g key={`top-col-${label}`}>
              {TOP_SERIES.map((series) => {
                const value = series.values[i];
                const h = (value / 360) * topPanel.h;
                const y = baseY - accumulated - h;
                accumulated += h;
                return (
                  <rect
                    key={`${label}-${series.key}`}
                    x={x}
                    y={y}
                    width={topBarW}
                    height={h}
                    fill={series.color}
                    rx="1.8"
                    opacity={activeIdx === i ? 1 : 0.82}
                    onMouseEnter={() => setActiveIdx(i)}
                  />
                );
              })}
              <rect
                x={topPanel.x + i * topStep}
                y={topPanel.y}
                width={topStep}
                height={topPanel.h}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={topPanel.x + i * topStep + topStep / 2} y={topPanel.y + topPanel.h + 14} textAnchor="middle" fontSize="10.2" fill="#475569">
                {label}
              </text>
            </g>
          );
        })}

        <line
          x1={topPanel.x}
          y1={topPanel.y + topPanel.h - (120 / 360) * topPanel.h}
          x2={topPanel.x + topPanel.w}
          y2={topPanel.y + topPanel.h - (120 / 360) * topPanel.h}
          stroke="#94A3B8"
          strokeDasharray="4 4"
        />

        <text x={bottomPanel.x + 2} y={bottomPanel.y - 8} fontSize="13" fill="#334155" fontWeight="600">
          Price Growth Has Stabilized for All Asset Classes
        </text>
        <text x={bottomPanel.x + 2} y={bottomPanel.y + 8} fontSize="10.5" fill="#64748B">
          Year-Over-Year Price Appreciation by Asset Class
        </text>

        {[-40, -30, -20, -10, 0, 10, 20, 30].map((tick) => {
          const y = bottomPanel.y + bottomPanel.h - ((tick + 40) / 70) * bottomPanel.h;
          return (
            <g key={`bottom-${tick}`}>
              <line x1={bottomPanel.x} y1={y} x2={bottomPanel.x + bottomPanel.w} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={bottomPanel.x - 8} y={y + 3.5} textAnchor="end" fontSize="10.5" fill="#64748B">
                {tick}%
              </text>
            </g>
          );
        })}

        <rect x={recessionStartX} y={bottomPanel.y} width={recessionEndX - recessionStartX} height={bottomPanel.h} fill="#E5E7EB" opacity="0.65" />

        <line x1={bottomPanel.x} y1={bottomPanel.y} x2={bottomPanel.x} y2={bottomPanel.y + bottomPanel.h} stroke="#94A3B8" />
        <line
          x1={bottomPanel.x}
          y1={bottomPanel.y + bottomPanel.h - ((0 + 40) / 70) * bottomPanel.h}
          x2={bottomPanel.x + bottomPanel.w}
          y2={bottomPanel.y + bottomPanel.h - ((0 + 40) / 70) * bottomPanel.h}
          stroke="#94A3B8"
        />

        {yoyPaths.map((seriesPath, seriesIdx) => (
          <path key={`yoy-${seriesPath.key}`} d={seriesPath.d} fill="none" stroke={YOY_SERIES[seriesIdx].color} strokeWidth="2.2" />
        ))}

        {PERIODS.map((label, i) => {
          const x = bottomPanel.x + i * topStep + topStep / 2;
          return (
            <g key={`bottom-label-${label}`}>
              <rect
                x={x - topStep * 0.42}
                y={bottomPanel.y}
                width={topStep * 0.84}
                height={bottomPanel.h}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
              <text x={x} y={bottomPanel.y + bottomPanel.h + 16} textAnchor="middle" fontSize="10.2" fill="#475569">
                {label}
              </text>
            </g>
          );
        })}

        {yoyPaths.map((seriesPath, seriesIdx) => {
          const point = seriesPath.points[activeIdx];
          return (
            <circle
              key={`active-dot-${seriesPath.key}`}
              cx={point.x}
              cy={point.y}
              r="3.8"
              fill={YOY_SERIES[seriesIdx].color}
              stroke="#fff"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <p className="font-medium">Top panel legend</p>
          <p className="mt-1">
            {TOP_SERIES.map((s) => s.label).join(" · ")}
            {" · 5-yr pre-pandemic average"}
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <p className="font-medium">Bottom panel legend</p>
          <p className="mt-1">
            Recession · {YOY_SERIES.map((s) => s.label).join(" · ")}
          </p>
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: MSCI Real Capital Analytics (First American snapshot)</p>
    </div>
  );
}
