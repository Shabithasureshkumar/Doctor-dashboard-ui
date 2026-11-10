import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onClose,
  onDiscard,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h4 className="font-sora font-bold text-sm text-slate-900">Unsaved Changes</h4>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 text-slate-400 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-slate-600">
          <p>
            You have unsaved changes in your settings profile. Leaving now will discard any uncommitted edits.
          </p>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={onDiscard}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Discard Changes
            </button>
            <button
              onClick={() => {
                onSave();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold shadow-xs hover:opacity-95"
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
