import React, { useState } from 'react';
import { Scale, Info } from 'lucide-react';

export default function BmiCalculator() {
  const [unit, setUnit] = useState('metric'); // 'metric' (cm, kg) or 'imperial' (ft/in, lbs)

  // Metric states
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);

  // Imperial states
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightLbs, setWeightLbs] = useState(158);

  // Calculate BMI
  let calculatedBmi = 0;
  if (unit === 'metric') {
    const heightInMeters = heightCm / 100;
    if (heightInMeters > 0) {
      calculatedBmi = weightKg / (heightInMeters * heightInMeters);
    }
  } else {
    const totalInches = heightFeet * 12 + heightInches;
    if (totalInches > 0) {
      calculatedBmi = (weightLbs / (totalInches * totalInches)) * 703;
    }
  }

  const roundedBmi = parseFloat(calculatedBmi.toFixed(1));

  // BMI Category & Styling (Clean Neutral Badges, ZERO Green)
  const getBmiDetails = (val) => {
    if (val < 18.5) {
      return {
        label: 'Underweight',
        color: 'text-amber-800',
        bg: 'bg-amber-100 border-amber-300',
        advice: 'Focus on nutrient-dense whole foods and progressive strength training to build lean muscle mass.',
        idealRange: '60 - 76 kg',
      };
    } else if (val >= 18.5 && val <= 24.9) {
      return {
        label: 'Optimal / Healthy',
        color: 'text-[#1E1B18]',
        bg: 'bg-white border-[#1E1B18] font-bold',
        advice: 'Excellent body composition baseline. Maintain current caloric balance and progressive overload.',
        idealRange: 'Normal weight maintenance',
      };
    } else if (val >= 25 && val <= 29.9) {
      return {
        label: 'Overweight',
        color: 'text-orange-800',
        bg: 'bg-orange-100 border-orange-300',
        advice: 'Incorporate steady-state aerobic conditioning (Zone 2) alongside a moderate 300-500 kcal deficit.',
        idealRange: 'Target 5-8% reduction',
      };
    } else {
      return {
        label: 'High Risk (Obese)',
        color: 'text-rose-800',
        bg: 'bg-rose-100 border-rose-300',
        advice: 'Prioritize low-impact aerobic activity (swimming, brisk walking) and consult a sports clinical dietitian.',
        idealRange: 'Clinical lifestyle modification',
      };
    }
  };

  const bmiDetails = getBmiDetails(roundedBmi);

  // Gauge marker position (min 15, max 35)
  const markerPercent = Math.min(Math.max(((roundedBmi - 15) / (35 - 15)) * 100, 0), 100);

  return (
    <section id="bmi" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-[#0A0A0A] text-[#F5F1E8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4C9B7] uppercase mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5F1E8]" />
            <span>BIOMETRIC ASSESSMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Precision BMI Calculator
          </h2>
        </div>

        {/* Metric vs Imperial Toggle */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-[#333333]">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              unit === 'metric'
                ? 'bg-[#F5F1E8] text-[#1E1B18] font-bold shadow-sm'
                : 'text-[#D4C9B7]/70 hover:text-white'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              unit === 'imperial'
                ? 'bg-[#F5F1E8] text-[#1E1B18] font-bold shadow-sm'
                : 'text-[#D4C9B7]/70 hover:text-white'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs + Results - Warm Cream Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-[#1E1B18]">
          <h3 className="text-lg font-bold text-[#1E1B18] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#1E1B18]" />
            Anthropometric Inputs
          </h3>

          {unit === 'metric' ? (
            <>
              {/* Height Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#6A6055] uppercase tracking-wider font-bold">Height (cm)</label>
                  <span className="text-[#1E1B18] font-bold text-base">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#1E1B18] bg-[#DFD7C8] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6A6055]">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Weight Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#6A6055] uppercase tracking-wider font-bold">Weight (kg)</label>
                  <span className="text-[#1E1B18] font-bold text-base">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#1E1B18] bg-[#DFD7C8] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6A6055]">
                  <span>40 kg</span>
                  <span>100 kg</span>
                  <span>160 kg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Imperial Height Feet/Inches */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#6A6055] uppercase font-bold">Feet</label>
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8CFBF] rounded-xl px-4 py-2.5 text-[#1E1B18] font-mono text-sm focus:border-[#1E1B18] focus:outline-none"
                  >
                    {[4, 5, 6, 7].map((f) => (
                      <option key={f} value={f}>
                        {f} ft
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#6A6055] uppercase font-bold">Inches</label>
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-white border border-[#D8CFBF] rounded-xl px-4 py-2.5 text-[#1E1B18] font-mono text-sm focus:border-[#1E1B18] focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                      <option key={i} value={i}>
                        {i} in
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Imperial Weight */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#6A6055] uppercase tracking-wider font-bold">Weight (lbs)</label>
                  <span className="text-[#1E1B18] font-bold text-base">{weightLbs} lbs</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-[#1E1B18] bg-[#DFD7C8] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6A6055]">
                  <span>90 lbs</span>
                  <span>220 lbs</span>
                  <span>350 lbs</span>
                </div>
              </div>
            </>
          )}

          <div className="pt-2 text-xs font-mono text-[#6A6055] border-t border-[#D8CFBF] flex items-center justify-between">
            <span>METHOD: WHO QUETELET INDEX</span>
            <span>UPDATED LIVE</span>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-5 bg-[#F5F1E8] border border-[#D8CFBF] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-[#1E1B18]">
          <div className="text-center pb-2">
            <span className="text-xs font-mono text-[#6A6055] uppercase tracking-widest font-bold">
              ESTIMATED BODY MASS INDEX
            </span>
            <div className="text-6xl font-extrabold tracking-tight text-[#1E1B18] font-mono mt-2">
              {roundedBmi}
            </div>
            <div className="mt-3 inline-block">
              <span className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border shadow-sm ${bmiDetails.bg} ${bmiDetails.color}`}>
                {bmiDetails.label}
              </span>
            </div>
          </div>

          {/* Visual BMI Gauge Spectrum */}
          <div className="space-y-2">
            <div className="relative h-3 w-full rounded-full overflow-hidden bg-gradient-to-r from-amber-400 via-[#1E1B18] to-rose-500 shadow-inner" />
            <div className="relative w-full h-4">
              <div
                className="absolute top-0 -translate-x-1/2 transition-all duration-300 flex flex-col items-center"
                style={{ left: `${markerPercent}%` }}
              >
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#1E1B18]" />
                <span className="text-[10px] font-mono font-bold text-[#1E1B18]">{roundedBmi}</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[#6A6055]">
              <span>18.5 Under</span>
              <span>25.0 Normal</span>
              <span>30.0 Over</span>
            </div>
          </div>

          {/* Clinical Coaching Advice */}
          <div className="p-4 rounded-xl bg-[#EAE3D5] border border-[#D8CFBF] space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#1E1B18] font-bold">
              <Info className="w-4 h-4 text-[#1E1B18]" />
              <span>Training Recommendation</span>
            </div>
            <p className="text-[#6A6055] leading-relaxed">
              {bmiDetails.advice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
