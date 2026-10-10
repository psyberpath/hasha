import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ItemCard from './ItemCard';
import { CATEGORIES, NIGERIAN_ETHNICITIES } from '../data/mockData';
import { 
  Search, 
  Palette, 
  Shirt, 
  Utensils, 
  BookOpen, 
  Compass, 
  X,
  Filter
} from 'lucide-react';

export default function Marketplace({ activeCategory = 'all', onCategoryChange }) {
  const { items } = useApp();

  const [selectedEthnicity, setSelectedEthnicity] = useState('All Heritages');
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'auction' | 'fixed' | 'recipe' | 'bespoke'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'sculptures': return <Palette className="w-3.5 h-3.5" />;
      case 'fashion': return <Shirt className="w-3.5 h-3.5" />;
      case 'food': return <Utensils className="w-3.5 h-3.5" />;
      case 'folklore': return <BookOpen className="w-3.5 h-3.5" />;
      default: return <Compass className="w-3.5 h-3.5" />;
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (selectedEthnicity !== 'All Heritages' && item.ethnicity !== selectedEthnicity) {
        return false;
      }
      if (selectedMode === 'auction' && item.pricingMode !== 'auction') return false;
      if (selectedMode === 'fixed' && item.pricingMode !== 'fixed') return false;
      if (selectedMode === 'recipe' && item.pricingMode !== 'recipe') return false;
      if (selectedMode === 'bespoke' && !item.bespokeAvailable) return false;

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
      return 0;
    });
  }, [items, activeCategory, selectedEthnicity, selectedMode, searchQuery, sortBy]);

  return (
    <section id="marketplace-section" className="py-10 px-4 sm:px-8 max-w-7xl mx-auto w-full text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
            Living Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
            The Sovereign Nigerian Marketplace
          </h2>
        </div>

        <div className="text-xs font-semibold text-[#78716C]">
          Showing <span className="text-[#18181B] font-bold">{filteredItems.length}</span> curated authentic treasures
        </div>
      </div>

      {/* Filter Suite Container (Light Mode) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 mb-8 border border-[#E8E3DA] shadow-xs space-y-4">
        
        {/* Category Tabs (Single Line) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#57534E] hover:text-[#18181B] border border-[#E8E3DA]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Second Row: Ethnicity Scroller & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-[#E8E3DA]">
          
          {/* Ethnicity Horizontal Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs uppercase text-[#78716C] tracking-wider font-semibold mr-1 hidden sm:inline whitespace-nowrap">
              Heritage:
            </span>
            {NIGERIAN_ETHNICITIES.map((eth) => (
              <button
                key={eth}
                onClick={() => setSelectedEthnicity(eth)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors font-medium ${
                  selectedEthnicity === eth
                    ? 'bg-[#18181B] text-white font-bold shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#57534E] border border-[#E8E3DA]'
                }`}
              >
                {eth}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bronze, Aso-Oke, recipe..."
                className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl pl-8 pr-8 py-1.5 text-xs text-[#18181B] placeholder-[#78716C] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#18181B]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3 py-1.5 text-xs text-[#57534E] outline-none"
            >
              <option value="featured">Featured Catalog</option>
              <option value="price-desc">Highest Price (₦)</option>
              <option value="price-asc">Lowest Price (₦)</option>
              <option value="views">Most Appreciated</option>
            </select>
          </div>
        </div>

        {/* Third Row: Modality Filters */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E8E3DA] flex-wrap">
          <span className="text-[11px] text-[#78716C] font-semibold mr-1 whitespace-nowrap">
            Modality:
          </span>
          <button
            onClick={() => setSelectedMode('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedMode === 'all'
                ? 'bg-[#18181B] text-white'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            All Modalities
          </button>
          <button
            onClick={() => setSelectedMode('auction')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedMode === 'auction'
                ? 'bg-[#C85A32] text-white'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            • Live Auctions & Bids
          </button>
          <button
            onClick={() => setSelectedMode('fixed')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedMode === 'fixed'
                ? 'bg-[#C85A32] text-white'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            • Direct Purchase
          </button>
          <button
            onClick={() => setSelectedMode('bespoke')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedMode === 'bespoke'
                ? 'bg-[#18181B] text-white'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            • Bespoke Custom Orders
          </button>
          <button
            onClick={() => setSelectedMode('recipe')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              selectedMode === 'recipe'
                ? 'bg-emerald-700 text-white'
                : 'text-[#78716C] hover:text-[#18181B]'
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
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E3DA] max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center mx-auto mb-4 text-[#78716C]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#18181B] mb-2">
            No Artifacts Match Your Current Filter
          </h3>
          <p className="text-xs text-[#57534E] mb-6 font-light">
            Try resetting your filters or searching for terms like "Benin", "Aso-Oke", "Nok", or "Edikang".
          </p>
          <button
            onClick={() => {
              onCategoryChange('all');
              setSelectedEthnicity('All Heritages');
              setSelectedMode('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#A24220] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}
