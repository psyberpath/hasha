import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { requestCustomDesign } from '../services/api';
import confetti from 'canvas-confetti';
import { 
  X, 
  Shirt, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Ruler, 
  Calendar 
} from 'lucide-react';

export default function BespokeDesignModal() {
  const { selectedItem, setActiveModal, submitBespokeRequest, userProfile } = useApp();

  const [garmentType, setGarmentType] = useState('Royal 4-Piece Agbada Ensemble');
  const [fabricChoice, setFabricChoice] = useState('Handwoven Aso-Oke Alari (Wild Silk)');
  const [chest, setChest] = useState('42 inches');
  const [waist, setWaist] = useState('36 inches');
  const [shoulder, setShoulder] = useState('19 inches');
  const [sleeve, setSleeve] = useState('26 inches');
  const [height, setHeight] = useState("6'1 ft");
  const [notes, setNotes] = useState('Please incorporate traditional gold filigree thread along the neck and pocket openings for an upcoming chieftaincy coronation.');
  const [deliveryDate, setDeliveryDate] = useState('4 weeks from order');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!selectedItem) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        itemId: selectedItem.id,
        itemTitle: selectedItem.title,
        creatorName: selectedItem.creator?.name,
        garmentType,
        fabricChoice,
        measurements: { chest, waist, shoulder, sleeve, height },
        notes,
        deliveryDate,
        clientName: userProfile.name,
      };

      await requestCustomDesign(payload);
      submitBespokeRequest(payload);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0A0A0C]/80">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#C85A32]" />
            <h3 className="font-serif text-lg font-bold text-white">
              Bespoke Couture Commission
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C5BFB5] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Creator Handshake Note */}
              <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-white/10 flex items-center gap-3">
                <img
                  src={selectedItem.creator?.avatar}
                  alt={selectedItem.creator?.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                />
                <div className="text-xs">
                  <span className="text-[#C5BFB5] block">Commissioning Master Weaver:</span>
                  <span className="font-bold text-white block">{selectedItem.creator?.name}</span>
                  <span className="text-[10px] text-[#D4AF37]">{selectedItem.origin}</span>
                </div>
              </div>

              {/* Garment & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#C5BFB5] block mb-1">
                    Silhouette / Garment Cut
                  </label>
                  <select
                    value={garmentType}
                    onChange={(e) => setGarmentType(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
                  >
                    <option>Royal 4-Piece Agbada Ensemble</option>
                    <option>Tailored Senator / Kaftan Suit</option>
                    <option>Iro & Buba with Gele & Ipele</option>
                    <option>Contemporary Haute Couture Blazer</option>
                    <option>Traditional Tiv A'anger Drape</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#C5BFB5] block mb-1">
                    Indigenous Fabric Selection
                  </label>
                  <select
                    value={fabricChoice}
                    onChange={(e) => setFabricChoice(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
                  >
                    <option>Handwoven Aso-Oke Alari (Wild Silk)</option>
                    <option>Aso-Oke Sanyan (Khaki Eco Silk)</option>
                    <option>Aso-Oke Etu (Indigo Deep Blue)</option>
                    <option>Akwete Double-Faced Diamond Cloth</option>
                    <option>Kano Kofar Mata Pit-Dyed Indigo</option>
                    <option>Tiv A'anger Striped Weave</option>
                  </select>
                </div>
              </div>

              {/* Body Measurements */}
              <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  Custom Tailoring Dimensions (Inches)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#C5BFB5] block">Chest/Bust</label>
                    <input
                      type="text"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#C5BFB5] block">Waist</label>
                    <input
                      type="text"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#C5BFB5] block">Shoulder</label>
                    <input
                      type="text"
                      value={shoulder}
                      onChange={(e) => setShoulder(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-[#C5BFB5] block">Sleeve Length</label>
                    <input
                      type="text"
                      value={sleeve}
                      onChange={(e) => setSleeve(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#C5BFB5] block">Height</label>
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Bespoke Notes */}
              <div>
                <label className="text-[11px] font-semibold text-[#C5BFB5] block mb-1">
                  Embroidery Motifs & Ceremonial Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E07149] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Dispatching Commission to Guild Master...</span>
                  </>
                ) : (
                  <span>Send Bespoke Request to Artisan</span>
                )}
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                Commission Dispatched to {selectedItem.creator?.name}!
              </h4>
              <p className="text-xs text-[#C5BFB5] max-w-md mx-auto">
                The artisan has received your measurements. You will receive progress snapshots directly from the loom workshop.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-xs font-bold text-white"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
