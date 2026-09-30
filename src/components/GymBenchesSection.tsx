import React, { useState } from 'react';
import { Dumbbell, Plus, Check, Shield, Layers, Wrench } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface GymBenchesSectionProps {
  benchesAndMachines: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const GymBenchesSection: React.FC<GymBenchesSectionProps> = ({
  benchesAndMachines,
  onAddToCart
}) => {
  const [filter, setFilter] = useState<'all' | 'benches' | 'racks_machines'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredItems = benchesAndMachines.filter(item => {
    if (filter === 'benches') return item.thumbnailType === 'bench';
    if (filter === 'racks_machines') return item.thumbnailType === 'machine';
    return true;
  });

  const handleAdd = (item: Product) => {
    onAddToCart(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section id="benches-machines" className="py-16 bg-zinc-950/70 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Heavy Fabrication & Commercial Stations</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Benches, Squat Racks & Heavy Machinery
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Constructed with 2x2 and 4x2 cold-rolled 12-gauge mild steel pipes. Engineered for commercial gym endurance and zero frame flexing.
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Fabrication
            </button>
            <button
              onClick={() => setFilter('benches')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'benches'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Benches Only
            </button>
            <button
              onClick={() => setFilter('racks_machines')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === 'racks_machines'
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Racks & Functional Trainers
            </button>
          </div>
        </div>

        {/* Highlighted Flagship Banner for Functional Trainer Smith Machine */}
        {filter !== 'benches' && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-amber-500/30 p-6 md:p-8 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                  <span>Flagship Commercial Station</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  Functional Trainer with Smith Machine (Dual 80kg Stacks)
                </h3>
                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                  The centerpiece of commercial fitness clubs. Features dual 80kg precision-milled weight stacks (160kg total), ultra-smooth linear bearings for the Smith bar, and 12-gauge heavy-duty steel pipe construction.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase block">Weight Stacks</span>
                    <span className="font-bold text-amber-400 font-mono-num">2x 80kg (160kg)</span>
                  </div>
                  <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase block">Steel Spec</span>
                    <span className="font-bold text-zinc-100">12-Gauge Pipe</span>
                  </div>
                  <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase block">Smith Bearings</span>
                    <span className="font-bold text-zinc-100">Linear Bearing</span>
                  </div>
                  <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase block">Factory Price</span>
                    <span className="font-bold text-amber-400 font-mono-num">₹85,000</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-xs text-zinc-400 block">Direct Factory Wholesale:</span>
                  <span className="font-display text-3xl font-extrabold text-amber-400 font-mono-num">
                    ₹85,000
                  </span>
                  <span className="text-[11px] text-zinc-500 block">Transportation cost extra</span>
                </div>
                <button
                  onClick={() => {
                    const flagship = benchesAndMachines.find(m => m.id === 'machine-functional-trainer-smith');
                    if (flagship) handleAdd(flagship);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Functional Trainer</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Benches & Machines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden shadow-md"
            >
              <div>
                <ProductVisual product={item} />
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-mono-num text-[11px] text-amber-400 font-semibold">{item.itemCode}</span>
                    <span className="text-zinc-500">{item.material}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 space-y-1">
                    {item.specs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-400 truncate">
                        <span className="w-1 h-1 rounded-full bg-amber-400/80 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-zinc-800/80 bg-zinc-900/60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-extrabold text-xl text-amber-400 font-mono-num block">
                      {item.priceLabel}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">Transportation extra</span>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-amber-400 text-zinc-900 hover:text-zinc-950 text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
