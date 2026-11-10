import React from 'react';
import { X, LogOut, Laptop } from 'lucide-react';
import { CURRENT_DOCTOR } from '../../../mockData';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SignOutModal: React.FC<SignOutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">Sign Out of Portal</h3>
              <p className="text-xs text-slate-500">End your active physician workstation session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <img
              src={CURRENT_DOCTOR.avatarUrl}
              alt={CURRENT_DOCTOR.name}
              className="w-11 h-11 rounded-xl object-cover border border-purple-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="font-sora font-bold text-slate-900 text-sm block truncate">
                Dr. {CURRENT_DOCTOR.name}
              </span>
              <span className="text-slate-500 text-[11px] block">
                {CURRENT_DOCTOR.role} • Mednevo Central Clinic
              </span>
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1 text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-[#5C24FF]">
              <Laptop className="w-3.5 h-3.5" />
              <span>Current Session: Windows 11 Chrome Workstation</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Signing out will lock this terminal. You will be asked for your password and 2FA authenticator token on your next sign in.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-all"
            >
              Stay Signed In
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-sora font-semibold shadow-sm hover:opacity-95 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Confirm Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
