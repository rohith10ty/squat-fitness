import React, { useState, useEffect } from 'react';
import { Footprints, Flame, Clock, Heart, Plus, TrendingUp } from 'lucide-react';
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
    <section id="dashboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#1D2B04]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[rgba(229,251,212,0.18)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5FBD4] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>METRIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Daily Fitness Dashboard
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#E5FBD4]/80 font-mono">
          UPDATED LIVE // RECOVERY SCORE: <span className="text-[#E5FBD4] font-bold">94%</span>
        </p>
      </div>

      {/* 4 Metric Cards in Forest Green Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Daily Steps */}
        <div className="bg-[#243506] border border-[rgba(229,251,212,0.16)] rounded-xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#2f4509] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4]">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#E5FBD4]/80">{stepPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono">Daily Steps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {stepGoal.toLocaleString()}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#182403] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>
          {/* Quick Increment buttons */}
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#2f4509] hover:bg-[#3d5a0c] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#2f4509] hover:bg-[#3d5a0c] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* Card 2: Calories Burned */}
        <div className="bg-[#243506] border border-[rgba(229,251,212,0.16)] rounded-xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#2f4509] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4]">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#E5FBD4]/80">{calPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono">Active Burn</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {calories}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {calorieGoal} kcal</span>
            </div>
            <div className="w-full bg-[#182403] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center justify-between text-[11px] font-mono text-[#E5FBD4]/70">
            <span>BASAL: 1,820 kcal</span>
            <span className="text-[#E5FBD4] font-bold">TOTAL: {calories + 1820}</span>
          </div>
        </div>

        {/* Card 3: Workout Duration */}
        <div className="bg-[#243506] border border-[rgba(229,251,212,0.16)] rounded-xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#2f4509] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4]">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#E5FBD4]/80">{durPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono">Active Time</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {duration}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {durationGoal} min</span>
            </div>
            <div className="w-full bg-[#182403] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${durPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center gap-2">
            <button
              onClick={() => addDuration(10)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#2f4509] hover:bg-[#3d5a0c] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 10m
            </button>
            <button
              onClick={() => addDuration(20)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#2f4509] hover:bg-[#3d5a0c] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 20m
            </button>
          </div>
        </div>

        {/* Card 4: Heart Rate & ECG Monitor */}
        <div className="bg-[#243506] border border-[rgba(229,251,212,0.16)] rounded-xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#2f4509] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4]">
              <Heart className={`w-5 h-5 ${isTrainingBpm ? 'animate-ping' : 'animate-pulse'}`} />
            </div>
            <button
              onClick={() => setIsTrainingBpm(!isTrainingBpm)}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-[rgba(229,251,212,0.25)] hover:border-[#E5FBD4] text-[#E5FBD4]/80 hover:text-[#E5FBD4] transition-colors cursor-pointer"
            >
              {isTrainingBpm ? 'TRAINING' : 'RESTING'}
            </button>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono">Heart Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {heartRate}
              </span>
              <span className="text-xs text-[#E5FBD4]/70 font-mono">BPM</span>
            </div>
            {/* Animated SVG Pulse wave in Clean Mint */}
            <div className="w-full h-8 mt-2 overflow-hidden flex items-center">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M0,20 L40,20 L50,8 L60,32 L70,12 L80,24 L90,20 L200,20"
                  fill="none"
                  stroke="#E5FBD4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[rgba(229,251,212,0.12)] flex items-center justify-between text-[11px] font-mono text-[#E5FBD4]/70">
            <span>HRV: 68 ms</span>
            <span className="text-[#E5FBD4] font-bold">OPTIMAL</span>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart Component */}
      <div className="bg-[#243506] border border-[rgba(229,251,212,0.16)] rounded-xl p-6 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#E5FBD4] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E5FBD4]" />
              Weekly Activity Consistency
            </h3>
            <p className="text-xs text-[#E5FBD4]/70 font-mono mt-1">
              Click any day bar to inspect day telemetry
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#E5FBD4]/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5FBD4]" /> Target Met (&gt;9,000)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3d5a0c]" /> Baseline
            </span>
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6 pb-2 border-b border-[rgba(229,251,212,0.15)]">
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
                {/* Bar Value Tooltip */}
                <span
                  className={`text-[10px] font-mono mb-2 transition-all ${
                    isSelected ? 'text-[#E5FBD4] font-bold' : 'text-[#E5FBD4]/60 group-hover:text-[#E5FBD4]'
                  }`}
                >
                  {(item.steps / 1000).toFixed(1)}k
                </span>

                {/* The Bar */}
                <div className="w-full max-w-[44px] bg-[#2f4509] rounded-t-sm h-full flex items-end p-0.5 overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      isSelected
                        ? 'bg-[#E5FBD4]'
                        : isHigh
                        ? 'bg-[#E5FBD4]/75 group-hover:bg-[#E5FBD4]'
                        : 'bg-[#4a6b12] group-hover:bg-[#5b8316]'
                    }`}
                  />
                </div>

                {/* Day label */}
                <span
                  className={`mt-2 text-xs font-mono transition-colors ${
                    isSelected ? 'text-[#E5FBD4] font-bold' : item.today ? 'text-[#E5FBD4]' : 'text-[#E5FBD4]/60'
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
          <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#E5FBD4]/80">
            <div className="flex items-center gap-2">
              <span className="text-[#E5FBD4] font-semibold">SELECTED: {selectedDay.day.toUpperCase()}</span>
              {selectedDay.today && (
                <span className="px-2 py-0.5 rounded bg-[#E5FBD4]/20 text-[#E5FBD4] text-[10px] border border-[#E5FBD4]/30 font-bold">
                  TODAY
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>Steps: <strong className="text-[#E5FBD4]">{selectedDay.steps.toLocaleString()}</strong></span>
              <span>Calories: <strong className="text-[#E5FBD4]">{selectedDay.calories} kcal</strong></span>
              <span>Active: <strong className="text-[#E5FBD4]">{selectedDay.minutes} mins</strong></span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
