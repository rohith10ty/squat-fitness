import React, { useState } from 'react';
import { TrendingUp, Award, BarChart2, Activity, Zap } from 'lucide-react';
import { PROGRESS_TRENDS } from '../data/fitnessData';

export default function ProgressTracking() {
  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const muscleGroups = [
    { name: 'Lower Body (Quads & Glutes)', percent: 34, color: 'bg-[#ffe9d9]' },
    { name: 'Posterior Chain & Back', percent: 26, color: 'bg-[#f3a675]' },
    { name: 'Chest & Anterior Deltoids', percent: 22, color: 'bg-[#ff7e36]' },
    { name: 'Core Stability & Lumbar', percent: 18, color: 'bg-[#cdb9ab]' },
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
    <section id="progress" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(255,233,217,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f3a675] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f3a675]" />
            <span>PROGRESSION CURVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#ffe9d9]">
            Performance Analytics &amp; Trends
          </h2>
        </div>

        {/* Timeframe selector */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-[#2d1408] p-1 rounded-lg border border-[rgba(255,233,217,0.12)]">
          {['7D', '30D', '90D', '1Y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                timeframe === t
                  ? 'bg-[#ffe9d9] text-[#331707] font-bold'
                  : 'text-[#cdb9ab] hover:text-[#ffe9d9]'
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
        <div className="lg:col-span-2 bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#ffe9d9] flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#f3a675]" />
                Expenditure &amp; Load Trajectory
              </h3>
              <p className="text-xs text-[#cdb9ab] font-mono mt-0.5">
                Hover data points to inspect caloric burn &amp; training volume
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#ffe9d9] bg-[#ffe9d9]/10 px-2.5 py-1 rounded border border-[#ffe9d9]/25 font-bold">
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
                <linearGradient id="chartGradientLuxury" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffe9d9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ffe9d9" stopOpacity="0.0" />
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
                    stroke="rgba(255, 233, 217, 0.08)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#chartGradientLuxury)" />

              {/* Curve line */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffe9d9"
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
                    fill={hoveredPoint === index ? '#f3a675' : '#ffe9d9'}
                    stroke="#2d1408"
                    strokeWidth="2"
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
                className="absolute -top-4 pointer-events-none bg-[#381909] border border-[rgba(255,233,217,0.25)] px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl transform -translate-x-1/2 transition-all"
                style={{
                  left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                }}
              >
                <p className="text-[#cdb9ab]">{points[hoveredPoint].date}</p>
                <p className="text-[#ffe9d9] font-bold">{points[hoveredPoint].calories} kcal</p>
                <p className="text-[#f3a675] text-[10px]">{points[hoveredPoint].hours} hrs active</p>
              </div>
            )}
          </div>

          {/* Chart X-axis labels */}
          <div className="flex justify-between items-center px-4 pt-3 border-t border-[rgba(255,233,217,0.12)] text-[11px] font-mono text-[#cdb9ab]">
            {PROGRESS_TRENDS.map((item, idx) => (
              <span key={idx}>{item.date}</span>
            ))}
          </div>
        </div>

        {/* Muscle Load Distribution */}
        <div className="bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <h3 className="text-lg font-bold text-[#ffe9d9] mb-1">Muscle Group Loading</h3>
            <p className="text-xs text-[#cdb9ab] font-mono">
              Biomechanical stress distribution
            </p>
          </div>

          <div className="space-y-4 my-4">
            {muscleGroups.map((group) => (
              <div key={group.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#cdb9ab]">{group.name}</span>
                  <span className="text-[#ffe9d9] font-bold">{group.percent}%</span>
                </div>
                <div className="w-full bg-[#1e0d05] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${group.color} transition-all duration-700`}
                    style={{ width: `${group.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-[#381909] border border-[rgba(255,233,217,0.12)] text-[11px] font-mono text-[#cdb9ab] flex items-center justify-between">
            <span>SYMMETRY INDEX</span>
            <span className="text-[#ffe9d9] font-bold">BALANCED 98.4%</span>
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
              className="bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl p-4 hover:border-[rgba(255,233,217,0.25)] transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between text-[#cdb9ab] mb-2">
                <span className="text-xs font-mono uppercase">{m.title}</span>
                <Icon className="w-4 h-4 text-[#f3a675]" />
              </div>
              <p className="text-2xl font-extrabold text-[#ffe9d9] tracking-tight">{m.value}</p>
              <p className="text-[11px] font-mono text-[#cdb9ab] mt-1">{m.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
