import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Bookmark, 
  Volume2, 
  Play, 
  Pause, 
  Utensils, 
  ZoomIn, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function ItemDetailModal() {
  const { 
    selectedItem, 
    setActiveModal, 
    setSelectedItem,
    savedItemIds, 
    toggleSaveItem,
    submitBid,
    orders
  } = useApp();

  const [isZoomed, setIsZoomed] = useState(false);
  const [bidInput, setBidInput] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedItem) return null;

  const isSaved = savedItemIds.includes(selectedItem.id);
  const minBid = (selectedItem.currentBid || selectedItem.startingBid || selectedItem.price) + 50000;

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const numericBid = Number(bidInput);
    if (!numericBid || numericBid < minBid) {
      alert(`Please enter a bid of at least ₦${minBid.toLocaleString()}`);
      return;
    }
    submitBid(selectedItem.id, numericBid);
    setBidInput('');
  };

  const handleClose = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl border border-[#E8E3DA] shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Actions */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E3DA] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white border border-[#E8E3DA] text-xs font-bold text-[#18181B] uppercase tracking-wider shadow-xs">
              {selectedItem.ethnicity}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedItem.verificationStatus || '100% Indigenous Human-Crafted'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem(selectedItem.id)}
              className={`p-2 rounded-full border transition-colors ${
                isSaved
                  ? 'bg-[#C85A32] text-white border-transparent'
                  : 'bg-white text-[#78716C] hover:text-[#18181B] border-[#E8E3DA]'
              }`}
              title="Bookmark to Heritage Vault"
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white hover:bg-[#FAF8F5] text-[#78716C] hover:text-[#18181B] border border-[#E8E3DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Media */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div 
              className={`relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E8E3DA] cursor-zoom-in transition-all duration-300 ${
                isZoomed ? 'scale-105 shadow-2xl z-20' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8E3DA] text-[11px] text-[#18181B] font-semibold flex items-center gap-1.5 shadow-xs">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'Reset Zoom' : 'Zoom Inspection'}</span>
              </div>
            </div>

            {/* Geographical Origin Badge */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-bold block">
                  Geographical Provenance
                </span>
                <span className="text-xs text-[#18181B] font-medium">
                  {selectedItem.origin}
                </span>
              </div>
            </div>

            {/* Materials & Medium */}
            {selectedItem.material && (
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-bold block mb-1">
                  Artisanal Materials & Medium
                </span>
                <p className="text-[#18181B]">{selectedItem.material}</p>
                {selectedItem.dimensions && (
                  <p className="mt-1 text-[#57534E]">Dimensions: {selectedItem.dimensions}</p>
                )}
              </div>
            )}

            {/* Oral Folklore Ambient Player */}
            {selectedItem.category === 'folklore' && selectedItem.folkloreDetails && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#C85A32]" />
                    <span className="text-xs font-bold text-[#18181B]">
                      Oral Chants & Elder Narration
                    </span>
                  </div>
                  <span className="text-[10px] text-[#78716C] font-mono">
                    {selectedItem.folkloreDetails.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-[#C85A32] hover:bg-[#A24220] text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-grow">
                    <div className="h-2 rounded-full bg-[#E8E3DA] overflow-hidden relative">
                      <div 
                        className={`h-full bg-[#C85A32] transition-all duration-300 ${
                          isPlayingAudio ? 'w-3/5' : 'w-1/12'
                        }`}
                      ></div>
                    </div>
                    <span className="text-[10px] text-[#78716C] mt-1 block">
                      Narrator: {selectedItem.folkloreDetails.narrator}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Title & Dynamic Action */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181B] mb-3 leading-tight">
                {selectedItem.title}
              </h2>

              {/* Creator Card */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center gap-3.5 mb-5">
                <img
                  src={selectedItem.creator.avatar}
                  alt={selectedItem.creator.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C85A32]"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#18181B]">
                      {selectedItem.creator.name}
                    </h4>
                    <span className="text-[10px] text-[#C85A32] font-semibold">
                      {selectedItem.creator.heritage}
                    </span>
                  </div>
                  <p className="text-xs text-[#57534E] line-clamp-1">
                    {selectedItem.creator.title}
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-4 border-b border-[#E8E3DA] pb-2 mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[#C85A32] border-b-2 border-[#C85A32]'
                      : 'text-[#78716C] hover:text-[#18181B]'
                  }`}
                >
                  Historical Description
                </button>
                <button
                  onClick={() => setActiveTab('creator')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'creator'
                      ? 'text-[#C85A32] border-b-2 border-[#C85A32]'
                      : 'text-[#78716C] hover:text-[#18181B]'
                  }`}
                >
                  Guild & Lineage
                </button>
                {selectedItem.category === 'food' && (
                  <button
                    onClick={() => setActiveTab('recipe')}
                    className={`text-xs font-semibold pb-1 transition-colors ${
                      activeTab === 'recipe'
                        ? 'text-emerald-700 border-b-2 border-emerald-700'
                        : 'text-[#78716C] hover:text-[#18181B]'
                    }`}
                  >
                    Culinary Recipe
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-3 mb-6">
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedItem.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E3DA] text-[11px] text-[#57534E]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'creator' && (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-2 mb-6 text-xs text-[#57534E]">
                  <span className="text-[10px] uppercase text-[#18181B] font-bold block">
                    Artisanal Heritage Lineage
                  </span>
                  <p className="leading-relaxed">{selectedItem.creator.bio}</p>
                </div>
              )}

              {activeTab === 'recipe' && selectedItem.recipe && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold">Preparation: {selectedItem.recipe.prepTime}</span>
                    <span className="text-emerald-700">Cook: {selectedItem.recipe.cookTime}</span>
                    <span className="text-emerald-700">Yield: {selectedItem.recipe.servings}</span>
                  </div>
                  <p className="text-xs text-emerald-900 italic">
                    "{selectedItem.recipe.originStory}"
                  </p>
                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-emerald-950 mb-1.5">Authentic Heirloom Ingredients:</h5>
                    <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                      {selectedItem.recipe.ingredients.slice(0, 5).map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Dynamic Action Area */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] mt-6">
              {selectedItem.pricingMode === 'auction' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#78716C] block font-semibold">
                        Leading Bid
                      </span>
                      <span className="text-2xl font-bold text-[#18181B] font-mono">
                        ₦{Number(selectedItem.currentBid || selectedItem.price).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[#78716C] block font-semibold">
                        Time Remaining
                      </span>
                      <span className="text-xs font-mono font-bold text-[#C85A32] bg-white px-2 py-0.5 rounded border border-[#E8E3DA]">
                        {selectedItem.bidEndsIn || '14h 22m 10s'}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handlePlaceBid} className="flex gap-2">
                    <div className="relative flex-grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#18181B] font-bold">₦</span>
                      <input
                        type="number"
                        min={minBid}
                        step={10000}
                        value={bidInput}
                        onChange={(e) => setBidInput(e.target.value)}
                        placeholder={`Min: ₦${minBid.toLocaleString()}`}
                        className="w-full bg-white border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl pl-7 pr-3 py-2.5 text-xs text-[#18181B] outline-none font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                    >
                      Place Bid
                    </button>
                  </form>
                </div>
              )}

              {selectedItem.pricingMode === 'fixed' && (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#78716C] block font-semibold">
                      Acquisition Price
                    </span>
                    <span className="text-2xl font-bold text-[#18181B] font-mono">
                      ₦{Number(selectedItem.price).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedItem.bespokeAvailable && (
                      <button
                        onClick={() => setActiveModal('bespoke')}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E3DA] text-xs font-semibold text-[#18181B] transition-colors whitespace-nowrap"
                      >
                        Bespoke Request
                      </button>
                    )}

                    <button
                      onClick={() => setActiveModal('checkout')}
                      className="px-6 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                    >
                      Acquire Masterpiece
                    </button>
                  </div>
                </div>
              )}

              {selectedItem.pricingMode === 'recipe' && (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#78716C] block font-semibold">
                      Recipe Access Pass
                    </span>
                    <span className="text-2xl font-bold text-emerald-800 font-mono">
                      ₦{Number(selectedItem.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModal('checkout')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Unlock Secret Recipe</span>
                  </button>
                </div>
              )}

              {selectedItem.pricingMode === 'showcase' && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#78716C] block font-semibold">
                      National Archive
                    </span>
                    <span className="text-sm font-bold text-[#C85A32]">
                      Open Living Heritage
                    </span>
                  </div>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-5 py-2.5 rounded-xl bg-[#18181B] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#27272A] transition-colors whitespace-nowrap"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{isPlayingAudio ? 'Pause Narration' : 'Listen to Oral Chronicle'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
