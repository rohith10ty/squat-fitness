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

  // Simulated live heart rate fluctuations
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
    <section id="dashboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#0A0A0A] text-[#F5F1E8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4C9B7] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5F1E8]" />
            <span>METRIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Daily Fitness Dashboard
          </h2>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#141414] border border-[#333333] text-[#F5F1E8] flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#F5F1E8]" />
            <span>TODAY: {todayName.toUpperCase()}</span>
          </span>
          <p className="text-xs text-[#D4C9B7]/75 font-mono">
            RECOVERY SCORE: <span className="text-white font-bold">94%</span>
          </p>
        </div>
      </div>

      {/* 4 Metric Cards in Luxury Warm Cream / Beige */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Daily Steps */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-5 hover:border-[#1E1B18]/40 transition-all flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] shadow-sm">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#1E1B18] bg-[#EAE3D5] px-2 py-0.5 rounded border border-[#D8CFBF]">{stepPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6A6055] font-mono font-medium">Daily Steps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-[#6A6055] font-mono">/ {stepGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[#DFD7C8] h-2 rounded-full mt-3 overflow-hidden border border-[#D8CFBF]">
              <div
                className="bg-[#1E1B18] h-full rounded-full transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D8CFBF] flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white hover:bg-[#EAE3D5] border border-[#D8CFBF] text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white hover:bg-[#EAE3D5] border border-[#D8CFBF] text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* Card 2: Calories Burned */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-5 hover:border-[#1E1B18]/40 transition-all flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D8CFBF] flex items-center justify-center text-orange-600 shadow-sm">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-mono font-bold text-[#1E1B18] bg-[#EAE3D5] px-2 py-0.5 rounded border border-[#D8CFBF]">{calPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6A6055] font-mono font-medium">Active Burn</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight">
                {calories}
              </span>
              <span className="text-xs text-[#6A6055] font-mono">/ {calorieGoal} kcal</span>
            </div>
            <div className="w-full bg-[#DFD7C8] h-2 rounded-full mt-3 overflow-hidden border border-[#D8CFBF]">
              <div
                className="bg-[#1E1B18] h-full rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D8CFBF] flex items-center justify-between text-xs font-mono text-[#6A6055]">
            <span>Est. Fat: <strong className="text-[#1E1B18]">58g</strong></span>
            <span>METs: <strong className="text-[#1E1B18]">6.2</strong></span>
          </div>
        </div>

        {/* Card 3: Workout Duration */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-5 hover:border-[#1E1B18]/40 transition-all flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#1E1B18] bg-[#EAE3D5] px-2 py-0.5 rounded border border-[#D8CFBF]">{durPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6A6055] font-mono font-medium">Workout Time</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight">
                {duration}
              </span>
              <span className="text-xs text-[#6A6055] font-mono">/ {durationGoal} mins</span>
            </div>
            <div className="w-full bg-[#DFD7C8] h-2 rounded-full mt-3 overflow-hidden border border-[#D8CFBF]">
              <div
                className="bg-[#1E1B18] h-full rounded-full transition-all duration-500"
                style={{ width: `${durPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D8CFBF] flex items-center gap-2">
            <button
              onClick={() => addDuration(15)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white hover:bg-[#EAE3D5] border border-[#D8CFBF] text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
            >
              <Plus className="w-3 h-3" /> 15m
            </button>
            <button
              onClick={() => addDuration(30)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white hover:bg-[#EAE3D5] border border-[#D8CFBF] text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
            >
              <Plus className="w-3 h-3" /> 30m
            </button>
          </div>
        </div>

        {/* Card 4: Biometric Heart Rate */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-5 hover:border-[#1E1B18]/40 transition-all flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D8CFBF] flex items-center justify-center text-rose-600 shadow-sm">
              <Heart className={`w-5 h-5 ${isTrainingBpm ? 'animate-ping' : ''}`} />
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EAE3D5] border border-[#D8CFBF] text-[#1E1B18] font-bold">
              {isTrainingBpm ? 'ZONE 4 // HIIT' : 'ZONE 1 // REST'}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6A6055] font-mono font-medium">Live Heart Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight">
                {heartRate}
              </span>
              <span className="text-xs text-[#6A6055] font-mono">BPM</span>
            </div>
            <div className="flex items-center gap-1 mt-3 h-3">
              {[40, 60, 35, 80, 55, 90, 70, 45, 65, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#1E1B18] rounded-full transition-all duration-300"
                  style={{
                    height: `${isTrainingBpm ? Math.min(100, h * 1.3) : h}%`,
                    opacity: 0.35 + (i / 10) * 0.65,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D8CFBF] flex items-center justify-between">
            <button
              onClick={() => setIsTrainingBpm(!isTrainingBpm)}
              className="text-xs font-mono font-bold text-[#1E1B18] hover:underline cursor-pointer"
            >
              {isTrainingBpm ? 'Switch to Resting' : 'Simulate Workout BPM'}
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Activity Breakdown - Warm Cream / Beige Card */}
      <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 sm:p-8 shadow-xl text-[#1E1B18]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-[#D8CFBF] pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#1E1B18] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1E1B18]" />
              Weekly Workload &amp; Volume
            </h3>
            <p className="text-xs text-[#6A6055] font-mono mt-1">
              Click any bar to inspect training intensity and caloric load
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#1E1B18] font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#1E1B18]" />
              Active Day
            </span>
            <span className="flex items-center gap-1.5 text-[#6A6055]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#DFD7C8] border border-[#D8CFBF]" />
              Rest / Target
            </span>
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-64 pt-6 pb-2">
          {WEEKLY_ACTIVITY.map((item) => {
            const isToday = item.day === todayName;
            const isSelected = selectedDay.day === item.day;
            const heightPercent = Math.min(Math.round((item.steps / 14000) * 100), 100);

            return (
              <div
                key={item.day}
                onClick={() => setSelectedDay(item)}
                className="group flex flex-col items-center justify-end h-full cursor-pointer relative"
              >
                {/* Current Day Pill Banner */}
                {isToday && (
                  <div className="absolute -top-7 px-2 py-0.5 rounded-full bg-[#1E1B18] text-[#F5F1E8] text-[9px] font-mono font-black tracking-wider uppercase shadow-md animate-bounce">
                    TODAY
                  </div>
                )}

                {/* Hover / Selected Value Tooltip */}
                <span
                  className={`text-[10px] sm:text-xs font-mono mb-2 transition-all ${
                    isSelected
                      ? 'text-[#1E1B18] font-black scale-110'
                      : 'text-[#6A6055] group-hover:text-[#1E1B18]'
                  }`}
                >
                  {(item.steps / 1000).toFixed(1)}k
                </span>

                {/* Bar */}
                <div className="w-full max-w-[48px] bg-[#DFD7C8] rounded-xl h-full flex items-end overflow-hidden border border-[#D8CFBF] p-1">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-[#1E1B18] shadow-md'
                        : isSelected
                        ? 'bg-[#1E1B18]/80'
                        : 'bg-[#A48261] group-hover:bg-[#1E1B18]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label with Today Indicator */}
                <div className="flex flex-col items-center mt-3">
                  <span
                    className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                      isToday
                        ? 'text-[#1E1B18] font-black border-b-2 border-[#1E1B18]'
                        : isSelected
                        ? 'text-[#1E1B18] font-bold'
                        : 'text-[#6A6055] group-hover:text-[#1E1B18]'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Telemetry Breakdown */}
        <div className="mt-8 p-5 rounded-xl bg-[#EAE3D5] border border-[#D8CFBF] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1E1B18] text-[#F5F1E8] flex items-center justify-center font-mono font-black text-sm">
              {selectedDay.day}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#1E1B18] uppercase">
                  {selectedDay.day}'s Logged Performance
                </h4>
                {selectedDay.day === todayName && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#1E1B18] text-[#F5F1E8] font-black">
                    CURRENT DAY
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6A6055] font-mono mt-0.5">
                Session telemetry and biomechanical output
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center sm:text-right text-xs font-mono">
            <div className="p-2 sm:p-0">
              <span className="text-[#6A6055] block text-[10px]">STEPS LOGGED</span>
              <span className="text-sm font-bold text-[#1E1B18]">
                {selectedDay.steps.toLocaleString()}
              </span>
            </div>
            <div className="p-2 sm:p-0 border-x sm:border-none border-[#D8CFBF]">
              <span className="text-[#6A6055] block text-[10px]">ENERGY EXPENDED</span>
              <span className="text-sm font-bold text-orange-600 font-mono">
                {selectedDay.calories} kcal
              </span>
            </div>
            <div className="p-2 sm:p-0">
              <span className="text-[#6A6055] block text-[10px]">TIME IN MOTION</span>
              <span className="text-sm font-bold text-[#1E1B18] font-mono">
                {selectedDay.duration} mins
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
