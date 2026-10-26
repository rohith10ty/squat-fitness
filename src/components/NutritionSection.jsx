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
    <section id="nutrition" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(255,233,217,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f3a675] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f3a675]" />
            <span>METABOLIC FUELING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#ffe9d9]">
            Targeted Nutrition &amp; Fuel
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#cdb9ab] font-mono">
          MACRO PRECISION // LEAN MASS RECOMPOSITION
        </p>
      </div>

      {/* Top Nutrition & Hydration Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Macro Overview Card */}
        <div className="lg:col-span-2 bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#ffe9d9] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#f3a675]" />
              Daily Macronutrient Target
            </h3>
            <span className="text-xs font-mono text-[#cdb9ab]">
              {dailyTarget.currentCalories} / {dailyTarget.calories} kcal
            </span>
          </div>

          {/* 3 Macro Bars in Warm Luxury Palette */}
          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdb9ab]">PROTEIN (TARGET 2.0g/kg)</span>
                <span className="text-[#ffe9d9] font-bold">
                  {dailyTarget.currentProtein}g / {dailyTarget.protein}g ({Math.round((dailyTarget.currentProtein / dailyTarget.protein) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#1e0d05] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ffe9d9] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentProtein / dailyTarget.protein) * 100}%` }}
                />
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdb9ab]">COMPLEX CARBOHYDRATES</span>
                <span className="text-[#ffe9d9] font-bold">
                  {dailyTarget.currentCarbs}g / {dailyTarget.carbs}g ({Math.round((dailyTarget.currentCarbs / dailyTarget.carbs) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#1e0d05] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#f3a675] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentCarbs / dailyTarget.carbs) * 100}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#cdb9ab]">HEALTHY LIPIDS &amp; ESSENTIAL FATS</span>
                <span className="text-[#ffe9d9] font-bold">
                  {dailyTarget.currentFat}g / {dailyTarget.fat}g ({Math.round((dailyTarget.currentFat / dailyTarget.fat) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#1e0d05] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ff7e36] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentFat / dailyTarget.fat) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[rgba(255,233,217,0.1)] flex items-center justify-between text-[11px] font-mono text-[#cdb9ab]">
            <span>DIETARY STRATEGY: CLEAN BULK / RECOMP</span>
            <span className="text-[#ffe9d9] font-bold">DEFICIT BUFFER: 300 kcal</span>
          </div>
        </div>

        {/* Interactive Hydration Tracker */}
        <div className="bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#ffe9d9] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#f3a675]" />
                Hydration Tracker
              </h3>
              <span className="text-xs font-mono text-[#ffe9d9] bg-[#ffe9d9]/15 px-2 py-0.5 rounded font-bold">
                {waterPercent}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold font-mono text-[#ffe9d9]">
                {(waterIntake / 1000).toFixed(2)}
              </span>
              <span className="text-xs font-mono text-[#cdb9ab]">/ {(waterGoal / 1000).toFixed(1)} L</span>
            </div>

            {/* Water Progress */}
            <div className="w-full bg-[#1e0d05] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#f3a675] h-full rounded-full transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          {/* Water quick adjustments */}
          <div className="mt-6 pt-4 border-t border-[rgba(255,233,217,0.1)] space-y-2">
            <p className="text-[11px] font-mono text-[#cdb9ab] uppercase">Log Glass / Bottle:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addWater(250)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#381909] hover:bg-[#4a220e] text-[#ffe9d9] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#f3a675]" /> 250 ml
              </button>
              <button
                onClick={() => addWater(500)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#381909] hover:bg-[#4a220e] text-[#ffe9d9] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#f3a675]" /> 500 ml
              </button>
              <button
                onClick={() => subtractWater(250)}
                title="Subtract 250ml"
                className="p-1.5 rounded-lg bg-[#381909] hover:bg-[#4a220e] text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors cursor-pointer"
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
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#ffe9d9] text-[#331707] font-bold shadow-md shadow-black/40'
                  : 'bg-[#2d1408] text-[#cdb9ab] border border-[rgba(255,233,217,0.12)] hover:text-[#ffe9d9] hover:border-[rgba(255,233,217,0.25)]'
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
            className="group bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl overflow-hidden hover:border-[rgba(255,233,217,0.25)] transition-all flex flex-col justify-between shadow-xl shadow-black/40"
          >
            {/* Meal Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#241105]">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1408] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#ffe9d9] uppercase border border-white/10">
                {meal.mealType}
              </span>
              <span className="absolute bottom-2 right-3 text-sm font-mono font-bold text-[#ffe9d9]">
                {meal.calories} <span className="text-[10px] text-[#f3a675]">KCAL</span>
              </span>
            </div>

            {/* Meal Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-[#ffe9d9] group-hover:text-[#f3a675] transition-colors leading-snug">
                  {meal.name}
                </h4>

                {/* Macro Badges */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[rgba(255,233,217,0.1)] text-center text-[11px] font-mono">
                  <div className="bg-[#381909] p-1.5 rounded">
                    <span className="block text-[#ffe9d9] font-bold">{meal.protein}g</span>
                    <span className="text-[9px] text-[#cdb9ab]">PRO</span>
                  </div>
                  <div className="bg-[#381909] p-1.5 rounded">
                    <span className="block text-[#f3a675] font-bold">{meal.carbs}g</span>
                    <span className="text-[9px] text-[#cdb9ab]">CARB</span>
                  </div>
                  <div className="bg-[#381909] p-1.5 rounded">
                    <span className="block text-[#ff7e36] font-bold">{meal.fat}g</span>
                    <span className="text-[9px] text-[#cdb9ab]">FAT</span>
                  </div>
                </div>

                {/* Key Ingredients tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {meal.ingredients.slice(0, 3).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#cdb9ab] bg-[#381909] px-2 py-0.5 rounded"
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
