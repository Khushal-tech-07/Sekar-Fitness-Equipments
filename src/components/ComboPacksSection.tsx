import React from 'react';
import { Sparkles, Check, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ComboPacksSectionProps {
  combos: Product[];
  onAddToCart: (product: Product, quantity?: number, selectedWeightKg?: number) => void;
}

export const ComboPacksSection: React.FC<ComboPacksSectionProps> = ({ combos, onAddToCart }) => {
  return (
    <section id="combos" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Factory Value Bundles</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Popular Home & Commercial Combo Packs
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Save more with pre-matched sets! All combos include heavy-duty plates, precision rods, and collars.
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <span>Note: Transportation cost extra on all orders · 100% advance payment required for dispatch</span>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => {
            const savings = combo.originalPrice ? combo.originalPrice - combo.price : 0;

            return (
              <div
                key={combo.id}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Top visual */}
                  <div className="relative">
                    <ProductVisual product={combo} />
                    {savings > 0 && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
                        Save ₹{savings.toLocaleString('en-IN')}
                      </div>
                    )}
                    {combo.badge && !savings && (
                      <div className="absolute top-3 right-3 bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-md">
                        {combo.badge}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Item Code & Name */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-mono-num mb-1">
                      <span>{combo.itemCode}</span>
                      <span>Verified Bundle</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {combo.name}
                    </h3>

                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {combo.description}
                    </p>

                    {/* What's Inside list */}
                    <div className="mt-4 pt-4 border-t border-zinc-800/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Package Includes:
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {combo.specs.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-0 mt-4">
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-extrabold text-2xl text-amber-400 font-mono-num">
                          ₹{combo.price.toLocaleString('en-IN')}
                        </span>
                        {combo.originalPrice && (
                          <span className="text-xs line-through text-zinc-500 font-mono-num">
                            ₹{combo.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500 block">
                        Transportation extra
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(combo, 1)}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add to Estimate</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
