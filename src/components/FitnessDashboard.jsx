import React, { useState, useEffect } from 'react';
import { Footprints, Flame, Clock, Heart, Plus, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
import { WEEKLY_ACTIVITY } from '../data/fitnessData';

export default function FitnessDashboard() {
  const [steps, setSteps] = useState(8450);
  const stepGoal = 10000;
  const [calories, setCalories] = useState(640);
  const calorieGoal = 800;
  const [duration, setDuration] = useState(48); // mins
  const durationGoal = 60;
  const [isTrainingBpm, setIsTrainingBpm] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [selectedDay, setSelectedDay] = useState(WEEKLY_ACTIVITY[6]); // default to Sunday / Today

  // Simulated live subtle heart rate fluctuations
  useEffect(() => {
    const baseBpm = isTrainingBpm ? 142 : 72;
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      setHeartRate(baseBpm + delta);
    }, 2000);
    return () => clearInterval(interval);
  }, [isTrainingBpm]);

  const addSteps = (amount) => {
    setSteps((prev) => Math.min(prev + amount, 30000));
    setCalories((prev) => Math.min(prev + Math.round(amount * 0.04), 2500));
  };

  const addDuration = (mins) => {
    setDuration((prev) => Math.min(prev + mins, 180));
    setCalories((prev) => Math.min(prev + mins * 8, 2500));
  };

  const stepPercent = Math.min(Math.round((steps / stepGoal) * 100), 100);
  const calPercent = Math.min(Math.round((calories / calorieGoal) * 100), 100);
  const durPercent = Math.min(Math.round((duration / durationGoal) * 100), 100);

  return (
    <section id="dashboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
            <span>METRIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Daily Fitness Dashboard
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#a1a1aa] font-mono">
          UPDATED LIVE // TODAY'S RECOVERY SCORE: <span className="text-[#ccff00]">94%</span>
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Daily Steps */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 hover:border-[#383838] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#303030] flex items-center justify-center text-[#ccff00]">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#a1a1aa]">{stepPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#71717a] font-mono">Daily Steps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-[#71717a] font-mono">/ {stepGoal.toLocaleString()}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#ccff00] h-full rounded-full transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>
          {/* Quick Increment buttons */}
          <div className="mt-4 pt-3 border-t border-[#262626] flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#222] hover:bg-[#2c2c2c] text-[#d4d4d8] hover:text-[#ccff00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#222] hover:bg-[#2c2c2c] text-[#d4d4d8] hover:text-[#ccff00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* Card 2: Calories Burned */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 hover:border-[#383838] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#303030] flex items-center justify-center text-[#ff6b35]">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#a1a1aa]">{calPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#71717a] font-mono">Active Burn</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {calories}
              </span>
              <span className="text-xs text-[#71717a] font-mono">/ {calorieGoal} kcal</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#ff6b35] h-full rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
            <span>BASAL: 1,820 kcal</span>
            <span className="text-[#ff6b35]">TOTAL: {calories + 1820}</span>
          </div>
        </div>

        {/* Card 3: Workout Duration */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 hover:border-[#383838] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#303030] flex items-center justify-center text-[#00f0ff]">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#a1a1aa]">{durPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#71717a] font-mono">Active Time</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {duration}
              </span>
              <span className="text-xs text-[#71717a] font-mono">/ {durationGoal} min</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#00f0ff] h-full rounded-full transition-all duration-500"
                style={{ width: `${durPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#262626] flex items-center gap-2">
            <button
              onClick={() => addDuration(10)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#222] hover:bg-[#2c2c2c] text-[#d4d4d8] hover:text-[#00f0ff] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 10m
            </button>
            <button
              onClick={() => addDuration(20)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#222] hover:bg-[#2c2c2c] text-[#d4d4d8] hover:text-[#00f0ff] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 20m
            </button>
          </div>
        </div>

        {/* Card 4: Heart Rate & ECG Monitor */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 hover:border-[#383838] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#303030] flex items-center justify-center text-[#ff3366]">
              <Heart className={`w-5 h-5 ${isTrainingBpm ? 'animate-ping' : 'animate-pulse'}`} />
            </div>
            <button
              onClick={() => setIsTrainingBpm(!isTrainingBpm)}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#333] hover:border-[#ff3366] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            >
              {isTrainingBpm ? 'TRAINING' : 'RESTING'}
            </button>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#71717a] font-mono">Heart Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {heartRate}
              </span>
              <span className="text-xs text-[#71717a] font-mono">BPM</span>
            </div>
            {/* Animated SVG Pulse wave */}
            <div className="w-full h-8 mt-2 overflow-hidden flex items-center">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M0,20 L40,20 L50,8 L60,32 L70,12 L80,24 L90,20 L200,20"
                  fill="none"
                  stroke="#ff3366"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono text-[#71717a]">
            <span>HRV: 68 ms</span>
            <span className="text-[#ccff00]">OPTIMAL</span>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart Component */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#ccff00]" />
              Weekly Activity Consistency
            </h3>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Click any day bar to inspect day telemetry
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#a1a1aa]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" /> Steps Target Met (&gt;9,000)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3d3d3d]" /> Baseline
            </span>
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6 pb-2 border-b border-[#262626]">
          {WEEKLY_ACTIVITY.map((item) => {
            const heightPercent = Math.min(Math.round((item.steps / 15000) * 100), 100);
            const isSelected = selectedDay.day === item.day;
            const isHigh = item.steps >= 9000;

            return (
              <div
                key={item.day}
                onClick={() => setSelectedDay(item)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Bar Value Tooltip on hover/select */}
                <span
                  className={`text-[10px] font-mono mb-2 transition-all ${
                    isSelected ? 'text-[#ccff00] font-bold' : 'text-[#71717a] group-hover:text-white'
                  }`}
                >
                  {(item.steps / 1000).toFixed(1)}k
                </span>

                {/* The Bar */}
                <div className="w-full max-w-[44px] bg-[#242424] rounded-t-sm h-full flex items-end p-0.5 overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      isSelected
                        ? 'bg-[#ccff00]'
                        : isHigh
                        ? 'bg-[#ccff00]/70 group-hover:bg-[#ccff00]'
                        : 'bg-[#3f3f46] group-hover:bg-[#52525b]'
                    }`}
                  />
                </div>

                {/* Day label */}
                <span
                  className={`mt-2 text-xs font-mono transition-colors ${
                    isSelected ? 'text-[#ccff00] font-bold' : item.today ? 'text-white' : 'text-[#71717a]'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Day Summary Badge */}
        {selectedDay && (
          <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#a1a1aa]">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">SELECTED: {selectedDay.day.toUpperCase()}</span>
              {selectedDay.today && (
                <span className="px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] text-[10px]">
                  TODAY
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>Steps: <strong className="text-white">{selectedDay.steps.toLocaleString()}</strong></span>
              <span>Calories: <strong className="text-[#ff6b35]">{selectedDay.calories} kcal</strong></span>
              <span>Active: <strong className="text-[#00f0ff]">{selectedDay.minutes} mins</strong></span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
