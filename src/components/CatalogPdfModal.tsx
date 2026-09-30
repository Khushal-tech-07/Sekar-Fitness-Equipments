import React from 'react';
import { X, Printer, Download, Dumbbell, ShieldAlert, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface CatalogPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogPdfModal: React.FC<CatalogPdfModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const dumbbells = PRODUCTS.filter(p => p.category === 'dumbbells');
  const plates = PRODUCTS.filter(p => p.category === 'plates');
  const rods = PRODUCTS.filter(p => p.category === 'rods');
  const combos = PRODUCTS.filter(p => p.category === 'combos');
  const benches = PRODUCTS.filter(p => p.category === 'benches_machines');
  const accessories = PRODUCTS.filter(p => p.category === 'accessories');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white text-zinc-900 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Controls bar (Hidden during print) */}
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between no-print border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Sekar Fitness Equipments – Official Factory Price Sheet</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white text-zinc-900 font-sans text-xs print:p-0 print:overflow-visible">
          
          {/* Document Header */}
          <div className="border-b-2 border-zinc-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="font-black text-2xl tracking-tight text-zinc-950 uppercase">
                SEKAR FITNESS EQUIPMENTS
              </h1>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Heavy-Duty Commercial & Home Gym Gear Manufacturer
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                27/18, Ethiraj Garden St, Pattalam, Purasaiwalkam, Chennai, Tamil Nadu 600012
              </p>
              <p className="text-xs text-zinc-600 font-mono">
                Phone / WhatsApp: +91 63819 14335 · IG: @sekar_fitness_equipments
              </p>
            </div>

            <div className="text-right sm:text-right bg-zinc-100 p-3 rounded-lg border border-zinc-300">
              <span className="block text-[11px] font-bold uppercase text-zinc-500">Document Type</span>
              <span className="block font-bold text-sm text-zinc-900">FACTORY DIRECT PRICE LIST</span>
              <span className="block text-[11px] text-zinc-500 font-mono mt-0.5">Valid for Season 2026</span>
            </div>
          </div>

          {/* Mandatory Critical Policy Notice */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-[11px] text-amber-950 font-medium space-y-0.5">
            <p className="font-bold text-amber-900">MANDATORY DISPATCH & PAYMENT TERMS:</p>
            <p>1. <strong>Transportation cost extra on all orders:</strong> Freight is computed based on distance and volumetric cargo weight.</p>
            <p>2. <strong>100% advance payment required:</strong> Equipment dispatched strictly upon clearance of full invoice value.</p>
          </div>

          {/* Tables by Category */}
          
          {/* 1. Dumbbells */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded">
              1. Dumbbells & Fixed Bars
            </h3>
            <table className="w-full mt-2 border border-zinc-300 text-left">
              <thead className="bg-zinc-100 font-semibold text-[11px] border-b border-zinc-300">
                <tr>
                  <th className="p-2">Item Code</th>
                  <th className="p-2">Product Description</th>
                  <th className="p-2">Material / Build</th>
                  <th className="p-2 text-right">Factory Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {dumbbells.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50">
                    <td className="p-2 font-mono font-medium text-zinc-600">{item.itemCode}</td>
                    <td className="p-2 font-semibold text-zinc-900">{item.name}</td>
                    <td className="p-2 text-zinc-600">{item.material || 'Solid Steel'}</td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-950">{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Weight Plates */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded">
              2. Weight Lifting Plates (Standard 28mm & Olympic 50mm)
            </h3>
            <table className="w-full mt-2 border border-zinc-300 text-left">
              <thead className="bg-zinc-100 font-semibold text-[11px] border-b border-zinc-300">
                <tr>
                  <th className="p-2">Item Code</th>
                  <th className="p-2">Product Description</th>
                  <th className="p-2">Bore / Finish</th>
                  <th className="p-2 text-right">Factory Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {plates.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50">
                    <td className="p-2 font-mono font-medium text-zinc-600">{item.itemCode}</td>
                    <td className="p-2 font-semibold text-zinc-900">{item.name}</td>
                    <td className="p-2 text-zinc-600">{item.material || 'Cast Iron'}</td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-950">{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Rods */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded">
              3. Barbells, Dumbbell Rods & Lock Collars
            </h3>
            <table className="w-full mt-2 border border-zinc-300 text-left">
              <thead className="bg-zinc-100 font-semibold text-[11px] border-b border-zinc-300">
                <tr>
                  <th className="p-2">Item Code</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Dimensions / Capacity</th>
                  <th className="p-2 text-right">Factory Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {rods.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50">
                    <td className="p-2 font-mono font-medium text-zinc-600">{item.itemCode}</td>
                    <td className="p-2 font-semibold text-zinc-900">{item.name}</td>
                    <td className="p-2 text-zinc-600">{item.specs[0] || 'High tensile'}</td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-950">{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Combos */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded">
              4. Popular Discount Combo Packs
            </h3>
            <table className="w-full mt-2 border border-zinc-300 text-left">
              <thead className="bg-zinc-100 font-semibold text-[11px] border-b border-zinc-300">
                <tr>
                  <th className="p-2">Combo</th>
                  <th className="p-2">Pack Inclusions</th>
                  <th className="p-2">Discount</th>
                  <th className="p-2 text-right">Offer Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {combos.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50">
                    <td className="p-2 font-mono font-medium text-zinc-600">{item.itemCode}</td>
                    <td className="p-2 font-semibold text-zinc-900">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{item.specs.join(' · ')}</div>
                    </td>
                    <td className="p-2 text-amber-700 font-bold">
                      {item.originalPrice ? `Save ₹${item.originalPrice - item.price}` : 'Special'}
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-950">{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. Benches & Machines */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider bg-zinc-900 text-white px-2.5 py-1 rounded">
              5. Benches, Racks & Heavy Machinery
            </h3>
            <table className="w-full mt-2 border border-zinc-300 text-left">
              <thead className="bg-zinc-100 font-semibold text-[11px] border-b border-zinc-300">
                <tr>
                  <th className="p-2">Item Code</th>
                  <th className="p-2">Model</th>
                  <th className="p-2">Structural Tube Gauge</th>
                  <th className="p-2 text-right">Factory Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {benches.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50">
                    <td className="p-2 font-mono font-medium text-zinc-600">{item.itemCode}</td>
                    <td className="p-2 font-semibold text-zinc-900">{item.name}</td>
                    <td className="p-2 text-zinc-600">{item.material || 'Heavy MS Steel'}</td>
                    <td className="p-2 text-right font-mono font-bold text-zinc-950">{item.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Document Footer */}
          <div className="pt-4 border-t border-zinc-300 text-[11px] text-zinc-500 flex justify-between items-center">
            <span>Sekar Fitness Equipments · Chennai, Tamil Nadu</span>
            <span>All specifications and prices subject to factory terms.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
