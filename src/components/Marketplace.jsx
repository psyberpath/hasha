import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ItemCard from './ItemCard';
import { CATEGORIES, NIGERIAN_ETHNICITIES } from '../data/mockData';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Palette, 
  Shirt, 
  Utensils, 
  BookOpen, 
  Layers, 
  X,
  Compass
} from 'lucide-react';

export default function Marketplace({ activeCategory = 'all', onCategoryChange }) {
  const { items } = useApp();

  const [selectedEthnicity, setSelectedEthnicity] = useState('All Heritages');
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'auction' | 'fixed' | 'recipe' | 'bespoke'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-desc' | 'price-asc' | 'views'

  // Icon mapping for categories
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'sculptures': return <Palette className="w-3.5 h-3.5" />;
      case 'fashion': return <Shirt className="w-3.5 h-3.5" />;
      case 'food': return <Utensils className="w-3.5 h-3.5" />;
      case 'folklore': return <BookOpen className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Ethnicity match
      if (selectedEthnicity !== 'All Heritages' && item.ethnicity !== selectedEthnicity) {
        return false;
      }

      // Mode match
      if (selectedMode === 'auction' && item.pricingMode !== 'auction') return false;
      if (selectedMode === 'fixed' && item.pricingMode !== 'fixed') return false;
      if (selectedMode === 'recipe' && item.pricingMode !== 'recipe') return false;
      if (selectedMode === 'bespoke' && !item.bespokeAvailable) return false;

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesCreator = item.creator?.name?.toLowerCase().includes(q);
        const matchesOrigin = item.origin?.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCreator && !matchesOrigin && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') {
        const priceA = a.currentBid || a.price || 0;
        const priceB = b.currentBid || b.price || 0;
        return priceB - priceA;
      }
      if (sortBy === 'price-asc') {
        const priceA = a.currentBid || a.price || 0;
        const priceB = b.currentBid || b.price || 0;
        return priceA - priceB;
      }
      if (sortBy === 'views') {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      return 0; // default featured order
    });
  }, [items, activeCategory, selectedEthnicity, selectedMode, searchQuery, sortBy]);

  return (
    <section id="marketplace-section" className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-wider font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Living Curations & Masterpieces</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F9F6F0] tracking-tight">
            The Sovereign Nigerian Marketplace
          </h2>
        </div>

        {/* Live Active Results Counter */}
        <div className="text-sm text-[#C5BFB5]">
          Showing <span className="font-bold text-[#D4AF37]">{filteredItems.length}</span> curated authentic treasures
        </div>
      </div>

      {/* Filter Suite Container */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 shadow-xl space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#C85A32] to-[#E07149] text-white shadow-md shadow-[#C85A32]/20'
                  : 'bg-[#161720] hover:bg-[#1E2038] text-[#C5BFB5] hover:text-[#F9F6F0] border border-white/5'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Second Row: Ethnicity Scroller & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-white/5">
          
          {/* Ethnicity Horizontal Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs uppercase text-[#C5BFB5]/50 tracking-wider font-semibold mr-1 hidden sm:inline">
              Heritage:
            </span>
            {NIGERIAN_ETHNICITIES.map((eth) => (
              <button
                key={eth}
                onClick={() => setSelectedEthnicity(eth)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedEthnicity === eth
                    ? 'bg-[#D4AF37] text-black font-bold shadow-sm'
                    : 'bg-[#0A0A0C]/60 hover:bg-white/10 text-[#C5BFB5] border border-white/5'
                }`}
              >
                {eth}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#C5BFB5]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bronze, Aso-Oke, recipe..."
                className="w-full bg-[#0A0A0C] border border-white/10 focus:border-[#C85A32] rounded-xl pl-8 pr-8 py-1.5 text-xs text-[#F9F6F0] placeholder-[#C5BFB5]/40 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0A0A0C] border border-white/10 focus:border-[#C85A32] rounded-xl px-3 py-1.5 text-xs text-[#C5BFB5] outline-none"
            >
              <option value="featured">Featured Catalog</option>
              <option value="price-desc">Highest Price (₦)</option>
              <option value="price-asc">Lowest Price (₦)</option>
              <option value="views">Most Appreciated</option>
            </select>
          </div>
        </div>

        {/* Third Row: Transaction Modality Filters */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5 flex-wrap">
          <span className="text-[11px] text-[#C5BFB5]/60 font-medium mr-1">
            Modality:
          </span>
          <button
            onClick={() => setSelectedMode('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedMode === 'all'
                ? 'bg-white/15 text-white'
                : 'text-[#C5BFB5]/60 hover:text-white'
            }`}
          >
            All Modalities
          </button>
          <button
            onClick={() => setSelectedMode('auction')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedMode === 'auction'
                ? 'bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30'
                : 'text-[#C5BFB5]/60 hover:text-white'
            }`}
          >
            • Live Auctions & Bids
          </button>
          <button
            onClick={() => setSelectedMode('fixed')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedMode === 'fixed'
                ? 'bg-orange-500/20 text-[#C85A32] border border-[#C85A32]/30'
                : 'text-[#C5BFB5]/60 hover:text-white'
            }`}
          >
            • Direct Purchase
          </button>
          <button
            onClick={() => setSelectedMode('bespoke')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedMode === 'bespoke'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-[#C5BFB5]/60 hover:text-white'
            }`}
          >
            • Bespoke Custom Orders
          </button>
          <button
            onClick={() => setSelectedMode('recipe')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedMode === 'recipe'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-[#C5BFB5]/60 hover:text-white'
            }`}
          >
            • Recipe Unlocks
          </button>
        </div>

      </div>

      {/* Grid of Treasures */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#161720] flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#F9F6F0] mb-2">
            No Artifacts Match Your Current Filter
          </h3>
          <p className="text-sm text-[#C5BFB5] mb-6 font-light">
            Try resetting your filters or searching for terms like "Benin", "Aso-Oke", "Nok", or "Edikang".
          </p>
          <button
            onClick={() => {
              onCategoryChange('all');
              setSelectedEthnicity('All Heritages');
              setSelectedMode('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#E07149] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}
