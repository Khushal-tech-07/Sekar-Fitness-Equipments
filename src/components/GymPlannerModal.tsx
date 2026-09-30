import React, { useState } from 'react';
import { X, Calculator, Dumbbell, Check, Plus } from 'lucide-react';
import { Product } from '../types';

interface GymPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddComboToCart: (product: Product) => void;
  allProducts: Product[];
}

export const GymPlannerModal: React.FC<GymPlannerModalProps> = ({
  isOpen,
  onClose,
  onAddComboToCart,
  allProducts
}) => {
  const [targetWeightKg, setTargetWeightKg] = useState<number>(100);
  const barWeightKg = 20; // Standard Olympic Barbell

  if (!isOpen) return null;

  // Calculate plate distribution for one side of the barbell
  const calculatePlates = (targetKg: number) => {
    const netWeight = Math.max(0, targetKg - barWeightKg);
    const perSide = netWeight / 2;

    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
    let remaining = perSide;
    const distribution: { plateKg: number; countPerSide: number }[] = [];

    availablePlates.forEach(plate => {
      if (remaining >= plate) {
        const count = Math.floor(remaining / plate);
        distribution.push({ plateKg: plate, countPerSide: count });
        remaining = Number((remaining - count * plate).toFixed(2));
      }
    });

    return { perSide, distribution, remainder: remaining * 2 };
  };

  const plateCalc = calculatePlates(targetWeightKg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Olympic Barbell Plate Calculator
              </h3>
              <p className="text-xs text-zinc-400">
                Determine exact plate pair loading for any target barbell weight
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Target Weight Input */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-200">Target Lift Weight (incl. 20kg Bar):</span>
              <span className="font-mono-num font-extrabold text-amber-400 text-base">
                {targetWeightKg} kg
              </span>
            </div>

            <input
              type="range"
              min={25}
              max={260}
              step={2.5}
              value={targetWeightKg}
              onChange={(e) => setTargetWeightKg(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[60, 80, 100, 120, 140, 160].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTargetWeightKg(preset)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-num font-semibold transition-colors ${
                    targetWeightKg === preset
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {preset}kg
                </button>
              ))}
            </div>
          </div>

          {/* Visual Loading Schema */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Standard Olympic Bar: <strong className="text-zinc-200">20 kg</strong></span>
              <span>Weight Per Sleeve: <strong className="text-amber-400 font-mono-num">{plateCalc.perSide} kg</strong></span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Load On Each Side:
              </span>
              
              {plateCalc.distribution.length === 0 ? (
                <p className="text-xs text-zinc-500">Only the bare bar is needed (20kg).</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {plateCalc.distribution.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[9px] font-bold text-amber-400">
                          {d.countPerSide}
                        </div>
                        <span className="font-semibold text-zinc-200">{d.plateKg} kg Plate</span>
                      </div>
                      <span className="font-mono-num text-zinc-400 text-[11px]">
                        x2 plates total
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Direct Link to buy Cast Iron or Rubber Plates */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-xs text-amber-200">Need Olympic Weight Plates?</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Cast iron from ₹75/kg · 3-Cut rubber from ₹140/kg · Olympic bumpers ₹160/kg
              </p>
            </div>
            <a
              href="#catalog"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0"
            >
              Order Plates
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
