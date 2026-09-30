import React from 'react';
import { 
  ArrowRight, 
  Download, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Factory, 
  Award,
  Flame
} from 'lucide-react';

interface HeroProps {
  onOpenPdfCatalog: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPdfCatalog, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-zinc-800">
      {/* Background industrial lighting gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-zinc-950/0 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Highlighted Badge: Direct Factory Prices | Custom Gym Setups */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs text-zinc-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">Chennai Manufacturer</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>Direct Factory Prices | Custom Commercial & Home Gyms</span>
          </div>

          {/* Bold Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.15]">
            Built with Iron. Engineered for Champions in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Chennai</span>.
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-base sm:text-lg text-amber-400 font-semibold tracking-wide">
            "Premium Quality Gym Equipments | Muscle Power: Learn. Try. Improve."
          </p>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl text-balance">
            From precision cast iron plates and rubber hex dumbbells to heavy 12-gauge FID benches and Smith machine functional trainers. Manufactured locally at our Pattalam factory.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            {/* Explore Catalog */}
            <button
              onClick={onExploreCatalog}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-98"
            >
              <span>Explore 2026 Catalog</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Download PDF / Price List */}
            <button
              onClick={onOpenPdfCatalog}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-semibold text-sm transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download PDF Price List</span>
            </button>

            {/* Direct WhatsApp Inquiry */}
            <a
              href="https://wa.me/916381914335?text=Hello%20Sekar%20Fitness%2C%20I%20want%20to%20get%20a%20quotation%20for%20gym%20equipments"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Trust Policies Grid (Adjacent to CTAs) */}
          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Factory className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase tracking-wider text-zinc-200">Factory Direct</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero middleman markups. Directly manufactured in Chennai foundry.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase tracking-wider text-zinc-200">100% Advance Pay</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Strict factory policy: Full payment required prior to dispatch.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Truck className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase tracking-wider text-zinc-200">Transport Extra</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Doorstep / lorry transport charges billed as actuals by location.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="font-semibold text-xs uppercase tracking-wider text-zinc-200">Custom Built</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                12-gauge pipe, custom color powder coats, and custom branding.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
