import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DeactivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeactivateAccountModal: React.FC<DeactivateAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [confirmationPhrase, setConfirmationPhrase] = useState('');

  if (!isOpen) return null;

  const isConfirmed = confirmationPhrase.trim() === 'DEACTIVATE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">
                Deactivate Physician Account
              </h3>
              <p className="text-xs text-rose-600 font-semibold">Sensitive Clinical Action</p>
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
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Warning: This action will freeze your portal access</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-rose-800">
              <li>All pending patient consultations will be flagged for reassignment.</li>
              <li>Surescripts e-Rx and DEA credentials will be temporarily disconnected.</li>
              <li>Historical clinical charts and audit logs will remain archived per HIPAA retention.</li>
            </ul>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-700 block">
              Type <span className="font-mono text-rose-600">DEACTIVATE</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmationPhrase}
              onChange={(e) => setConfirmationPhrase(e.target.value)}
              placeholder="DEACTIVATE"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
              type="button"
              disabled={!isConfirmed}
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sora font-semibold shadow-sm transition-all disabled:opacity-40"
            >
              Confirm Deactivation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
