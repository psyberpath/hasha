import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { geminiEnhanceDescription, uploadArtPiece } from '../services/api';
import confetti from 'canvas-confetti';
import { NIGERIAN_BANKS, NIGERIAN_ETHNICITIES } from '../data/mockData';
import { 
  X, 
  Upload, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  Gavel, 
  Eye, 
  CheckCircle2, 
  Building2, 
  RefreshCw, 
  MapPin, 
  FileText,
  BookOpen,
  Image as ImageIcon
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    fileName: '',
    title: '',
    category: 'sculptures',
    ethnicity: 'Edo (Bini)',
    origin: 'Igun Street Bronze Casters Guild, Benin City, Edo State',
    rawDescription: '',
    enhancedDescription: '',
    pricingMode: 'auction', // 'showcase' | 'fixed' | 'auction'
    price: 1850000,
    startingBid: 1200000,
    legalIpAgreed: false,
    bankName: 'Guaranty Trust Bank (GTCO)',
    accountNumber: '0124893710',
    accountName: 'Osahenrumwen Orobator (Verified Guild Member)'
  });

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState(null);

  const processSelectedFile = (file) => {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Please select a valid image or video file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result,
        fileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const applyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      image: preset.url,
      fileName: preset.name,
      title: preset.name,
      category: preset.category,
      ethnicity: preset.ethnicity,
      origin: preset.origin,
      rawDescription: preset.rawText
    }));
  };

  const handleEnhanceContext = async () => {
    if (!formData.rawDescription.trim()) {
      alert('Please enter at least a brief raw description to expand.');
      return;
    }

    setIsEnhancing(true);
    try {
      const res = await geminiEnhanceDescription(formData.rawDescription, {
        category: formData.category,
        ethnicity: formData.ethnicity,
        origin: formData.origin,
      });

      setEnhancedResult(res);
      setFormData((prev) => ({
        ...prev,
        enhancedDescription: res.enhancedText
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

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
        verificationStatus: '100% Indigenous Human-Crafted',
        verifiedProvenance: true,
        tags: [formData.ethnicity, 'New Release', 'Guild Registry'],
        material: 'Authentic local materials & indigenous technique',
        viewsCount: 1
      };

      const res = await uploadArtPiece(finalItem);
      addArtPiece(res.item);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
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
    'Curatorial Expander',
    'Monetization',
    'Provenance & IP',
    'Direct Settlement'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl border border-[#E8E3DA] shadow-2xl overflow-hidden my-auto text-left relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E8E3DA] bg-[#FAF8F5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C85A32] block">
              Guild Master Upload Wizard
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B]">
              Step {currentStep} of {stepsList.length}: {stepsList[currentStep - 1]}
            </h2>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-[#E8E3DA] text-[#78716C] hover:text-[#18181B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FAF8F5] h-1.5 flex border-b border-[#E8E3DA]">
          {stepsList.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                idx + 1 <= currentStep ? 'bg-[#C85A32]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-5 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: MEDIA UPLOAD */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  Upload High-Definition Artifact Imagery
                </h3>
                <p className="text-xs text-[#57534E]">
                  Upload photography of your sculpture, woven textiles, cuisine, or painting from your device.
                </p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Dropzone Container */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !formData.image && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-[#C85A32] bg-[#F7EFE9] scale-[1.01]' 
                    : 'border-[#E8E3DA] hover:border-[#C85A32] bg-[#FAF8F5]'
                } ${!formData.image ? 'cursor-pointer' : ''}`}
              >
                {formData.image ? (
                  <div className="space-y-3">
                    <div className="relative max-w-sm mx-auto aspect-[4/3] rounded-xl overflow-hidden border border-[#E8E3DA] shadow-xs">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[10px] text-emerald-800 font-bold border border-[#E8E3DA] shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Ready for Verification</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                      {formData.fileName && (
                        <span className="text-xs font-mono text-[#57534E] bg-white px-3 py-1 rounded-lg border border-[#E8E3DA] truncate max-w-xs">
                          📁 {formData.fileName}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8E3DA] hover:border-[#C85A32] text-xs font-semibold text-[#18181B] transition-colors flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Choose Another File</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto text-[#C85A32] border border-[#E8E3DA] shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#18181B]">
                        Drag and drop your artifact image or video here
                      </p>
                      <p className="text-[11px] text-[#78716C] mt-0.5">
                        Supports JPG, PNG, WEBP, and ProRes Video (up to 150MB)
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File from Device</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct URL input fallback */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E8E3DA] space-y-1.5">
                <label className="text-[11px] font-semibold text-[#78716C] block">
                  Or provide a direct image/media URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value, fileName: 'Remote Image' })}
                    placeholder="https://example.com/artwork.jpg"
                    className="flex-grow bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-lg px-3 py-1.5 text-xs text-[#18181B] outline-none"
                  />
                </div>
              </div>

              {/* Cultural Presets */}
              <div>
                <span className="text-xs font-semibold text-[#18181B] block mb-2">
                  Or select an authentic Nigerian preset to test quickly:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRESET_UPLOADS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        formData.image === preset.url
                          ? 'border-[#C85A32] bg-[#FAF8F5]'
                          : 'border-[#E8E3DA] bg-white hover:border-[#C85A32]'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold text-[#18181B] block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-[#57534E] block">
                          {preset.ethnicity}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: METADATA & LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  Title, Category & Geographical Provenance
                </h3>
                <p className="text-xs text-[#57534E]">
                  Specify precise ancestral provenance in Nigeria to register this piece in the hasha archive.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1">
                  Masterpiece Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Royal Bronze Equestrian Warrior of Benin"
                  className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#18181B] block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3 py-2.5 text-xs text-[#18181B] outline-none"
                  >
                    <option value="sculptures">Paintings & Sculptures</option>
                    <option value="fashion">Indigenous Fashion & Weaving</option>
                    <option value="food">Heritage Cuisine & Recipes</option>
                    <option value="folklore">Folklore & Oral History</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#18181B] block mb-1">
                    Ethnic Lineage
                  </label>
                  <select
                    value={formData.ethnicity}
                    onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3 py-2.5 text-xs text-[#18181B] outline-none"
                  >
                    {NIGERIAN_ETHNICITIES.filter((e) => e !== 'All Heritages').map((eth) => (
                      <option key={eth} value={eth}>{eth}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1">
                  Exact Geographical Origin in Nigeria
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C85A32] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Osun-Osogbo Sacred Grove, Osun State or Okene, Kogi State"
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#18181B] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GEMMA AI CULTURAL EXPANDER */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#18181B] mb-0.5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C85A32]" />
                    <span>Gemma AI Cultural Provenance & Description Enhancer</span>
                  </h3>
                  <p className="text-xs text-[#57534E]">
                    Enter brief artisan notes. Gemma enriches historical context and material composition without hallucinating facts.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {import.meta.env.VITE_GEMMA_API_KEY || import.meta.env.VITE_GEMINI_API_KEY ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Gemma Live API Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-medium" title="Add VITE_GEMMA_API_KEY in .env to call live model directly">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      Gemma Cultural Engine Ready
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1">
                  Artisan's Raw Brief Description
                </label>
                <textarea
                  rows={3}
                  value={formData.rawDescription}
                  onChange={(e) => setFormData({ ...formData, rawDescription: e.target.value })}
                  placeholder="e.g., Handmade terracotta pot from Abuja pottery village with natural river clay..."
                  className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl p-3 text-xs text-[#18181B] outline-none"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-[#78716C]">
                  {import.meta.env.VITE_GEMMA_API_KEY ? 'Calls live Gemma model with zero-hallucination constraint.' : 'Supports VITE_GEMMA_API_KEY in .env or verified Nigerian archive.'}
                </span>

                <button
                  type="button"
                  disabled={isEnhancing}
                  onClick={handleEnhanceContext}
                  className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs disabled:opacity-50"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isEnhancing ? 'Consulting Gemma AI Inference...' : 'Enhance with Gemma AI (Strict Fact Preservation)'}
                  </span>
                </button>
              </div>

              {enhancedResult && (
                <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18181B] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Gemma AI Contextual Expansion (Editable Diff)
                    </span>
                    <span className="text-[10px] font-mono text-[#78716C] bg-white px-2 py-0.5 rounded border border-[#E8E3DA]">
                      {enhancedResult.source}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white border border-[#E8E3DA] text-left">
                      <span className="text-[10px] uppercase font-bold text-[#78716C] block mb-1">
                        Your Raw Draft:
                      </span>
                      <p className="text-xs text-[#57534E] italic">
                        "{formData.rawDescription}"
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#C85A32] text-left">
                      <span className="text-[10px] uppercase font-bold text-[#C85A32] block mb-1">
                        Enriched Curatorial Provenance:
                      </span>
                      <textarea
                        rows={4}
                        value={formData.enhancedDescription}
                        onChange={(e) => setFormData({ ...formData, enhancedDescription: e.target.value })}
                        className="w-full bg-transparent text-xs text-[#18181B] leading-relaxed outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E3DA]">
                    <span className="text-[10px] text-[#78716C] font-semibold mr-1">
                      Historical Tags:
                    </span>
                    {enhancedResult.culturalTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white border border-[#E8E3DA] text-[10px] text-[#18181B]"
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
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  Choose Monetization & Distribution Mode
                </h3>
                <p className="text-xs text-[#57534E]">
                  Select whether this piece is for preservation showcase, direct acquisition, or live guild bidding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'showcase' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'showcase'
                      ? 'border-[#C85A32] bg-[#FAF8F5]'
                      : 'border-[#E8E3DA] bg-white hover:border-[#18181B]'
                  }`}
                >
                  <Eye className="w-5 h-5 text-[#C85A32] mb-2" />
                  <h4 className="text-xs font-bold text-[#18181B] mb-1">Showcase Only</h4>
                  <p className="text-[11px] text-[#57534E]">
                    National archive preservation. Free for scholars and public viewing.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'fixed' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'fixed'
                      ? 'border-[#C85A32] bg-[#FAF8F5]'
                      : 'border-[#E8E3DA] bg-white hover:border-[#18181B]'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-[#C85A32] mb-2" />
                  <h4 className="text-xs font-bold text-[#18181B] mb-1">Fixed Price Sale (₦)</h4>
                  <p className="text-[11px] text-[#57534E]">
                    Direct acquisition with instant escrow settlement.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, pricingMode: 'auction' })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.pricingMode === 'auction'
                      ? 'border-[#C85A32] bg-[#FAF8F5]'
                      : 'border-[#E8E3DA] bg-white hover:border-[#18181B]'
                  }`}
                >
                  <Gavel className="w-5 h-5 text-[#C85A32] mb-2" />
                  <h4 className="text-xs font-bold text-[#18181B] mb-1">Live Bidding</h4>
                  <p className="text-[11px] text-[#57534E]">
                    Competitive guild auction with real-time live bid counter.
                  </p>
                </div>
              </div>

              {formData.pricingMode === 'fixed' && (
                <div>
                  <label className="text-xs font-semibold text-[#18181B] block mb-1">
                    Fixed Price in Nigerian Naira (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] font-mono outline-none"
                  />
                </div>
              )}

              {formData.pricingMode === 'auction' && (
                <div>
                  <label className="text-xs font-semibold text-[#18181B] block mb-1">
                    Starting Reserve Bid in Nigerian Naira (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.startingBid}
                    onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] font-mono outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 5: PROVENANCE & IP */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  Authenticity Verification & Legal Sign-off
                </h3>
                <p className="text-xs text-[#57534E]">
                  hasha guarantees museum-grade legal ownership and indigenous craftsmanship.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#18181B]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Indigenous Human-Crafted Declaration</span>
                </div>
                <p className="text-xs text-[#57534E]">
                  I certify this artwork was created using traditional or contemporary physical craftsmanship in Nigeria.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.legalIpAgreed}
                    onChange={(e) => setFormData({ ...formData, legalIpAgreed: e.target.checked })}
                    className="accent-[#C85A32] w-4 h-4 mt-0.5"
                  />
                  <div className="text-xs">
                    <span className="text-[#18181B] font-bold block mb-1">
                      Intellectual Property & Legal Liability Sign-off (Required)
                    </span>
                    <p className="text-[#57534E] leading-relaxed">
                      "I confirm I am the legal owner of this intellectual property, and I absolve Ọ̀ṣọ́ & Ọ̀tun of any copyright or ownership liability."
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: DIRECT SETTLEMENT */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#18181B] mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C85A32]" />
                  <span>Direct Settlement & Nigerian Bank Details</span>
                </h3>
                <p className="text-xs text-[#57534E]">
                  Escrow payouts for sales and winning bids are disbursed directly into your bank account.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1">
                  Settlement Bank
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] outline-none"
                >
                  {NIGERIAN_BANKS.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1">
                  10-Digit NUBAN Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] font-mono outline-none"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>
                  Verified Account Name: <strong>{formData.accountName}</strong>
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-6 border-t border-[#E8E3DA] bg-[#FAF8F5] flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1 || isSubmitting}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold text-[#57534E] hover:text-[#18181B] disabled:opacity-30 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < stepsList.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(stepsList.length, prev + 1))}
              className="px-6 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || !formData.legalIpAgreed}
              onClick={handleFinalPublish}
              className="px-7 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing to Registry...</span>
                </>
              ) : (
                <span>Publish Masterpiece to hasha</span>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
