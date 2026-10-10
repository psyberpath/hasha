import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { switchRole, setActiveModal, notify, returnToLanding } = useApp();
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
    <footer className="mt-20 border-t border-[#E8E3DA] bg-white text-left pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-14">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif font-black text-2xl text-[#18181B] block">
              hasha
            </span>

            <p className="text-xs text-[#57534E] leading-relaxed max-w-sm font-light">
              The premier digital sanctuary celebrating Nigerian indigenous art, bronze metallurgy, lost-wax sculptures, heirloom culinary gastronomy, and couture across every sovereign nation.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#18181B] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict NCMM Provenance Standards Compliant</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#18181B] block mb-2">
                Subscribe to The Sovereign Dispatch:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-xl px-3 py-2 text-xs text-[#18181B] outline-none focus:border-[#C85A32] flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
              {subscribed && (
                <span className="text-[10px] text-emerald-700 mt-1 block font-semibold">
                  ✓ Successfully subscribed to private guild dispatches.
                </span>
              )}
            </div>
          </div>

          {/* Directory: Heritages */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#18181B] tracking-wider mb-4">
              Regional Heritages
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Yoruba (Osun, Oyo, Ogun)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Igbo (Enugu, Abia, Imo)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Hausa (Kano, Sokoto, Zaria)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Edo (Benin Kingdom Guilds)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Efik & Ibibio (Old Calabar)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Tiv (Gboko, Benue Valley)</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Ijaw (Niger Delta Creeks)</button></li>
            </ul>
          </div>

          {/* Directory: Mediums */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#18181B] tracking-wider mb-4">
              Indigenous Mediums
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Lost-Wax Bronze Castings</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Aso-Oke & Akwete Textiles</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Nok Archaeological Terracottas</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Nsukka Uli Earth Pigment Art</button></li>
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#C85A32] transition-colors">Heirloom Culinary Secret Recipes</button></li>
              <li><button onClick={() => onNavigate('cultural-stories')} className="hover:text-[#C85A32] transition-colors">Nsibidi Hieroglyphs & Oral Lore</button></li>
            </ul>
          </div>

          {/* Directory: Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#18181B] tracking-wider mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
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
                  className="hover:text-[#C85A32] text-left transition-colors"
                >
                  For Collectors: Heritage Vault
                </button>
              </li>
              <li>
                <button 
                  onClick={returnToLanding} 
                  className="hover:text-[#C85A32] text-left transition-colors font-medium"
                >
                  Return to Landing Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cultural-stories')} 
                  className="hover:text-[#C85A32] text-left transition-colors"
                >
                  Oral Chronicles Library
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78716C] gap-4">
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
