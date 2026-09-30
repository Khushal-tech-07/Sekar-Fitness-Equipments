import React from 'react';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Instagram, 
  Youtube, 
  Navigation, 
  ShieldCheck, 
  Truck,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenPdfCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdfCatalog }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      
      {/* Top Banner with Critical Factory Policies */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Transportation Cost Extra On All Orders</span>
            </span>
            <span className="hidden md:inline text-zinc-600">·</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Advance Payment Required for Dispatch</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-bold">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                SEKAR <span className="text-amber-400">FITNESS EQUIPMENTS</span>
              </span>
            </div>

            <p className="text-xs text-amber-400/90 font-medium italic">
              "Premium Quality Gym Equipments | Muscle Power: Learn. Try. Improve."
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Premier fitness equipment manufacturer & dealer based in Pattalam, Chennai. Direct factory prices for commercial gyms, fitness clubs, and home setups across Tamil Nadu and Pan-India.
            </p>

            <div className="flex items-start gap-2 text-zinc-400 pt-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-xs leading-snug">
                27/18, Ethiraj Garden St, Pattalam, Purasaiwalkam, Chennai, Tamil Nadu 600012
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Equipment Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Cast Iron & Rubber Dumbbells
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Olympic & Standard Plates
                </a>
              </li>
              <li>
                <a href="#combos" className="hover:text-amber-400 transition-colors">
                  Popular Home Gym Combos
                </a>
              </li>
              <li>
                <a href="#benches-machines" className="hover:text-amber-400 transition-colors">
                  FID Benches & Squat Racks
                </a>
              </li>
              <li>
                <a href="#benches-machines" className="hover:text-amber-400 transition-colors">
                  Smith Machines & Trainers
                </a>
              </li>
            </ul>
          </div>

          {/* Factory Info & Downloads */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Factory Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPdfCatalog}
                  className="text-left text-amber-400 hover:underline"
                >
                  Download Official Price List (PDF)
                </button>
              </li>
              <li>
                <a href="#video-tour" className="hover:text-amber-400 transition-colors">
                  Factory & Showroom Video Tour
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Showroom Directions & Hours
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/916381914335?text=Hello%20Sekar%20Fitness%2C%20I%20want%20custom%20branding%20for%20my%20gym" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors"
                >
                  Custom Gym Branding Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/916381914335"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono-num font-semibold">+91 63819 14335</span>
              </a>

              <a
                href="https://instagram.com/sekar_fitness_equipments"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@sekar_fitness_equipments</span>
              </a>

              <a
                href="https://youtu.be/x9d7Ju9v_Uc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube Showcase</span>
              </a>

              <a
                href="https://maps.app.goo.gl/XiBAcDBPM8RfEKNL7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Maps Location</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Sekar Fitness Equipments. All rights reserved. Chennai, India.</p>
          <div className="flex items-center gap-4">
            <span>Chennai Heavy Foundry & Fabrication</span>
            <span>·</span>
            <span>Ready for Vercel Deployment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
