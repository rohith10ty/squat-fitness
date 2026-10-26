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
              particleCount: 70,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#1D2B04', '#10B981', '#3B82F6'],
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
    <section id="goals" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-white text-gray-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#1D2B04] uppercase mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1D2B04]" />
            <span>PROGRESSION BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Personal Fitness Objectives
          </h2>
        </div>

        {/* Add goal trigger */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className="text-xs font-mono text-gray-500">
            COMPLETED: <strong className="text-gray-900">{completedCount}</strong> / {goals.length} ({overallPercentage}%)
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-[#1D2B04] text-white font-semibold text-xs tracking-wider uppercase hover:bg-black transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      {/* Goals List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-xs ${
              goal.completed
                ? 'bg-emerald-50/50 border-emerald-200'
                : 'bg-[#F9FAFB] border-gray-200/90 hover:border-gray-300'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className="cursor-pointer text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider font-medium">
                      {goal.category} // {goal.deadline}
                    </span>
                    <h3
                      className={`text-lg font-bold ${
                        goal.completed ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  {goal.percentage}%
                </span>
              </div>

              {/* Current vs Target */}
              <div className="flex justify-between items-center text-xs font-mono text-gray-500 mt-4 mb-2">
                <span>
                  Current: <strong className="text-gray-900">{goal.current}</strong>
                </span>
                <span>
                  Target: <strong className="text-[#1D2B04]">{goal.target}</strong>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    goal.completed ? 'bg-emerald-500' : 'bg-[#1D2B04]'
                  }`}
                  style={{ width: `${goal.percentage}%` }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">
                STATUS: {goal.completed ? 'COMPLETED' : 'IN TRAINING'}
              </span>
              <button
                onClick={() => toggleGoal(goal.id)}
                className="text-gray-600 hover:text-black font-medium transition-colors cursor-pointer"
              >
                {goal.completed ? 'Undo Completion' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1D2B04]" />
              Create Performance Goal
            </h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-500 uppercase block mb-1 font-medium">
                  Objective Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sub-20min 5K Run"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-mono text-sm focus:border-[#1D2B04] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-gray-500 uppercase block mb-1 font-medium">
                    Target Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.0 km"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    required
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-mono text-sm focus:border-[#1D2B04] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-500 uppercase block mb-1 font-medium">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 font-mono text-sm focus:border-[#1D2B04] focus:outline-none"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-gray-500 hover:text-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1D2B04] text-white font-semibold text-xs tracking-wider uppercase hover:bg-black transition-colors cursor-pointer shadow-xs"
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
