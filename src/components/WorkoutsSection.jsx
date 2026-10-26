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
        return 'text-[#ffe9d9] bg-[#ffe9d9]/10 border-[#ffe9d9]/25';
      case 'intermediate':
        return 'text-[#f3a675] bg-[#f3a675]/10 border-[#f3a675]/25';
      case 'advanced':
        return 'text-[#ff7e36] bg-[#ff7e36]/10 border-[#ff7e36]/25';
      default:
        return 'text-[#ffe9d9] bg-[#ffe9d9]/10 border-[#ffe9d9]/20';
    }
  };

  return (
    <section id="workouts" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(255,233,217,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f3a675] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f3a675]" />
            <span>MODULAR REGIMENS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#ffe9d9]">
            Targeted Workout Protocols
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#cdb9ab] font-mono">
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
                  ? 'bg-[#ffe9d9] text-[#331707] font-bold shadow-md shadow-black/40'
                  : 'bg-[#2d1408] text-[#cdb9ab] border border-[rgba(255,233,217,0.12)] hover:text-[#ffe9d9] hover:border-[rgba(255,233,217,0.25)]'
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
            className="group bg-[#2d1408] border border-[rgba(255,233,217,0.12)] rounded-xl overflow-hidden hover:border-[rgba(255,233,217,0.25)] transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40"
          >
            {/* Card Visual Header */}
            <div className="relative h-48 w-full overflow-hidden bg-[#241105]">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1408] via-[#2d1408]/30 to-transparent" />

              {/* Category & Difficulty Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#ffe9d9] border border-white/10">
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
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#ffe9d9] text-[#331707] text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" /> COMPLETED
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#ffe9d9] group-hover:text-[#f3a675] transition-colors">
                  {workout.title}
                </h3>
                <p className="text-xs text-[#cdb9ab] mt-2 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Specs: Duration, Calories */}
              <div className="mt-5 pt-4 border-t border-[rgba(255,233,217,0.1)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#ffe9d9]">
                  <span className="flex items-center gap-1.5 text-[#cdb9ab]">
                    <Clock className="w-3.5 h-3.5 text-[#f3a675]" />
                    {workout.duration} Mins
                  </span>
                  <span className="flex items-center gap-1.5 text-[#cdb9ab]">
                    <Flame className="w-3.5 h-3.5 text-[#ff7e36]" />
                    {workout.calories} kcal
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#cdb9ab] mb-1">
                    <span>PROGRESS</span>
                    <span className={workout.completed ? 'text-[#f3a675]' : 'text-[#ffe9d9]'}>
                      {workout.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[#1e0d05] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        workout.completed ? 'bg-[#ffe9d9]' : 'bg-[#f3a675]'
                      }`}
                      style={{ width: `${workout.progress}%` }}
                    />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalWorkout(workout)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#3a1a0b] hover:bg-[#4a220e] text-[#ffe9d9] text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#f3a675]" />
                    <span>View Protocol &amp; Timer</span>
                  </button>
                  <button
                    onClick={() => toggleWorkoutCompletion(workout.id)}
                    title={workout.completed ? 'Mark Incomplete' : 'Mark Completed'}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      workout.completed
                        ? 'bg-[#ffe9d9]/10 border-[#ffe9d9] text-[#ffe9d9]'
                        : 'border-[rgba(255,233,217,0.15)] text-[#cdb9ab] hover:text-[#ffe9d9] hover:border-[rgba(255,233,217,0.3)]'
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
