import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_ETHNICITIES } from '../data/mockData';
import { 
  X, 
  Compass, 
  Palette, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function OnboardingModal() {
  const { 
    userRole, 
    switchRole, 
    userProfile, 
    setUserProfile, 
    setActiveModal,
    notify
  } = useApp();

  const [role, setRole] = useState(userRole || 'collector');
  const [name, setName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [heritage, setHeritage] = useState(userProfile.heritage || 'Yoruba');
  const [location, setLocation] = useState(userProfile.location || 'Victoria Island, Lagos');
  const [bio, setBio] = useState(userProfile.bio || '');

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name or guild title.');
      return;
    }

    const updated = {
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@hasha.ng`,
      role,
      heritage,
      location,
      bio: bio.trim() || (role === 'creator' ? `Preserving ${heritage} artisanal lineage in ${location}.` : `Art and culture connoisseur from ${location}.`),
    };

    setUserProfile(updated);
    switchRole(role);
    setActiveModal(null);
    notify('Identity Authenticated', `Welcome to hasha as a verified ${role === 'creator' ? 'Indigenous Creator' : 'Connoisseur'}.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0A0A0C]/80">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Accession</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Join the Living Nigerian Archive
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C5BFB5] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
          
          {/* Dual Role Switcher Cards */}
          <div>
            <label className="text-xs font-semibold text-[#C5BFB5] block mb-2">
              Select Your Access Role in hasha:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setRole('collector')}
                className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all ${
                  role === 'collector'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-md'
                    : 'border-white/5 bg-[#0A0A0C] text-[#C5BFB5] hover:border-white/20'
                }`}
              >
                <Compass className={`w-5 h-5 mx-auto mb-1.5 ${role === 'collector' ? 'text-[#D4AF37]' : 'text-white/40'}`} />
                <h4 className="text-xs font-bold block">Collector / Connoisseur</h4>
                <span className="text-[10px] text-white/50 block mt-0.5">Explore, bid, commission bespoke</span>
              </div>

              <div
                onClick={() => setRole('creator')}
                className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all ${
                  role === 'creator'
                    ? 'border-[#C85A32] bg-[#C85A32]/20 text-white shadow-md'
                    : 'border-white/5 bg-[#0A0A0C] text-[#C5BFB5] hover:border-white/20'
                }`}
              >
                <Palette className={`w-5 h-5 mx-auto mb-1.5 ${role === 'creator' ? 'text-[#C85A32]' : 'text-white/40'}`} />
                <h4 className="text-xs font-bold block">Indigenous Creator</h4>
                <span className="text-[10px] text-white/50 block mt-0.5">Publish works with Gemma AI</span>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
              Full Name or Guild Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Adewale Adebayo or Osahenrumwen Orobator"
              className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adewale@hasha.ng"
              className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
            />
          </div>

          {/* Ethnic Lineage & City Location in Nigeria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                Ancestral Culture / Heritage
              </label>
              <select
                value={heritage}
                onChange={(e) => setHeritage(e.target.value)}
                className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
              >
                {NIGERIAN_ETHNICITIES.filter((e) => e !== 'All Heritages').map((eth) => (
                  <option key={eth} value={eth}>{eth}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                Location in Nigeria / Diaspora
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Benin City, Edo or Kano or Enugu"
                className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          {/* Bio Snippet */}
          <div>
            <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
              Personal Bio / Guild Specialty
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief description of your artisanal craft or collecting focus..."
              className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#C85A32]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E07149] hover:from-[#E07149] hover:to-[#C85A32] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>Enter hasha as {role === 'creator' ? 'Creator' : 'Connoisseur'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}
