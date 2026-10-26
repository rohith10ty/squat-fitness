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
              colors: ['#ffe9d9', '#f3a675', '#ff7e36'],
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
    <section id="goals" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[rgba(255,233,217,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f3a675] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f3a675]" />
            <span>PROGRESSION BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#ffe9d9]">
            Personal Fitness Objectives
          </h2>
        </div>

        {/* Add goal trigger */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className="text-xs font-mono text-[#cdb9ab]">
            COMPLETED: <strong className="text-[#ffe9d9]">{completedCount}</strong> / {goals.length} ({overallPercentage}%)
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-[#ffe9d9] text-[#331707] font-extrabold text-xs tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/40"
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
            className={`p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30 ${
              goal.completed
                ? 'bg-[#3b1e0e] border-[#5e3218]'
                : 'bg-[#2d1408] border-[rgba(255,233,217,0.12)] hover:border-[rgba(255,233,217,0.25)]'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className="cursor-pointer text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-[#ffe9d9] fill-[#ffe9d9]/20" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#cdb9ab] tracking-wider">
                      {goal.category} // {goal.deadline}
                    </span>
                    <h3
                      className={`text-lg font-bold ${
                        goal.completed ? 'line-through text-[#cdb9ab]/70' : 'text-[#ffe9d9]'
                      }`}
                    >
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#ffe9d9] bg-[#381909] px-2.5 py-1 rounded border border-[rgba(255,233,217,0.1)]">
                  {goal.percentage}%
                </span>
              </div>

              {/* Current vs Target */}
              <div className="flex justify-between items-center text-xs font-mono text-[#cdb9ab] mt-4 mb-2">
                <span>
                  Current: <strong className="text-[#ffe9d9]">{goal.current}</strong>
                </span>
                <span>
                  Target: <strong className="text-[#f3a675]">{goal.target}</strong>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#1e0d05] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    goal.completed ? 'bg-[#ffe9d9]' : 'bg-[#f3a675]'
                  }`}
                  style={{ width: `${goal.percentage}%` }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-[rgba(255,233,217,0.1)] flex items-center justify-between text-xs font-mono">
              <span className="text-[#cdb9ab]">
                STATUS: {goal.completed ? 'COMPLETED' : 'IN TRAINING'}
              </span>
              <button
                onClick={() => toggleGoal(goal.id)}
                className="text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors cursor-pointer"
              >
                {goal.completed ? 'Undo Completion' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#2b1307] border border-[rgba(255,233,217,0.18)] rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-[#ffe9d9] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#f3a675]" />
              Create Performance Goal
            </h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#cdb9ab] uppercase block mb-1">
                  Objective Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sub-20min 5K Run"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-[#1e0d05] border border-[rgba(255,233,217,0.15)] rounded-lg px-4 py-2.5 text-[#ffe9d9] font-mono text-sm focus:border-[#ffe9d9] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#cdb9ab] uppercase block mb-1">
                    Target Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.0 km"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    required
                    className="w-full bg-[#1e0d05] border border-[rgba(255,233,217,0.15)] rounded-lg px-4 py-2.5 text-[#ffe9d9] font-mono text-sm focus:border-[#ffe9d9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#cdb9ab] uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#1e0d05] border border-[rgba(255,233,217,0.15)] rounded-lg px-3 py-2.5 text-[#ffe9d9] font-mono text-sm focus:border-[#ffe9d9] focus:outline-none"
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
                  className="px-4 py-2 text-xs font-mono text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#ffe9d9] text-[#331707] font-bold text-xs tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
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
