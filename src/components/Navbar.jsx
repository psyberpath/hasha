import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Upload, 
  User, 
  ShieldCheck, 
  Compass, 
  Palette, 
  Menu, 
  X,
  Layers,
  ChevronRight,
  TrendingUp,
  Wallet
} from 'lucide-react';

export default function Navbar({ onNavigate, currentTab }) {
  const { 
    userRole, 
    switchRole, 
    userProfile, 
    savedItemIds, 
    activeBids, 
    orders, 
    setActiveModal,
    creatorBalance
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalVaultCount = savedItemIds.length + activeBids.length + orders.length;

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav className="glass-nav rounded-2xl md:rounded-full px-5 py-3.5 flex items-center justify-between border border-white/10 shadow-2xl">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('marketplace')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C85A32] via-[#D4AF37] to-[#1E2038] p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0A0A0C] rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-black text-xl text-[#F9F6F0] tracking-tighter group-hover:text-[#D4AF37] transition-colors">
                ḥ
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#F9F6F0] group-hover:text-white transition-colors">
                hasha
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse"></span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium -mt-1 hidden sm:inline-block">
              Indigenous Luxury
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#121318]/60 p-1.5 rounded-full border border-white/5">
          <button
            onClick={() => onNavigate('marketplace')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              currentTab === 'marketplace'
                ? 'bg-[#C85A32] text-white shadow-md'
                : 'text-[#C5BFB5] hover:text-[#F9F6F0] hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Marketplace
          </button>

          <button
            onClick={() => onNavigate('cultural-stories')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              currentTab === 'cultural-stories'
                ? 'bg-[#C85A32] text-white shadow-md'
                : 'text-[#C5BFB5] hover:text-[#F9F6F0] hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Cultural Lore
          </button>

          {userRole === 'creator' && (
            <button
              onClick={() => onNavigate('creator-dashboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                currentTab === 'creator-dashboard'
                  ? 'bg-[#C85A32] text-white shadow-md'
                : 'text-[#C5BFB5] hover:text-[#F9F6F0] hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Creator Studio
            </button>
          )}

          <button
            onClick={() => setActiveModal('onboarding')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-[#C5BFB5] hover:text-[#F9F6F0] hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            Provenance & Guilds
          </button>
        </div>

        {/* Right Action Suite & Role Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Melius-inspired Dual Role Switcher Pill */}
          <div className="hidden sm:flex items-center bg-[#161720] p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => switchRole('collector')}
              className={`px-3 py-1 rounded-full font-medium transition-all duration-300 flex items-center gap-1.5 ${
                userRole === 'collector'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C85A32]/30 text-[#F9F6F0] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-[#C5BFB5]/70 hover:text-white'
              }`}
              title="Browse, bid, and acquire heritage pieces"
            >
              <Compass className="w-3 h-3 text-[#D4AF37]" />
              <span>Connoisseur</span>
            </button>

            <button
              onClick={() => switchRole('creator')}
              className={`px-3 py-1 rounded-full font-medium transition-all duration-300 flex items-center gap-1.5 ${
                userRole === 'creator'
                  ? 'bg-gradient-to-r from-[#C85A32] to-[#9E3E1C] text-white shadow-md'
                  : 'text-[#C5BFB5]/70 hover:text-white'
              }`}
              title="Upload creations with Gemma AI and manage earnings"
            >
              <Palette className="w-3 h-3 text-[#F9F6F0]" />
              <span>Creator</span>
            </button>
          </div>

          {/* Role-Specific Action Button */}
          {userRole === 'creator' ? (
            <button
              onClick={() => setActiveModal('uploadWizard')}
              className="bg-gradient-to-r from-[#C85A32] to-[#E07149] hover:from-[#E07149] hover:to-[#C85A32] text-white font-medium text-xs px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-[#C85A32]/20 flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Creation</span>
              <span className="sm:hidden">Upload</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModal('cart')}
              className="relative p-2 sm:px-3 sm:py-2 rounded-full bg-[#161720] hover:bg-[#1E2038] border border-white/10 text-xs text-[#F9F6F0] flex items-center gap-2 transition-all hover:border-[#D4AF37]/40"
              title="Open Heritage Vault & Bids"
            >
              <Bookmark className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline font-medium">Vault</span>
              {totalVaultCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalVaultCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile / Onboarding Avatar Trigger */}
          <button
            onClick={() => setActiveModal('onboarding')}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#121318] hover:bg-[#1A1B22] border border-white/5 transition-all text-xs"
            title="Profile & Cultural Location"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C85A32] flex items-center justify-center text-[11px] font-bold text-black">
              {userProfile.name.charAt(0)}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[11px] font-semibold text-[#F9F6F0] leading-none">
                {userProfile.name.split(' ')[0]}
              </span>
              <span className="text-[9px] text-[#D4AF37] leading-none mt-0.5">
                {userProfile.heritage || 'Nigeria'}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#C5BFB5] hover:text-white bg-[#161720] border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 glass-panel rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            
            {/* Mobile Role Switch */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#0A0A0C] border border-white/10 mb-2">
              <span className="text-xs text-[#C5BFB5]">Current Mode:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => { switchRole('collector'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    userRole === 'collector' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#C5BFB5]'
                  }`}
                >
                  Connoisseur
                </button>
                <button
                  onClick={() => { switchRole('creator'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    userRole === 'creator' ? 'bg-[#C85A32] text-white font-bold' : 'text-[#C5BFB5]'
                  }`}
                >
                  Creator
                </button>
              </div>
            </div>

            <button
              onClick={() => { onNavigate('marketplace'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm text-[#F9F6F0]"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#C85A32]" />
                <span>Marketplace</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => { onNavigate('cultural-stories'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm text-[#F9F6F0]"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Cultural Lore & Narratives</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            {userRole === 'creator' && (
              <button
                onClick={() => { onNavigate('creator-dashboard'); setMobileMenuOpen(false); }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm text-[#F9F6F0]"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#C85A32]" />
                  <span>Creator Studio & Analytics</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            )}

            <button
              onClick={() => { setActiveModal('cart'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm text-[#F9F6F0]"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                <span>Heritage Vault & Active Bids</span>
              </div>
              <span className="text-xs bg-[#C85A32] text-white px-2 py-0.5 rounded-full">
                {totalVaultCount}
              </span>
            </button>

            <button
              onClick={() => { setActiveModal('onboarding'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-sm text-[#F9F6F0]"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#C5BFB5]" />
                <span>Profile & Nigerian Region</span>
              </div>
              <span className="text-xs text-[#D4AF37]">{userProfile.heritage}</span>
            </button>

            {userRole === 'creator' && (
              <button
                onClick={() => { setActiveModal('uploadWizard'); setMobileMenuOpen(false); }}
                className="mt-2 w-full py-2.5 rounded-xl bg-[#C85A32] text-white font-medium text-xs flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Launch Masterpiece Upload Wizard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
