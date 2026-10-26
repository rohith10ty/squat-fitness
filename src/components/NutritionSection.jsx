import React, { useState } from 'react';
import { Droplets, Plus, Minus, PieChart } from 'lucide-react';
import { NUTRITION_MEALS } from '../data/fitnessData';

export default function NutritionSection() {
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [waterIntake, setWaterIntake] = useState(2500); // ml
  const waterGoal = 3200; // ml

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const filteredMeals =
    selectedMealType === 'All'
      ? NUTRITION_MEALS
      : NUTRITION_MEALS.filter((m) => m.mealType === selectedMealType);

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, 6000));
  };

  const subtractWater = (amount) => {
    setWaterIntake((prev) => Math.max(prev - amount, 0));
  };

  const waterPercent = Math.min(Math.round((waterIntake / waterGoal) * 100), 100);

  // Daily target macros
  const dailyTarget = {
    calories: 2200,
    currentCalories: 1900,
    protein: 165,
    currentProtein: 146,
    carbs: 210,
    currentCarbs: 182,
    fat: 65,
    currentFat: 55,
  };

  return (
    <section id="nutrition" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#050801] text-[#E5FBD4]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5FBD4] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>METABOLIC FUELING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Targeted Nutrition &amp; Fuel
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs text-[#E5FBD4]/70 font-mono">
          MACRO PRECISION // LEAN MASS RECOMPOSITION
        </p>
      </div>

      {/* Top Nutrition & Hydration Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Macro Overview Card */}
        <div className="lg:col-span-2 bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#E5FBD4] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#E5FBD4]" />
              Daily Macronutrient Target
            </h3>
            <span className="text-xs font-mono text-[#E5FBD4]/70">
              {dailyTarget.currentCalories} / {dailyTarget.calories} kcal
            </span>
          </div>

          {/* 3 Macro Bars */}
          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#E5FBD4]/70 font-medium">PROTEIN (TARGET 2.0g/kg)</span>
                <span className="text-[#E5FBD4] font-bold">
                  {dailyTarget.currentProtein}g / {dailyTarget.protein}g ({Math.round((dailyTarget.currentProtein / dailyTarget.protein) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#182405] h-2.5 rounded-full overflow-hidden border border-[rgba(229,251,212,0.1)]">
                <div
                  className="bg-[#E5FBD4] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentProtein / dailyTarget.protein) * 100}%` }}
                />
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#E5FBD4]/70 font-medium">COMPLEX CARBOHYDRATES</span>
                <span className="text-[#E5FBD4] font-bold">
                  {dailyTarget.currentCarbs}g / {dailyTarget.carbs}g ({Math.round((dailyTarget.currentCarbs / dailyTarget.carbs) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#182405] h-2.5 rounded-full overflow-hidden border border-[rgba(229,251,212,0.1)]">
                <div
                  className="bg-[#A6C98E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentCarbs / dailyTarget.carbs) * 100}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#E5FBD4]/70 font-medium">HEALTHY LIPIDS &amp; ESSENTIAL FATS</span>
                <span className="text-[#E5FBD4] font-bold">
                  {dailyTarget.currentFat}g / {dailyTarget.fat}g ({Math.round((dailyTarget.currentFat / dailyTarget.fat) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#182405] h-2.5 rounded-full overflow-hidden border border-[rgba(229,251,212,0.1)]">
                <div
                  className="bg-[#6F9751] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentFat / dailyTarget.fat) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[rgba(229,251,212,0.1)] flex items-center justify-between text-[11px] font-mono text-[#E5FBD4]/70">
            <span>DIETARY STRATEGY: CLEAN BULK / RECOMP</span>
            <span className="text-[#E5FBD4] font-bold">DEFICIT BUFFER: 300 kcal</span>
          </div>
        </div>

        {/* Interactive Hydration Tracker */}
        <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#E5FBD4] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-sky-400" />
                Hydration Tracker
              </h3>
              <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-full font-bold border border-sky-500/40">
                {waterPercent}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold font-mono text-[#E5FBD4]">
                {(waterIntake / 1000).toFixed(2)}
              </span>
              <span className="text-xs font-mono text-[#E5FBD4]/60">/ {(waterGoal / 1000).toFixed(1)} L</span>
            </div>

            {/* Water Progress */}
            <div className="w-full bg-[#182405] h-3 rounded-full overflow-hidden border border-[rgba(229,251,212,0.1)]">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          {/* Water quick adjustments */}
          <div className="mt-6 pt-4 border-t border-[rgba(229,251,212,0.1)] space-y-2">
            <p className="text-[11px] font-mono text-[#E5FBD4]/70 uppercase font-bold">Log Intake:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addWater(250)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] hover:border-[#E5FBD4] text-[#E5FBD4] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-sky-400" /> 250 ml
              </button>
              <button
                onClick={() => addWater(500)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] hover:border-[#E5FBD4] text-[#E5FBD4] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-sky-400" /> 500 ml
              </button>
              <button
                onClick={() => subtractWater(250)}
                title="Subtract 250ml"
                className="p-1.5 rounded-xl bg-[#182405] border border-[rgba(229,251,212,0.2)] hover:border-[#E5FBD4] text-[#E5FBD4]/70 hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {mealTypes.map((type) => {
          const isActive = selectedMealType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedMealType(type)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#E5FBD4] text-[#050801] font-bold shadow-md shadow-[#E5FBD4]/15'
                  : 'bg-[#0D1403] text-[#E5FBD4]/75 border border-[rgba(229,251,212,0.2)] hover:text-[#E5FBD4] hover:bg-[#182405]'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="group bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl overflow-hidden hover:border-[rgba(229,251,212,0.35)] transition-all flex flex-col justify-between shadow-xl"
          >
            {/* Meal Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#111A04]">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1403] via-transparent to-black/30" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#E5FBD4] uppercase border border-[rgba(229,251,212,0.2)]">
                {meal.mealType}
              </span>
              <span className="absolute bottom-2 right-3 text-sm font-mono font-bold text-[#E5FBD4]">
                {meal.calories} <span className="text-[10px] text-[#E5FBD4]/60">KCAL</span>
              </span>
            </div>

            {/* Meal Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-[#E5FBD4] group-hover:text-white transition-colors leading-snug">
                  {meal.name}
                </h4>

                {/* Macro Badges */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[rgba(229,251,212,0.1)] text-center text-[11px] font-mono">
                  <div className="bg-[#182405] border border-[rgba(229,251,212,0.12)] p-1.5 rounded-lg">
                    <span className="block text-[#E5FBD4] font-bold">{meal.protein}g</span>
                    <span className="text-[9px] text-[#E5FBD4]/60">PRO</span>
                  </div>
                  <div className="bg-[#182405] border border-[rgba(229,251,212,0.12)] p-1.5 rounded-lg">
                    <span className="block text-[#E5FBD4] font-bold">{meal.carbs}g</span>
                    <span className="text-[9px] text-[#E5FBD4]/60">CARB</span>
                  </div>
                  <div className="bg-[#182405] border border-[rgba(229,251,212,0.12)] p-1.5 rounded-lg">
                    <span className="block text-[#E5FBD4] font-bold">{meal.fat}g</span>
                    <span className="text-[9px] text-[#E5FBD4]/60">FAT</span>
                  </div>
                </div>

                {/* Key Ingredients tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {meal.ingredients.slice(0, 3).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#E5FBD4]/70 bg-[#182405] border border-[rgba(229,251,212,0.1)] px-2 py-0.5 rounded-md"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
