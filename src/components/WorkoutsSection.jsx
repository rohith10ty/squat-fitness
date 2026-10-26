import React, { useState } from 'react';
import { Play, Check, Flame, Clock } from 'lucide-react';
import { WORKOUT_CATEGORIES, INITIAL_WORKOUTS } from '../data/fitnessData';
import WorkoutModal from './WorkoutModal';

export default function WorkoutsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);
  const [activeModalWorkout, setActiveModalWorkout] = useState(null);

  const filteredWorkouts =
    selectedCategory === 'All'
      ? workouts
      : workouts.filter((w) => w.category === selectedCategory);

  const toggleWorkoutCompletion = (id) => {
    setWorkouts((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newStatus = !w.completed;
          return {
            ...w,
            completed: newStatus,
            progress: newStatus ? 100 : Math.max(25, w.progress - 20),
          };
        }
        return w;
      })
    );
    if (activeModalWorkout && activeModalWorkout.id === id) {
      setActiveModalWorkout((prev) => ({
        ...prev,
        completed: !prev.completed,
        progress: !prev.completed ? 100 : 25,
      }));
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'beginner':
        return 'text-[#E5FBD4] bg-[#E5FBD4]/10 border-[#E5FBD4]/25';
      case 'intermediate':
        return 'text-[#D4F5BE] bg-[#D4F5BE]/10 border-[#D4F5BE]/25';
      case 'advanced':
        return 'text-[#E5FBD4] bg-[#E5FBD4]/20 border-[#E5FBD4]/35 font-semibold';
      default:
        return 'text-[#E5FBD4] bg-[#E5FBD4]/10 border-[#E5FBD4]/20';
    }
  };

  return (
    <section id="workouts" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B2CD9C] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>MODULAR REGIMENS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Targeted Workout Protocols
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#B2CD9C] font-mono">
          SYSTEM CALIBRATED // SELECT CATEGORY &amp; ENGAGE
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {WORKOUT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#E5FBD4] text-[#1D2B04] font-bold shadow-md shadow-black/40'
                  : 'bg-[#233306] text-[#B2CD9C] border border-[rgba(229,251,212,0.12)] hover:text-[#E5FBD4] hover:border-[rgba(229,251,212,0.25)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="group bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-xl overflow-hidden hover:border-[rgba(229,251,212,0.25)] transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40"
          >
            {/* Card Visual Header */}
            <div className="relative h-48 w-full overflow-hidden bg-[#182403]">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#233306] via-[#233306]/30 to-transparent" />

              {/* Category & Difficulty Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#E5FBD4] border border-white/10">
                  {workout.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getDifficultyColor(
                    workout.difficulty
                  )}`}
                >
                  {workout.difficulty}
                </span>
              </div>

              {/* Status Pill */}
              {workout.completed && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#E5FBD4] text-[#1D2B04] text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" /> COMPLETED
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#E5FBD4] group-hover:text-white transition-colors">
                  {workout.title}
                </h3>
                <p className="text-xs text-[#B2CD9C] mt-2 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Specs: Duration, Calories */}
              <div className="mt-5 pt-4 border-t border-[rgba(229,251,212,0.1)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#E5FBD4]">
                  <span className="flex items-center gap-1.5 text-[#B2CD9C]">
                    <Clock className="w-3.5 h-3.5 text-[#E5FBD4]" />
                    {workout.duration} Mins
                  </span>
                  <span className="flex items-center gap-1.5 text-[#B2CD9C]">
                    <Flame className="w-3.5 h-3.5 text-[#E5FBD4]" />
                    {workout.calories} kcal
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B2CD9C] mb-1">
                    <span>PROGRESS</span>
                    <span className={workout.completed ? 'text-[#E5FBD4]' : 'text-[#E5FBD4]/80'}>
                      {workout.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[#141E03] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-[#E5FBD4]"
                      style={{ width: `${workout.progress}%` }}
                    />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalWorkout(workout)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#2E4308] hover:bg-[#3D580C] text-[#E5FBD4] text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#E5FBD4]" />
                    <span>View Protocol &amp; Timer</span>
                  </button>
                  <button
                    onClick={() => toggleWorkoutCompletion(workout.id)}
                    title={workout.completed ? 'Mark Incomplete' : 'Mark Completed'}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      workout.completed
                        ? 'bg-[#E5FBD4]/20 border-[#E5FBD4] text-[#E5FBD4]'
                        : 'border-[rgba(229,251,212,0.15)] text-[#B2CD9C] hover:text-[#E5FBD4] hover:border-[rgba(229,251,212,0.3)]'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Detail & Timer Modal */}
      {activeModalWorkout && (
        <WorkoutModal
          workout={activeModalWorkout}
          onClose={() => setActiveModalWorkout(null)}
          onToggleComplete={toggleWorkoutCompletion}
        />
      )}
    </section>
  );
}
