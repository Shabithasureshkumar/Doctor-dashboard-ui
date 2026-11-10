import React, { useState } from 'react';
import { X, ShieldCheck, Check, Copy } from 'lucide-react';

interface Configure2FAModalProps {
  isOpen: boolean;
  enabled: boolean;
  onClose: () => void;
  onToggle: (enabled: boolean) => void;
  onToast: (msg: string) => void;
}

export const Configure2FAModal: React.FC<Configure2FAModalProps> = ({
  isOpen,
  enabled,
  onClose,
  onToggle,
  onToast,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mockSecretKey = 'JBSW Y3DP EHPK 3PXP';

  const handleCopySecret = () => {
    navigator.clipboard?.writeText('JBSWY3DPEHPK3PXP');
    setCopied(true);
    onToast('2FA Secret Key copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      onToast('Please enter a valid 6-digit code from your authenticator app.');
      return;
    }
    onToggle(!enabled);
    onToast(enabled ? 'Two-Factor Authentication disabled.' : '2FA Authenticator verified and activated!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-xs text-slate-500">Time-based One-Time Password (TOTP)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {enabled ? (
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>2FA is Currently Active</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Your account requires a 6-digit code from Google Authenticator, Authy, or 1Password when signing in from an unrecognized device.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onToggle(false);
                    onToast('2FA has been disabled.');
                    onClose();
                  }}
                  className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold transition-colors"
                >
                  Disable Two-Factor Authentication
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="text-slate-600 leading-relaxed">
                Scan the QR code below using your mobile authenticator app (Google Authenticator, Microsoft Authenticator, or 1Password).
              </div>

              {/* QR Code Placeholder Graphic */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center">
                  <svg className="w-32 h-32 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="25" height="25" />
                    <rect x="65" y="10" width="25" height="25" />
                    <rect x="10" y="65" width="25" height="25" />
                    <rect x="42" y="42" width="16" height="16" />
                    <rect x="40" y="15" width="6" height="20" />
                    <rect x="70" y="45" width="18" height="6" />
                    <rect x="45" y="70" width="20" height="15" />
                    <rect x="75" y="75" width="15" height="15" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <span>Secret: <strong className="font-mono text-slate-700">{mockSecretKey}</strong></span>
                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="p-1 rounded text-purple-600 hover:bg-purple-50"
                    title="Copy Key"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Verification Code Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">6-Digit Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center font-mono font-bold text-lg tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold shadow-sm hover:opacity-95"
                >
                  Verify &amp; Activate
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
