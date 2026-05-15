"use client";

import HousingPermitsChart from "@/components/webinar/HousingPermitsChart";
import BuildingPermitsVsStartsChart from "@/components/webinar/BuildingPermitsVsStartsChart";
import MultifamilyHousingStartsChart from "@/components/webinar/MultifamilyHousingStartsChart";
import NationalMedianRentChart from "@/components/webinar/NationalMedianRentChart";
import NationalRentGrowthChart from "@/components/webinar/NationalRentGrowthChart";
import CreVacancyBySectorChart from "@/components/webinar/CreVacancyBySectorChart";
import MultifamilyMarketSizeChart from "@/components/webinar/MultifamilyMarketSizeChart";
import MultifamilyMaturityWallChart from "@/components/webinar/MultifamilyMaturityWallChart";
import OverallVacancyAskingRentChart from "@/components/webinar/OverallVacancyAskingRentChart";
import MultifamilySupplyDemandTrendsChart from "@/components/webinar/MultifamilySupplyDemandTrendsChart";
import RentVsMortgageForecastChart from "@/components/webinar/RentVsMortgageForecastChart";
import RecoveryTimelineHighSupplyChart from "@/components/webinar/RecoveryTimelineHighSupplyChart";
import CostMultiplierMortgageVsRentChart from "@/components/webinar/CostMultiplierMortgageVsRentChart";
import CreMaturityWallChart from "@/components/webinar/CreMaturityWallChart";
import RefinancingRateGapChart from "@/components/webinar/RefinancingRateGapChart";
import CumulativeCrePriceChangeChart from "@/components/webinar/CumulativeCrePriceChangeChart";
import CreMaturityWallCleanChart from "@/components/webinar/CreMaturityWallCleanChart";
import MultifamilyDeliveriesOversupplyChart from "@/components/webinar/MultifamilyDeliveriesOversupplyChart";
import MultifamilySupplyWaveVacancyChart from "@/components/webinar/MultifamilySupplyWaveVacancyChart";
import PropertyDebtMaturitiesByTypeChart from "@/components/webinar/PropertyDebtMaturitiesByTypeChart";
import DebtExposureLenderCohortChart from "@/components/webinar/DebtExposureLenderCohortChart";
import FirstAmericanSnapshotChart from "@/components/webinar/FirstAmericanSnapshotChart";
import UsCreValueComparisonChart from "@/components/webinar/UsCreValueComparisonChart";
import OfficeShareMaturingDebtChart from "@/components/webinar/OfficeShareMaturingDebtChart";
import CreMortgageSpreadsChart from "@/components/webinar/CreMortgageSpreadsChart";
import NationalRentSupplyGrowthChart from "@/components/webinar/NationalRentSupplyGrowthChart";

const CARD = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

function Frame({ title, source, children, metric }) {
  return (
    <div className={CARD}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h4>
        {metric ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
            {metric}
          </div>
        ) : null}
      </div>
      {children}
      <p className="mt-3 text-right text-xs text-slate-500">Source: {source}</p>
    </div>
  );
}

function Axis({ width, height, margin }) {
  return (
    <>
      <line
        x1={margin.left}
        y1={height - margin.bottom}
        x2={width - margin.right}
        y2={height - margin.bottom}
        stroke="#94A3B8"
        strokeWidth="1"
      />
      <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={height - margin.bottom}
        stroke="#94A3B8"
        strokeWidth="1"
      />
    </>
  );
}

function yPos(value, min, max, innerHeight, top) {
  const ratio = (value - min) / (max - min);
  return top + innerHeight - ratio * innerHeight;
}

