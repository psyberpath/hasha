import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Volume2, 
  Play, 
  Pause, 
  Sparkles, 
  Shirt, 
  Utensils, 
  ZoomIn, 
  ArrowRight, 
  Flame,
  AlertCircle
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'creator' | 'provenance' | 'recipe'

  if (!selectedItem) return null;

  const isSaved = savedItemIds.includes(selectedItem.id);
  const isUnlockedRecipe = orders.some((o) => o.itemId === selectedItem.id);

  // Minimum required bid
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-5xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Actions */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0A0A0C]/60">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#161720] border border-white/10 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              {selectedItem.ethnicity}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{selectedItem.verificationStatus || '100% Indigenous Human-Crafted'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem(selectedItem.id)}
              className={`p-2 rounded-full border transition-colors ${
                isSaved
                  ? 'bg-[#C85A32] text-white border-transparent'
                  : 'bg-[#161720] text-[#C5BFB5] hover:text-white border-white/10'
              }`}
              title="Bookmark to Heritage Vault"
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-[#161720] hover:bg-white/10 text-[#C5BFB5] hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Media & Interactive Zoom */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            <div 
              className={`relative rounded-2xl overflow-hidden bg-[#121318] border border-white/10 cursor-zoom-in transition-all duration-300 ${
                isZoomed ? 'scale-110 shadow-2xl z-20' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'Click to Reset Zoom' : 'Click to Zoom Inspection'}</span>
              </div>
            </div>

            {/* Geographical Origin Badge */}
            <div className="p-3.5 rounded-xl bg-[#0A0A0C]/80 border border-white/5 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Geographical Provenance
                </span>
                <span className="text-xs text-[#F9F6F0]">
                  {selectedItem.origin}
                </span>
              </div>
            </div>

            {/* Cultural Material Specs */}
            {selectedItem.material && (
              <div className="p-3.5 rounded-xl bg-[#0A0A0C]/80 border border-white/5 text-xs text-[#C5BFB5]">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                  Artisanal Materials & Medium
                </span>
                <p className="text-[#F9F6F0]">{selectedItem.material}</p>
                {selectedItem.dimensions && (
                  <p className="mt-1 text-white/60">Dimensions: {selectedItem.dimensions}</p>
                )}
              </div>
            )}

            {/* Oral Folklore Ambient Audio Player Simulation */}
            {selectedItem.category === 'folklore' && selectedItem.folkloreDetails && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1E2038] to-[#0A0A0C] border border-[#D4AF37]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-[#F9F6F0]">
                      Sacred Oral Chants & Elder Narration
                    </span>
                  </div>
                  <span className="text-[10px] text-[#D4AF37] font-mono">
                    {selectedItem.folkloreDetails.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-[#C85A32] hover:bg-[#E07149] text-white flex items-center justify-center transition-colors shadow-lg"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-grow">
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden relative">
                      <div 
                        className={`h-full bg-gradient-to-r from-[#D4AF37] to-[#C85A32] transition-all duration-300 ${
                          isPlayingAudio ? 'w-3/5 animate-pulse' : 'w-1/12'
                        }`}
                      ></div>
                    </div>
                    <span className="text-[10px] text-white/50 mt-1 block">
                      Narrator: {selectedItem.folkloreDetails.narrator}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Title, Narrative, Dynamic Action Modes */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            
            <div>
              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F9F6F0] mb-3 leading-tight">
                {selectedItem.title}
              </h2>

              {/* Creator Card */}
              <div className="p-3.5 rounded-2xl bg-[#121318] border border-white/10 flex items-center gap-3.5 mb-5">
                <img
                  src={selectedItem.creator.avatar}
                  alt={selectedItem.creator.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#F9F6F0]">
                      {selectedItem.creator.name}
                    </h4>
                    <span className="text-[10px] text-[#D4AF37] font-medium">
                      {selectedItem.creator.heritage}
                    </span>
                  </div>
                  <p className="text-xs text-[#C5BFB5] line-clamp-1">
                    {selectedItem.creator.title}
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-[#C5BFB5] hover:text-white'
                  }`}
                >
                  Historical Description
                </button>
                <button
                  onClick={() => setActiveTab('creator')}
                  className={`text-xs font-semibold pb-1 transition-colors ${
                    activeTab === 'creator'
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-[#C5BFB5] hover:text-white'
                  }`}
                >
                  Guild & Lineage
                </button>
                {selectedItem.category === 'food' && (
                  <button
                    onClick={() => setActiveTab('recipe')}
                    className={`text-xs font-semibold pb-1 transition-colors ${
                      activeTab === 'recipe'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-[#C5BFB5] hover:text-white'
                    }`}
                  >
                    Culinary Recipe
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-[#C5BFB5] leading-relaxed">
                    {selectedItem.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedItem.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#161720] border border-white/5 text-[11px] text-[#C5BFB5]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'creator' && (
                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/5 space-y-2 mb-6 text-xs text-[#C5BFB5]">
                  <span className="text-[10px] uppercase text-[#D4AF37] font-bold block">
                    Artisanal Heritage Lineage
                  </span>
                  <p className="leading-relaxed">{selectedItem.creator.bio}</p>
                </div>
              )}

              {activeTab === 'recipe' && selectedItem.recipe && (
                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-emerald-500/20 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold">Preparation: {selectedItem.recipe.prepTime}</span>
                    <span className="text-white/70">Cook: {selectedItem.recipe.cookTime}</span>
                    <span className="text-white/70">Yield: {selectedItem.recipe.servings}</span>
                  </div>

                  <p className="text-xs text-[#C5BFB5] italic">
                    "{selectedItem.recipe.originStory}"
                  </p>

                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-white mb-1.5">Authentic Heirloom Ingredients:</h5>
                    <ul className="text-xs text-[#C5BFB5] space-y-1 list-disc list-inside">
                      {selectedItem.recipe.ingredients.slice(0, 5).map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                      {selectedItem.recipe.ingredients.length > 5 && (
                        <li className="text-emerald-400 font-medium">
                          +{selectedItem.recipe.ingredients.length - 5} more authentic ingredients
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Dynamic Action Area */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#121318] border border-white/10 mt-6">
              
              {/* If Auction Mode */}
              {selectedItem.pricingMode === 'auction' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase text-[#C5BFB5]/70 block font-semibold">
                        Leading Bid
                      </span>
                      <span className="text-2xl font-bold text-[#D4AF37] font-mono">
                        ₦{Number(selectedItem.currentBid || selectedItem.price).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[#C5BFB5]/70 block font-semibold">
                        Time Remaining
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {selectedItem.bidEndsIn || '14h 22m 10s'}
                      </span>
                    </div>
                  </div>

                  {/* Bidding Form */}
                  <form onSubmit={handlePlaceBid} className="flex gap-2">
                    <div className="relative flex-grow">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#D4AF37] font-bold">₦</span>
                      <input
                        type="number"
                        min={minBid}
                        step={10000}
                        value={bidInput}
                        onChange={(e) => setBidInput(e.target.value)}
                        placeholder={`Min: ₦${minBid.toLocaleString()}`}
                        className="w-full bg-[#0A0A0C] border border-white/15 focus:border-[#D4AF37] rounded-xl pl-7 pr-3 py-2.5 text-xs text-white outline-none font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E07149] hover:from-[#E07149] hover:to-[#C85A32] text-white text-xs font-bold shadow-lg transition-all"
                    >
                      Place Bid
                    </button>
                  </form>
                </div>
              )}

              {/* If Fixed Price Direct Buy */}
              {selectedItem.pricingMode === 'fixed' && (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#C5BFB5]/70 block font-semibold">
                      Acquisition Price
                    </span>
                    <span className="text-2xl font-bold text-[#F9F6F0] font-mono">
                      ₦{Number(selectedItem.price).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedItem.bespokeAvailable && (
                      <button
                        onClick={() => setActiveModal('bespoke')}
                        className="px-4 py-2.5 rounded-xl bg-[#1E2038] hover:bg-[#2A2D4F] border border-white/10 text-xs font-medium text-[#F9F6F0] transition-colors"
                      >
                        Request Bespoke Custom
                      </button>
                    )}

                    <button
                      onClick={() => setActiveModal('checkout')}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E07149] text-white text-xs font-bold shadow-lg hover:scale-105 transition-all"
                    >
                      Acquire Masterpiece
                    </button>
                  </div>
                </div>
              )}

              {/* If Culinary Recipe Mode */}
              {selectedItem.pricingMode === 'recipe' && (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#C5BFB5]/70 block font-semibold">
                      Recipe Access Pass
                    </span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono">
                      ₦{Number(selectedItem.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModal('checkout')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Unlock Step-by-Step Secrets</span>
                  </button>
                </div>
              )}

              {/* If Showcase / Free Folklore */}
              {selectedItem.pricingMode === 'showcase' && (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#C5BFB5]/70 block font-semibold">
                      National Archive
                    </span>
                    <span className="text-sm font-bold text-[#D4AF37]">
                      Open Living Heritage
                    </span>
                  </div>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-5 py-2.5 rounded-xl bg-[#1E2038] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#2A2D4F] transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
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
