import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS, GUILD_PARTNERS, REVIEWS } from '../data/mockData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Palette, 
  Check, 
  Plus, 
  Minus, 
  ChevronRight,
  MapPin,
  Lock,
  Wallet,
  Sparkles,
  BookOpen,
  Users,
  Search,
  Star,
  ArrowUpRight
} from 'lucide-react';

export default function LandingPage({ onOpenAuth }) {
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
        <span className="text-[#D6D0C5]">Empowering Creators Across All 36 States</span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          
          {/* Logo: HASHA */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer"
          >
            <span className="font-serif font-black text-3xl tracking-tight text-[#18181B] hover:text-[#C85A32] transition-colors">
              HASHA
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#57534E]">
            <a href="#features" className="hover:text-[#18181B] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#18181B] transition-colors">How It Works</a>
            <a href="#why-choose-us" className="hover:text-[#18181B] transition-colors">Why Choose Us</a>
            <a href="#reviews" className="hover:text-[#18181B] transition-colors">Reviews</a>
            <a href="#faqs" className="hover:text-[#18181B] transition-colors">FAQs</a>
          </nav>

          {/* Primary CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('creator')}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#18181B] text-xs font-semibold text-[#18181B] transition-all"
            >
              Join as Artisan
            </button>

            <button
              onClick={() => enterApp('collector')}
              className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E8E3DA] text-[#C85A32] text-xs font-semibold mb-6">
              <span>Living Cultural Registry</span>
              <span className="text-[#78716C]">•</span>
              <span className="text-[#57534E]">Intelligent Cultural Verification</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#18181B] tracking-tight leading-[1.08] mb-6">
              Where Authentic Nigerian Culture Meets <span className="text-[#C85A32] italic font-normal">Global Commerce</span>
            </h1>

            {/* Sub-headline / Value Proposition */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mb-8 font-light">
              Discover, buy, and preserve genuine Nigerian arts, crafts, and heritage experiences directly from indigenous master artisans—powered by intelligent cultural verification and seamless instant payments.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => enterApp('collector')}
                className="px-7 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Explore Artifacts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('creator')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#E8E3DA] text-xs font-bold text-[#18181B] transition-all"
              >
                Join as an Artisan
              </button>
            </div>

            {/* Social Proof Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E3DA]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#18181B] block">
                  500+
                </span>
                <span className="text-[11px] text-[#78716C] font-medium block">
                  Master Artisans
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#18181B] block">
                  10,000+
                </span>
                <span className="text-[11px] text-[#78716C] font-medium block">
                  Artifacts Archived
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#18181B] block">
                  ₦48.6M+
                </span>
                <span className="text-[11px] text-[#78716C] font-medium block">
                  Disbursed to Makers
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#18181B] block">
                  36 States
                </span>
                <span className="text-[11px] text-[#78716C] font-medium block">
                  Represented
                </span>
              </div>
            </div>

          </div>

          {/* Hero Visual Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] p-3.5 shadow-xl">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3EFEA] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80"
                  alt="Benin Bronze Head"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-[#E8E3DA] text-[11px] font-bold text-[#18181B] shadow-xs">
                  Benin Bronze Guild • 16th-Century Lineage
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
                  Cast using authentic cire-perdue lost-wax metallurgy, Igun Street Guild.
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

      {/* 4. CREDIBILITY / PARTNERS SECTION */}
      <section className="py-12 bg-white border-y border-[#E8E3DA] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
              Empowering Creators Across All 36 States & Cultural Guilds
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GUILD_PARTNERS.map((guild, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] text-left hover:border-[#C85A32] transition-colors"
              >
                <h4 className="font-serif font-bold text-sm text-[#18181B] mb-0.5">
                  {guild.name}
                </h4>
                <span className="text-[11px] text-[#C85A32] font-semibold block mb-1">
                  {guild.region}
                </span>
                <span className="text-[11px] text-[#57534E] block">
                  {guild.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HIGHLIGHTED FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-left">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
            Platform Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B]">
            Engineered for Cultural Integrity & Direct Commerce
          </h2>
        </div>

        <div className="space-y-6">
          
          {/* Feature 1 (Large Top Card) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Hallucinations • Pure Provenance</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181B] mb-3">
                AI-Verified Cultural Authenticity & Accurate Storytelling
              </h3>

              <p className="text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                Say goodbye to misclassified heritage and lost histories. Every artwork and craft listed on Hasha is automatically verified and enriched with culturally accurate context, preserving oral traditions, native names, and authentic craftsmanship details without hallucinating facts.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E3DA] text-[#18181B] font-medium">
                  ✓ Gemma AI Provenance Expander
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E3DA] text-[#18181B] font-medium">
                  ✓ Indigenous Vocabulary Preservation
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E3DA] text-[#18181B] font-medium">
                  ✓ NCMM Archival Compliance
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8E3DA]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block mb-2">
                Live Verification Preview
              </span>
              <div className="p-3.5 rounded-xl bg-white border border-[#E8E3DA] mb-3 text-xs space-y-1">
                <span className="text-[#C85A32] font-bold block">Artisan Raw Draft:</span>
                <p className="text-[#57534E] italic">"Handwoven Aso-Ofi with wild silk from Iseyin loom."</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-emerald-300 text-xs space-y-1">
                <span className="text-emerald-700 font-bold block">Enriched Provenance:</span>
                <p className="text-[#18181B]">"Woven in sacred accordance with Oyo Kingdom textile heritage using Sanyan wild silk and indigo Elu leaves..."</p>
              </div>
            </div>
          </div>

          {/* Bottom Two Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature 2 (Left Bottom Card) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-5">
                  <Wallet className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B] mb-2.5">
                  Instant Micro-Patronage & Direct Payments
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                  Send support directly to local makers, elders, and heritage custodians with secure, instant local checkout. Whether buying a physical piece, bidding at auction, or tipping a storyteller, your funds go straight to the creator's wallet.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#78716C]">
                <span>Automated NIP Transfers</span>
                <span className="font-semibold text-emerald-700">Instant Settlement</span>
              </div>
            </div>

            {/* Feature 3 (Right Bottom Card) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-5">
                  <Users className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B] mb-2.5">
                  Immersive Workshops & Cultural Experiences
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                  Go beyond physical items. Book direct masterclasses with seasoned artisans—from Adire indigo dyeing in Abeokuta to royal beadwork in Oyo—connecting tourists, residents, and heritage enthusiasts straight to the source.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#78716C]">
                <span>Virtual & Physical Masterclasses</span>
                <span className="font-semibold text-[#C85A32]">Direct Artisan Booking</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-20 bg-[#F3EFEA] border-y border-[#E8E3DA] px-4 sm:px-8 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
              The Hasha Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mb-3">
              Why Hasha is Reimagining Cultural Commerce
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              We merge ancient artisanal lineages with modern digital trust, ensuring fair economic returns and permanent preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#18181B] mb-2">
                Uncompromised Preservation
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                We safeguard endangered dialects, folklore, and indigenous crafts by giving every piece an immutable digital history.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-4">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#18181B] mb-2">
                Fair Creator Revenue
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Artisans keep the lion’s share of their earnings through transparent pricing, direct patronage, and live auction bidding.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#18181B] mb-2">
                Zero-Friction Discovery
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Find what search engines ignore. Type native terms or upload images to instantly access true cultural origins.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center text-[#C85A32] mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#18181B] mb-2">
                Trust & Seamless Payments
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Frictionless local currency checkout guarantees safe, verifiable transactions between global buyers and local makers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. CURATED HOLDINGS PREVIEW */}
      <section className="py-16 bg-white border-b border-[#E8E3DA] px-4 sm:px-8 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
                Featured Holdings
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#18181B]">
                Curated Indigenous Masterpieces
              </h2>
            </div>
            
            <button
              onClick={() => enterApp('collector')}
              className="text-xs font-semibold text-[#C85A32] hover:text-[#A24220] flex items-center gap-1 transition-colors"
            >
              <span>Explore Marketplace Catalog</span>
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
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E3DA] p-3.5 cursor-pointer hover:border-[#C85A32] transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#E8E3DA]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#18181B] shadow-xs">
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

      {/* 8. REVIEW / TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
            Community Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mb-3">
            Trusted by Master Makers & Cultural Enthusiasts
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E]">
            Real feedback from master weavers, collectors, cultural tourists, and Nigerian art historians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex gap-1 text-[#C85A32] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed italic font-light">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#E8E3DA]">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#E8E3DA]"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#18181B]">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-[#78716C]">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faqs" className="py-20 bg-[#F3EFEA] border-y border-[#E8E3DA] px-4 sm:px-8 text-left">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] block mb-1">
              Clear Answers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18181B] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#57534E]">
              Everything you need to know about provenance verification, payments, workshops, and selling.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-xs"
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
        </div>
      </section>

      {/* 10. WRAP-UP CTA SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#18181B] text-[#FAF8F5] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Ready to Discover and Preserve Nigeria's Living Heritage?
            </h2>
            <p className="text-xs sm:text-sm text-[#D6D0C5] leading-relaxed mb-8 font-light">
              Join thousands of collectors, tourists, and cultural enthusiasts supporting indigenous makers across the country today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => enterApp('collector')}
                className="px-7 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold transition-all shadow-md"
              >
                Explore Marketplace
              </button>

              <button
                onClick={() => onOpenAuth('creator')}
                className="px-7 py-3.5 rounded-xl bg-white text-[#18181B] hover:bg-[#FAF8F5] text-xs font-bold transition-all"
              >
                Become a Maker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-[#E8E3DA] bg-white py-12 px-4 sm:px-8 text-left text-xs text-[#57534E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-serif font-black text-2xl text-[#18181B] block mb-1">
              HASHA
            </span>
            <span className="text-[11px] text-[#78716C]">
              © {new Date().getFullYear()} Hasha Ecosystem. Dedicated to Nigerian indigenous makers.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => enterApp('collector')} className="hover:text-[#18181B]">
              Marketplace
            </button>
            <button onClick={() => onOpenAuth('creator')} className="hover:text-[#18181B]">
              Become a Maker
            </button>
            <a href="#features" className="hover:text-[#18181B]">Features</a>
            <a href="#faqs" className="hover:text-[#18181B]">FAQs</a>
            <span className="text-[11px] text-[#C85A32] font-semibold">NCMM Compliant</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
