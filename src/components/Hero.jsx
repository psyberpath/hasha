import React from 'react';
import { useApp } from '../context/AppContext';
import { HERO_STATS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Palette, 
  Flame,
  Award,
  Globe2,
  Lock
} from 'lucide-react';

export default function Hero({ onExplore, onSelectCategory }) {
  const { userRole, switchRole, setActiveModal, setSelectedItem, items } = useApp();

  const featuredItem = items.find((i) => i.id === 'hsh-001') || items[0];

  return (
    <section className="relative pt-6 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* Background Decorative African Celestial Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C85A32]/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#1E2038]/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Typography, Storytelling & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Cultural Heritage Provenance Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161720]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-6 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
            <span className="uppercase tracking-wider text-[11px] font-semibold">
              The Living Archive of Nigerian Sovereignty
            </span>
          </div>

          {/* Majestic Magazine Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F9F6F0] tracking-tight leading-[1.08] mb-6">
            Where Ancient <span className="text-gradient-terracotta italic font-normal">Ancestry</span> Meets <span className="text-gradient-gold">Contemporary</span> Luxury.
          </h1>

          <p className="text-base sm:text-lg text-[#C5BFB5] leading-relaxed max-w-2xl mb-8 font-light">
            An indigenous digital sanctuary celebrating Nigerian bronzes, Nok terracottas, Aso-Oke couture, secret culinary recipes, and oral cosmologies across every nation—<span className="text-[#F9F6F0] font-medium">Yoruba, Igbo, Hausa, Edo, Efik, Tiv, Fulani, and Ijaw</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C85A32] via-[#E07149] to-[#C85A32] hover:shadow-xl hover:shadow-[#C85A32]/25 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {userRole === 'creator' ? (
              <button
                onClick={() => setActiveModal('uploadWizard')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#161720] hover:bg-[#1E2038] border border-white/10 hover:border-[#D4AF37]/50 text-[#F9F6F0] font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Palette className="w-4 h-4 text-[#D4AF37]" />
                <span>Publish Masterpiece</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal('onboarding')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#161720] hover:bg-[#1E2038] border border-white/10 hover:border-[#D4AF37]/50 text-[#F9F6F0] font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Join as Patron or Creator</span>
              </button>
            )}
          </div>

          {/* Cultural Heritage Quick Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-white/40 mr-1 font-semibold">
              Curations:
            </span>
            <button 
              onClick={() => onSelectCategory('sculptures')}
              className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-[#C5BFB5] hover:text-[#F9F6F0] transition-colors"
            >
              Benin Bronzes & Uli
            </button>
            <button 
              onClick={() => onSelectCategory('fashion')}
              className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-[#C5BFB5] hover:text-[#F9F6F0] transition-colors"
            >
              Aso-Oke & Akwete
            </button>
            <button 
              onClick={() => onSelectCategory('food')}
              className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-[#C5BFB5] hover:text-[#F9F6F0] transition-colors"
            >
              Royal Ayamase & Edikang
            </button>
            <button 
              onClick={() => onSelectCategory('folklore')}
              className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/5 text-[#C5BFB5] hover:text-[#F9F6F0] transition-colors"
            >
              Nsibidi & Oral Epics
            </button>
          </div>

        </div>

        {/* Right Column: Hero Spotlight Featured Artifact Card */}
        <div className="lg:col-span-5 relative">
          
          {/* Subtle Rotating Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C85A32]/20 via-[#D4AF37]/20 to-transparent rounded-3xl blur-2xl -z-10"></div>

          {/* Magazine Glass Feature Card */}
          <div className="glass-card rounded-3xl p-4 sm:p-5 border border-white/10 shadow-2xl relative group overflow-hidden">
            
            {/* Top Badge: Live Cultural Auction */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0C]/80 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#F9F6F0] font-medium text-[11px]">Live Guild Auction</span>
              </div>
              <span className="text-xs text-[#D4AF37] font-serif font-bold tracking-wide">
                Benin Bronze Guild
              </span>
            </div>

            {/* High-Res Artifact Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#121318]">
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80"></div>
              
              {/* Provenance Tag on Image */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[10px] text-white">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                <span>100% Indigenous Hand-Cast</span>
              </div>

              {/* Origin Geo Tag */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-0.5">
                  Edo Kingdom • Circa 16th-Century Cast Lineage
                </span>
                <h3 className="font-serif text-lg text-white font-bold truncate">
                  {featuredItem.title}
                </h3>
              </div>
            </div>

            {/* Item Details Bar */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0A0A0C]/60 border border-white/5 mb-3.5 text-left">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/70 block">
                  Current Highest Bid
                </span>
                <span className="text-lg font-bold text-[#D4AF37] font-sans">
                  ₦{Number(featuredItem.currentBid || featuredItem.price).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5BFB5]/70 block">
                  Auction Ends In
                </span>
                <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
                  {featuredItem.bidEndsIn || '14h 22m 10s'}
                </span>
              </div>
            </div>

            {/* Quick Inspect Button */}
            <button
              onClick={() => {
                setSelectedItem(featuredItem);
                setActiveModal('itemDetail');
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1E2038] to-[#121318] hover:from-[#C85A32] hover:to-[#9E3E1C] border border-white/10 hover:border-transparent text-white font-medium text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:border-[#C85A32]/40"
            >
              <span>Inspect Provenance & Place Bid</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Live Statistics Floating Bar */}
      <div className="mt-14 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HERO_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-[#C5BFB5] mt-1 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
