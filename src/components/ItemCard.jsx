import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Bookmark, 
  MapPin, 
  ArrowUpRight, 
  Clock 
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
      className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-[#E8E3DA] hover:border-[#C85A32] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group text-left"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 bg-[#F3EFEA]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Ethnicity Pill */}
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-[#E8E3DA] text-[10px] font-bold text-[#18181B] tracking-wider uppercase shadow-xs">
            {item.ethnicity}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={handleSaveClick}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-sm transition-all ${
              isSaved
                ? 'bg-[#C85A32] text-white shadow-sm'
                : 'bg-white/90 hover:bg-white text-[#78716C] hover:text-[#18181B] border border-[#E8E3DA]'
            }`}
            title={isSaved ? 'Remove from Vault' : 'Save to Vault'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Tag Bar on Image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#E8E3DA] text-emerald-700 font-semibold shadow-xs">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Verified Provenance</span>
          </span>

          {item.pricingMode === 'auction' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#E8E3DA] text-[#C85A32] font-mono font-semibold shadow-xs">
              <Clock className="w-2.5 h-2.5" />
              <span>{item.bidEndsIn || 'Live'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow">
        
        {/* Origin Geo Location */}
        <div className="flex items-center gap-1 text-[11px] text-[#78716C] mb-1">
          <MapPin className="w-3 h-3 text-[#C85A32] flex-shrink-0" />
          <span className="truncate">{item.origin}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg font-bold text-[#18181B] group-hover:text-[#C85A32] transition-colors line-clamp-1 mb-1.5">
          {item.title}
        </h3>

        {/* Creator Snippet */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={item.creator.avatar}
            alt={item.creator.name}
            className="w-5 h-5 rounded-full object-cover border border-[#E8E3DA]"
          />
          <span className="text-xs text-[#57534E] truncate font-medium">
            {item.creator.name}
          </span>
        </div>

        {/* Bottom Pricing & Mode Bar */}
        <div className="mt-auto pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
          <div>
            {item.pricingMode === 'auction' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block leading-tight font-medium">
                  Leading Bid
                </span>
                <span className="text-sm sm:text-base font-bold text-[#18181B] font-mono">
                  ₦{Number(item.currentBid || item.price).toLocaleString()}
                </span>
              </div>
            ) : item.pricingMode === 'recipe' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block leading-tight font-medium">
                  Recipe Unlock
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-700 font-mono">
                  ₦{Number(item.price).toLocaleString()}
                </span>
              </div>
            ) : item.pricingMode === 'showcase' ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block leading-tight font-medium">
                  Living Archive
                </span>
                <span className="text-xs font-semibold text-[#C85A32]">
                  Free Oral Lore
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block leading-tight font-medium">
                  Acquisition
                </span>
                <span className="text-sm sm:text-base font-bold text-[#18181B] font-mono">
                  ₦{Number(item.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleCardClick}
            className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] text-xs font-semibold text-[#18181B] hover:text-white border border-[#E8E3DA] hover:border-transparent flex items-center gap-1 transition-all"
          >
            {item.pricingMode === 'auction' ? (
              <span>Bid</span>
            ) : item.pricingMode === 'recipe' ? (
              <span>Unlock</span>
            ) : item.category === 'folklore' ? (
              <span>Listen</span>
            ) : item.bespokeAvailable ? (
              <span>Bespoke</span>
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
