import React, { useState } from 'react';
import { Calculator, Scale, ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';

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
        color: 'text-[#00f0ff]',
        bg: 'bg-[#00f0ff]/10 border-[#00f0ff]/20',
        advice: 'Focus on nutrient-dense whole foods and progressive strength training to build lean muscle mass.',
        idealRange: '60 - 76 kg',
      };
    } else if (val >= 18.5 && val <= 24.9) {
      return {
        label: 'Optimal / Healthy',
        color: 'text-[#ccff00]',
        bg: 'bg-[#ccff00]/10 border-[#ccff00]/20',
        advice: 'Excellent body composition baseline. Maintain your current caloric balance and progressive training regimen.',
        idealRange: 'Normal weight maintenance',
      };
    } else if (val >= 25 && val <= 29.9) {
      return {
        label: 'Overweight',
        color: 'text-[#ff6b35]',
        bg: 'bg-[#ff6b35]/10 border-[#ff6b35]/20',
        advice: 'Incorporate steady-state aerobic conditioning (Zone 2) alongside a moderate 300-500 kcal deficit.',
        idealRange: 'Target 5-8% reduction',
      };
    } else {
      return {
        label: 'Obese',
        color: 'text-[#ff3366]',
        bg: 'bg-[#ff3366]/10 border-[#ff3366]/20',
        advice: 'Prioritize low-impact aerobic activity (swimming, brisk walking) and consult a sports clinical dietitian.',
        idealRange: 'Clinical lifestyle modification',
      };
    }
  };

  const bmiDetails = getBmiDetails(roundedBmi);

  // Gauge marker position (min 15, max 35)
  const markerPercent = Math.min(Math.max(((roundedBmi - 15) / (35 - 15)) * 100, 0), 100);

  return (
    <section id="bmi" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ccff00] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
            <span>BIOMETRIC ASSESSMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Precision BMI Calculator
          </h2>
        </div>

        {/* Metric vs Imperial Toggle */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-[#262626]">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
              unit === 'metric'
                ? 'bg-[#2a2a2a] text-[#ccff00] font-bold'
                : 'text-[#71717a] hover:text-white'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
              unit === 'imperial'
                ? 'bg-[#2a2a2a] text-[#ccff00] font-bold'
                : 'text-[#71717a] hover:text-white'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 bg-[#1a1a1a] border border-[#262626] rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#ccff00]" />
            Anthropometric Inputs
          </h3>

          {unit === 'metric' ? (
            <>
              {/* Height Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#a1a1aa] uppercase tracking-wider">Height (cm)</label>
                  <span className="text-white font-bold text-base">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#ccff00] bg-[#262626] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#52525b]">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Weight Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#a1a1aa] uppercase tracking-wider">Weight (kg)</label>
                  <span className="text-white font-bold text-base">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#ccff00] bg-[#262626] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#52525b]">
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
                  <label className="text-xs font-mono text-[#a1a1aa] uppercase">Feet</label>
                  <input
                    type="number"
                    min="4"
                    max="7"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-[#202020] border border-[#2e2e2e] rounded-lg px-4 py-2.5 text-white font-mono focus:border-[#ccff00] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#a1a1aa] uppercase">Inches</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-[#202020] border border-[#2e2e2e] rounded-lg px-4 py-2.5 text-white font-mono focus:border-[#ccff00] focus:outline-none"
                  />
                </div>
              </div>

              {/* Imperial Weight (lbs) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-[#a1a1aa] uppercase tracking-wider">Weight (lbs)</label>
                  <span className="text-white font-bold text-base">{weightLbs} lbs</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-[#ccff00] bg-[#262626] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#52525b]">
                  <span>80 lbs</span>
                  <span>215 lbs</span>
                  <span>350 lbs</span>
                </div>
              </div>
            </>
          )}

          {/* Quick presets */}
          <div className="pt-2 flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#71717a]">Quick Presets:</span>
            <button
              onClick={() => {
                setHeightCm(170);
                setWeightKg(65);
                setHeightFeet(5);
                setHeightInches(7);
                setWeightLbs(143);
              }}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#242424] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
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
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#242424] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            >
              Athlete B (82kg)
            </button>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-[#1a1a1a] border border-[#262626] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#71717a] uppercase">CALCULATED SCORE</span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${bmiDetails.bg} ${bmiDetails.color}`}>
                {bmiDetails.label}
              </span>
            </div>

            {/* Score Big Display */}
            <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-tighter my-2">
              {roundedBmi}
            </div>

            {/* Visual Gauge Bar */}
            <div className="mt-6 space-y-2">
              <div className="relative w-full h-3 rounded-full overflow-hidden flex">
                <div className="w-[17.5%] bg-[#00f0ff]" title="Underweight (<18.5)" />
                <div className="w-[32%] bg-[#ccff00]" title="Normal (18.5 - 24.9)" />
                <div className="w-[25%] bg-[#ff6b35]" title="Overweight (25 - 29.9)" />
                <div className="w-[25.5%] bg-[#ff3366]" title="Obese (>30)" />
              </div>

              {/* Dynamic Indicator Arrow */}
              <div className="relative w-full h-4">
                <div
                  className="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${markerPercent}%` }}
                >
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white" />
                  <span className="text-[9px] font-mono text-white font-bold">▲</span>
                </div>
              </div>

              {/* Gauge Scale Labels */}
              <div className="flex justify-between text-[10px] font-mono text-[#71717a]">
                <span>15</span>
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
                <span>35+</span>
              </div>
            </div>
          </div>

          {/* Advice / Recommendations */}
          <div className="p-4 rounded-xl bg-[#202020] border border-[#2c2c2c] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
              <Info className="w-4 h-4 text-[#ccff00]" />
              <span>COACH RECOMMENDATION</span>
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {bmiDetails.advice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
