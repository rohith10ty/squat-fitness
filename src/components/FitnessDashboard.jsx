import React, { useState, useEffect } from 'react';
import { Footprints, Flame, Clock, Heart, Plus, TrendingUp, Calendar } from 'lucide-react';
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

  // Dynamic Current Day detection
  const dayIndexMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayName = dayIndexMap[new Date().getDay()];
  const todayItem = WEEKLY_ACTIVITY.find((d) => d.day === todayName) || WEEKLY_ACTIVITY[0];
  const [selectedDay, setSelectedDay] = useState(todayItem);

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
    <section id="dashboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#050801] text-[#E5FBD4]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5FBD4] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>METRIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Daily Fitness Dashboard
          </h2>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#182405] border border-[rgba(229,251,212,0.2)] text-[#E5FBD4] flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#E5FBD4]" />
            <span>TODAY: {todayName.toUpperCase()}</span>
          </span>
          <p className="text-xs text-[#E5FBD4]/75 font-mono">
            RECOVERY SCORE: <span className="text-[#E5FBD4] font-bold">94%</span>
          </p>
        </div>
      </div>

      {/* 4 Metric Cards in Deep Black Luxury Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Daily Steps */}
        <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4] shadow-sm">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#E5FBD4]">{stepPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono font-medium">Daily Steps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {stepGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[#182405] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* Card 2: Calories Burned */}
        <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4] shadow-sm">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#E5FBD4]">{calPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono font-medium">Active Burn</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {calories}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {calorieGoal} kcal</span>
            </div>
            <div className="w-full bg-[#182405] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center gap-2">
            <button
              onClick={() => setCalories((prev) => Math.min(prev + 100, 2500))}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Plus className="w-3 h-3" /> 100 kcal
            </button>
          </div>
        </div>

        {/* Card 3: Workout Duration */}
        <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-[#E5FBD4] shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#E5FBD4]">{durPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono font-medium">Training Duration</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E5FBD4] tracking-tight">
                {duration}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">/ {durationGoal} mins</span>
            </div>
            <div className="w-full bg-[#182405] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                style={{ width: `${durPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center gap-2">
            <button
              onClick={() => addDuration(15)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Plus className="w-3 h-3" /> 15m
            </button>
            <button
              onClick={() => addDuration(30)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <Plus className="w-3 h-3" /> 30m
            </button>
          </div>
        </div>

        {/* Card 4: Live Heart Rate BPM Monitor */}
        <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-5 hover:border-[rgba(229,251,212,0.3)] transition-all flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] flex items-center justify-center text-rose-400 shadow-sm">
              <Heart className="w-5 h-5 animate-pulse" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-950/70 text-rose-300 border border-rose-800/60 font-semibold">
              {isTrainingBpm ? 'ZONE 4 / PEAK' : 'ZONE 1 / RESTING'}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#E5FBD4]/70 font-mono font-medium">Telemetry Heart Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#E5FBD4] font-mono tracking-tight">
                {heartRate}
              </span>
              <span className="text-xs text-[#E5FBD4]/60 font-mono">BPM</span>
            </div>
            <div className="h-1.5 w-full bg-[#182405] rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, Math.round((heartRate / 180) * 100))}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.12)] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#E5FBD4]/70">Simulate:</span>
            <button
              onClick={() => setIsTrainingBpm(!isTrainingBpm)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#182405] hover:bg-[#253708] border border-[rgba(229,251,212,0.15)] text-[#E5FBD4] transition-colors cursor-pointer font-bold"
            >
              {isTrainingBpm ? 'Set Resting (72)' : 'Set Workout (145)'}
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Activity Section with Dynamic Current Day */}
      <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[rgba(229,251,212,0.12)] gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#E5FBD4] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#E5FBD4]" />
              Weekly Activity Telemetry
            </h3>
            <p className="text-xs text-[#E5FBD4]/70 font-mono mt-0.5">
              Current Day highlighted // Click any day to examine training logs
            </p>
          </div>
          <div className="text-xs font-mono text-[#E5FBD4]/80">
            TOTAL 7-DAY LOAD: <span className="font-bold text-[#E5FBD4]">4,710 kcal</span>
          </div>
        </div>

        {/* Weekly Bar Chart & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Daily Bar Visualizer with Current Day Badge */}
          <div className="lg:col-span-8 grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 sm:h-56 pt-4 pb-2">
            {WEEKLY_ACTIVITY.map((day) => {
              const isSelected = selectedDay.day === day.day;
              const isCurrentDay = day.day === todayName;
              const barHeightPercent = Math.round((day.calories / 800) * 100);
              return (
                <div
                  key={day.day}
                  onClick={() => setSelectedDay(day)}
                  className="flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  {/* Today Badge */}
                  {isCurrentDay ? (
                    <span className="text-[9px] font-mono font-black text-[#050801] bg-[#E5FBD4] px-1.5 py-0.2 rounded mb-1 tracking-tight shadow-xs">
                      TODAY
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#E5FBD4]/60 group-hover:text-[#E5FBD4] mb-1 transition-colors">
                      {day.calories}
                    </span>
                  )}

                  <div className="w-full max-w-[42px] bg-[#182405] h-full rounded-xl overflow-hidden flex items-end p-1 transition-all border border-[rgba(229,251,212,0.1)]">
                    <div
                      className={`w-full rounded-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#E5FBD4] shadow-md shadow-[#E5FBD4]/30'
                          : isCurrentDay
                          ? 'bg-[#A8DB84] shadow-xs'
                          : 'bg-[#31480A] group-hover:bg-[#46670E]'
                      }`}
                      style={{ height: `${barHeightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`mt-2 text-xs font-mono font-bold transition-colors ${
                      isSelected
                        ? 'text-[#E5FBD4] underline underline-offset-4'
                        : isCurrentDay
                        ? 'text-[#A8DB84]'
                        : 'text-[#E5FBD4]/65 group-hover:text-[#E5FBD4]'
                    }`}
                  >
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Day Telemetry Inspector */}
          <div className="lg:col-span-4 bg-[#131E04] border border-[rgba(229,251,212,0.18)] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5FBD4]/60 block">
                INSPECTED INTERVAL
              </span>
              {selectedDay.day === todayName && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E5FBD4] text-[#050801]">
                  CURRENT DAY
                </span>
              )}
            </div>
            <h4 className="text-xl font-bold text-[#E5FBD4]">
              {selectedDay.day} {selectedDay.day === todayName ? '(Today)' : ''} Training Breakdown
            </h4>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-[rgba(229,251,212,0.1)]">
                <span className="text-[#E5FBD4]/70">Expenditure</span>
                <span className="font-bold text-[#E5FBD4]">{selectedDay.calories} kcal</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[rgba(229,251,212,0.1)]">
                <span className="text-[#E5FBD4]/70">Step Count</span>
                <span className="font-bold text-[#E5FBD4]">{selectedDay.steps.toLocaleString()} steps</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[rgba(229,251,212,0.1)]">
                <span className="text-[#E5FBD4]/70">Duration</span>
                <span className="font-bold text-[#E5FBD4]">{selectedDay.duration} minutes</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#E5FBD4]/70">Intensity Rating</span>
                <span className="font-bold text-[#E5FBD4]">HIGH // RPE 8.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
