import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Bookmark, 
  MapPin, 
  Flame, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  Utensils, 
  Shirt, 
  BookOpen,
  Sparkle
} from 'lucide-react';

export default function ItemCard({ item }) {
  const { 
    savedItemIds, 
    toggleSaveItem, 
    setSelectedItem, 
    setActiveModal 
  } = useApp();

  const isSaved = savedItemIds.includes(item.id);

  const handleCardClick = () => {
    setSelectedItem(item);
    setActiveModal('itemDetail');
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleSaveItem(item.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden text-left"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 bg-[#121318]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/20 to-transparent"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Ethnicity Pill */}
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#D4AF37] tracking-wider uppercase">
            {item.ethnicity}
          </span>

          {/* Bookmark Button (Pointer Events Enabled) */}
          <button
            onClick={handleSaveClick}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isSaved
                ? 'bg-[#C85A32] text-white shadow-md'
                : 'bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border border-white/10'
            }`}
            title={isSaved ? 'Remove from Vault' : 'Save to Vault'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Provenance Verification Tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0A0C]/80 backdrop-blur-sm border border-white/10 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span className="truncate">{item.verificationStatus || '100% Indigenous'}</span>
          </span>

          {item.pricingMode === 'auction' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] font-mono">
              <Clock className="w-2.5 h-2.5" />
              <span>{item.bidEndsIn || 'Live'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow">
        
        {/* Origin Geo Location */}
        <div className="flex items-center gap-1 text-[11px] text-[#C5BFB5]/80 mb-1">
          <MapPin className="w-3 h-3 text-[#C85A32] flex-shrink-0" />
          <span className="truncate">{item.origin}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#F9F6F0] group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1.5">
          {item.title}
        </h3>

        {/* Creator Snippet */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={item.creator.avatar}
            alt={item.creator.name}
            className="w-5 h-5 rounded-full object-cover border border-white/20"
          />
          <span className="text-xs text-[#C5BFB5] truncate">
            {item.creator.name}
          </span>
        </div>

        {/* Bottom Pricing & Mode Bar */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            {item.pricingMode === 'auction' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/60 block leading-tight">
                  Current Bid
                </span>
                <span className="text-sm sm:text-base font-bold text-[#D4AF37] font-mono">
                  ₦{Number(item.currentBid || item.price).toLocaleString()}
                </span>
              </div>
            ) : item.pricingMode === 'recipe' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/60 block leading-tight">
                  Recipe Unlock
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                  ₦{Number(item.price).toLocaleString()}
                </span>
              </div>
            ) : item.pricingMode === 'showcase' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/60 block leading-tight">
                  Public Archive
                </span>
                <span className="text-xs font-semibold text-[#D4AF37]">
                  Free Oral Lore
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/60 block leading-tight">
                  Acquisition
                </span>
                <span className="text-sm sm:text-base font-bold text-[#F9F6F0] font-mono">
                  ₦{Number(item.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={handleCardClick}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#C85A32] text-xs font-medium text-[#F9F6F0] flex items-center gap-1 group-hover:bg-[#C85A32] group-hover:text-white transition-all duration-200"
          >
            {item.pricingMode === 'auction' ? (
              <span>Bid</span>
            ) : item.pricingMode === 'recipe' ? (
              <span>Unlock</span>
            ) : item.category === 'folklore' ? (
              <span>Listen</span>
            ) : item.bespokeAvailable ? (
              <span>Custom</span>
            ) : (
              <span>View</span>
            )}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
