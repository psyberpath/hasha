import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { requestPayout } from '../services/api';
import { 
  Eye, 
  TrendingUp, 
  Package, 
  Wallet, 
  Upload, 
  ShieldCheck, 
  Building2, 
  ArrowUpRight, 
  Layers, 
  Sparkles, 
  Clock, 
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CreatorDashboard() {
  const { 
    userProfile, 
    items, 
    creatorBalance, 
    executePayout, 
    setActiveModal, 
    setSelectedItem 
  } = useApp();

  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('2500000');
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Filter items created by this creator or default creator items
  const myCreations = items.filter(
    (item) => item.creator?.name === userProfile.name || item.id === 'hsh-001'
  );

  const handlePayoutSubmit = async (e) => {
    e.preventDefault();
    const amount = Number(payoutAmount);
    if (!amount || amount > creatorBalance) {
      alert('Invalid payout amount or exceeds available balance.');
      return;
    }

    setPayoutLoading(true);
    try {
      await requestPayout(amount, {
        bankName: 'Guaranty Trust Bank (GTCO)',
        accountNumber: '0124893710',
        accountName: userProfile.name,
      });
      executePayout(amount, {
        bankName: 'Guaranty Trust Bank',
        accountNumber: '0124893710'
      });
      setIsPayoutModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setPayoutLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto w-full text-left">
      
      {/* Creator Profile Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C85A32]/20 via-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#C85A32] p-[2px] shadow-xl">
              <div className="w-full h-full bg-[#0A0A0C] rounded-[14px] flex items-center justify-center font-serif text-2xl font-bold text-[#D4AF37]">
                {userProfile.name.charAt(0)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F6F0]">
                  {userProfile.name}
                </h1>
                <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400" title="Verified Nigerian Guild Practitioner">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                {userProfile.heritage || 'Edo (Bini)'} Guild Practitioner • {userProfile.location}
              </p>
              <p className="text-xs text-[#C5BFB5] max-w-xl mt-1.5 line-clamp-2">
                {userProfile.bio}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('uploadWizard')}
              className="flex-1 md:flex-none px-5 py-3 rounded-full bg-gradient-to-r from-[#C85A32] to-[#E07149] hover:from-[#E07149] hover:to-[#C85A32] text-white text-xs font-bold shadow-lg shadow-[#C85A32]/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Masterpiece</span>
            </button>

            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-3 rounded-full bg-[#161720] hover:bg-[#1E2038] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              <span>Request Payout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Creator Analytics Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        
        {/* Metric 1: Total Artwork Views */}
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between text-[#C5BFB5] text-xs mb-3">
            <span>Global Artifact Impressions</span>
            <Eye className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#F9F6F0] mb-1">
            28,490
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            ↑ +18.4% from last moon cycle
          </span>
        </div>

        {/* Metric 2: Active Bidding Volume */}
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between text-[#C5BFB5] text-xs mb-3">
            <span>Active Auction Volume</span>
            <TrendingUp className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#D4AF37] mb-1">
            ₦14,200,000
          </div>
          <span className="text-[11px] text-[#C5BFB5]">
            4 Live Guild Auctions ongoing
          </span>
        </div>

        {/* Metric 3: Pending Fulfillments */}
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between text-[#C5BFB5] text-xs mb-3">
            <span>Commissions & Orders</span>
            <Package className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#F9F6F0] mb-1">
            12 Orders
          </div>
          <span className="text-[11px] text-purple-300">
            3 Bespoke Fashion requests pending
          </span>
        </div>

        {/* Metric 4: Available Escrow Balance */}
        <div className="glass-card rounded-2xl p-5 border border-[#D4AF37]/30 bg-gradient-to-br from-[#161720] to-[#121318]">
          <div className="flex items-center justify-between text-[#C5BFB5] text-xs mb-3">
            <span>Available Balance</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-emerald-400 mb-1">
            ₦{Number(creatorBalance).toLocaleString()}
          </div>
          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="text-[11px] text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Withdraw to Bank</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Catalog & Studio Artifacts Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#F9F6F0]">
              My Active Heritage Catalog
            </h3>
            <p className="text-xs text-[#C5BFB5]">
              Artifacts and recipes listed under your verified guild provenance.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('uploadWizard')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F9F6F0] flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Add New Item</span>
          </button>
        </div>

        {myCreations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#C5BFB5]/70 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Masterpiece</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Modality</th>
                  <th className="pb-3">Valuation / Highest Bid</th>
                  <th className="pb-3">Provenance Status</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {myCreations.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pl-2 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <span className="font-bold text-[#F9F6F0] block">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#C5BFB5]/70">
                          {item.origin}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 text-[#C5BFB5] capitalize">
                      {item.category}
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-[#D4AF37] border border-white/5 uppercase">
                        {item.pricingMode}
                      </span>
                    </td>

                    <td className="py-3.5 font-mono font-bold text-[#F9F6F0]">
                      ₦{Number(item.currentBid || item.price).toLocaleString()}
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{item.verificationStatus}</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setActiveModal('itemDetail');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C85A32] text-[#F9F6F0] hover:text-white transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#C5BFB5]">
            No pieces uploaded yet. Launch the wizard above to publish your first creation!
          </div>
        )}
      </div>

      {/* Instant Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-white/10 shadow-2xl relative text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                <span>Instant Settlement Payout</span>
              </h3>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#C5BFB5] block mb-1">
                  Withdrawal Amount (₦ Naira)
                </label>
                <input
                  type="number"
                  max={creatorBalance}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  Available: ₦{Number(creatorBalance).toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0A0C] border border-white/5 text-xs space-y-1">
                <span className="text-[10px] text-[#C5BFB5] uppercase font-bold block">
                  Designated Settlement Account:
                </span>
                <p className="text-white font-bold">Guaranty Trust Bank (GTCO)</p>
                <p className="text-white/70 font-mono">0124893710 • {userProfile.name}</p>
                <p className="text-[10px] text-emerald-400">Direct NIP Transfer (within 15 minutes)</p>
              </div>

              <button
                type="submit"
                disabled={payoutLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C85A32] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {payoutLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Confirm Payout to Nigerian Bank</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