function linePath(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

function SingleLineChart({ series, min, max, yTicks, color = "#005EE0", fill = false }) {
  const width = 760;
  const height = 430;
  const margin = { top: 24, right: 24, bottom: 54, left: 62 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const points = series.map((d, i) => ({
    ...d,
    x: margin.left + (i / (series.length - 1)) * innerW,
    y: yPos(d.value, min, max, innerH, margin.top),
  }));

  const areaPath = `${linePath(points)} L${points[points.length - 1].x} ${margin.top + innerH} L${points[0].x} ${
    margin.top + innerH
  } Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      <defs>
        <linearGradient id="singleLineFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {yTicks.map((tick) => {
        const y = yPos(tick, min, max, innerH, margin.top);
        return (
          <g key={tick}>
            <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
              {tick}
            </text>
          </g>
        );
      })}
      <Axis width={width} height={height} margin={margin} />
      {fill ? <path d={areaPath} fill="url(#singleLineFill)" /> : null}
      <path d={linePath(points)} fill="none" stroke={color} strokeWidth="3" />
      {points.map((point) => (
        <circle key={point.label} cx={point.x} cy={point.y} r="3.4" fill={color} stroke="#fff" strokeWidth="1.2" />
      ))}
      {points.map((point, idx) => (
        <text key={`x-${point.label}`} x={point.x} y={height - 24} textAnchor="middle" fontSize="11" fill="#475569">
          {idx % 2 === 0 ? point.label : ""}
        </text>
      ))}
      <text x={width / 2} y={height - 6} textAnchor="middle" fontSize="12" fill="#1E293B" fontWeight="500">
        Year
      </text>
    </svg>
  );
}

function BarLineChart({ labels, bars, line, barColor = "#1D4ED8", lineColor = "#B91C1C", yMin = 0, yMax = 8 }) {
  const width = 760;
  const height = 430;
  const margin = { top: 24, right: 30, bottom: 54, left: 62 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const n = labels.length;
  const step = innerW / n;
  const barWidth = step * 0.58;
  const px = (i) => margin.left + i * step + (step - barWidth) / 2;
  const py = (v) => yPos(v, yMin, yMax, innerH, margin.top);
  const linePoints = line.map((v, i) => ({
    x: margin.left + i * step + step / 2,
    y: py(v),
  }));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      {[0, 2, 4, 6, 8].map((tick) => {
        const y = py(tick);
        return (
          <g key={tick}>
            <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
              {tick.toFixed(1)}
            </text>
          </g>
        );
      })}
      <Axis width={width} height={height} margin={margin} />
      {bars.map((v, i) => {
        const y = py(v);
        return (
          <rect key={`bar-${labels[i]}`} x={px(i)} y={y} width={barWidth} height={margin.top + innerH - y} fill={barColor} rx="4" />
        );
      })}
      <path d={linePath(linePoints)} fill="none" stroke={lineColor} strokeWidth="3" />
      {linePoints.map((p, i) => (
        <circle key={`lp-${labels[i]}`} cx={p.x} cy={p.y} r="3.2" fill={lineColor} stroke="#fff" strokeWidth="1.1" />
      ))}
      {labels.map((label, i) => (
        <text key={label} x={margin.left + i * step + step / 2} y={height - 24} textAnchor="middle" fontSize="10.5" fill="#475569">
          {label}
        </text>
      ))}
    </svg>
  );
}

function GroupedBars({ labels, series, min = 0, max = 25 }) {
  const width = 760;
  const height = 430;
  const margin = { top: 24, right: 22, bottom: 64, left: 62 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const step = innerW / labels.length;
  const groupW = step * 0.76;
  const barW = groupW / series.length;
  const py = (v) => yPos(v, min, max, innerH, margin.top);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      {[0, 5, 10, 15, 20, 25].map((tick) => {
        const y = py(tick);
        return (
          <g key={tick}>
            <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
              {tick}
            </text>
          </g>
        );
      })}
      <Axis width={width} height={height} margin={margin} />
      {labels.map((label, i) => {
        const gx = margin.left + i * step + (step - groupW) / 2;
        return (
          <g key={label}>
            {series.map((s, si) => {
              const val = s.values[i];
              const y = py(val);
              return <rect key={`${label}-${s.name}`} x={gx + si * barW + 2} y={y} width={barW - 4} height={margin.top + innerH - y} fill={s.color} rx="3" />;
            })}
            <text x={margin.left + i * step + step / 2} y={height - 34} textAnchor="middle" fontSize="11" fill="#475569">
              {label}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${margin.left},${height - 16})`}>
        {series.map((s, i) => (
          <g key={s.name} transform={`translate(${i * 170},0)`}>
            <rect x="0" y="-8" width="12" height="12" fill={s.color} rx="2" />
            <text x="18" y="2" fontSize="11" fill="#334155">
              {s.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function StackedHorizontal({ rows, segments, max = 100 }) {
  const width = 760;
  const height = 430;
  const margin = { top: 24, right: 24, bottom: 44, left: 120 };
  const innerW = width - margin.left - margin.right;
  const rowH = (height - margin.top - margin.bottom) / rows.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      {[0, 25, 50, 75, 100].map((tick) => {
        const x = margin.left + (tick / max) * innerW;
        return (
          <g key={tick}>
            <line x1={x} y1={margin.top} x2={x} y2={height - margin.bottom} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={x} y={height - 16} textAnchor="middle" fontSize="10.5" fill="#64748B">
              {tick}%
            </text>
          </g>
        );
      })}
      {rows.map((row, i) => {
        let accum = 0;
        const y = margin.top + i * rowH + rowH * 0.2;
        return (
          <g key={row.name}>
            <text x={margin.left - 10} y={y + rowH * 0.35} textAnchor="end" fontSize="11" fill="#334155">
              {row.name}
            </text>
            {segments.map((seg) => {
              const val = row.values[seg.key];
              const w = (val / max) * innerW;
              const x = margin.left + (accum / max) * innerW;
              accum += val;
              return <rect key={`${row.name}-${seg.key}`} x={x} y={y} width={w} height={rowH * 0.55} fill={seg.color} rx="3" />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

function VerticalBars({ labels, values, min = 0, max = 1600, color = "#0B67EA" }) {
  const width = 760;
  const height = 430;
  const margin = { top: 24, right: 22, bottom: 58, left: 62 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const step = innerW / labels.length;
  const bw = step * 0.6;
  const py = (v) => yPos(v, min, max, innerH, margin.top);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      {[0, 300, 600, 900, 1200, 1500].map((tick) => {
        const y = py(tick);
        return (
          <g key={tick}>
            <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 4" />
            <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#64748B">
              {tick}
            </text>
          </g>
        );
      })}
      <Axis width={width} height={height} margin={margin} />
      {labels.map((label, i) => {
        const y = py(values[i]);
        return (
          <g key={label}>
            <rect x={margin.left + i * step + (step - bw) / 2} y={y} width={bw} height={margin.top + innerH - y} fill={color} rx="4" />
            <text x={margin.left + i * step + step / 2} y={height - 25} textAnchor="middle" fontSize="10.5" fill="#475569">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SlideChartFactory({ slideNumber, title, source }) {
  switch (slideNumber) {
    case 1:
      return <HousingPermitsChart />;
    case 2:
      return <NationalRentSupplyGrowthChart />;
    case 3:
      return (
        <Frame title={title} source={source}>
          <SingleLineChart
            series={[
              { label: "2015", value: 1100 },
              { label: "2016", value: 1200 },
              { label: "2017", value: 1250 },
              { label: "2018", value: 1300 },
              { label: "2019", value: 1390 },
              { label: "2020", value: 1600 },
              { label: "2021", value: 1740 },
              { label: "2022", value: 1800 },
              { label: "2023", value: 1500 },
              { label: "2024", value: 1400 },
              { label: "2025", value: 1350 },
            ]}
            min={1050}
            max={1850}
            yTicks={[1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800]}
            fill
          />
        </Frame>
      );
    case 27:
      return <MultifamilyHousingStartsChart />;
    case 4:
      return <MultifamilyMaturityWallChart />;
    case 5:
      return <BuildingPermitsVsStartsChart />;
    case 6:
      return <MultifamilyMarketSizeChart />;
    case 7:
      return <CreVacancyBySectorChart />;
    case 8:
      return <NationalRentGrowthChart />;
    case 9:
      return <NationalMedianRentChart />;
    case 10:
      return <OverallVacancyAskingRentChart />;
    case 11:
      return <RecoveryTimelineHighSupplyChart />;
    case 12:
      return <CreMaturityWallChart />;
    case 13:
      return <PropertyDebtMaturitiesByTypeChart />;
    case 14:
      return <RefinancingRateGapChart />;
    case 15:
      return <CumulativeCrePriceChangeChart />;
    case 16:
      return <CreMaturityWallCleanChart />;
    case 17:
      return <MultifamilySupplyWaveVacancyChart />;
    case 18:
      return <DebtExposureLenderCohortChart />;
    case 19:
      return <UsCreValueComparisonChart />;
    case 20:
      return <MultifamilyDeliveriesOversupplyChart />;
    case 21:
      return <OfficeShareMaturingDebtChart />;
    case 22:
      return <CostMultiplierMortgageVsRentChart />;
    case 23:
      return <CreMortgageSpreadsChart />;
    case 24:
      return <FirstAmericanSnapshotChart />;
    case 25:
      return <MultifamilySupplyDemandTrendsChart />;
    case 26:
      return <RentVsMortgageForecastChart />;
    default:
      return (
        <Frame title={title} source={source}>
          <div className="rounded-lg border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
            Chart recreation in progress.
          </div>
        </Frame>
      );
  }
}
