import React, { useState } from 'react';
import { Play, Check, Flame, Clock, Gauge, Award, Filter } from 'lucide-react';
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
        return 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20';
      case 'intermediate':
        return 'text-[#ccff00] bg-[#ccff00]/10 border-[#ccff00]/20';
      case 'advanced':
        return 'text-[#ff6b35] bg-[#ff6b35]/10 border-[#ff6b35]/20';
      default:
        return 'text-white bg-white/10 border-white/20';
    }
  };

  return (
    <section id="workouts" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
            <span>MODULAR REGIMENS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Targeted Workout Protocols
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#a1a1aa] font-mono">
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
                  ? 'bg-[#ccff00] text-black font-bold shadow-md shadow-[#ccff00]/10'
                  : 'bg-[#1a1a1a] text-[#a1a1aa] border border-[#262626] hover:text-white hover:border-[#383838]'
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
            className="group bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden hover:border-[#3a3a3a] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Visual Header */}
            <div className="relative h-48 w-full overflow-hidden bg-[#161616]">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />

              {/* Category & Difficulty Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white border border-white/10">
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
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#ccff00] text-black text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" /> COMPLETED
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors">
                  {workout.title}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-2 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Specs: Duration, Calories */}
              <div className="mt-5 pt-4 border-t border-[#262626] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#d4d4d8]">
                  <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                    <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                    {workout.duration} Mins
                  </span>
                  <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                    <Flame className="w-3.5 h-3.5 text-[#ff6b35]" />
                    {workout.calories} kcal
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-1">
                    <span>PROGRESS</span>
                    <span className={workout.completed ? 'text-[#ccff00]' : 'text-white'}>
                      {workout.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        workout.completed ? 'bg-[#ccff00]' : 'bg-[#00f0ff]'
                      }`}
                      style={{ width: `${workout.progress}%` }}
                    />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalWorkout(workout)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-white text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>View Protocol &amp; Timer</span>
                  </button>
                  <button
                    onClick={() => toggleWorkoutCompletion(workout.id)}
                    title={workout.completed ? 'Mark Incomplete' : 'Mark Completed'}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      workout.completed
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00]'
                        : 'border-[#2e2e2e] text-[#71717a] hover:text-white hover:border-[#444]'
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
