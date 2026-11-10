import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { CURRENT_DOCTOR } from '../../../mockData';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DELETION_REASONS = [
  'Transitioning to another healthcare facility / EHR',
  'Retiring from active clinical practice',
  'Closing independent clinical practice',
  'Temporary medical sabbatical / leave of absence',
  'Other administrative reason',
];

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState(DELETION_REASONS[0]);
  const [confirmationPhrase, setConfirmationPhrase] = useState('');
  const [acknowledgedHandoff, setAcknowledgedHandoff] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const isConfirmed = confirmationPhrase.trim().toUpperCase() === 'DELETE' && acknowledgedHandoff;

  const handleExecuteDelete = () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onConfirm();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center shadow-md">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">
                Delete Doctor Account
              </h3>
              <p className="text-xs text-rose-600 font-semibold">
                Permanent Clinical Account Deletion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto">
          {/* Doctor Info Badge */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <img
              src={CURRENT_DOCTOR.avatarUrl}
              alt={CURRENT_DOCTOR.name}
              className="w-10 h-10 rounded-xl object-cover border border-purple-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="font-sora font-bold text-slate-900 text-sm block truncate">
                Dr. {CURRENT_DOCTOR.name}
              </span>
              <span className="text-slate-500 text-[11px] block">
                NPI: 1487920194 • {CURRENT_DOCTOR.role}
              </span>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Critical Notice: Account Deletion Safeguards</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-rose-900/90">
              <li>
                <strong>Clinical Patient Care:</strong> All upcoming appointments and waiting room entries will be reassigned to the lead clinic administrator.
              </li>
              <li>
                <strong>HIPAA &amp; Legal Records:</strong> Completed patient encounters, diagnostic logs, and e-prescriptions cannot be deleted and will be archived for 7 years under statutory compliance.
              </li>
              <li>
                <strong>Credentials Revocation:</strong> Your Mednevo login, DEA digital signature, and direct patient messaging channels will be permanently terminated.
              </li>
            </ul>
          </div>

          {/* Reason Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Primary Reason for Account Deletion
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              {DELETION_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {/* Mandatory Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={acknowledgedHandoff}
              onChange={(e) => setAcknowledgedHandoff(e.target.checked)}
              className="mt-0.5 rounded text-rose-600 focus:ring-rose-400 w-4 h-4 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 leading-tight">
              I understand that deleting my account permanently terminates my provider access, and I authorize the clinic administrator to manage pending patient cases.
            </span>
          </label>

          {/* Type DELETE to confirm */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-700 block">
              To proceed, please type <span className="font-mono text-rose-600 font-extrabold">DELETE</span> below:
            </label>
            <input
              type="text"
              value={confirmationPhrase}
              onChange={(e) => setConfirmationPhrase(e.target.value)}
              placeholder="DELETE"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white font-semibold transition-all"
          >
            Cancel &amp; Keep Account
          </button>
          <button
            type="button"
            disabled={!isConfirmed || isDeleting}
            onClick={handleExecuteDelete}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-sora font-semibold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Deletion...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Permanently Delete Account</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
