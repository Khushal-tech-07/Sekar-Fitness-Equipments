export type ProductCategory = 
  | 'all'
  | 'dumbbells'
  | 'plates'
  | 'rods'
  | 'combos'
  | 'benches_machines'
  | 'accessories';

export interface Product {
  id: string;
  itemCode: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  pricingType: 'per_kg' | 'fixed' | 'range';
  price: number; // base price in ₹ or starting price
  priceMax?: number; // for range items
  priceLabel: string; // e.g. "₹75 / kg" or "₹2,500"
  originalPrice?: number; // for combos showing discount
  specs: string[];
  popular?: boolean;
  material?: string;
  defaultWeightKg?: number; // for per_kg items default quantity
  badge?: string;
  thumbnailType: 'dumbbell' | 'plate' | 'rod' | 'combo' | 'bench' | 'machine' | 'accessory';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeightKg?: number; // if per_kg item
  calculatedPrice: number; // total for this item
  customNotes?: string;
}

export interface SavedEnquiry {
  id: string;
  timestamp: number;
  dateStr: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
  notes?: string;
  items: {
    name: string;
    itemCode: string;
    quantity: number;
    price: number;
    weightOrSpecs?: string;
  }[];
  totalEstimatedAmount: number;
  userId?: string;
  userEmail?: string;
}
