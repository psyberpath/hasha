import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Volume2, 
  ShieldCheck 
} from 'lucide-react';

const CULTURAL_CHRONICLES = [
  {
    id: 'chronicle-1',
    title: 'The Lost-Wax Metallurgy of the Benin Royal Guild',
    subtitle: '600 Years of Bronze Sovereignty & Sacred Alloys',
    culture: 'Edo (Kingdom of Benin)',
    location: 'Igun Street, Benin City',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    summary: 'Centuries before European renaissance metallurgists understood bronze alloy control, the Ine n’Igun guild cast commemorative heads of the Iyoba (Queen Mother) and Oba with near-zero porosity using secret river mud beeswax molds.',
    narrative: 'In the ancient kingdom of Benin, casting bronze was strictly sacred. The guild lived along Igun Street under the direct patronage of the Oba. Each commemorative head served as an ancestral conduit, capturing the spiritual essence and political majesty of royal rulers. When modern metallurgical testing was performed on early Benin bronzes, scientists discovered complex copper-lead-zinc ratios that prevented atmospheric oxidation for over six centuries.',
    relatedItemId: 'hsh-001'
  },
  {
    id: 'chronicle-2',
    title: 'Kofar Mata: Continuous Indigo Fermentation Since 1498',
    subtitle: 'The 500-Year-Old Natural Dye Chemistry of Kano',
    culture: 'Hausa',
    location: 'Kofar Mata, Kano City',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    summary: 'The oldest operational dye pits on earth, using fermented Indigofera tinctoria, firewood ash lye, and potash to produce fabrics with a deep, metallic midnight-blue luster coveted along the trans-Saharan routes.',
    narrative: 'Founded in 1498 during the reign of Sarki Muhammadu Rumfa, the Kofar Mata pits comprise over one hundred 4-meter-deep earthen wells. Master dyers never use artificial chemicals; the indigo is fermented with natural ash lye and indigenous potash over four weeks. The cloth is dipped up to 48 times and beaten with heavy wooden mallets to produce an iridescent metallic sheen characteristic of royal Babanriga robes.',
    relatedItemId: 'hsh-006'
  },
  {
    id: 'chronicle-3',
    title: 'Nsibidi: The Pre-Colonial Indigenous Writing System',
    subtitle: 'Sacred Hieroglyphs of the Ekpe Leopard Society',
    culture: 'Efik & Igbo',
    location: 'Cross River Basin & Arochukwu',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    summary: 'Disproving the myth that Africa lacked indigenous writing systems, Nsibidi conveyed judicial verdicts, diplomatic treaties, and cosmological philosophies through hundreds of graphic pictograms.',
    narrative: 'Dating back centuries before European arrival, Nsibidi was used extensively across southeastern Nigeria. Initiates of the Ekpe society inscribed symbols onto secret Ukara cloths, ceremonial drums, and brass objects. Divided into dark signs (esoteric judicial decrees) and public signs (messages of love, trade pacts, and clan lineage), Nsibidi remains one of the ancient wonders of African literacy.',
    relatedItemId: 'hsh-009'
  },
  {
    id: 'chronicle-4',
    title: 'The Living Loom Traditions of Iseyin & Akwete',
    subtitle: 'Warp, Weft, and Generational Royal Threads',
    culture: 'Yoruba & Igbo',
    location: 'Iseyin (Oyo) & Ukwa East (Abia)',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    summary: 'From horizontal strip looms of the Yoruba to vertical continuous looms invented by Dada Nwakata in Akwete, Nigerian textile arts embody generational codes of honor and wealth.',
    narrative: 'Textiles in Nigeria are not mere clothing; they are currency, poetry, and social rank. Aso-Oke weaving in Iseyin uses narrow strip looms where long ribbons of raw wild silk (Sanyan) and crimson threads (Alari) are woven and joined. In Akwete, women mastered vertical wide looms, engineering four-sided reversible patterns that could never be duplicated by colonial factory machines.',
    relatedItemId: 'hsh-002'
  }
];

export default function CulturalStories({ onInspectItem }) {
  const { items, setSelectedItem, setActiveModal } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);

  const handleOpenItem = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setActiveModal('itemDetail');
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full text-left">
      
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-wider font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Living Oral Archives</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F9F6F0] tracking-tight mb-3">
          Nigerian Indigenous Chronicles & Guild Lore
        </h2>
        <p className="text-sm text-[#C5BFB5] max-w-2xl font-light">
          Deep dives into the ancient metallurgical, textile, literary, and culinary technologies developed across Nigerian civilizations.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {CULTURAL_CHRONICLES.map((story) => (
          <div
            key={story.id}
            className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-[#121318]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-[#D4AF37] font-semibold uppercase">
                  {story.culture}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/80">
                  <MapPin className="w-3 h-3 text-[#C85A32]" />
                  <span>{story.location}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-xl font-bold text-[#F9F6F0] group-hover:text-[#D4AF37] transition-colors mb-1">
                {story.title}
              </h3>
              <span className="text-xs text-[#D4AF37] font-medium block mb-2.5">
                {story.subtitle}
              </span>

              {/* Summary */}
              <p className="text-xs text-[#C5BFB5] leading-relaxed mb-4">
                {story.summary}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setSelectedStory(story)}
                className="text-xs font-semibold text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {story.relatedItemId && (
                <button
                  onClick={() => handleOpenItem(story.relatedItemId)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#C85A32] text-[11px] text-[#F9F6F0] transition-colors"
                >
                  View Artifact
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                {selectedStory.culture} • {selectedStory.location}
              </span>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1 rounded-full text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              {selectedStory.title}
            </h3>
            <h4 className="text-sm text-[#D4AF37] mb-4">
              {selectedStory.subtitle}
            </h4>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-5">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#C5BFB5] leading-relaxed mb-6 whitespace-pre-line">
              {selectedStory.narrative}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-[11px] text-white/40">
                Living oral archive collected under NCMM standards.
              </span>
              <button
                onClick={() => {
                  handleOpenItem(selectedStory.relatedItemId);
                  setSelectedStory(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C85A32] text-xs font-bold text-white hover:bg-[#E07149] transition-colors"
              >
                Inspect Associated Artifact
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
