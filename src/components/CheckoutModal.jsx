import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { processPayment } from '../services/api';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  Lock, 
  RefreshCw, 
  Download, 
  MapPin,
  Sparkles
} from 'lucide-react';

export default function CheckoutModal() {
  const { selectedItem, setActiveModal, completePurchase, userProfile } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank' | 'ussd'
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Form Fields
  const [address, setAddress] = useState('Plot 14 Admiralty Way, Lekki Phase 1, Lagos');
  const [cardNumber, setCardNumber] = useState('5399 4100 8921 4452');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('834');

  if (!selectedItem) return null;

  const totalAmount = selectedItem.price || selectedItem.currentBid || 500000;

  const handlePayNow = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await processPayment({
        amount: totalAmount,
        currency: 'NGN',
        itemId: selectedItem.id,
        paymentMethod,
        email: userProfile.email,
      });

      setReceipt(res);
      completePurchase(selectedItem, totalAmount, paymentMethod);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0A0A0C]/80">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold text-white">
              {receipt ? 'Acquisition Receipt & Certificate' : 'Secure Nigerian Escrow Settlement'}
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#C5BFB5] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {!receipt ? (
            <form onSubmit={handlePayNow} className="space-y-5">
              
              {/* Order Summary Mini-Card */}
              <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-white/10 flex items-center gap-3.5">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-grow truncate">
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                    {selectedItem.ethnicity} • {selectedItem.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">
                    {selectedItem.title}
                  </h4>
                  <span className="text-base font-bold text-emerald-400 font-mono">
                    ₦{Number(totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Address (if physical) */}
              {selectedItem.pricingMode !== 'recipe' && (
                <div>
                  <label className="text-xs font-semibold text-[#C5BFB5] block mb-1">
                    Delivery Address (Nigeria & Diaspora Courier)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#C85A32] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0A0A0C] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method Switcher */}
              <div>
                <label className="text-xs font-semibold text-[#C5BFB5] block mb-1.5">
                  Select Settlement Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C85A32] bg-[#C85A32]/10 text-white font-bold'
                        : 'border-white/5 bg-[#0A0A0C] text-[#C5BFB5]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#C85A32] bg-[#C85A32]/10 text-white font-bold'
                        : 'border-white/5 bg-[#0A0A0C] text-[#C5BFB5]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ussd')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'ussd'
                        ? 'border-[#C85A32] bg-[#C85A32]/10 text-white font-bold'
                        : 'border-white/5 bg-[#0A0A0C] text-[#C5BFB5]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>USSD Code</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-3.5 rounded-xl bg-[#0A0A0C] border border-white/5">
                  <div>
                    <label className="text-[11px] text-[#C5BFB5] block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#161720] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#C5BFB5] block mb-1">Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-[#161720] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#C5BFB5] block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-[#161720] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/5 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">
                    Dynamic Escrow Account Details:
                  </span>
                  <p className="text-white font-bold">hasha Escrow / Providus Bank</p>
                  <p className="text-emerald-400 font-mono text-sm">9928103445</p>
                  <p className="text-[#C5BFB5] text-[11px]">
                    Expires in 30 minutes. Auto-detects your incoming transfer.
                  </p>
                </div>
              )}

              {paymentMethod === 'ussd' && (
                <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/5 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-400 block">
                    Dial on Registered Phone:
                  </span>
                  <p className="text-white font-mono text-base font-bold">*737*50*500000*0123#</p>
                  <p className="text-[#C5BFB5] text-[11px]">Available on GTB, Zenith, Access, and UBA.</p>
                </div>
              )}

              {/* Escrow Guarantee Statement */}
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Funds are held in neutral escrow until physical provenance verification is signed.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E07149] hover:from-[#E07149] hover:to-[#C85A32] text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Escrow Handshake...</span>
                  </>
                ) : (
                  <span>
                    Pay ₦{Number(totalAmount).toLocaleString()} Securely
                  </span>
                )}
              </button>

            </form>
          ) : (
            /* SUCCESS CERTIFICATE */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  Acquisition Successfully Settled!
                </h3>
                <p className="text-xs text-[#C5BFB5]">
                  Transaction Reference: <span className="font-mono text-[#D4AF37]">{receipt.transactionRef}</span>
                </p>
              </div>

              {/* Certificate Box */}
              <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#D4AF37]/30 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="font-serif font-black text-sm text-[#D4AF37]">
                      hasha Provenance Registry
                    </span>
                    <span className="text-[10px] text-white/50 block">Certificate of Authenticity</span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#C5BFB5]">Artifact Title:</span>
                    <span className="font-bold text-white truncate max-w-[200px]">{selectedItem.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C5BFB5]">Artisan / Guild:</span>
                    <span className="text-white">{selectedItem.creator?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C5BFB5]">Cultural Lineage:</span>
                    <span className="text-[#D4AF37]">{selectedItem.ethnicity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C5BFB5]">Settled Valuation:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ₦{Number(totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/40 flex items-center justify-between">
                  <span>Signed: Ọ̀ṣọ́ & Ọ̀tun Heritage Guild</span>
                  <span className="font-mono">NCMM Reg #{receipt.transactionRef.slice(-6)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert('Certificate downloaded to your device as PDF.')}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Provenance PDF</span>
                </button>

                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#C85A32] text-xs font-bold text-white hover:bg-[#E07149] transition-colors"
                >
                  Return to Sanctuary
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
