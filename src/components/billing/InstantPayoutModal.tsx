import React, { useState } from 'react';
import { X, Wallet, Building2, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface InstantPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onConfirmPayout: (amount: number, isInstant: boolean) => void;
}

export const InstantPayoutModal: React.FC<InstantPayoutModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onConfirmPayout,
}) => {
  const [payoutAmount, setPayoutAmount] = useState<string>(availableBalance.toFixed(2));
  const [payoutSpeed, setPayoutSpeed] = useState<'instant' | 'standard'>('instant');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(payoutAmount) || 0;
  const instantFee = payoutSpeed === 'instant' ? Math.min(15.0, numAmount * 0.01) : 0;
  const netTransfer = Math.max(0, numAmount - instantFee);

  const handleTransfer = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmPayout(numAmount, payoutSpeed === 'instant');
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">Request Payout</h3>
              <p className="text-xs text-slate-500">Transfer funds to your linked bank account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-sora font-bold text-xl text-slate-900">Transfer Initiated!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              ${netTransfer.toFixed(2)} is on its way to your Chase Checking account •••• 4821.
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-5">
            {/* Balance banner */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Available Clinician Balance
                </span>
                <span className="font-sora font-extrabold text-2xl text-slate-900">
                  ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPayoutAmount(availableBalance.toFixed(2))}
                className="text-xs font-semibold text-[#5C24FF] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                Max Amount
              </button>
            </div>

            {/* Input Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Transfer Amount ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                max={availableBalance}
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-lg font-sora font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>

            {/* Destination Card */}
            <div className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
                  JPMorgan Chase Bank, N.A.
                </div>
                <div className="text-[11px] text-slate-500 font-mono">Checking •••• 4821</div>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Primary
              </span>
            </div>

            {/* Payout Speed Options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Select Transfer Speed
              </label>

              <div
                onClick={() => setPayoutSpeed('instant')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  payoutSpeed === 'instant'
                    ? 'border-[#5C24FF] bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <span>Instant Deposit</span>
                      <span className="text-[10px] bg-[#5C24FF] text-white px-1.5 py-0.2 rounded font-bold">
                        Within 15 mins
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">1% convenience fee (capped at $15)</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-sora font-semibold text-xs text-slate-800">
                    -${instantFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setPayoutSpeed('standard')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  payoutSpeed === 'standard'
                    ? 'border-[#5C24FF] bg-purple-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">
                      Standard ACH Transfer
                    </div>
                    <div className="text-[11px] text-slate-500">Arrives in 1-2 business days</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-sora font-semibold text-xs text-emerald-600">Free ($0.00)</span>
                </div>
              </div>
            </div>

            {/* Total Net */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-slate-600">Estimated Net Deposit:</span>
              <span className="font-sora font-bold text-lg text-slate-900">
                ${netTransfer.toFixed(2)}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs sm:text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting || numAmount <= 0 || numAmount > availableBalance}
                onClick={handleTransfer}
                className="px-6 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Confirm Transfer</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
