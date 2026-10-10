import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bookmark, 
  TrendingUp, 
  Package, 
  Trash2, 
  ArrowRight, 
  ShieldCheck 
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
    setSelectedItem 
  } = useApp();

  const [drawerTab, setDrawerTab] = useState('vault');

  if (activeModal !== 'cart') return null;

  const savedItems = items.filter((item) => savedItemIds.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-white border-l border-[#E8E3DA] shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E3DA] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C85A32] tracking-widest block">
              Private Patronage
            </span>
            <h3 className="font-serif text-lg font-bold text-[#18181B]">
              Heritage Vault & Acquisitions
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-[#E8E3DA] text-[#78716C] hover:text-[#18181B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E3DA] px-4 bg-[#FAF8F5] text-xs">
          <button
            onClick={() => setDrawerTab('vault')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              drawerTab === 'vault'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#78716C] hover:text-[#18181B]'
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
                : 'border-transparent text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Bids ({activeBids.length})</span>
          </button>

          <button
            onClick={() => setDrawerTab('orders')}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              drawerTab === 'orders'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Acquisitions ({orders.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3">
          {drawerTab === 'vault' && (
            <>
              {savedItems.length > 0 ? (
                savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center gap-3 hover:border-[#C85A32] transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover border border-[#E8E3DA] flex-shrink-0"
                    />
                    <div className="flex-grow truncate">
                      <span className="text-[10px] text-[#C85A32] uppercase font-bold block">
                        {item.ethnicity}
                      </span>
                      <h4 className="text-xs font-bold text-[#18181B] truncate">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#18181B]">
                        ₦{Number(item.currentBid || item.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setActiveModal('itemDetail');
                        }}
                        className="p-1.5 rounded-lg bg-white border border-[#E8E3DA] hover:bg-[#C85A32] hover:text-white text-[#18181B] transition-colors"
                        title="Inspect"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleSaveItem(item.id)}
                        className="p-1.5 rounded-lg bg-white border border-[#E8E3DA] hover:bg-red-50 text-[#78716C] hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#78716C]">
                  Your Heritage Vault is empty. Bookmark pieces from the marketplace to keep track of them.
                </div>
              )}
            </>
          )}

          {drawerTab === 'bids' && (
            <>
              {activeBids.length > 0 ? (
                activeBids.map((bid, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {bid.status}
                      </span>
                      <span className="text-[10px] text-[#78716C]">{bid.timestamp}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#18181B] line-clamp-1">
                      {bid.itemTitle}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#57534E]">Your Leading Bid:</span>
                      <span className="font-mono font-bold text-[#C85A32]">
                        ₦{Number(bid.bidAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#78716C]">
                  You have not placed any auction bids yet.
                </div>
              )}
            </>
          )}

          {drawerTab === 'orders' && (
            <>
              {orders.length > 0 ? (
                orders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Provenance Sealed</span>
                      </span>
                      <span className="text-[10px] text-[#78716C] font-mono">{ord.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#18181B] line-clamp-1">
                      {ord.itemTitle}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#57534E]">{ord.type}</span>
                      <span className="font-mono font-bold text-emerald-800">
                        ₦{Number(ord.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-[#78716C]">
                  No settled acquisitions yet.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E3DA] bg-[#FAF8F5]">
          <button
            onClick={() => setActiveModal(null)}
            className="w-full py-2.5 rounded-xl bg-white border border-[#E8E3DA] hover:bg-[#FAF8F5] text-xs font-semibold text-[#18181B] transition-colors"
          >
            Close Vault
          </button>
        </div>

      </div>
    </div>
  );
}
