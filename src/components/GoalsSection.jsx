import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus } from 'lucide-react';
import { INITIAL_GOALS } from '../data/fitnessData';
import confetti from 'canvas-confetti';

export default function GoalsSection() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCategory, setNewCategory] = useState('Strength');

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextCompleted = !g.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 75,
              spread: 65,
              origin: { y: 0.7 },
              colors: ['#E5FBD4', '#4ade80', '#ffffff'],
            });
          }
          return {
            ...g,
            completed: nextCompleted,
            percentage: nextCompleted ? 100 : Math.max(50, g.percentage - 30),
          };
        }
        return g;
      })
    );
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget.trim()) return;

    const newGoalObj = {
      id: `g-${Date.now()}`,
      title: newTitle,
      target: newTarget,
      current: '0',
      percentage: 0,
      category: newCategory,
      deadline: 'Upcoming',
      completed: false,
    };

    setGoals([newGoalObj, ...goals]);
    setNewTitle('');
    setNewTarget('');
    setShowAddModal(false);
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const overallPercentage = Math.round((completedCount / goals.length) * 100) || 0;

  return (
    <section id="goals" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#050801] text-[#E5FBD4]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#E5FBD4] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>PROGRESSION BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Personal Fitness Objectives
          </h2>
        </div>

        {/* Add goal trigger */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className="text-xs font-mono text-[#E5FBD4]/70">
            COMPLETED: <strong className="text-white font-bold">{completedCount}</strong> / {goals.length} ({overallPercentage}%)
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-[#E5FBD4] text-[#050801] font-bold text-xs font-mono tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#E5FBD4]/15"
          >
            <Plus className="w-3.5 h-3.5 text-[#050801]" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      {/* Goals List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-xl ${
              goal.completed
                ? 'bg-[#182405] border-[#E5FBD4]/40 shadow-emerald-950/40'
                : 'bg-[#0D1403] border-[rgba(229,251,212,0.15)] hover:border-[rgba(229,251,212,0.35)]'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className="cursor-pointer text-[#E5FBD4]/60 hover:text-[#E5FBD4] transition-colors"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-[#E5FBD4] fill-[#182405]" />
                    ) : (
                      <Circle className="w-6 h-6 text-[#E5FBD4]/50" />
                    )}
                  </button>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#E5FBD4]/60 tracking-wider font-bold">
                      {goal.category} // {goal.deadline}
                    </span>
                    <h3
                      className={`text-lg font-bold ${
                        goal.completed ? 'line-through text-[#E5FBD4]/50' : 'text-white'
                      }`}
                    >
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#E5FBD4] bg-[#182405] px-2.5 py-1 rounded-lg border border-[rgba(229,251,212,0.25)] shadow-xs">
                  {goal.percentage}%
                </span>
              </div>

              {/* Current vs Target */}
              <div className="flex justify-between items-center text-xs font-mono text-[#E5FBD4]/70 mt-4 mb-2">
                <span>
                  Current: <strong className="text-white">{goal.current}</strong>
                </span>
                <span>
                  Target: <strong className="text-white">{goal.target}</strong>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#182405] h-2 rounded-full overflow-hidden border border-[rgba(229,251,212,0.15)]">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-[#E5FBD4]"
                  style={{ width: `${goal.percentage}%` }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-[rgba(229,251,212,0.1)] flex items-center justify-between text-xs font-mono">
              <span className="text-[#E5FBD4]/60">
                STATUS: {goal.completed ? 'COMPLETED' : 'IN TRAINING'}
              </span>
              <button
                onClick={() => toggleGoal(goal.id)}
                className="text-[#E5FBD4] hover:underline font-bold transition-colors cursor-pointer"
              >
                {goal.completed ? 'Undo Completion' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.25)] rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#E5FBD4]">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#E5FBD4]" />
              Create Performance Goal
            </h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#E5FBD4]/70 uppercase block mb-1 font-bold">
                  Objective Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sub-20min 5K Run"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#182405] border border-[rgba(229,251,212,0.2)] rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-[#E5FBD4] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#E5FBD4]/70 uppercase block mb-1 font-bold">
                    Target Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.0 km"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    required
                    className="w-full bg-[#182405] border border-[rgba(229,251,212,0.2)] rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-[#E5FBD4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#E5FBD4]/70 uppercase block mb-1 font-bold">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#182405] border border-[rgba(229,251,212,0.2)] rounded-xl px-3 py-2.5 text-white font-mono text-sm focus:border-[#E5FBD4] focus:outline-none"
                  >
                    <option value="Strength" className="bg-[#0D1403] text-white">Strength</option>
                    <option value="Cardio" className="bg-[#0D1403] text-white">Cardio</option>
                    <option value="Nutrition" className="bg-[#0D1403] text-white">Nutrition</option>
                    <option value="Recovery" className="bg-[#0D1403] text-white">Recovery</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#E5FBD4]/70 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#E5FBD4] text-[#050801] font-bold font-mono text-xs tracking-wider uppercase hover:bg-white transition-colors cursor-pointer shadow-lg shadow-[#E5FBD4]/15"
                >
                  Save Objective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
