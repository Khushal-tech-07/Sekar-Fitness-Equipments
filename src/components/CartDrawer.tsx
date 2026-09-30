import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  ShieldAlert, 
  Truck, 
  CreditCard,
  MapPin,
  Phone,
  User,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const { user, saveEnquiry } = useAuth();

  // Enquiry form state
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSendWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    // Save enquiry to Firebase / LocalStorage
    try {
      const saved = await saveEnquiry({
        customerName: customerName.trim() || (user?.displayName || 'Customer'),
        customerPhone: customerPhone.trim() || 'Not Provided',
        deliveryLocation: deliveryLocation.trim() || 'Chennai Pickup',
        notes: specialNotes.trim(),
        totalEstimatedAmount: totalAmount,
        items: cartItems.map(item => ({
          name: item.product.name,
          itemCode: item.product.itemCode,
          quantity: item.quantity,
          price: item.calculatedPrice * item.quantity,
          weightOrSpecs: item.selectedWeightKg ? `${item.selectedWeightKg}kg` : undefined
        }))
      });

      setEnquirySuccess(saved.id);

      // Format WhatsApp Message
      let message = `*SEKAR FITNESS EQUIPMENTS - FACTORY ORDER ENQUIRY*\n`;
      message += `----------------------------------------\n`;
      message += `*Enquiry Ref:* ${saved.id}\n`;
      message += `*Customer:* ${customerName.trim() || user?.displayName || 'Gym Owner'}\n`;
      message += `*Phone:* ${customerPhone.trim() || 'N/A'}\n`;
      message += `*Delivery Location:* ${deliveryLocation.trim() || 'Chennai'}\n`;
      if (specialNotes.trim()) {
        message += `*Notes:* ${specialNotes.trim()}\n`;
      }
      message += `----------------------------------------\n`;
      message += `*SELECTED EQUIPMENT ITEMS:*\n`;

      cartItems.forEach((item, index) => {
        const weightDetail = item.selectedWeightKg ? ` (${item.selectedWeightKg}kg)` : '';
        message += `${index + 1}. *${item.product.name}* [${item.product.itemCode}]\n`;
        message += `   Qty: ${item.quantity}${weightDetail} | ₹${(item.calculatedPrice * item.quantity).toLocaleString('en-IN')}\n`;
      });

      message += `----------------------------------------\n`;
      message += `*Total Equipment Estimate:* ₹${totalAmount.toLocaleString('en-IN')}\n`;
      message += `\n*Policy Acknowledgement:*\n`;
      message += `✓ I understand Transportation Cost will be extra as actuals.\n`;
      message += `✓ I acknowledge 100% advance payment required for dispatch.\n`;
      message += `\nPlease confirm availability and freight estimate to my location.`;

      // Factory WhatsApp number
      const whatsappNumber = '916381914335';
      const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error generating WhatsApp enquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      {/* Drawer Container */}
      <div className="w-full max-w-xl h-full bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              {totalItemCount}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Equipment Estimate & Inquiry
              </h2>
              <p className="text-xs text-zinc-400">
                Direct factory pricing from Sekar Fitness Chennai
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Policy Reminders Banner */}
        <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-200">
              Critical Factory Dispatch Policies:
            </p>
            <p className="text-[11px] text-amber-300/90 leading-tight">
              • <strong>Transportation cost extra</strong> on all orders based on delivery destination.
            </p>
            <p className="text-[11px] text-amber-300/90 leading-tight">
              • <strong>100% advance payment required</strong> prior to factory dispatch.
            </p>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto mb-3">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-zinc-200 text-sm">Your estimate list is empty</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                Explore our catalog and add dumbbells, plates, combo sets, or benches to configure your order.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Itemized list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                  <span>Selected Products ({cartItems.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-zinc-500 hover:text-red-400 text-[11px] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-zinc-800/80 rounded-xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-zinc-100 truncate">
                            {item.product.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono-num mt-0.5">
                          <span>{item.product.itemCode}</span>
                          {item.selectedWeightKg && (
                            <>
                              <span>·</span>
                              <span className="text-amber-400 font-semibold">{item.selectedWeightKg} kg</span>
                            </>
                          )}
                          <span>·</span>
                          <span>₹{item.calculatedPrice.toLocaleString('en-IN')} each</span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-700/80 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono-num text-xs font-bold text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <span className="font-mono-num text-xs font-bold text-amber-400">
                            ₹{(item.calculatedPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimate Calculation Summary */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Equipments Subtotal:</span>
                  <span className="font-mono-num font-semibold text-zinc-100">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Transportation & Freight:</span>
                  <span className="text-amber-400 font-semibold">Calculated separately at dispatch</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">Estimated Total (Excl. Transport):</span>
                  <span className="font-mono-num font-extrabold text-lg text-amber-400">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Customer Contact & Delivery Form */}
              <form onSubmit={handleSendWhatsApp} className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Delivery & Contact Information
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Your Name / Gym Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar / Chennai Fitness Club"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    WhatsApp Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98401 23456"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Delivery City / Area *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Anna Nagar, Chennai / Coimbatore / Madurai"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Customization / Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Prefer 28mm plate bore, need powder coat in yellow/black, etc."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit to WhatsApp Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30 active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </form>

              {enquirySuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Enquiry reference <strong>{enquirySuccess}</strong> generated & saved to your profile!
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Policy Summary */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 text-[11px] text-zinc-500 text-center">
          Sekar Fitness Equipments · 27/18 Ethiraj Garden St, Pattalam, Chennai 600012
        </div>

      </div>
    </div>
  );
};
