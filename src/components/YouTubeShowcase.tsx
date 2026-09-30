import React from 'react';
import { Play, ExternalLink, CheckCircle2, Shield, Wrench } from 'lucide-react';

export const YouTubeShowcase: React.FC = () => {
  return (
    <section id="video-tour" className="py-16 bg-zinc-950/60 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <Play className="w-3.5 h-3.5 fill-amber-400" />
              <span>Factory Walkthrough & Equipment Testing</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              See the Build Quality in Action
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Take an inside look at our Chennai equipment floor. Watch load stress tests, bench welding integrity, and knurling finish before placing your order.
            </p>
          </div>

          <a
            href="https://youtu.be/x9d7Ju9v_Uc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors shrink-0"
          >
            <span>Watch directly on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

        {/* Video Player + Quality Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Responsive 16:9 Video Embed */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl relative aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/x9d7Ju9v_Uc?rel=0"
              title="Sekar Fitness Equipments Chennai Showroom and Factory Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Quality Breakdown Checklist */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
                <Shield className="w-4 h-4" />
                <span>Heavy-Gauge Indian MS Steel</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We use thick 12-gauge square and rectangular pipes that withstand commercial gym abuse without bending or wobble.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
                <Wrench className="w-4 h-4" />
                <span>Precision Knurling & Bushings</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Barbells feature calibrated volcano knurling and high-spin needle bearings for seamless Olympic lifting without wrist trauma.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tested Before Dispatch</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every bench, rack, and pulley station undergoes physical load testing at our Pattalam shop before packing and transport.
              </p>
            </div>

            {/* Direct Factory Visit Invite */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Visit Us in Chennai</span>
              <p className="text-xs text-zinc-300 mt-1">
                Prefer to test the equipment in person? Visit our showroom at 27/18 Ethiraj Garden St, Pattalam, Chennai.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
