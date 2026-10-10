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
  Clock, 
  RefreshCw
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
    <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto w-full text-left">
      
      {/* Creator Profile Banner (Light Mode) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border-2 border-[#C85A32] flex items-center justify-center font-serif text-2xl font-bold text-[#C85A32]">
              {userProfile.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181B]">
                  {userProfile.name}
                </h1>
                <span className="p-1 rounded-full bg-emerald-50 text-emerald-700" title="Verified Nigerian Guild Practitioner">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-[#C85A32] font-semibold mt-0.5">
                {userProfile.heritage || 'Edo (Bini)'} Guild Practitioner • {userProfile.location}
              </p>
              <p className="text-xs text-[#57534E] max-w-xl mt-1 line-clamp-2">
                {userProfile.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('uploadWizard')}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Masterpiece</span>
            </button>

            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E3DA] text-[#18181B] text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Wallet className="w-4 h-4 text-[#C85A32]" />
              <span>Request Payout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white rounded-2xl p-5 border border-[#E8E3DA] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] text-xs mb-3">
            <span>Global Artifact Impressions</span>
            <Eye className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#18181B] mb-1">
            28,490
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            ↑ +18.4% from last moon cycle
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E3DA] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] text-xs mb-3">
            <span>Active Auction Volume</span>
            <TrendingUp className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#18181B] mb-1">
            ₦14,200,000
          </div>
          <span className="text-[11px] text-[#57534E]">
            4 Live Guild Auctions ongoing
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E3DA] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] text-xs mb-3">
            <span>Commissions & Orders</span>
            <Package className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#18181B] mb-1">
            12 Orders
          </div>
          <span className="text-[11px] text-[#57534E]">
            3 Bespoke Fashion requests pending
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#C85A32] shadow-xs bg-gradient-to-br from-white to-[#FAF8F5]">
          <div className="flex items-center justify-between text-[#78716C] text-xs mb-3">
            <span>Available Balance</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-800 mb-1">
            ₦{Number(creatorBalance).toLocaleString()}
          </div>
          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="text-[11px] text-[#C85A32] hover:underline font-bold flex items-center gap-1"
          >
            <span>Withdraw to Bank</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E3DA] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#18181B]">
              My Active Heritage Catalog
            </h3>
            <p className="text-xs text-[#57534E]">
              Artifacts and recipes listed under your verified guild provenance.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('uploadWizard')}
            className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#E8E3DA] border border-[#E8E3DA] text-xs font-semibold text-[#18181B] flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Add New Item</span>
          </button>
        </div>

        {myCreations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E3DA] text-[#78716C] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Masterpiece</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Modality</th>
                  <th className="pb-3">Valuation / Leading Bid</th>
                  <th className="pb-3">Provenance Status</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E3DA]">
                {myCreations.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 pl-2 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E8E3DA]"
                      />
                      <div>
                        <span className="font-bold text-[#18181B] block">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#78716C]">
                          {item.origin}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 text-[#57534E] capitalize">
                      {item.category}
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF8F5] text-[#18181B] border border-[#E8E3DA] uppercase">
                        {item.pricingMode}
                      </span>
                    </td>

                    <td className="py-3.5 font-mono font-bold text-[#18181B]">
                      ₦{Number(item.currentBid || item.price).toLocaleString()}
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.verificationStatus}</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setActiveModal('itemDetail');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#C85A32] text-[#18181B] hover:text-white transition-colors"
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
          <div className="py-12 text-center text-xs text-[#57534E]">
            No pieces uploaded yet. Launch the wizard above to publish your first creation!
          </div>
        )}
      </div>

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 border border-[#E8E3DA] shadow-2xl relative text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-[#18181B] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C85A32]" />
                <span>Instant Settlement Payout</span>
              </h3>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1 rounded-full text-[#78716C] hover:text-[#18181B]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#57534E] block mb-1">
                  Withdrawal Amount (₦ Naira)
                </label>
                <input
                  type="number"
                  max={creatorBalance}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] font-mono outline-none"
                />
                <span className="text-[10px] text-emerald-800 mt-1 block">
                  Available: ₦{Number(creatorBalance).toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] text-xs space-y-1">
                <span className="text-[10px] text-[#78716C] uppercase font-bold block">
                  Designated Settlement Account:
                </span>
                <p className="text-[#18181B] font-bold">Guaranty Trust Bank (GTCO)</p>
                <p className="text-[#57534E] font-mono">0124893710 • {userProfile.name}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Direct NIP Transfer (within 15 minutes)</p>
              </div>

              <button
                type="submit"
                disabled={payoutLoading}
                className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
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
