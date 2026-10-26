import React, { useState } from 'react';
import { TrendingUp, Award, BarChart2, Activity, Zap } from 'lucide-react';
import { PROGRESS_TRENDS } from '../data/fitnessData';

export default function ProgressTracking() {
  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const muscleGroups = [
    { name: 'Lower Body (Quads & Glutes)', percent: 34, color: 'bg-[#1D2B04]' },
    { name: 'Posterior Chain & Back', percent: 26, color: 'bg-[#2E4308]' },
    { name: 'Chest & Anterior Deltoids', percent: 22, color: 'bg-[#4B6B12]' },
    { name: 'Core Stability & Lumbar', percent: 18, color: 'bg-[#6D9421]' },
  ];

  const milestones = [
    { title: 'Consecutive Streak', value: '14 Days', note: 'All-time best consistency', icon: Zap },
    { title: 'Total Calorie Burn', value: '18,420 kcal', note: 'Current 30-day block', icon: Activity },
    { title: 'Peak VO2 Estimate', value: '54.2 ml/kg', note: 'Top 5% for age cohort', icon: TrendingUp },
    { title: 'Training Sessions', value: '22 Logged', note: '91% compliance rate', icon: Award },
  ];

  // SVG Chart Dimensions
  const chartWidth = 700;
  const chartHeight = 220;
  const padding = 35;

  const minCal = 2200;
  const maxCal = 3000;

  const points = PROGRESS_TRENDS.map((item, index) => {
    const x = padding + (index / (PROGRESS_TRENDS.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((item.calories - minCal) / (maxCal - minCal)) * (chartHeight - padding * 2);
    return { ...item, x, y };
  });

  const pathD = points.reduce((acc, point, index) => {
    return `${acc} ${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <section id="progress" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-white text-gray-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#1D2B04] uppercase mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1D2B04]" />
            <span>PROGRESSION CURVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Performance Analytics &amp; Trends
          </h2>
        </div>

        {/* Timeframe selector */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
          {['7D', '30D', '90D', '1Y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                timeframe === t
                  ? 'bg-white text-gray-900 font-bold shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart + Muscle Balance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Calorie & Volume Progression Chart */}
        <div className="lg:col-span-2 bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#1D2B04]" />
                Expenditure &amp; Load Trajectory
              </h3>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                Hover data points to inspect caloric burn &amp; training volume
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#1D2B04] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
                +14.2% VS LAST CYCLE
              </span>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="relative w-full h-[240px] mt-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradientLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D2B04" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1D2B04" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                const y = padding + ratio * (chartHeight - padding * 2);
                return (
                  <line
                    key={idx}
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="rgba(0, 0, 0, 0.06)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#chartGradientLight)" />

              {/* Curve line */}
              <path
                d={pathD}
                fill="none"
                stroke="#1D2B04"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, index) => (
                <g key={index} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === index ? 6 : 4}
                    fill={hoveredPoint === index ? '#1D2B04' : '#FFFFFF'}
                    stroke="#1D2B04"
                    strokeWidth="2.5"
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="transition-all"
                  />
                </g>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredPoint !== null && (
              <div
                className="absolute -top-4 pointer-events-none bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-mono shadow-md transform -translate-x-1/2 transition-all"
                style={{
                  left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                }}
              >
                <p className="text-gray-500">{points[hoveredPoint].date}</p>
                <p className="text-gray-900 font-bold">{points[hoveredPoint].calories} kcal</p>
                <p className="text-[#1D2B04] text-[10px]">{points[hoveredPoint].hours} hrs active</p>
              </div>
            )}
          </div>

          {/* Chart X-axis labels */}
          <div className="flex justify-between items-center px-4 pt-3 border-t border-gray-200 text-[11px] font-mono text-gray-400">
            {PROGRESS_TRENDS.map((item, idx) => (
              <span key={idx}>{item.date}</span>
            ))}
          </div>
        </div>

        {/* Muscle Load Distribution */}
        <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Muscle Group Loading</h3>
            <p className="text-xs text-gray-500 font-mono">
              Biomechanical stress distribution
            </p>
          </div>

          <div className="space-y-4 my-4">
            {muscleGroups.map((group) => (
              <div key={group.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-600">{group.name}</span>
                  <span className="text-gray-900 font-bold">{group.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${group.color} transition-all duration-700`}
                    style={{ width: `${group.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white border border-gray-200 text-[11px] font-mono text-gray-500 flex items-center justify-between shadow-2xs">
            <span>SYMMETRY INDEX</span>
            <span className="text-[#1D2B04] font-bold">BALANCED 98.4%</span>
          </div>
        </div>
      </div>

      {/* 4 Milestones Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestones.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-4 hover:border-gray-300 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-mono uppercase font-medium">{m.title}</span>
                <Icon className="w-4 h-4 text-[#1D2B04]" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{m.value}</p>
              <p className="text-[11px] font-mono text-gray-500 mt-1">{m.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
