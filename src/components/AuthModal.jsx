import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_ETHNICITIES } from '../data/mockData';
import { X, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AuthModal({ initialRole = 'collector', onClose }) {
  const { enterApp } = useApp();
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [heritage, setHeritage] = useState('Yoruba');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name or guild title.');
      return;
    }

    enterApp(role, {
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@hasha.ng`,
      role,
      location,
      heritage,
    });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-[#F3EFEA] text-[#78716C] hover:text-[#18181B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C85A32] block mb-1">
            Accession Portal
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#18181B]">
            {role === 'creator' ? 'Register as Indigenous Creator' : 'Join as Connoisseur & Collector'}
          </h3>
          <p className="text-xs text-[#57534E] mt-1">
            {role === 'creator' 
              ? 'Publish indigenous artifacts, receive escrow payouts, and document cultural provenance.' 
              : 'Acquire verified Nigerian masterpieces, bid on live auctions, and commission bespoke couture.'}
          </p>
        </div>

        {/* Role Toggle Pill */}
        <div className="flex bg-[#F3EFEA] p-1 rounded-xl mb-5 text-xs">
          <button
            type="button"
            onClick={() => setRole('collector')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              role === 'collector'
                ? 'bg-white text-[#18181B] shadow-sm font-semibold'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            Collector / Connoisseur
          </button>
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              role === 'creator'
                ? 'bg-[#C85A32] text-white shadow-sm font-semibold'
                : 'text-[#78716C] hover:text-[#18181B]'
            }`}
          >
            Indigenous Creator
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#18181B] block mb-1">
              Full Name or Studio Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Adewale Balogun or Osahenrumwen Orobator"
              className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#18181B] block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adewale@example.com"
              className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#18181B] block mb-1">
                Heritage / Affinity
              </label>
              <select
                value={heritage}
                onChange={(e) => setHeritage(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3 py-2.5 text-xs text-[#18181B] outline-none"
              >
                {NIGERIAN_ETHNICITIES.filter((e) => e !== 'All Heritages').map((eth) => (
                  <option key={eth} value={eth}>{eth}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#18181B] block mb-1">
                City / Region
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Benin City, Lagos, Kano"
                className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3 py-2.5 text-xs text-[#18181B] outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Enter hasha as {role === 'creator' ? 'Creator' : 'Collector'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-[#78716C] justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict NCMM museum-grade provenance protocol</span>
          </div>
        </form>
      </div>
    </div>
  );
}
