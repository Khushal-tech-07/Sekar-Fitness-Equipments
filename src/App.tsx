/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { ComboPacksSection } from './components/ComboPacksSection';
import { ProductCatalog } from './components/ProductCatalog';
import { GymBenchesSection } from './components/GymBenchesSection';
import { StoreLocation } from './components/StoreLocation';
import { CartDrawer } from './components/CartDrawer';
import { MyEnquiriesModal } from './components/MyEnquiriesModal';
import { CatalogPdfModal } from './components/CatalogPdfModal';
import { GymPlannerModal } from './components/GymPlannerModal';
import { FirebaseSetupModal } from './components/FirebaseSetupModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { ShoppingBag, Calculator, MessageSquare, Phone } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'sekar_fitness_cart_items';

function MainApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false);
  const [isPdfCatalogOpen, setIsPdfCatalogOpen] = useState(false);
  const [isPlateCalcOpen, setIsPlateCalcOpen] = useState(false);
  const [isFirebaseInfoOpen, setIsFirebaseInfoOpen] = useState(false);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1, selectedWeightKg?: number) => {
    setCartItems(prev => {
      // For per_kg items, treat different selected weights as distinct entries
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && item.selectedWeightKg === selectedWeightKg
      );

      const baseUnitCost = product.pricingType === 'per_kg'
        ? product.price * (selectedWeightKg || product.defaultWeightKg || 10)
        : product.price;

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedWeightKg,
            calculatedPrice: baseUnitCost
          }
        ];
      }
    });

    // Auto open cart briefly or provide notification
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const comboProducts = PRODUCTS.filter(p => p.category === 'combos');
  const benchAndMachineProducts = PRODUCTS.filter(p => p.category === 'benches_machines');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Sticky Header with Google Auth */}
      <Header
        totalCartItems={totalCartCount}
        totalEstimatedAmount={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenEnquiries={() => setIsEnquiriesOpen(true)}
        onOpenFirebaseInfo={() => setIsFirebaseInfoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPdfCatalog={() => setIsPdfCatalogOpen(true)}
          onExploreCatalog={() => {
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Popular Combo Packs Section */}
        <ComboPacksSection
          combos={comboProducts}
          onAddToCart={handleAddToCart}
        />

        {/* Interactive Filterable & Searchable Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
        />

        {/* Heavy Benches, Racks & Machinery Section */}
        <GymBenchesSection
          benchesAndMachines={benchAndMachineProducts}
          onAddToCart={handleAddToCart}
        />

        {/* YouTube Showcase Tour Section */}
        <YouTubeShowcase />

        {/* Showroom & Chennai Google Maps Location */}
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer onOpenPdfCatalog={() => setIsPdfCatalogOpen(true)} />

      {/* Floating Action Utilities (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5 items-end no-print">
        {/* Barbell Plate Calculator Quick Trigger */}
        <button
          onClick={() => setIsPlateCalcOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 shadow-xl backdrop-blur-md transition-all hover:scale-105"
          title="Open Olympic Barbell Plate Calculator"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Plate Calculator</span>
        </button>

        {/* Direct WhatsApp Factory Floating Button */}
        <a
          href="https://wa.me/916381914335?text=Hello%20Sekar%20Fitness%2C%20I%20have%20an%20inquiry%20regarding%20gym%20equipments"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all hover:scale-105 active:scale-95"
          aria-label="Contact Sekar Fitness on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Factory</span>
        </a>

        {/* Cart Quick Trigger (if items exist) */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 animate-bounce"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Quotation ({totalCartCount}) · ₹{totalCartAmount.toLocaleString('en-IN')}</span>
          </button>
        )}
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <MyEnquiriesModal
        isOpen={isEnquiriesOpen}
        onClose={() => setIsEnquiriesOpen(false)}
      />

      <CatalogPdfModal
        isOpen={isPdfCatalogOpen}
        onClose={() => setIsPdfCatalogOpen(false)}
      />

      <GymPlannerModal
        isOpen={isPlateCalcOpen}
        onClose={() => setIsPlateCalcOpen(false)}
        onAddComboToCart={(p) => handleAddToCart(p, 1)}
        allProducts={PRODUCTS}
      />

      <FirebaseSetupModal
        isOpen={isFirebaseInfoOpen}
        onClose={() => setIsFirebaseInfoOpen(false)}
      />

      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
