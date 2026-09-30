import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Check, 
  Weight, 
  ArrowUpDown, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number, selectedWeightKg?: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  // Track custom weight selection for per_kg items (productId -> weight in kg)
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  // Quick added toast/flash feedback per product
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleWeightChange = (productId: string, weightKg: number) => {
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: weightKg
    }));
  };

  const handleAdd = (product: Product) => {
    const chosenWeight = product.pricingType === 'per_kg' 
      ? (selectedWeights[product.id] || product.defaultWeightKg || 10) 
      : undefined;

    onAddToCart(product, 1, chosenWeight);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      // Search filter (name, itemCode, material, description)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        item.itemCode.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.material && item.material.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // featured order in dataset
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Full Factory Price List</span>
              <span className="text-zinc-600">·</span>
              <span>Direct Chennai Delivery</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gym Equipment Catalog & Quotation Builder
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Select items, customize plate/dumbbell weight, and generate an itemized WhatsApp quotation.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono-num flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Showing {filteredProducts.length} manufactured items</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by equipment name, item code (e.g., SFE-DB-03), or material..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="featured">Sort: Factory Recommended</option>
                  <option value="price_asc">Sort: Price (Low to High)</option>
                  <option value="price_desc">Sort: Price (High to Low)</option>
                </select>
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Interactive Category Segmented Tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                      : 'bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-num ${
                    isActive ? 'bg-zinc-950 text-amber-400 font-bold' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800">
            <SlidersHorizontal className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-200">No equipment found matching criteria</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select "All Gear" to view the complete factory catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs text-amber-400 font-semibold hover:bg-zinc-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const currentWeight = selectedWeights[product.id] || product.defaultWeightKg || 10;
              const calculatedCost = product.pricingType === 'per_kg' 
                ? product.price * currentWeight 
                : product.price;

              const isRecentlyAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden group shadow-md"
                >
                  <div>
                    {/* Visual with Badge */}
                    <div className="relative">
                      <ProductVisual product={product} />
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-sm border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-5 pb-3">
                      {/* Quiet Unboxed Metadata (Zero-Pill compliant) */}
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium mb-1.5">
                        <span className="text-amber-400 font-semibold">{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num">{product.itemCode}</span>
                        {product.material && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{product.material}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-base text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Product Specifications */}
                      <div className="mt-3 space-y-1">
                        {product.specs.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Weight Selector for Per-KG items */}
                      {product.pricingType === 'per_kg' && (
                        <div className="mt-4 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                          <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                            <span className="font-semibold flex items-center gap-1 text-[11px]">
                              <Weight className="w-3.5 h-3.5 text-amber-400" />
                              <span>Select Weight for Estimate:</span>
                            </span>
                            <span className="font-mono-num font-bold text-amber-400">
                              {currentWeight} kg (₹{calculatedCost.toLocaleString('en-IN')})
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[5, 10, 20, 30].map((kg) => (
                              <button
                                key={kg}
                                type="button"
                                onClick={() => handleWeightChange(product.id, kg)}
                                className={`py-1 text-center rounded text-xs font-mono-num font-semibold transition-colors ${
                                  currentWeight === kg
                                    ? 'bg-amber-500 text-zinc-950 font-bold'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                              >
                                {kg}kg
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Price + Disclaimer + Add Button */}
                  <div className="p-5 pt-3 border-t border-zinc-800/80 bg-zinc-900/60 mt-2">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-extrabold text-xl text-amber-400 font-mono-num">
                            {product.priceLabel}
                          </span>
                        </div>
                        {/* Critical Disclaimer Under Price */}
                        <span className="text-[10px] text-zinc-500 block font-medium">
                          Transportation extra
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap ${
                          isRecentlyAdded
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'bg-zinc-100 hover:bg-amber-400 text-zinc-900 hover:text-zinc-950'
                        }`}
                      >
                        {isRecentlyAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Add to Estimate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
