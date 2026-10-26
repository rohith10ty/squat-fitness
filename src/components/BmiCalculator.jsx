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

  // BMI Category & Styling
  const getBmiDetails = (val) => {
    if (val < 18.5) {
      return {
        label: 'Underweight',
        color: 'text-amber-800',
        bg: 'bg-amber-50 border-amber-200',
        advice: 'Focus on nutrient-dense whole foods and progressive strength training to build lean muscle mass.',
        idealRange: '60 - 76 kg',
      };
    } else if (val >= 18.5 && val <= 24.9) {
      return {
        label: 'Optimal / Healthy',
        color: 'text-emerald-800',
        bg: 'bg-emerald-50 border-emerald-200 font-bold',
        advice: 'Excellent body composition baseline. Maintain current caloric balance and progressive overload.',
        idealRange: 'Normal weight maintenance',
      };
    } else if (val >= 25 && val <= 29.9) {
      return {
        label: 'Overweight',
        color: 'text-orange-800',
        bg: 'bg-orange-50 border-orange-200',
        advice: 'Incorporate steady-state aerobic conditioning (Zone 2) alongside a moderate 300-500 kcal deficit.',
        idealRange: 'Target 5-8% reduction',
      };
    } else {
      return {
        label: 'High Risk (Obese)',
        color: 'text-rose-800',
        bg: 'bg-rose-50 border-rose-200',
        advice: 'Prioritize low-impact aerobic activity (swimming, brisk walking) and consult a sports clinical dietitian.',
        idealRange: 'Clinical lifestyle modification',
      };
    }
  };

  const bmiDetails = getBmiDetails(roundedBmi);

  // Gauge marker position (min 15, max 35)
  const markerPercent = Math.min(Math.max(((roundedBmi - 15) / (35 - 15)) * 100, 0), 100);

  return (
    <section id="bmi" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans bg-white text-gray-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#1D2B04] uppercase mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1D2B04]" />
            <span>BIOMETRIC ASSESSMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Precision BMI Calculator
          </h2>
        </div>

        {/* Metric vs Imperial Toggle */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
              unit === 'metric'
                ? 'bg-white text-gray-900 font-bold shadow-2xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
              unit === 'imperial'
                ? 'bg-white text-gray-900 font-bold shadow-2xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#1D2B04]" />
            Anthropometric Inputs
          </h3>

          {unit === 'metric' ? (
            <>
              {/* Height Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-gray-500 uppercase tracking-wider font-medium">Height (cm)</label>
                  <span className="text-gray-900 font-bold text-base">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#1D2B04] bg-gray-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Weight Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-gray-500 uppercase tracking-wider font-medium">Weight (kg)</label>
                  <span className="text-gray-900 font-bold text-base">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#1D2B04] bg-gray-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>40 kg</span>
                  <span>100 kg</span>
                  <span>160 kg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Imperial Height (ft / in) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-500 uppercase">Feet</label>
                  <input
                    type="number"
                    min="4"
                    max="7"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-mono focus:border-[#1D2B04] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-500 uppercase">Inches</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 font-mono focus:border-[#1D2B04] focus:outline-none"
                  />
                </div>
              </div>

              {/* Imperial Weight (lbs) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-gray-500 uppercase tracking-wider font-medium">Weight (lbs)</label>
                  <span className="text-gray-900 font-bold text-base">{weightLbs} lbs</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-[#1D2B04] bg-gray-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>80 lbs</span>
                  <span>215 lbs</span>
                  <span>350 lbs</span>
                </div>
              </div>
            </>
          )}

          {/* Quick presets */}
          <div className="pt-2 flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-500">Quick Presets:</span>
            <button
              onClick={() => {
                setHeightCm(170);
                setWeightKg(65);
                setHeightFeet(5);
                setHeightInches(7);
                setWeightLbs(143);
              }}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shadow-2xs"
            >
              Athlete A (65kg)
            </button>
            <button
              onClick={() => {
                setHeightCm(183);
                setWeightKg(82);
                setHeightFeet(6);
                setHeightInches(0);
                setWeightLbs(180);
              }}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shadow-2xs"
            >
              Athlete B (82kg)
            </button>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-[#F9FAFB] border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-gray-500 uppercase font-medium">CALCULATED SCORE</span>
              <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${bmiDetails.bg} ${bmiDetails.color}`}>
                {bmiDetails.label}
              </span>
            </div>

            {/* Score Big Display */}
            <div className="text-6xl sm:text-7xl font-mono font-black text-gray-900 tracking-tighter my-2">
              {roundedBmi}
            </div>

            {/* Visual Gauge Bar */}
            <div className="mt-6 space-y-2">
              <div className="relative w-full h-3 rounded-full overflow-hidden flex">
                <div className="w-[17.5%] bg-amber-400" title="Underweight (<18.5)" />
                <div className="w-[32%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
                <div className="w-[25%] bg-orange-400" title="Overweight (25 - 29.9)" />
                <div className="w-[25.5%] bg-rose-500" title="Obese (>30)" />
              </div>

              {/* Dynamic Indicator Arrow */}
              <div className="relative w-full h-4">
                <div
                  className="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${markerPercent}%` }}
                >
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-[#1D2B04]" />
                  <span className="text-[9px] font-mono text-[#1D2B04] font-bold">▲</span>
                </div>
              </div>

              {/* Gauge Scale Labels */}
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>15</span>
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
                <span>35+</span>
              </div>
            </div>
          </div>

          {/* Advice / Recommendations */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-900 font-bold">
              <Info className="w-4 h-4 text-[#1D2B04]" />
              <span>COACH RECOMMENDATION</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {bmiDetails.advice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
