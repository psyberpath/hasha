import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  Heart, 
  ArrowRight, 
  Globe2,
  CheckCircle2
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { switchRole, setActiveModal, notify } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    notify('Subscribed to The Sovereign Dispatch', 'You will receive monthly curated lore on indigenous Nigerian guilds.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#070709] text-left pt-16 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-14">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C85A32] via-[#D4AF37] to-[#1E2038] p-[2px]">
                <div className="w-full h-full bg-[#0A0A0C] rounded-[10px] flex items-center justify-center font-serif font-black text-lg text-[#D4AF37]">
                  ḥ
                </div>
              </div>
              <span className="font-serif font-bold text-2xl text-white">
                hasha
              </span>
            </div>

            <p className="text-xs text-[#C5BFB5] leading-relaxed max-w-sm">
              The premier digital sanctuary celebrating Nigerian indigenous art, bronze metallurgy, lost-wax sculptures, heirloom culinary gastronomy, and couture across every sovereign nation.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict NCMM Provenance Standards Compliant</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-2">
                Subscribe to The Sovereign Dispatch:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-[#121318] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32] flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#E07149] text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  ✓ Successfully subscribed to private guild dispatches.
                </span>
              )}
            </div>
          </div>

          {/* Directory: Heritages */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-4">
              Regional Heritages
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BFB5]">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Yoruba (Osun, Oyo, Ogun)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Igbo (Enugu, Abia, Imo)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Hausa (Kano, Sokoto, Zaria)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Edo (Benin Kingdom Guilds)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Efik & Ibibio (Old Calabar)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Tiv (Gboko, Benue Valley)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Ijaw (Niger Delta Creeks)</button></li>
            </ul>
          </div>

          {/* Directory: Arts & Treasures */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-4">
              Indigenous Mediums
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BFB5]">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Lost-Wax Bronze Castings</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Aso-Oke & Akwete Textiles</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Nok Archaeological Terracottas</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Nsukka Uli Earth Pigment Art</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Heirloom Culinary Secret Recipes</button></li>
              <li><button onClick={() => onNavigate('cultural-stories')} className="hover:text-white transition-colors">Nsibidi Hieroglyphs & Oral Lore</button></li>
            </ul>
          </div>

          {/* Directory: Ecosystem */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider mb-4">
              Ecosystem & Roles
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BFB5]">
              <li>
                <button 
                  onClick={() => { switchRole('creator'); setActiveModal('uploadWizard'); }} 
                  className="hover:text-[#C85A32] text-left transition-colors"
                >
                  For Creators: Upload Masterpiece
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { switchRole('collector'); setActiveModal('cart'); }} 
                  className="hover:text-[#D4AF37] text-left transition-colors"
                >
                  For Collectors: Heritage Vault
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('onboarding')} 
                  className="hover:text-white text-left transition-colors"
                >
                  Cultural Identity & Location Setup
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cultural-stories')} 
                  className="hover:text-white text-left transition-colors"
                >
                  Oral Chronicles Library
                </button>
              </li>
              <li>
                <span className="text-[11px] text-white/40 block mt-2">
                  Built with Gemma AI strict provenance verifier.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Ancestral Homage */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C5BFB5]/60 gap-4">
          <p>
            © {new Date().getFullYear()} hasha Ecosystem. All rights reserved. Celebrating the sacred heritage of Nigerian civilizations.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Crafted with reverence for</span>
            <span className="text-[#C85A32] font-semibold">Ọ̀ṣọ́ & Ọ̀tun</span>
            <span>artisanal guilds.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
