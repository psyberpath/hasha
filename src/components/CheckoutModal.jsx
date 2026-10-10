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
  MapPin
} from 'lucide-react';

export default function CheckoutModal() {
  const { selectedItem, setActiveModal, completePurchase, userProfile } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('alatpay');
  const [customerEmail, setCustomerEmail] = useState(userProfile.email || 'collector@hasha.ng');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

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
        email: customerEmail,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl border border-[#E8E3DA] shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E3DA] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h3 className="font-serif text-lg font-bold text-[#18181B]">
              {receipt ? 'Acquisition Receipt & Certificate' : 'Secure Nigerian Escrow Settlement'}
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-[#E8E3DA] text-[#78716C] hover:text-[#18181B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {!receipt ? (
            <form onSubmit={handlePayNow} className="space-y-4">
              
              {/* Order Summary */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] flex items-center gap-3.5">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-14 h-14 rounded-xl object-cover border border-[#E8E3DA] flex-shrink-0"
                />
                <div className="flex-grow truncate">
                  <span className="text-[10px] text-[#C85A32] uppercase font-bold tracking-wider block">
                    {selectedItem.ethnicity} • {selectedItem.category}
                  </span>
                  <h4 className="text-sm font-bold text-[#18181B] truncate">
                    {selectedItem.title}
                  </h4>
                  <span className="text-base font-bold text-[#18181B] font-mono">
                    ₦{Number(totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedItem.pricingMode !== 'recipe' && (
                <div>
                  <label className="text-xs font-semibold text-[#18181B] block mb-1">
                    Delivery Address (Nigeria & Diaspora Courier)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#C85A32] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E3DA] focus:border-[#C85A32] rounded-xl pl-9 pr-3 py-2 text-xs text-[#18181B] outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#18181B] block mb-1.5">
                  Select Settlement Channel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('alatpay')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'alatpay'
                        ? 'border-[#C85A32] bg-[#FAF8F5] text-[#18181B] font-bold shadow-xs'
                        : 'border-[#E8E3DA] bg-white text-[#78716C]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-[9px]">
                      A
                    </div>
                    <span>ALATpay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C85A32] bg-[#FAF8F5] text-[#18181B] font-bold shadow-xs'
                        : 'border-[#E8E3DA] bg-white text-[#78716C]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C85A32]" />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#C85A32] bg-[#FAF8F5] text-[#18181B] font-bold shadow-xs'
                        : 'border-[#E8E3DA] bg-white text-[#78716C]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ussd')}
                    className={`p-2.5 rounded-xl border text-center text-xs flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'ussd'
                        ? 'border-[#C85A32] bg-[#FAF8F5] text-[#18181B] font-bold shadow-xs'
                        : 'border-[#E8E3DA] bg-white text-[#78716C]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#18181B]" />
                    <span>USSD Code</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'alatpay' && (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C85A32]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold text-xs">
                        A
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#18181B] block">
                          ALATpay by Wema Bank
                        </span>
                        <span className="text-[10px] text-[#78716C]">
                          Direct Commercial Bank & Instant Escrow Settlement
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-white text-emerald-800 font-bold px-2 py-0.5 rounded border border-[#E8E3DA]">
                      Active Gateway
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E8E3DA] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#57534E]">ALAT Business ID:</span>
                      <span className="font-mono text-[#18181B] font-semibold text-[11px]">
                        d2bc136d-2740-4c02-ab87-9756d7c171e0
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#57534E]">Supported Channels:</span>
                      <span className="text-[#18181B] text-[11px] font-medium">
                        Wema / ALAT Direct • Card • USSD (*945#)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                      Billing Email for ALATpay Direct Receipt
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="collector@hasha.ng"
                      className="w-full bg-white border border-[#E8E3DA] focus:border-[#C85A32] rounded-lg px-3 py-1.5 text-xs text-[#18181B] outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA]">
                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#E8E3DA] rounded-lg px-3 py-1.5 text-xs text-[#18181B] font-mono outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#57534E] block mb-1">Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-white border border-[#E8E3DA] rounded-lg px-3 py-1.5 text-xs text-[#18181B] font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#57534E] block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-white border border-[#E8E3DA] rounded-lg px-3 py-1.5 text-xs text-[#18181B] font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#C85A32] block">
                    Dynamic Escrow Account Details:
                  </span>
                  <p className="text-[#18181B] font-bold">hasha Escrow / Providus Bank</p>
                  <p className="text-emerald-800 font-mono text-sm font-bold">9928103445</p>
                  <p className="text-[#57534E] text-[11px]">
                    Expires in 30 minutes. Auto-detects incoming NIP payment.
                  </p>
                </div>
              )}

              {paymentMethod === 'ussd' && (
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E3DA] text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#18181B] block">
                    Dial on Registered Mobile Phone:
                  </span>
                  <p className="text-[#18181B] font-mono text-base font-bold">*737*50*500000*0123#</p>
                  <p className="text-[#57534E] text-[11px]">Available on GTB, Zenith, Access, and UBA.</p>
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Funds held in secure neutral escrow until physical provenance verification.
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#A24220] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>
                      {paymentMethod === 'alatpay'
                        ? 'Connecting to ALATpay Gateway...'
                        : 'Verifying Escrow Handshake...'}
                    </span>
                  </>
                ) : (
                  <span>
                    Pay ₦{Number(totalAmount).toLocaleString()} {paymentMethod === 'alatpay' ? 'with ALATpay' : 'Securely'}
                  </span>
                )}
              </button>

            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#18181B] mb-1">
                  Acquisition Successfully Settled!
                </h3>
                <p className="text-xs text-[#57534E]">
                  Transaction Reference: <span className="font-mono text-[#C85A32]">{receipt.transactionRef}</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] text-left">
                <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-3 mb-3">
                  <div>
                    <span className="font-serif font-black text-sm text-[#18181B]">
                      hasha Provenance Registry
                    </span>
                    <span className="text-[10px] text-[#78716C] block">Certificate of Authenticity</span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#C85A32]" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Artifact Title:</span>
                    <span className="font-bold text-[#18181B] truncate max-w-[200px]">{selectedItem.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Artisan / Guild:</span>
                    <span className="text-[#18181B]">{selectedItem.creator?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Cultural Lineage:</span>
                    <span className="text-[#C85A32] font-semibold">{selectedItem.ethnicity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Settled Valuation:</span>
                    <span className="font-mono font-bold text-emerald-800">
                      ₦{Number(totalAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Settlement Channel:</span>
                    <span className="font-bold text-[#18181B]">
                      {paymentMethod === 'alatpay' ? 'ALATpay by Wema (Escrow Secured)' : paymentMethod === 'card' ? 'Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'USSD Code'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E3DA] text-[10px] text-[#78716C] flex items-center justify-between">
                  <span>Signed: Ọ̀ṣọ́ & Ọ̀tun Heritage Guild</span>
                  <span className="font-mono">NCMM Reg #{receipt.transactionRef.slice(-6)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert('Certificate downloaded as PDF.')}
                  className="flex-1 py-2.5 rounded-xl bg-white border border-[#E8E3DA] hover:bg-[#FAF8F5] text-xs font-semibold text-[#18181B] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Provenance PDF</span>
                </button>

                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#C85A32] text-xs font-bold text-white hover:bg-[#A24220] transition-colors"
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
