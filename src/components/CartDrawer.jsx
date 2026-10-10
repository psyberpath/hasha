import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bookmark, 
  TrendingUp, 
  Package, 
  Scissors, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Utensils 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    activeModal, 
    setActiveModal, 
    items, 
    savedItemIds, 
    toggleSaveItem, 
    activeBids, 
    orders, 
    customRequests,
    setSelectedItem 
  } = useApp();

  const [drawerTab, setDrawerTab] = useState('vault'); // 'vault' | 'bids' | 'orders' | 'bespoke'

  if (activeModal !== 'cart') return null;

  const savedItems = items.filter((item) => savedItemIds.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full glass-panel border-l border-white/10 shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]/80">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
              Private Patronage
            </span>
            <h3 className="font-serif text-lg font-bold text-white">
              Heritage Vault & Acquisitions
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 px-4 bg-[#0A0A0C]/50 text-xs">
          <button
            onClick={() => setDrawerTab('vault')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              drawerTab === 'vault'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#C5BFB5] hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedItems.length})</span>
          </button>

          <button
            onClick={() => setDrawerTab('bids')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              drawerTab === 'bids'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#C5BFB5] hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Bids ({activeBids.length})</span>
          </button>

          <button
            onClick={() => setDrawerTab('orders')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              drawerTab === 'orders'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-[#C5BFB5] hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Acquisitions ({orders.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3">
          
          {/* TAB 1: SAVED VAULT */}
          {drawerTab === 'vault' && (
            <>
              {savedItems.length > 0 ? (
                savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#0A0A0C] border border-white/5 flex items-center gap-3 hover:border-white/20 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                    />
                    <div className="flex-grow truncate">
                      <span className="text-[10px] text-[#D4AF37] uppercase font-bold block">
                        {item.ethnicity}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#F9F6F0]">
                        ₦{Number(item.currentBid || item.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setActiveModal('itemDetail');
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C85A32] text-white transition-colors"
                        title="Inspect"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleSaveItem(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#C5BFB5]">
                  Your Heritage Vault is empty. Bookmark pieces from the marketplace to keep track of them.
                </div>
              )}
            </>
          )}

          {/* TAB 2: ACTIVE BIDS */}
          {drawerTab === 'bids' && (
            <>
              {activeBids.length > 0 ? (
                activeBids.map((bid, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-amber-500/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/20">
                        {bid.status}
                      </span>
                      <span className="text-[10px] text-white/40">{bid.timestamp}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {bid.itemTitle}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#C5BFB5]">Your Leading Bid:</span>
                      <span className="font-mono font-bold text-[#D4AF37]">
                        ₦{Number(bid.bidAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#C5BFB5]">
                  You have not placed any auction bids yet.
                </div>
              )}
            </>
          )}

          {/* TAB 3: SETTLED ACQUISITIONS & UNLOCKED RECIPES */}
          {drawerTab === 'orders' && (
            <>
              {orders.length > 0 ? (
                orders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Provenance Sealed</span>
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">{ord.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {ord.itemTitle}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#C5BFB5]">{ord.type}</span>
                      <span className="font-mono font-bold text-emerald-400">
                        ₦{Number(ord.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#C5BFB5]">
                  No settled acquisitions yet.
                </div>
              )}
            </>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0A0A0C]/90">
          <button
            onClick={() => setActiveModal(null)}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#F9F6F0] transition-colors"
          >
            Close Vault
          </button>
        </div>

      </div>
    </div>
  );
}
