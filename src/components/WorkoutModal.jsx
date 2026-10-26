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
      colors: ['#ffe9d9', '#f3a675', '#ff7e36'],
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
      <div className="bg-[#2b1307] border border-[rgba(255,233,217,0.18)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[90vh]">
        {/* Header with image banner */}
        <div className="relative h-48 w-full bg-[#1e0d05] overflow-hidden">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1307] via-[#2b1307]/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-[#ffe9d9] border border-[rgba(255,233,217,0.2)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-mono tracking-widest text-[#f3a675] uppercase">
              {workout.category} // {workout.difficulty}
            </span>
            <h3 className="text-2xl font-extrabold text-[#ffe9d9] mt-0.5">{workout.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#381909] border border-[rgba(255,233,217,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#cdb9ab] uppercase block">Duration</span>
              <span className="text-lg font-bold text-[#ffe9d9] flex items-center justify-center gap-1 mt-1">
                <Clock className="w-4 h-4 text-[#f3a675]" />
                {workout.duration}m
              </span>
            </div>
            <div className="bg-[#381909] border border-[rgba(255,233,217,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#cdb9ab] uppercase block">Est. Burn</span>
              <span className="text-lg font-bold text-[#ffe9d9] flex items-center justify-center gap-1 mt-1">
                <Flame className="w-4 h-4 text-[#ff7e36]" />
                {workout.calories} kcal
              </span>
            </div>
            <div className="bg-[#381909] border border-[rgba(255,233,217,0.12)] rounded-lg p-3 text-center">
              <span className="text-[10px] font-mono text-[#cdb9ab] uppercase block">Level</span>
              <span className="text-sm font-bold text-[#f3a675] mt-1 block">
                {workout.difficulty}
              </span>
            </div>
          </div>

          {/* Interactive Live Timer */}
          <div className="bg-[#381909] border border-[rgba(255,233,217,0.15)] rounded-xl p-5 text-center">
            <p className="text-xs font-mono text-[#cdb9ab] uppercase tracking-wider mb-2">
              SESSION TIMER
            </p>
            <div className="text-5xl font-mono font-extrabold tracking-tight text-[#ffe9d9] mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                  isActive
                    ? 'bg-[#ff7e36] text-white hover:bg-[#e0533c]'
                    : 'bg-[#ffe9d9] text-[#331707] hover:bg-white'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isActive ? 'Pause Interval' : 'Start Interval'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-full border border-[rgba(255,233,217,0.2)] hover:border-white text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Protocol Description */}
          <div>
            <h4 className="text-xs font-mono text-[#cdb9ab] uppercase tracking-wider mb-2">
              Protocol Focus
            </h4>
            <p className="text-sm text-[#ffe9d9]/90 leading-relaxed">{workout.description}</p>
          </div>

          {/* Exercise Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-[#cdb9ab] uppercase tracking-wider">
                Movements Sequence ({workout.exercises.length})
              </h4>
              <span className="text-xs text-[#f3a675] font-mono">
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
                        ? 'bg-[#3f2212] border-[#5a331c] text-[#cdb9ab]'
                        : 'bg-[#331707] border-[rgba(255,233,217,0.12)] text-[#ffe9d9] hover:border-[rgba(255,233,217,0.25)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#ffe9d9] border-[#ffe9d9] text-[#331707]'
                            : 'border-[rgba(255,233,217,0.3)]'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? 'line-through text-[#cdb9ab]/70' : ''}`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#cdb9ab]">
                      <span>{item.sets}</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#4a220e] text-[10px]">
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
        <div className="p-4 bg-[#241105] border-t border-[rgba(255,233,217,0.15)] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#cdb9ab] hover:text-[#ffe9d9] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 rounded-full bg-[#ffe9d9] text-[#331707] font-bold text-xs tracking-wider uppercase hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/40"
          >
            <Award className="w-4 h-4" />
            <span>Mark Workout Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
