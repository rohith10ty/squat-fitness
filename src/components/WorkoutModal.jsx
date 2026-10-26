import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Flame, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkoutModal({ workout, onClose, onToggleComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(workout.duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      handleFinish();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(workout.duration * 60);
  };

  const handleFinish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5FBD4', '#10B981', '#1D2B04'],
    });
    onToggleComplete(workout.id);
  };

  const toggleExerciseCheck = (index) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-[#0D1403] border border-[rgba(229,251,212,0.25)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-[#E5FBD4]">
        {/* Header with image banner */}
        <div className="relative h-48 w-full bg-[#111A04] overflow-hidden">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1403] via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-[#E5FBD4] border border-[rgba(229,251,212,0.2)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-[#E5FBD4]">
            <span className="text-[10px] font-mono tracking-widest text-[#E5FBD4] uppercase font-bold">
              {workout.category} // {workout.difficulty}
            </span>
            <h3 className="text-2xl font-extrabold mt-0.5 text-white">{workout.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#182405] border border-[rgba(229,251,212,0.15)] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#E5FBD4]/70 uppercase block font-medium">Duration</span>
              <span className="text-lg font-bold text-[#E5FBD4] flex items-center justify-center gap-1 mt-1 font-mono">
                <Clock className="w-4 h-4 text-[#E5FBD4]" />
                {workout.duration}m
              </span>
            </div>
            <div className="bg-[#182405] border border-[rgba(229,251,212,0.15)] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#E5FBD4]/70 uppercase block font-medium">Est. Burn</span>
              <span className="text-lg font-bold text-[#E5FBD4] flex items-center justify-center gap-1 mt-1 font-mono">
                <Flame className="w-4 h-4 text-orange-400" />
                {workout.calories} kcal
              </span>
            </div>
            <div className="bg-[#182405] border border-[rgba(229,251,212,0.15)] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#E5FBD4]/70 uppercase block font-medium">Level</span>
              <span className="text-sm font-bold text-[#E5FBD4] mt-1 block uppercase font-mono">
                {workout.difficulty}
              </span>
            </div>
          </div>

          {/* Interactive Live Timer */}
          <div className="bg-[#111A04] border border-[rgba(229,251,212,0.2)] rounded-2xl p-5 text-center shadow-inner">
            <p className="text-xs font-mono text-[#E5FBD4]/70 uppercase tracking-wider mb-2 font-bold">
              SESSION TIMER
            </p>
            <div className="text-5xl font-mono font-extrabold tracking-tight text-[#E5FBD4] mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase font-mono transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  isActive
                    ? 'bg-rose-500 text-black hover:bg-rose-400'
                    : 'bg-[#E5FBD4] text-[#050801] hover:bg-white shadow-[#E5FBD4]/15'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#050801]" />}
                <span>{isActive ? 'Pause Interval' : 'Start Interval'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-full border border-[rgba(229,251,212,0.2)] bg-[#182405] text-[#E5FBD4] hover:border-[#E5FBD4] transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Protocol Focus */}
          <div>
            <h4 className="text-xs font-mono text-[#E5FBD4]/70 uppercase tracking-wider mb-2 font-bold">
              Protocol Focus
            </h4>
            <p className="text-sm text-[#E5FBD4]/85 leading-relaxed">{workout.description}</p>
          </div>

          {/* Exercise Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-[#E5FBD4]/70 uppercase tracking-wider font-bold">
                Movements Sequence ({workout.exercises.length})
              </h4>
              <span className="text-xs text-[#E5FBD4] font-mono font-bold">
                {Object.values(completedExercises).filter(Boolean).length}/{workout.exercises.length} Complete
              </span>
            </div>

            <div className="space-y-2">
              {workout.exercises.map((item, idx) => {
                const isChecked = !!completedExercises[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleExerciseCheck(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-[#E5FBD4]'
                        : 'bg-[#182405] border-[rgba(229,251,212,0.15)] text-[#E5FBD4]/90 hover:border-[rgba(229,251,212,0.3)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-emerald-400 border-emerald-400 text-black'
                            : 'border-[rgba(229,251,212,0.3)] bg-transparent'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? 'line-through text-[#E5FBD4]/50' : 'text-[#E5FBD4]'}`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#E5FBD4]/70">
                      <span>{item.sets}</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#111A04] border border-[rgba(229,251,212,0.1)] text-[10px]">
                        Rest: {item.rest}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#080D02] border-t border-[rgba(229,251,212,0.15)] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#E5FBD4]/70 hover:text-[#E5FBD4] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 rounded-full bg-[#E5FBD4] text-[#050801] font-bold text-xs font-mono tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#E5FBD4]/15"
          >
            <Award className="w-4 h-4" />
            <span>Mark Workout Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
