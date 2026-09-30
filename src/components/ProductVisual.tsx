import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, className = '' }) => {
  const { thumbnailType, category, name, material } = product;

  // Render dedicated crisp industrial vector visuals for gym equipment
  return (
    <div className={`relative w-full h-48 bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center overflow-hidden border-b border-zinc-800/80 group ${className}`}>
      {/* Subtle industrial grid background */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)', 
          backgroundSize: '16px 16px' 
        }} 
      />

      {/* Ambient glow accent */}
      <div className="absolute w-32 h-32 rounded-full bg-amber-500/10 blur-2xl -top-8 -right-8 pointer-events-none transition-opacity duration-300 group-hover:bg-amber-500/20" />

      {/* Vector Illustration based on equipment type */}
      {thumbnailType === 'dumbbell' && (
        <svg viewBox="0 0 200 120" className="w-36 h-24 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Left Hex Head */}
          <polygon points="35,25 65,25 80,60 65,95 35,95 20,60" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
          <polygon points="40,32 60,32 72,60 60,88 40,88 28,60" fill="#18181b" />
          <text x="50" y="64" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">mpX</text>

          {/* Knurled Center Bar */}
          <rect x="75" y="53" width="50" height="14" rx="2" fill="#71717a" stroke="#a1a1aa" strokeWidth="1" />
          {/* Knurling hatched lines */}
          <line x1="82" y1="53" x2="82" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="88" y1="53" x2="88" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="94" y1="53" x2="94" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="100" y1="53" x2="100" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="106" y1="53" x2="106" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="112" y1="53" x2="112" y2="67" stroke="#3f3f46" strokeWidth="1.5" />
          <line x1="118" y1="53" x2="118" y2="67" stroke="#3f3f46" strokeWidth="1.5" />

          {/* Right Hex Head */}
          <polygon points="135,25 165,25 180,60 165,95 135,95 120,60" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
          <polygon points="140,32 160,32 172,60 160,88 140,88 128,60" fill="#18181b" />
          <text x="150" y="64" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">KG</text>
        </svg>
      )}

      {thumbnailType === 'plate' && (
        <svg viewBox="0 0 200 120" className="w-36 h-28 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Outer plate ring */}
          <circle cx="100" cy="60" r="50" fill="#18181b" stroke="#3f3f46" strokeWidth="4" />
          <circle cx="100" cy="60" r="44" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          {/* Ergonomic 3 cutouts */}
          <ellipse cx="100" cy="28" rx="14" ry="5" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <ellipse cx="74" cy="74" rx="14" ry="5" transform="rotate(-60 74 74)" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <ellipse cx="126" cy="74" rx="14" ry="5" transform="rotate(60 126 74)" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          {/* Inner Olympic hub */}
          <circle cx="100" cy="60" r="16" fill="#27272a" stroke="#e4e4e7" strokeWidth="2" />
          <circle cx="100" cy="60" r="8" fill="#09090b" stroke="#a1a1aa" strokeWidth="1" />
          <text x="100" y="52" fill="#71717a" fontSize="7" fontWeight="bold" textAnchor="middle">SEKAR</text>
          <text x="100" y="96" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">50MM OLYMPIC</text>
        </svg>
      )}

      {thumbnailType === 'rod' && (
        <svg viewBox="0 0 220 100" className="w-44 h-20 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Main Barbell Shaft */}
          <line x1="15" y1="50" x2="205" y2="50" stroke="#a1a1aa" strokeWidth="5" strokeLinecap="round" />
          {/* Left Olympic Sleeve */}
          <rect x="25" y="44" width="35" height="12" rx="1" fill="#e4e4e7" stroke="#71717a" strokeWidth="1.5" />
          <circle cx="60" cy="50" r="9" fill="#3f3f46" stroke="#e4e4e7" strokeWidth="1" />
          {/* Center Knurling bands */}
          <line x1="85" y1="48" x2="110" y2="48" stroke="#18181b" strokeWidth="2" strokeDasharray="2 1" />
          <line x1="125" y1="48" x2="150" y2="48" stroke="#18181b" strokeWidth="2" strokeDasharray="2 1" />
          {/* Right Olympic Sleeve */}
          <circle cx="160" cy="50" r="9" fill="#3f3f46" stroke="#e4e4e7" strokeWidth="1" />
          <rect x="160" y="44" width="35" height="12" rx="1" fill="#e4e4e7" stroke="#71717a" strokeWidth="1.5" />
          {/* Weight plate loaded on bar indicator */}
          <rect x="58" y="24" width="6" height="52" rx="1.5" fill="#f59e0b" />
          <rect x="156" y="24" width="6" height="52" rx="1.5" fill="#f59e0b" />
        </svg>
      )}

      {thumbnailType === 'bench' && (
        <svg viewBox="0 0 200 120" className="w-36 h-24 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Bench Frame Ground Feet */}
          <line x1="25" y1="100" x2="65" y2="100" stroke="#3f3f46" strokeWidth="4" strokeLinecap="round" />
          <line x1="135" y1="100" x2="175" y2="100" stroke="#3f3f46" strokeWidth="4" strokeLinecap="round" />
          {/* Upright and Crossbeam 4x2 */}
          <line x1="45" y1="100" x2="45" y2="65" stroke="#27272a" strokeWidth="6" />
          <line x1="155" y1="100" x2="155" y2="65" stroke="#27272a" strokeWidth="6" />
          <line x1="42" y1="70" x2="158" y2="70" stroke="#27272a" strokeWidth="6" />
          {/* Incline Backrest Pad (Angled) */}
          <polygon points="75,60 170,30 173,38 78,68" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
          {/* Seat Pad */}
          <polygon points="35,62 70,62 70,70 35,70" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
          {/* Wheels indicator */}
          <circle cx="155" cy="100" r="5" fill="#a1a1aa" />
        </svg>
      )}

      {thumbnailType === 'machine' && (
        <svg viewBox="0 0 200 120" className="w-36 h-24 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Power Cage / Smith Machine Columns */}
          <line x1="45" y1="20" x2="45" y2="105" stroke="#3f3f46" strokeWidth="5" />
          <line x1="155" y1="20" x2="155" y2="105" stroke="#3f3f46" strokeWidth="5" />
          {/* Top Crossbar with Chin Up Bend */}
          <line x1="35" y1="22" x2="165" y2="22" stroke="#27272a" strokeWidth="4" />
          <polyline points="75,22 90,32 110,32 125,22" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          {/* Smith Guide Rods & Linear Bearing Bar */}
          <line x1="55" y1="24" x2="55" y2="100" stroke="#71717a" strokeWidth="2" />
          <line x1="145" y1="24" x2="145" y2="100" stroke="#71717a" strokeWidth="2" />
          <line x1="40" y1="55" x2="160" y2="55" stroke="#e4e4e7" strokeWidth="3" />
          {/* Dual 80kg Weight Stacks */}
          <rect x="25" y="45" width="14" height="45" rx="1" fill="#18181b" stroke="#52525b" strokeWidth="1" />
          <line x1="25" y1="54" x2="39" y2="54" stroke="#3f3f46" strokeWidth="1" />
          <line x1="25" y1="63" x2="39" y2="63" stroke="#3f3f46" strokeWidth="1" />
          <line x1="25" y1="72" x2="39" y2="72" stroke="#3f3f46" strokeWidth="1" />
          <line x1="25" y1="81" x2="39" y2="81" stroke="#3f3f46" strokeWidth="1" />
          {/* Right stack */}
          <rect x="161" y="45" width="14" height="45" rx="1" fill="#18181b" stroke="#52525b" strokeWidth="1" />
        </svg>
      )}

      {thumbnailType === 'combo' && (
        <svg viewBox="0 0 200 120" className="w-40 h-24 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Background Bench */}
          <line x1="60" y1="85" x2="140" y2="85" stroke="#27272a" strokeWidth="5" />
          <line x1="75" y1="85" x2="75" y2="100" stroke="#3f3f46" strokeWidth="3" />
          <line x1="125" y1="85" x2="125" y2="100" stroke="#3f3f46" strokeWidth="3" />
          {/* Angled EZ Bar */}
          <polyline points="30,70 50,60 70,68 90,60 110,68 130,60 150,70" stroke="#a1a1aa" strokeWidth="3" fill="none" />
          {/* Plates stacked on side */}
          <ellipse cx="40" cy="55" rx="12" ry="24" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
          <ellipse cx="50" cy="57" rx="10" ry="20" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
          <ellipse cx="160" cy="55" rx="12" ry="24" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
          {/* Pair of Dumbbells foreground */}
          <polygon points="85,82 95,82 100,92 95,102 85,102 80,92" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <rect x="98" y="90" width="16" height="4" fill="#d4d4d8" />
          <polygon points="112,82 122,82 127,92 122,102 112,102 107,92" fill="#27272a" stroke="#52525b" strokeWidth="1" />
        </svg>
      )}

      {thumbnailType === 'accessory' && (
        <svg viewBox="0 0 200 120" className="w-36 h-24 drop-shadow-xl transition-transform duration-300 group-hover:scale-105" fill="none">
          {/* Battle Rope Wave */}
          <path d="M 25 50 Q 55 20, 85 50 T 145 50 T 175 50" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          {/* MS Weight Stack plate in backdrop */}
          <rect x="65" y="65" width="70" height="30" rx="2" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
          <circle cx="100" cy="73" r="3.5" fill="#f59e0b" />
          <line x1="80" y1="83" x2="120" y2="83" stroke="#3f3f46" strokeWidth="2" />
          {/* Pulley Wheel */}
          <circle cx="150" cy="30" r="14" fill="#27272a" stroke="#a1a1aa" strokeWidth="2" />
          <circle cx="150" cy="30" r="5" fill="#09090b" />
        </svg>
      )}

      {/* Material & Item Code Tag */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono-num pointer-events-none">
        <span>{product.itemCode}</span>
        {material && <span className="text-zinc-400 truncate max-w-[120px]">{material}</span>}
      </div>
    </div>
  );
};
