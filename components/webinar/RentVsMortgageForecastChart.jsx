"use client";

import { useMemo, useState } from "react";

const DATA = [
  { label: "Q4 2002", year: 2002, rent: 1280, mortgage: 1300, forecast: false },
  { label: "Q4 2003", year: 2003, rent: 1330, mortgage: 1420, forecast: false },
  { label: "Q4 2004", year: 2004, rent: 1380, mortgage: 1650, forecast: false },
  { label: "Q4 2005", year: 2005, rent: 1430, mortgage: 1820, forecast: false },
  { label: "Q4 2006", year: 2006, rent: 1475, mortgage: 1850, forecast: false },
  { label: "Q4 2007", year: 2007, rent: 1510, mortgage: 1750, forecast: false },
  { label: "Q4 2008", year: 2008, rent: 1540, mortgage: 1600, forecast: false },
  { label: "Q4 2009", year: 2009, rent: 1560, mortgage: 1450, forecast: false },
  { label: "Q4 2010", year: 2010, rent: 1590, mortgage: 1380, forecast: false },
  { label: "Q4 2011", year: 2011, rent: 1620, mortgage: 1300, forecast: false },
  { label: "Q4 2012", year: 2012, rent: 1650, mortgage: 1220, forecast: false },
  { label: "Q4 2013", year: 2013, rent: 1680, mortgage: 1240, forecast: false },
  { label: "Q4 2014", year: 2014, rent: 1710, mortgage: 1370, forecast: false },
  { label: "Q4 2015", year: 2015, rent: 1740, mortgage: 1400, forecast: false },
  { label: "Q4 2016", year: 2016, rent: 1770, mortgage: 1420, forecast: false },
  { label: "Q4 2017", year: 2017, rent: 1800, mortgage: 1650, forecast: false },
  { label: "Q4 2018", year: 2018, rent: 1830, mortgage: 1850, forecast: false },
  { label: "Q4 2019", year: 2019, rent: 1860, mortgage: 1750, forecast: false },
  { label: "Q4 2020", year: 2020, rent: 1900, mortgage: 2000, forecast: false },
  { label: "Q4 2021", year: 2021, rent: 2050, mortgage: 3150, forecast: false },
  { label: "Q4 2022", year: 2022, rent: 2160, mortgage: 3000, forecast: false },
  { label: "Q4 2023", year: 2023, rent: 2190, mortgage: 3300, forecast: false },
  { label: "Q4 2024", year: 2024, rent: 2220, mortgage: 2800, forecast: true },
  { label: "Q4 2025", year: 2025, rent: 2250, mortgage: 3000, forecast: true },
];

const WIDTH = 860;
const HEIGHT = 430;
const MARGIN = { top: 24, right: 24, bottom: 62, left: 72 };
const Y_MIN = 1200;
const Y_MAX = 3600;
const Y_TICKS = [1200, 1600, 2000, 2400, 2800, 3200, 3600];

function yScale(value) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom;
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return MARGIN.top + innerH - ratio * innerH;
}

function makePath(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

export default function RentVsMortgageForecastChart() {
  const [activeIndex, setActiveIndex] = useState(DATA.length - 1);
  const active = DATA[activeIndex] ?? DATA[DATA.length - 1];

  const { step, rentPoints, mortgagePoints, rentPath, mortgagePath, forecastX, yearMarkers } = useMemo(() => {
    const innerW = WIDTH - MARGIN.left - MARGIN.right;
    const stepValue = innerW / (DATA.length - 1);
    const rp = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.rent) }));
    const mp = DATA.map((d, i) => ({ ...d, x: MARGIN.left + i * stepValue, y: yScale(d.mortgage) }));
    const forecastIdx = DATA.findIndex((d) => d.forecast);
    const fx = forecastIdx > -1 ? rp[forecastIdx].x : rp[rp.length - 1].x;
    const markers = DATA.map((d, i) => ({ year: d.year, idx: i, x: MARGIN.left + i * stepValue })).filter((_, i) => i % 2 === 0);
    return {
      step: stepValue,
      rentPoints: rp,
      mortgagePoints: mp,
      rentPath: makePath(rp),
      mortgagePath: makePath(mp),
      forecastX: fx,
      yearMarkers: markers,
    };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Average Monthly Multifamily Rent vs New Home Mortgage Payment</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
            Rent: ${active.rent.toLocaleString()}
          </div>
          <div className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
            Mortgage: ${active.mortgage.toLocaleString()}
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label="Rent versus mortgage payment forecast chart">
        {Y_TICKS.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={WIDTH - MARGIN.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
                ${tick.toLocaleString()}
              </text>
            </g>
          );
        })}

        <rect x={forecastX} y={MARGIN.top} width={WIDTH - MARGIN.right - forecastX} height={HEIGHT - MARGIN.top - MARGIN.bottom} fill="#D1FAE5" opacity="0.35" />

        <line
          x1={MARGIN.left}
          y1={HEIGHT - MARGIN.bottom}
          x2={WIDTH - MARGIN.right}
          y2={HEIGHT - MARGIN.bottom}
          stroke="#94A3B8"
          strokeWidth="1"
        />
        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={HEIGHT - MARGIN.bottom} stroke="#94A3B8" strokeWidth="1" />

        <path d={rentPath} fill="none" stroke="#84CCB6" strokeWidth="3.1" />
        <path d={mortgagePath} fill="none" stroke="#4B5563" strokeWidth="3.1" />

        {rentPoints.map((p, i) => (
          <g key={`rent-${p.label}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeIndex === i ? 4.6 : 2.2}
              fill="#84CCB6"
              stroke="#fff"
              strokeWidth={activeIndex === i ? 1.6 : 0.9}
              onMouseEnter={() => setActiveIndex(i)}
            />
            <rect
              x={p.x - step * 0.42}
              y={MARGIN.top}
              width={step * 0.84}
              height={HEIGHT - MARGIN.top - MARGIN.bottom}
              fill="transparent"
              onMouseEnter={() => setActiveIndex(i)}
            />
          </g>
        ))}
        {mortgagePoints.map((p, i) => (
          <circle
            key={`mort-${p.label}`}
            cx={p.x}
            cy={p.y}
            r={activeIndex === i ? 4.6 : 2.2}
            fill="#4B5563"
            stroke="#fff"
            strokeWidth={activeIndex === i ? 1.6 : 0.9}
            onMouseEnter={() => setActiveIndex(i)}
          />
        ))}

        {yearMarkers.map((m) => (
          <text key={`x-${m.year}`} x={m.x} y={HEIGHT - 24} textAnchor="middle" fontSize="10.3" fill="#475569">
            {m.year}
          </text>
        ))}
        <text x={forecastX + 10} y={MARGIN.top + 16} fontSize="10.5" fill="#047857" fontWeight="600">
          Forecast
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#84CCB6]" />
          Multifamily Rent
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[2px] w-4 bg-[#4B5563]" />
          New Mortgage Payment
        </span>
      </div>
      <p className="mt-2 text-right text-xs text-slate-500">Source: CBRE</p>
    </div>
  );
}
