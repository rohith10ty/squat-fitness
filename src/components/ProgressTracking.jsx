import React, { useState } from 'react';
import { TrendingUp, Award, BarChart2, Activity, Zap } from 'lucide-react';
import { PROGRESS_TRENDS } from '../data/fitnessData';

export default function ProgressTracking() {
  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const muscleGroups = [
    { name: 'Lower Body (Quads & Glutes)', percent: 34, color: 'bg-[#1E1B18]' },
    { name: 'Posterior Chain & Back', percent: 26, color: 'bg-[#3D352E]' },
    { name: 'Chest & Anterior Deltoids', percent: 22, color: 'bg-[#6A6055]' },
    { name: 'Core Stability & Lumbar', percent: 18, color: 'bg-[#8C7D70]' },
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
    <section id="progress" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#0A0A0A] text-[#F5F1E8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4C9B7] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5F1E8]" />
            <span>PROGRESSION CURVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Performance Analytics &amp; Trends
          </h2>
        </div>

        {/* Timeframe selector */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-[#333333]">
          {['7D', '30D', '90D', '1Y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                timeframe === t
                  ? 'bg-[#F5F1E8] text-[#1E1B18] font-bold shadow-sm'
                  : 'text-[#D4C9B7]/70 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart + Muscle Balance Grid - Warm Cream Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Calorie & Volume Progression Chart */}
        <div className="lg:col-span-2 bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1E1B18] flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#1E1B18]" />
                Expenditure &amp; Load Trajectory
              </h3>
              <p className="text-xs text-[#6A6055] font-mono mt-0.5">
                Hover data points to inspect caloric burn &amp; training volume
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#F5F1E8] bg-[#1E1B18] px-2.5 py-1 rounded-full font-bold shadow-sm">
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
                <linearGradient id="chartGradientCream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E1B18" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1E1B18" stopOpacity="0.0" />
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
                    stroke="#D8CFBF"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#chartGradientCream)" />

              {/* Curve line */}
              <path
                d={pathD}
                fill="none"
                stroke="#1E1B18"
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
                    fill={hoveredPoint === index ? '#1E1B18' : '#FFFFFF'}
                    stroke="#1E1B18"
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
                className="absolute -top-4 pointer-events-none bg-[#1E1B18] border border-[#1E1B18] px-3 py-1.5 rounded-xl text-xs font-mono shadow-2xl transform -translate-x-1/2 transition-all text-[#F5F1E8]"
                style={{
                  left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                }}
              >
                <p className="text-[#D4C9B7]">{points[hoveredPoint].date}</p>
                <p className="text-white font-bold">{points[hoveredPoint].calories} kcal</p>
                <p className="text-[#F5F1E8] text-[10px]">{points[hoveredPoint].hours} hrs active</p>
              </div>
            )}
          </div>

          {/* Chart X-axis labels */}
          <div className="flex justify-between items-center px-4 pt-3 border-t border-[#D8CFBF] text-[11px] font-mono text-[#6A6055]">
            {PROGRESS_TRENDS.map((item, idx) => (
              <span key={idx}>{item.date}</span>
            ))}
          </div>
        </div>

        {/* Muscle Load Distribution Card */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div>
            <h3 className="text-lg font-bold text-[#1E1B18] mb-1">Muscle Group Loading</h3>
            <p className="text-xs text-[#6A6055] font-mono">
              Biomechanical stress distribution
            </p>
          </div>

          <div className="space-y-4 my-4">
            {muscleGroups.map((group) => (
              <div key={group.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#6A6055]">{group.name}</span>
                  <span className="text-[#1E1B18] font-bold">{group.percent}%</span>
                </div>
                <div className="w-full bg-[#DFD7C8] h-2 rounded-full overflow-hidden border border-[#D8CFBF]">
                  <div
                    className={`h-full rounded-full ${group.color} transition-all duration-700`}
                    style={{ width: `${group.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#EAE3D5] border border-[#D8CFBF] text-[11px] font-mono text-[#6A6055] flex items-center justify-between shadow-xs">
            <span>SYMMETRY INDEX</span>
            <span className="text-[#1E1B18] font-bold">BALANCED 98.4%</span>
          </div>
        </div>
      </div>

      {/* 4 Milestones Cards in Warm Cream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestones.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-4 hover:border-[#1E1B18]/40 transition-colors shadow-lg text-[#1E1B18]"
            >
              <div className="flex items-center justify-between text-[#6A6055] mb-2">
                <span className="text-xs font-mono uppercase font-bold">{m.title}</span>
                <Icon className="w-4 h-4 text-[#1E1B18]" />
              </div>
              <p className="text-2xl font-extrabold text-[#1E1B18] tracking-tight font-mono">{m.value}</p>
              <p className="text-[11px] font-mono text-[#6A6055] mt-1">{m.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
