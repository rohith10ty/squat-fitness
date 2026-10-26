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
      colors: ['#E5FBD4', '#A8DB84', '#689638'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-[#1B2804] border border-[rgba(229,251,212,0.18)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[90vh]">
        {/* Header with image banner */}
        <div className="relative h-48 w-full bg-[#141E03] overflow-hidden">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2804] via-[#1B2804]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-[#E5FBD4] border border-[rgba(229,251,212,0.2)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-mono tracking-widest text-[#B2CD9C] uppercase">
              {workout.category} // {workout.difficulty}
            </span>
            <h3 className="text-2xl font-extrabold text-[#E5FBD4] mt-0.5">{workout.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#B2CD9C] uppercase block">Duration</span>
              <span className="text-lg font-bold text-[#E5FBD4] flex items-center justify-center gap-1 mt-1">
                <Clock className="w-4 h-4 text-[#E5FBD4]" />
                {workout.duration}m
              </span>
            </div>
            <div className="bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#B2CD9C] uppercase block">Est. Burn</span>
              <span className="text-lg font-bold text-[#E5FBD4] flex items-center justify-center gap-1 mt-1">
                <Flame className="w-4 h-4 text-[#E5FBD4]" />
                {workout.calories} kcal
              </span>
            </div>
            <div className="bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#B2CD9C] uppercase block">Level</span>
              <span className="text-sm font-bold text-[#E5FBD4] mt-1 block">
                {workout.difficulty}
              </span>
            </div>
          </div>

          {/* Interactive Live Timer */}
          <div className="bg-[#233306] border border-[rgba(229,251,212,0.15)] rounded-xl p-5 text-center">
            <p className="text-xs font-mono text-[#B2CD9C] uppercase tracking-wider mb-2">
              SESSION TIMER
            </p>
            <div className="text-5xl font-mono font-extrabold tracking-tight text-[#E5FBD4] mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                  isActive
                    ? 'bg-[#31480A] text-[#E5FBD4] hover:bg-[#43620E]'
                    : 'bg-[#E5FBD4] text-[#1D2B04] hover:bg-white'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isActive ? 'Pause Interval' : 'Start Interval'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-full border border-[rgba(229,251,212,0.2)] hover:border-white text-[#B2CD9C] hover:text-[#E5FBD4] transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Protocol Focus */}
          <div>
            <h4 className="text-xs font-mono text-[#B2CD9C] uppercase tracking-wider mb-2">
              Protocol Focus
            </h4>
            <p className="text-sm text-[#E5FBD4]/90 leading-relaxed">{workout.description}</p>
          </div>

          {/* Exercise Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-[#B2CD9C] uppercase tracking-wider">
                Movements Sequence ({workout.exercises.length})
              </h4>
              <span className="text-xs text-[#E5FBD4] font-mono">
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
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#1D2B04] border-[rgba(229,251,212,0.2)] text-[#B2CD9C]'
                        : 'bg-[#233306] border-[rgba(229,251,212,0.12)] text-[#E5FBD4] hover:border-[rgba(229,251,212,0.25)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#E5FBD4] border-[#E5FBD4] text-[#1D2B04]'
                            : 'border-[rgba(229,251,212,0.3)]'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? 'line-through text-[#B2CD9C]/70' : ''}`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#B2CD9C]">
                      <span>{item.sets}</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#141E03] text-[10px]">
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
        <div className="p-4 bg-[#141E03] border-t border-[rgba(229,251,212,0.15)] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#B2CD9C] hover:text-[#E5FBD4] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 rounded-full bg-[#E5FBD4] text-[#1D2B04] font-bold text-xs tracking-wider uppercase hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/40"
          >
            <Award className="w-4 h-4" />
            <span>Mark Workout Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
