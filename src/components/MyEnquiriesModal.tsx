import React from 'react';
import { X, FileText, Calendar, MapPin, Trash2, ExternalLink, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MyEnquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyEnquiriesModal: React.FC<MyEnquiriesModalProps> = ({ isOpen, onClose }) => {
  const { user, savedEnquiries, removeEnquiry } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                My Quotations & Enquiries
              </h3>
              <p className="text-xs text-zinc-400">
                Logged in as {user?.displayName || user?.email || 'Guest'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enquiries List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedEnquiries.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-400" />
              <p className="text-sm font-semibold text-zinc-300">No past enquiries saved yet</p>
              <p className="text-xs text-zinc-500 mt-1">
                Add equipment to your estimate and submit a WhatsApp quote to see your enquiry history here.
              </p>
            </div>
          ) : (
            savedEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num font-bold text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      {enquiry.id}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{enquiry.dateStr}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-num font-extrabold text-amber-400">
                      ₹{enquiry.totalEstimatedAmount.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeEnquiry(enquiry.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 flex items-center gap-4">
                  <span><strong>Customer:</strong> {enquiry.customerName}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{enquiry.deliveryLocation}</span>
                  </span>
                </div>

                {/* Items */}
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80 space-y-1 text-xs">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                    Equipment List:
                  </span>
                  {enquiry.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-zinc-300 text-[11px]">
                      <span>
                        {item.quantity}x {item.name} {item.weightOrSpecs ? `(${item.weightOrSpecs})` : ''}
                      </span>
                      <span className="font-mono-num text-zinc-400">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {enquiry.notes && (
                  <p className="text-[11px] text-zinc-400 italic bg-zinc-950/40 p-2 rounded border border-zinc-800">
                    "{enquiry.notes}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
          <span>Total Saved: {savedEnquiries.length} enquiries</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
