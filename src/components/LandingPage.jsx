import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS, HERO_STATS, INITIAL_ITEMS } from '../data/mockData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Palette, 
  Shirt, 
  Utensils, 
  BookOpen, 
  Check, 
  Plus, 
  Minus, 
  ChevronRight,
  MapPin,
  Lock,
  Building2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function LandingPage({ onOpenAuth, onSelectArtifact }) {
  const { enterApp, items, setSelectedItem, setActiveModal } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const previewItems = items.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B] selection:bg-[#C85A32] selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#18181B] text-[#FAF8F5] py-2 px-4 text-center text-xs font-medium tracking-wide">
        <span>The Living Archive of Nigerian Sovereignty</span>
        <span className="mx-2 text-[#C85A32]">•</span>
        <span className="text-[#D6D0C5]">Celebrating 36 Indigenous Ethnic Heritages</span>
      </div>

      {/* 2. MAIN LANDING NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          
          {/* Clean 'hasha' Logo - No pulsating signs or icons */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
          >
            <span className="font-serif font-black text-3xl tracking-tight text-[#18181B] hover:text-[#C85A32] transition-colors">
              hasha
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#57534E]">
            <a href="#showcase" className="hover:text-[#18181B] transition-colors">Curated Catalog</a>
            <a href="#paths" className="hover:text-[#18181B] transition-colors">How It Works</a>
            <a href="#guilds" className="hover:text-[#18181B] transition-colors">Ancestral Guilds</a>
            <a href="#faqs" className="hover:text-[#18181B] transition-colors">FAQs</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onOpenAuth('creator')}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#18181B] text-xs font-semibold text-[#18181B] transition-all"
            >
              Sign Up as Creator
            </button>

            <button
              onClick={() => onOpenAuth('collector')}
              className="px-4 sm:px-5 py-2 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-semibold shadow-sm transition-all"
            >
              Sign Up as Collector
            </button>

            <button
              onClick={() => enterApp('collector')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#78716C] hover:text-[#18181B] transition-colors"
              title="Enter marketplace directly"
            >
              Enter App
            </button>
          </div>
        </div>
      </header>

      {/* 3. EDITORIAL HERO SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E8E3DA] text-[#C85A32] text-xs font-semibold mb-6">
              <span>National Provenance Registry</span>
              <span className="text-[#78716C]">•</span>
              <span className="text-[#57534E]">NCMM Standard Documentation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#18181B] tracking-tight leading-[1.08] mb-6">
              Where Nigerian Ancestry Meets <span className="italic font-normal text-[#C85A32]">Contemporary</span> Luxury.
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mb-8 font-light">
              A sovereign digital ecosystem celebrating authentic Nigerian bronzes, Nok terracottas, Aso-Oke couture, secret culinary recipes, and oral cosmologies across every nation—<strong className="font-semibold text-[#18181B]">Yoruba, Igbo, Hausa, Edo, Efik, Tiv, Fulani, and Ijaw</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => onOpenAuth('collector')}
                className="px-7 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Sign Up as Collector</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('creator')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#E8E3DA] text-xs font-bold text-[#18181B] transition-all"
              >
                Sign Up as Creator
              </button>

              <button
                onClick={() => enterApp('collector')}
                className="px-4 py-3.5 text-xs font-semibold text-[#78716C] hover:text-[#18181B] flex items-center gap-1 transition-colors"
              >
                <span>Browse Live Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Assurance Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E3DA]">
              {HERO_STATS.map((stat, i) => (
                <div key={i}>
                  <span className="font-serif text-2xl font-bold text-[#18181B] block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-[#78716C] font-medium block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Hero Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] p-3 shadow-xl">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3EFEA] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80"
                  alt="Benin Bronze Head"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8E3DA] text-[11px] font-bold text-[#18181B]">
                  Edo Kingdom • 16th-Century Cast Lineage
                </div>
              </div>

              <div className="p-2 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-serif text-lg font-bold text-[#18181B]">
                    Commemorative Head of Queen Idia (Iyoba)
                  </h3>
                  <span className="text-xs font-bold font-mono text-[#C85A32]">
                    ₦4,200,000
                  </span>
                </div>
                <p className="text-xs text-[#57534E] line-clamp-1 mb-3">
                  Cast by 7th-Generation Master Osahenrumwen Orobator, Igun Street Guild.
                </p>

                <button
                  onClick={() => enterApp('collector')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] text-[#18181B] hover:text-white border border-[#E8E3DA] hover:border-transparent text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Inspect in Marketplace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CURATED CATALOG HIGHLIGHTS SECTION */}
      <section id="showcase" className="py-16 bg-white border-y border-[#E8E3DA] px-4 sm:px-8 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
                Curated Holdings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B]">
                Selected Nigerian Masterpieces
              </h2>
            </div>
            
            <button
              onClick={() => enterApp('collector')}
              className="text-xs font-semibold text-[#C85A32] hover:text-[#A24220] flex items-center gap-1 transition-colors"
            >
              <span>View All 12 Cataloged Treasures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  enterApp('collector');
                  setActiveModal('itemDetail');
                }}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E3DA] p-3.5 cursor-pointer hover:border-[#C85A32] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#E8E3DA]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#18181B]">
                      {item.ethnicity}
                    </div>
                  </div>

                  <span className="text-[10px] text-[#78716C] flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3 text-[#C85A32]" />
                    <span className="truncate">{item.origin}</span>
                  </span>

                  <h3 className="font-serif text-base font-bold text-[#18181B] line-clamp-1 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#57534E] line-clamp-2 mb-3 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#18181B]">
                    ₦{Number(item.currentBid || item.price).toLocaleString()}
                  </span>
                  <span className="text-[11px] font-semibold text-[#C85A32]">
                    {item.pricingMode === 'auction' ? 'Place Bid' : item.pricingMode === 'recipe' ? 'Unlock' : 'Acquire'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TWO SOVEREIGN PATHS: CREATORS VS COLLECTORS */}
      <section id="paths" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
            Ecosystem Access
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mb-3">
            Two Sovereign Paths in hasha
          </h2>
          <p className="text-sm text-[#57534E]">
            Designed for artists, weavers, and heritage keepers to receive direct economic dignity, and for patrons to acquire authentic works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Path 1: For Connoisseurs & Collectors */}
          <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-5">
                <Compass className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-1">
                For Patrons & Explorers
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#18181B] mb-3">
                Connoisseurs & Collectors
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-6">
                Directly patronize master artisans across Nigeria. Every acquisition includes verified museum documentation.
              </p>

              <ul className="space-y-3 text-xs text-[#18181B] mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Live Guild Auctions:</strong> Real-time bidding on rare bronzes, ceramics, and textiles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Bespoke Couture:</strong> Commission custom-tailored Aso-Oke, Akwete, and Babanriga to your exact body dimensions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Ancestral Culinary Secrets:</strong> Step-by-step heirloom recipes with local ingredient sourcing notes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Escrow Protection:</strong> Funds held securely until provenance verification is delivered.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenAuth('collector')}
              className="w-full py-3.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign Up as Collector</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Path 2: For Indigenous Creators & Guilds */}
          <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-5">
                <Palette className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-1">
                For Artisans & Guilds
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#18181B] mb-3">
                Indigenous Creators
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-6">
                Publish masterworks directly to international connoisseurs without exploitative middle traders.
              </p>

              <ul className="space-y-3 text-xs text-[#18181B] mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
                  <span><strong>Curatorial Context Expander:</strong> Automatically enriches your raw notes with verified historical depth and material specs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
                  <span><strong>Direct NUBAN Bank Payouts:</strong> Withdraw earnings directly to GTB, Zenith, Access, or any Nigerian bank.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
                  <span><strong>Flexible Monetization:</strong> Choose Showcase Only, Fixed Price (₦), or Live Guild Bidding.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
                  <span><strong>Intellectual Property Shield:</strong> Transparent certification recognizing your legal authorship.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenAuth('creator')}
              className="w-full py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign Up as Creator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. ANCESTRAL GUILDS & NCMM PROVENANCE SECTION */}
      <section id="guilds" className="py-16 bg-[#F3EFEA] border-y border-[#E8E3DA] px-4 sm:px-8 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
                Authenticity Standard
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#18181B] mb-3">
                Strict Guild Lineage & NCMM Standards
              </h2>
              <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                Every piece on hasha is indexed with geographic origin, artisanal caste, raw materials, and ceremonial usage, preserving oral tradition through verified documentation.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#18181B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Fake Provenance Guarantee</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA]">
                <h4 className="font-serif font-bold text-base text-[#18181B] mb-1">
                  Benin Bronze Guild
                </h4>
                <span className="text-[11px] text-[#C85A32] block mb-2">Igun Street, Benin City</span>
                <p className="text-[11px] text-[#57534E] leading-relaxed">
                  Lost-wax bronze metallurgy practiced continuously since the 14th-century reign of Oba Oguola.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA]">
                <h4 className="font-serif font-bold text-base text-[#18181B] mb-1">
                  Kofar Mata Dye Pits
                </h4>
                <span className="text-[11px] text-[#C85A32] block mb-2">Kano City (Est. 1498)</span>
                <p className="text-[11px] text-[#57534E] leading-relaxed">
                  Five centuries of natural fermentation using indigofera tinctoria, ash lye, and potash.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA]">
                <h4 className="font-serif font-bold text-base text-[#18181B] mb-1">
                  Akwete Loom Enclave
                </h4>
                <span className="text-[11px] text-[#C85A32] block mb-2">Ukwa East, Abia State</span>
                <p className="text-[11px] text-[#57534E] leading-relaxed">
                  Matrilineal vertical wide-loom techniques engineered by 19th-century pioneer Dada Nwakata.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      <section id="faqs" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto text-left">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
            Questions & Clarity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#57534E]">
            Everything you need to know about provenance, payouts, shipping, and bespoke commissions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#18181B]">
                  {faq.question}
                </span>
                <span className="p-1 rounded-full bg-[#FAF8F5] text-[#78716C] flex-shrink-0">
                  {openFaqIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {openFaqIndex === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-[#57534E] leading-relaxed border-t border-[#E8E3DA] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#18181B] text-[#FAF8F5] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Step Into the Living Archive of Nigeria
            </h2>
            <p className="text-xs sm:text-sm text-[#D6D0C5] leading-relaxed mb-8 font-light">
              Whether you are an indigenous guild master wanting to preserve generational mastery or a patron seeking sacred works, hasha is your sanctuary.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenAuth('collector')}
                className="px-6 py-3 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold transition-all shadow-md"
              >
                Sign Up as Collector
              </button>
              <button
                onClick={() => onOpenAuth('creator')}
                className="px-6 py-3 rounded-xl bg-white text-[#18181B] hover:bg-[#FAF8F5] text-xs font-bold transition-all"
              >
                Sign Up as Creator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROFESSIONAL LANDING FOOTER */}
      <footer className="border-t border-[#E8E3DA] bg-white py-12 px-4 sm:px-8 text-left text-xs text-[#57534E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-serif font-bold text-xl text-[#18181B] block mb-1">
              hasha
            </span>
            <span className="text-[11px] text-[#78716C]">
              © {new Date().getFullYear()} hasha Ecosystem. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => enterApp('collector')} className="hover:text-[#18181B]">
              Marketplace
            </button>
            <button onClick={() => enterApp('creator')} className="hover:text-[#18181B]">
              Creator Studio
            </button>
            <a href="#faqs" className="hover:text-[#18181B]">FAQs</a>
            <span className="text-[11px] text-[#C85A32] font-semibold">NCMM Compliant</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
