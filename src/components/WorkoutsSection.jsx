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
        return 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40';
      case 'intermediate':
        return 'text-blue-300 bg-blue-950/60 border-blue-500/40';
      case 'advanced':
        return 'text-amber-300 bg-amber-950/60 border-amber-500/40';
      default:
        return 'text-[#E5FBD4] bg-[#182405] border-[rgba(229,251,212,0.2)]';
    }
  };

  return (
    <section id="workouts" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#050801] text-[#E5FBD4]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5FBD4] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>MODULAR REGIMENS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Targeted Workout Protocols
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs text-[#E5FBD4]/70 font-mono">
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
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#E5FBD4] text-[#050801] font-bold shadow-md shadow-[#E5FBD4]/15'
                  : 'bg-[#0D1403] text-[#E5FBD4]/75 border border-[rgba(229,251,212,0.2)] hover:text-[#E5FBD4] hover:bg-[#182405]'
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
            className="group bg-[#0D1403] border border-[rgba(229,251,212,0.15)] rounded-2xl overflow-hidden hover:border-[rgba(229,251,212,0.35)] transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            {/* Card Visual Header */}
            <div className="relative h-48 w-full overflow-hidden bg-[#111A04]">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1403] via-transparent to-black/30" />

              {/* Category & Difficulty Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#E5FBD4] border border-[rgba(229,251,212,0.2)]">
                  {workout.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border font-bold ${getDifficultyColor(
                    workout.difficulty
                  )}`}
                >
                  {workout.difficulty}
                </span>
              </div>

              {/* Status Pill */}
              {workout.completed && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
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
                <p className="text-xs text-[#E5FBD4]/70 mt-2 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Specs: Duration, Calories */}
              <div className="mt-5 pt-4 border-t border-[rgba(229,251,212,0.1)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#E5FBD4]">
                  <span className="flex items-center gap-1.5 text-[#E5FBD4]/80">
                    <Clock className="w-3.5 h-3.5 text-[#E5FBD4]" />
                    {workout.duration} Mins
                  </span>
                  <span className="flex items-center gap-1.5 text-[#E5FBD4]/80">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    {workout.calories} kcal
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#E5FBD4]/70 mb-1">
                    <span>PROGRESS</span>
                    <span className={workout.completed ? 'text-emerald-400 font-bold' : 'text-[#E5FBD4]'}>
                      {workout.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[#182405] h-1.5 rounded-full overflow-hidden border border-[rgba(229,251,212,0.1)]">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-[#E5FBD4]"
                      style={{ width: `${workout.progress}%` }}
                    />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalWorkout(workout)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#E5FBD4] hover:bg-white text-[#050801] text-xs font-bold font-mono tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#E5FBD4]/10"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#050801]" />
                    <span>View Protocol &amp; Timer</span>
                  </button>
                  <button
                    onClick={() => toggleWorkoutCompletion(workout.id)}
                    title={workout.completed ? 'Mark Incomplete' : 'Mark Completed'}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      workout.completed
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'border-[rgba(229,251,212,0.2)] bg-[#182405] text-[#E5FBD4]/60 hover:text-[#E5FBD4] hover:border-[rgba(229,251,212,0.4)]'
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
