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
    <section id="dashboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-white text-gray-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#1D2B04] uppercase mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1D2B04]" />
            <span>METRIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Daily Fitness Dashboard
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-gray-500 font-mono">
          UPDATED LIVE // RECOVERY SCORE: <span className="text-[#1D2B04] font-bold">94%</span>
        </p>
      </div>

      {/* 4 Metric Cards in Clean Light Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Daily Steps */}
        <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-5 hover:border-gray-300 transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#1D2B04] shadow-xs">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-medium text-gray-500">{stepPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-mono font-medium">Daily Steps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-mono">/ {stepGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#1D2B04] h-full rounded-full transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
            <button
              onClick={() => addSteps(500)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" /> 500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" /> 1,000
            </button>
          </div>
        </div>

        {/* Card 2: Calories Burned */}
        <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-5 hover:border-gray-300 transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#1D2B04] shadow-xs">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-medium text-gray-500">{calPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-mono font-medium">Active Burn</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {calories}
              </span>
              <span className="text-xs text-gray-400 font-mono">/ {calorieGoal} kcal</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#1D2B04] h-full rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
            <button
              onClick={() => setCalories((prev) => Math.min(prev + 100, 2500))}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" /> 100 kcal
            </button>
          </div>
        </div>

        {/* Card 3: Workout Duration */}
        <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-5 hover:border-gray-300 transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#1D2B04] shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-medium text-gray-500">{durPercent}%</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-mono font-medium">Training Duration</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {duration}
              </span>
              <span className="text-xs text-gray-400 font-mono">/ {durationGoal} mins</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#1D2B04] h-full rounded-full transition-all duration-500"
                style={{ width: `${durPercent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
            <button
              onClick={() => addDuration(15)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" /> 15m
            </button>
            <button
              onClick={() => addDuration(30)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" /> 30m
            </button>
          </div>
        </div>

        {/* Card 4: Live Heart Rate BPM Monitor */}
        <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-5 hover:border-gray-300 transition-all flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-rose-500 shadow-xs">
              <Heart className="w-5 h-5 animate-pulse" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-50 text-rose-600 border border-rose-200 font-semibold">
              {isTrainingBpm ? 'ZONE 4 / PEAK' : 'ZONE 1 / RESTING'}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-mono font-medium">Telemetry Heart Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-mono tracking-tight">
                {heartRate}
              </span>
              <span className="text-xs text-gray-400 font-mono">BPM</span>
            </div>
            <div className="h-1.5 w-full bg-rose-100 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, Math.round((heartRate / 180) * 100))}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-500">Simulate:</span>
            <button
              onClick={() => setIsTrainingBpm(!isTrainingBpm)}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer shadow-2xs"
            >
              {isTrainingBpm ? 'Set Resting (72)' : 'Set Workout (145)'}
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Activity Section */}
      <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1D2B04]" />
              Weekly Activity Telemetry
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Click individual days to examine training logs and caloric distribution
            </p>
          </div>
          <div className="text-xs font-mono text-gray-500">
            TOTAL 7-DAY LOAD: <span className="font-bold text-gray-900">4,710 kcal</span>
          </div>
        </div>

        {/* Weekly Bar Chart & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Daily Bar Visualizer */}
          <div className="lg:col-span-8 grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 sm:h-52 pt-4 pb-2">
            {WEEKLY_ACTIVITY.map((day) => {
              const isSelected = selectedDay.day === day.day;
              const barHeightPercent = Math.round((day.calories / 800) * 100);
              return (
                <div
                  key={day.day}
                  onClick={() => setSelectedDay(day)}
                  className="flex flex-col items-center h-full justify-end cursor-pointer group"
                >
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-900 mb-1 transition-colors">
                    {day.calories}
                  </span>
                  <div className="w-full max-w-[42px] bg-gray-200 h-full rounded-lg overflow-hidden flex items-end p-1 transition-all">
                    <div
                      className={`w-full rounded-md transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#1D2B04] shadow-sm'
                          : 'bg-gray-400 group-hover:bg-[#1D2B04]/70'
                      }`}
                      style={{ height: `${barHeightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`mt-2 text-xs font-mono font-medium transition-colors ${
                      isSelected
                        ? 'text-[#1D2B04] font-bold underline underline-offset-4'
                        : 'text-gray-500 group-hover:text-gray-900'
                    }`}
                  >
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Day Telemetry Inspector */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              INSPECTED INTERVAL
            </span>
            <h4 className="text-xl font-bold text-gray-900">{selectedDay.day} Training Breakdown</h4>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Expenditure</span>
                <span className="font-bold text-gray-900">{selectedDay.calories} kcal</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Step Count</span>
                <span className="font-bold text-gray-900">{selectedDay.steps.toLocaleString()} steps</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Duration</span>
                <span className="font-bold text-gray-900">{selectedDay.duration} minutes</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500">Intensity Rating</span>
                <span className="font-bold text-[#1D2B04]">HIGH // RPE 8.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
