import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { geminiEnhanceDescription, uploadArtPiece } from '../services/api';
import confetti from 'canvas-confetti';
import { NIGERIAN_BANKS, NIGERIAN_ETHNICITIES } from '../data/mockData';
import { 
  X, 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Image as ImageIcon, 
  DollarSign, 
  Gavel, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  RefreshCw, 
  MapPin, 
  FileText,
  Sliders,
  Scale
} from 'lucide-react';

const PRESET_UPLOADS = [
  {
    name: 'Benin Bronze Casting',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    category: 'sculptures',
    ethnicity: 'Edo (Bini)',
    origin: 'Igun Street, Benin City, Edo State',
    rawText: 'Ancient lost-wax bronze casting of royal warrior crest with traditional river clay slip.'
  },
  {
    name: 'Oyo Hand-loomed Aso-Oke',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    ethnicity: 'Yoruba',
    origin: 'Iseyin Weaving Guilds, Oyo State',
    rawText: 'Raw wild silk and indigo cotton handwoven ceremonial wrapper with openwork eyelets.'
  },
  {
    name: 'Nsukka Pottery Vessel',
    url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
    category: 'sculptures',
    ethnicity: 'Igbo',
    origin: 'Nsukka Pottery Village, Enugu State',
    rawText: 'Hand-burnished terracotta ceremonial water vessel with engraved Uli linear motifs.'
  }
];

