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
      colors: ['#1E1B18', '#A48261', '#D4C9B7'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-[#1E1B18]">
        {/* Header with image banner */}
        <div className="relative h-48 w-full bg-[#DFD7C8] overflow-hidden">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-semibold">
              {workout.category} // {workout.difficulty}
            </span>
            <h3 className="text-2xl font-extrabold mt-0.5">{workout.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#EAE3D5] border border-[#D8CFBF] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#6A6055] uppercase block font-medium">Duration</span>
              <span className="text-lg font-bold text-[#1E1B18] flex items-center justify-center gap-1 mt-1 font-mono">
                <Clock className="w-4 h-4 text-[#1E1B18]" />
                {workout.duration}m
              </span>
            </div>
            <div className="bg-[#EAE3D5] border border-[#D8CFBF] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#6A6055] uppercase block font-medium">Est. Burn</span>
              <span className="text-lg font-bold text-[#1E1B18] flex items-center justify-center gap-1 mt-1 font-mono">
                <Flame className="w-4 h-4 text-orange-600" />
                {workout.calories} kcal
              </span>
            </div>
            <div className="bg-[#EAE3D5] border border-[#D8CFBF] rounded-xl p-3 text-center">
              <span className="text-[10px] font-mono text-[#6A6055] uppercase block font-medium">Level</span>
              <span className="text-sm font-bold text-[#1E1B18] mt-1 block uppercase font-mono">
                {workout.difficulty}
              </span>
            </div>
          </div>

          {/* Interactive Live Timer */}
          <div className="bg-[#EAE3D5] border border-[#D8CFBF] rounded-2xl p-5 text-center shadow-inner">
            <p className="text-xs font-mono text-[#6A6055] uppercase tracking-wider mb-2 font-bold">
              SESSION TIMER
            </p>
            <div className="text-5xl font-mono font-extrabold tracking-tight text-[#1E1B18] mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleTimer}
                className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase font-mono transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  isActive
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-[#1E1B18] text-[#F5F1E8] hover:bg-black'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#F5F1E8]" />}
                <span>{isActive ? 'Pause Interval' : 'Start Interval'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-full border border-[#D8CFBF] bg-white text-[#1E1B18] hover:border-[#1E1B18] transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Protocol Focus */}
          <div>
            <h4 className="text-xs font-mono text-[#6A6055] uppercase tracking-wider mb-2 font-bold">
              Protocol Focus
            </h4>
            <p className="text-sm text-[#1E1B18]/90 leading-relaxed">{workout.description}</p>
          </div>

          {/* Exercise Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-[#6A6055] uppercase tracking-wider font-bold">
                Movements Sequence ({workout.exercises.length})
              </h4>
              <span className="text-xs text-[#1E1B18] font-mono font-bold">
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
                        ? 'bg-emerald-50 border-emerald-300 text-[#1E1B18]'
                        : 'bg-white border-[#D8CFBF] text-[#1E1B18] hover:border-[#1E1B18]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-[#D8CFBF] bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? 'line-through text-[#6A6055]' : 'text-[#1E1B18]'}`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#6A6055]">
                      <span>{item.sets}</span>
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#EAE3D5] text-[10px]">
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
        <div className="p-4 bg-[#EAE3D5] border-t border-[#D8CFBF] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#6A6055] hover:text-[#1E1B18] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 rounded-full bg-[#1E1B18] text-[#F5F1E8] font-bold text-xs font-mono tracking-wider uppercase hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Award className="w-4 h-4" />
            <span>Mark Workout Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
