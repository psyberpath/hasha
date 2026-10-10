import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Palette, 
  Bookmark, 
  Upload, 
  Layers, 
  BookOpen, 
  ArrowLeft, 
  Menu, 
  X,
  User,
  ShieldCheck
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
    returnToLanding
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalVaultCount = savedItemIds.length + activeBids.length + orders.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E3DA] px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Clean 'hasha' Logo & Back to Landing Link */}
        <div className="flex items-center gap-4">
          <div 
            onClick={returnToLanding}
            className="cursor-pointer group flex items-center gap-1.5"
            title="Return to Landing Page"
          >
            <span className="font-serif font-black text-2xl tracking-tight text-[#18181B] group-hover:text-[#C85A32] transition-colors">
              hasha
            </span>
          </div>

          <button
            onClick={returnToLanding}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#78716C] hover:text-[#18181B] px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E3DA] transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Landing Page</span>
          </button>
        </div>

        {/* Center: Navigation Links (Single Line Guaranteed) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E3DA]">
          <button
            onClick={() => onNavigate('marketplace')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              currentTab === 'marketplace'
                ? 'bg-white text-[#C85A32] shadow-sm border border-[#E8E3DA]'
                : 'text-[#57534E] hover:text-[#18181B]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => onNavigate('cultural-stories')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              currentTab === 'cultural-stories'
                ? 'bg-white text-[#C85A32] shadow-sm border border-[#E8E3DA]'
                : 'text-[#57534E] hover:text-[#18181B]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cultural Lore</span>
          </button>

          {userRole === 'creator' && (
            <button
              onClick={() => onNavigate('creator-dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentTab === 'creator-dashboard'
                  ? 'bg-white text-[#C85A32] shadow-sm border border-[#E8E3DA]'
                  : 'text-[#57534E] hover:text-[#18181B]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Creator Studio</span>
            </button>
          )}
        </nav>

        {/* Right Action Suite & Single-Line Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Dual Role Switcher Pill */}
          <div className="hidden sm:flex items-center bg-[#F3EFEA] p-0.5 rounded-xl border border-[#E8E3DA] text-xs">
            <button
              onClick={() => switchRole('collector')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                userRole === 'collector'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#78716C] hover:text-[#18181B]'
              }`}
            >
              <Compass className="w-3 h-3 text-[#C85A32]" />
              <span>Connoisseur</span>
            </button>

            <button
              onClick={() => switchRole('creator')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                userRole === 'creator'
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-[#78716C] hover:text-[#18181B]'
              }`}
            >
              <Palette className="w-3 h-3 text-white" />
              <span>Creator</span>
            </button>
          </div>

          {/* Role-Specific Action Button (Single Line) */}
          {userRole === 'creator' ? (
            <button
              onClick={() => setActiveModal('uploadWizard')}
              className="bg-[#C85A32] hover:bg-[#A24220] text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Creation</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModal('cart')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E3DA] text-xs font-semibold text-[#18181B] flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Vault</span>
              {totalVaultCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C85A32] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalVaultCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile Trigger */}
          <button
            onClick={() => setActiveModal('onboarding')}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white border border-[#E8E3DA] hover:bg-[#FAF8F5] transition-all text-xs"
          >
            <div className="w-6 h-6 rounded-lg bg-[#C85A32] text-white flex items-center justify-center text-[11px] font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <span className="hidden md:inline font-semibold text-[#18181B] truncate max-w-[100px]">
              {userProfile.name.split(' ')[0]}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#78716C] hover:text-[#18181B] bg-[#FAF8F5] border border-[#E8E3DA]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white border-t border-[#E8E3DA] text-left space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF8F5] mb-2 text-xs">
            <span className="text-[#57534E]">Mode:</span>
            <div className="flex gap-1">
              <button
                onClick={() => { switchRole('collector'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  userRole === 'collector' ? 'bg-[#18181B] text-white' : 'text-[#78716C]'
                }`}
              >
                Connoisseur
              </button>
              <button
                onClick={() => { switchRole('creator'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  userRole === 'creator' ? 'bg-[#C85A32] text-white' : 'text-[#78716C]'
                }`}
              >
                Creator
              </button>
            </div>
          </div>

          <button
            onClick={() => { onNavigate('marketplace'); setMobileMenuOpen(false); }}
            className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-[#18181B] hover:bg-[#FAF8F5] flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#C85A32]" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => { onNavigate('cultural-stories'); setMobileMenuOpen(false); }}
            className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-[#18181B] hover:bg-[#FAF8F5] flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#C85A32]" />
            <span>Cultural Lore</span>
          </button>

          {userRole === 'creator' && (
            <button
              onClick={() => { onNavigate('creator-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-[#18181B] hover:bg-[#FAF8F5] flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#C85A32]" />
              <span>Creator Studio</span>
            </button>
          )}

          <button
            onClick={() => { returnToLanding(); setMobileMenuOpen(false); }}
            className="w-full text-left p-2.5 rounded-xl text-xs font-semibold text-[#78716C] hover:bg-[#FAF8F5] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </button>
        </div>
      )}
    </header>
  );
}