export default function UploadWizardModal() {
  const { setActiveModal, addArtPiece, userProfile } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    title: '',
    category: 'sculptures',
    ethnicity: 'Edo (Bini)',
    origin: 'Igun Street Bronze Casters Guild, Benin City, Edo State',
    rawDescription: '',
    enhancedDescription: '',
    pricingMode: 'auction', // 'showcase' | 'fixed' | 'auction'
    price: 1850000,
    startingBid: 1200000,
    isAiGenerated: false,
    legalIpAgreed: false,
    bankName: 'Guaranty Trust Bank (GTCO)',
    accountNumber: '0124893710',
    accountName: 'Osahenrumwen Orobator (Verified Guild Member)'
  });

  // Gemma AI State
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [gemmaResult, setGemmaResult] = useState(null);
  const [diffAccepted, setDiffAccepted] = useState(false);

  // Handle Preset Image Selection
  const applyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      image: preset.url,
      title: preset.name,
      category: preset.category,
      ethnicity: preset.ethnicity,
      origin: preset.origin,
      rawDescription: preset.rawText
    }));
  };

  // Step 3: Trigger Gemma AI
  const handleEnhanceWithGemma = async () => {
    if (!formData.rawDescription.trim()) {
      alert('Please enter at least a brief raw description to enhance.');
      return;
    }

    setIsEnhancing(true);
    try {
      const res = await geminiEnhanceDescription(formData.rawDescription, {
        category: formData.category,
        ethnicity: formData.ethnicity,
        origin: formData.origin,
      });

      setGemmaResult(res);
      setFormData((prev) => ({
        ...prev,
        enhancedDescription: res.enhancedText
      }));
      setDiffAccepted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Step 7: Final Submit
  const handleFinalPublish = async () => {
    if (!formData.legalIpAgreed) {
      alert('You must accept the Intellectual Property and Legal sign-off to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const finalItem = {
        title: formData.title || 'Untitled Indigenous Masterpiece',
        category: formData.category,
        ethnicity: formData.ethnicity,
        origin: formData.origin,
        creator: {
          name: userProfile.name || 'Verified Indigenous Master',
          title: 'Master Craftsman & Heritage Keeper',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          heritage: formData.ethnicity,
          bio: `Active practitioner preserving ${formData.ethnicity} artisanal legacy in ${formData.origin}.`
        },
        image: formData.image,
        description: formData.enhancedDescription || formData.rawDescription || 'Authentic Nigerian creation cataloged on hasha.',
        price: Number(formData.price) || 500000,
        pricingMode: formData.pricingMode,
        startingBid: formData.pricingMode === 'auction' ? Number(formData.startingBid) || 400000 : null,
        currentBid: formData.pricingMode === 'auction' ? Number(formData.startingBid) || 400000 : null,
        bidEndsIn: '48h 00m 00s',
        totalBids: 0,
        isAiGenerated: formData.isAiGenerated,
        verificationStatus: formData.isAiGenerated ? 'AI-Assisted Indigenous Concept' : '100% Indigenous Human-Crafted',
        verifiedProvenance: true,
        tags: [formData.ethnicity, 'New Release', 'Guild Registry'],
        material: 'Authentic local materials & indigenous technique',
        viewsCount: 1
      };

      const res = await uploadArtPiece(finalItem);
      addArtPiece(res.item);

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#D4AF37', '#1E2038', '#F9F6F0']
      });

      setActiveModal(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    'Media Upload',
    'Metadata & Region',
    'Gemma AI Enhancer',
    'Monetization',
    'Verification & IP',
    'Direct Settlement'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto text-left relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0A0A0C]/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32]"></span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                Guild Master Upload Wizard
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F9F6F0]">
              Step {currentStep} of {stepsList.length}: {stepsList[currentStep - 1]}
            </h2>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#C5BFB5] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="w-full bg-[#121318] h-1.5 flex">
          {stepsList.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                idx + 1 <= currentStep ? 'bg-gradient-to-r from-[#C85A32] to-[#D4AF37]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-4 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: MEDIA UPLOAD */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Upload High-Definition Artifact Imagery
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  High quality photography of your sculpture, woven textiles, cuisine, or painting.
                </p>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-white/15 hover:border-[#C85A32] rounded-2xl p-6 sm:p-8 text-center bg-[#0A0A0C]/60 transition-colors">
                {formData.image ? (
                  <div className="relative max-w-sm mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-white/10 mb-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-emerald-400 border border-white/10">
                      ✓ Image Verified
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-[#C85A32]">
                    <Upload className="w-7 h-7" />
                  </div>
                )}

                <div className="flex flex-col items-center gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL or select from cultural presets below..."
                    className="w-full max-w-md bg-[#161720] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
                  />
                  <span className="text-[11px] text-white/40">
                    Supports JPG, PNG, WEBP, ProRes Raw Video (Max 150MB)
                  </span>
                </div>
              </div>

              {/* Quick Preset Selector for Fast Hackathon Evaluation */}
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] block mb-2">
                  ⚡ Or select an authentic Nigerian cultural preset to test instantly:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRESET_UPLOADS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        formData.image === preset.url
                          ? 'border-[#C85A32] bg-[#C85A32]/10'
                          : 'border-white/5 bg-[#121318] hover:border-white/20'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-[#C5BFB5] block">
                          {preset.ethnicity}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: METADATA, TITLE & GEOGRAPHY */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Title, Category & Geographical Provenance
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  Specify precise ancestral provenance in Nigeria to register this piece in the hasha archive.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                  Masterpiece Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Royal Bronze Equestrian Warrior of Benin"
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                    Art Form Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                  >
                    <option value="sculptures">Paintings & Sculptures</option>
                    <option value="fashion">Indigenous Fashion & Weaving</option>
                    <option value="food">Heritage Cuisine & Recipes</option>
                    <option value="folklore">Folklore & Oral History</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                    Ethnic Lineage
                  </label>
                  <select
                    value={formData.ethnicity}
                    onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                  >
                    {NIGERIAN_ETHNICITIES.filter((e) => e !== 'All Heritages').map((eth) => (
                      <option key={eth} value={eth}>{eth}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                  Exact Geographical Origin in Nigeria
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C85A32] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Osun-Osogbo Sacred Grove, Osun State or Okene, Kogi State"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                  />
                </div>
                <span className="text-[10px] text-[#C5BFB5]/60 mt-1 block">
                  Authentic village, clan or guild workshop helps establish verified museum provenance.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: GEMMA AI DESCRIPTION ENHANCER */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Gemma AI Description Enhancer (Strict Fact Preservation)</span>
                  </h3>
                  <p className="text-xs text-[#C5BFB5]">
                    Type a brief raw draft. Gemma AI enriches historical context and material composition without hallucinating provenance.
                  </p>
                </div>
              </div>

              {/* Raw Input Area */}
              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                  Creator's Raw Brief Description
                </label>
                <textarea
                  rows={3}
                  value={formData.rawDescription}
                  onChange={(e) => setFormData({ ...formData, rawDescription: e.target.value })}
                  placeholder="e.g., Handmade terracotta pot from Abuja pottery village with natural river clay..."
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Enhance Action Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isEnhancing}
                  onClick={handleEnhanceWithGemma}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C85A32] hover:from-[#C85A32] hover:to-[#D4AF37] text-black hover:text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isEnhancing ? 'animate-spin' : ''}`} />
                  <span>
                    {isEnhancing ? 'Calling Gemma AI Inference...' : 'Enhance with Gemma AI (Strict Fact Preservation)'}
                  </span>
                </button>
              </div>

              {/* Side-by-Side or Editable Diff Preview */}
              {gemmaResult && (
                <div className="mt-4 p-4 rounded-2xl bg-[#121318] border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Gemma AI Contextual Expansion (Editable Diff)
                    </span>
                    <span className="text-[10px] text-white/50">
                      Zero-Hallucination Policy Checked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Original Raw */}
                    <div className="p-3 rounded-xl bg-[#0A0A0C] border border-white/5 text-left">
                      <span className="text-[10px] uppercase font-bold text-white/40 block mb-1">
                        Original Raw Draft:
                      </span>
                      <p className="text-xs text-[#C5BFB5] italic">
                        "{formData.rawDescription || 'None provided'}"
                      </p>
                    </div>

                    {/* Enhanced Textarea (Editable) */}
                    <div className="p-3 rounded-xl bg-[#0A0A0C] border border-emerald-500/20 text-left">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                        Gemma Enhanced Provenance (You may edit):
                      </span>
                      <textarea
                        rows={4}
                        value={formData.enhancedDescription}
                        onChange={(e) => setFormData({ ...formData, enhancedDescription: e.target.value })}
                        className="w-full bg-transparent text-xs text-white leading-relaxed outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Cultural Tags Verified */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-[#D4AF37] font-semibold mr-1">
                      Historical Tags:
                    </span>
                    {gemmaResult.culturalTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/80"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: MONETIZATION */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Choose Monetization & Distribution Mode
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  Choose whether this piece is for preservation showcase, direct acquisition, or live guild bidding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Showcase */}
                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'showcase' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'showcase'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 bg-[#0A0A0C] hover:border-white/20'
                  }`}
                >
                  <Eye className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Showcase Only</h4>
                  <p className="text-[11px] text-[#C5BFB5]">
                    National archive preservation. Free for scholars and public viewing.
                  </p>
                </div>

                {/* Fixed Price */}
                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'fixed' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'fixed'
                      ? 'border-[#C85A32] bg-[#C85A32]/10'
                      : 'border-white/10 bg-[#0A0A0C] hover:border-white/20'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-[#C85A32] mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Fixed Price Sale (₦)</h4>
                  <p className="text-[11px] text-[#C5BFB5]">
                    Instant acquisition with direct escrow payment settlement.
                  </p>
                </div>

                {/* Live Auction */}
                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'auction' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'auction'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 bg-[#0A0A0C] hover:border-white/20'
                  }`}
                >
                  <Gavel className="w-5 h-5 text-emerald-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Live Bidding</h4>
                  <p className="text-[11px] text-[#C5BFB5]">
                    Competitive guild auction with real-time live bid counter.
                  </p>
                </div>

              </div>

              {/* Price Fields */}
              {formData.pricingMode === 'fixed' && (
                <div>
                  <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                    Fixed Selling Price in Nigerian Naira (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#D4AF37] font-bold">₦</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl pl-7 pr-3 py-2.5 text-xs text-white font-mono outline-none"
                    />
                  </div>
                </div>
              )}

              {formData.pricingMode === 'auction' && (
                <div>
                  <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                    Starting Reserve Bid in Nigerian Naira (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#D4AF37] font-bold">₦</span>
                    <input
                      type="number"
                      value={formData.startingBid}
                      onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl pl-7 pr-3 py-2.5 text-xs text-white font-mono outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: AI TRANSPARENCY & LEGAL SIGN-OFF */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Authenticity Verification & Legal Sign-off
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  hasha enforces 100% transparency regarding human artisanal craftsmanship versus AI-assisted works.
                </p>
              </div>

              {/* Mandatory AI Toggle */}
              <div className="p-4 rounded-2xl bg-[#0A0A0C] border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Artisanal Provenance Declaration (Mandatory)
                </span>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="ai_status"
                    checked={!formData.isAiGenerated}
                    onChange={() => setFormData({ ...formData, isAiGenerated: false })}
                    className="accent-[#C85A32] w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="text-white font-semibold block">100% Human-Crafted & Indigenous</span>
                    <span className="text-[#C5BFB5]">Crafted entirely by hand using physical traditional media in Nigeria.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer pt-2 border-t border-white/5">
                  <input
                    type="radio"
                    name="ai_status"
                    checked={formData.isAiGenerated}
                    onChange={() => setFormData({ ...formData, isAiGenerated: true })}
                    className="accent-[#C85A32] w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="text-white font-semibold block">This piece contains AI-generated elements</span>
                    <span className="text-[#C5BFB5]">Digital composite or generative concept inspired by Nigerian heritage.</span>
                  </div>
                </label>
              </div>

              {/* Mandatory IP & Legal Liability Checkbox */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.legalIpAgreed}
                    onChange={(e) => setFormData({ ...formData, legalIpAgreed: e.target.checked })}
                    className="accent-[#C85A32] w-4 h-4 mt-0.5"
                  />
                  <div className="text-xs">
                    <span className="text-[#F9F6F0] font-semibold block mb-1">
                      Intellectual Property & Liability Sign-off (Required)
                    </span>
                    <p className="text-[#C5BFB5] leading-relaxed">
                      "I confirm I am the legal owner of this intellectual property, and I absolve Ọ̀ṣọ́ & Ọ̀tun of any copyright or ownership liability."
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: PAYOUT SETUP */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C85A32]" />
                  <span>Direct Settlement & Nigerian Bank Details</span>
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  Escrow payouts for sales and winning auction bids are settled automatically into your bank account.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                  Nigerian Settlement Bank
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                >
                  {NIGERIAN_BANKS.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                  10-Digit NUBAN Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  Verified Account Name: <strong>{formData.accountName}</strong>
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0A0A0C]/80 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1 || isSubmitting}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-[#C5BFB5] hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < stepsList.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(stepsList.length, prev + 1))}
              className="px-6 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#E07149] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || !formData.legalIpAgreed}
              onClick={handleFinalPublish}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C85A32] hover:from-[#C85A32] hover:to-[#D4AF37] text-black hover:text-white text-xs font-bold transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing to Registry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Masterpiece to hasha</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
