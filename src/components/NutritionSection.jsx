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
    <section id="nutrition" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#0A0A0A] text-[#F5F1E8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4C9B7] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5F1E8]" />
            <span>METABOLIC FUELING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Targeted Nutrition &amp; Fuel
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs text-[#D4C9B7]/70 font-mono">
          MACRO PRECISION // LEAN MASS RECOMPOSITION
        </p>
      </div>

      {/* Top Nutrition & Hydration Telemetry Grid - Warm Cream Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Macro Overview Card */}
        <div className="lg:col-span-2 bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#1E1B18] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#1E1B18]" />
              Daily Macronutrient Target
            </h3>
            <span className="text-xs font-mono text-[#6A6055] font-bold">
              {dailyTarget.currentCalories} / {dailyTarget.calories} kcal
            </span>
          </div>

          {/* 3 Macro Bars */}
          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#6A6055] font-medium">PROTEIN (TARGET 2.0g/kg)</span>
                <span className="text-[#1E1B18] font-bold">
                  {dailyTarget.currentProtein}g / {dailyTarget.protein}g ({Math.round((dailyTarget.currentProtein / dailyTarget.protein) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#DFD7C8] h-2.5 rounded-full overflow-hidden border border-[#D8CFBF]">
                <div
                  className="bg-[#1E1B18] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentProtein / dailyTarget.protein) * 100}%` }}
                />
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#6A6055] font-medium">COMPLEX CARBOHYDRATES</span>
                <span className="text-[#1E1B18] font-bold">
                  {dailyTarget.currentCarbs}g / {dailyTarget.carbs}g ({Math.round((dailyTarget.currentCarbs / dailyTarget.carbs) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#DFD7C8] h-2.5 rounded-full overflow-hidden border border-[#D8CFBF]">
                <div
                  className="bg-[#3D352E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentCarbs / dailyTarget.carbs) * 100}%` }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#6A6055] font-medium">HEALTHY LIPIDS &amp; ESSENTIAL FATS</span>
                <span className="text-[#1E1B18] font-bold">
                  {dailyTarget.currentFat}g / {dailyTarget.fat}g ({Math.round((dailyTarget.currentFat / dailyTarget.fat) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#DFD7C8] h-2.5 rounded-full overflow-hidden border border-[#D8CFBF]">
                <div
                  className="bg-[#6A6055] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(dailyTarget.currentFat / dailyTarget.fat) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D8CFBF] flex items-center justify-between text-[11px] font-mono text-[#6A6055]">
            <span>DIETARY STRATEGY: CLEAN BULK / RECOMP</span>
            <span className="text-[#1E1B18] font-bold">DEFICIT BUFFER: 300 kcal</span>
          </div>
        </div>

        {/* Interactive Hydration Tracker */}
        <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 flex flex-col justify-between shadow-xl text-[#1E1B18]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1E1B18] flex items-center gap-2">
                <Droplets className="w-5 h-5 text-sky-600" />
                Hydration Tracker
              </h3>
              <span className="text-xs font-mono text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full font-bold border border-sky-300">
                {waterPercent}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold font-mono text-[#1E1B18]">
                {(waterIntake / 1000).toFixed(2)}
              </span>
              <span className="text-xs font-mono text-[#6A6055]">/ {(waterGoal / 1000).toFixed(1)} L</span>
            </div>

            {/* Water Progress */}
            <div className="w-full bg-[#DFD7C8] h-3 rounded-full overflow-hidden border border-[#D8CFBF]">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          {/* Water quick adjustments */}
          <div className="mt-6 pt-4 border-t border-[#D8CFBF] space-y-2">
            <p className="text-[11px] font-mono text-[#6A6055] uppercase font-bold">Log Intake:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addWater(250)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-[#D8CFBF] hover:border-[#1E1B18] text-[#1E1B18] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-sky-600" /> 250 ml
              </button>
              <button
                onClick={() => addWater(500)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-[#D8CFBF] hover:border-[#1E1B18] text-[#1E1B18] text-xs font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-sky-600" /> 500 ml
              </button>
              <button
                onClick={() => subtractWater(250)}
                title="Subtract 250ml"
                className="p-1.5 rounded-xl bg-white border border-[#D8CFBF] hover:border-[#1E1B18] text-[#6A6055] hover:text-[#1E1B18] transition-colors cursor-pointer shadow-xs"
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
                  ? 'bg-[#F5F1E8] text-[#1E1B18] font-bold shadow-md'
                  : 'bg-[#141414] text-[#D4C9B7] border border-[#333333] hover:text-white hover:border-[#666666]'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Meals Grid in Warm Cream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="group bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl overflow-hidden hover:border-[#1E1B18]/40 transition-all flex flex-col justify-between shadow-xl text-[#1E1B18]"
          >
            {/* Meal Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#EAE3D5]">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white uppercase border border-white/20">
                {meal.mealType}
              </span>
              <span className="absolute bottom-2 right-3 text-sm font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                {meal.calories} <span className="text-[10px] text-[#D4C9B7]">KCAL</span>
              </span>
            </div>

            {/* Meal Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-[#1E1B18] group-hover:text-black transition-colors leading-snug">
                  {meal.name}
                </h4>

                {/* Macro Badges */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#D8CFBF] text-center text-[11px] font-mono">
                  <div className="bg-white border border-[#D8CFBF] p-1.5 rounded-lg shadow-xs">
                    <span className="block text-[#1E1B18] font-bold">{meal.protein}g</span>
                    <span className="text-[9px] text-[#6A6055]">PRO</span>
                  </div>
                  <div className="bg-white border border-[#D8CFBF] p-1.5 rounded-lg shadow-xs">
                    <span className="block text-[#1E1B18] font-bold">{meal.carbs}g</span>
                    <span className="text-[9px] text-[#6A6055]">CARB</span>
                  </div>
                  <div className="bg-white border border-[#D8CFBF] p-1.5 rounded-lg shadow-xs">
                    <span className="block text-[#1E1B18] font-bold">{meal.fat}g</span>
                    <span className="text-[9px] text-[#6A6055]">FAT</span>
                  </div>
                </div>

                {/* Key Ingredients tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {meal.ingredients.slice(0, 3).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#6A6055] bg-white border border-[#D8CFBF] px-2 py-0.5 rounded-md"
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
