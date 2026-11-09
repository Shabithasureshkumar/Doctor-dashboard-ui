import React, { useState } from 'react';
import { X, ShieldCheck, User } from 'lucide-react';
import { InsuranceClaim } from '../../types/billing';

interface SubmitClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitClaim: (newClaim: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'lastUpdated'>) => void;
}

export const SubmitClaimModal: React.FC<SubmitClaimModalProps> = ({
  isOpen,
  onClose,
  onSubmitClaim,
}) => {
  const [patientName, setPatientName] = useState('Sarah Johnson');
  const [insurancePayer, setInsurancePayer] = useState('BlueCross BlueShield');
  const [payerId, setPayerId] = useState('BCBS-00192');
  const [policyNumber, setPolicyNumber] = useState('BCBS-9912041');
  const [groupNumber, setGroupNumber] = useState('GRP-4412');
  const [cptCodes, setCptCodes] = useState('99214, 93000');
  const [icd10Diagnosis, setIcd10Diagnosis] = useState('I10 (Essential Hypertension), R07.9 (Chest Pain)');
  const [dateOfService, setDateOfService] = useState('2026-11-08');
  const [billedAmount, setBilledAmount] = useState('320.00');
  const [copayAmount, setCopayAmount] = useState('30.00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const billed = parseFloat(billedAmount) || 250.0;
    const copay = parseFloat(copayAmount) || 20.0;
    onSubmitClaim({
      insurancePayer,
      payerId,
      patientName,
      policyNumber,
      groupNumber,
      cptCodes: cptCodes.split(',').map((c) => c.trim()),
      icd10Diagnosis,
      dateOfService,
      billedAmount: billed,
      allowedAmount: billed * 0.85, // estimated allowed
      copayAmount: copay,
      status: 'Submitted',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">Submit Insurance Claim</h3>
              <p className="text-xs text-slate-500">Direct EDI Clearinghouse Submission (CMS-1500)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Insurance Carrier
              </label>
              <select
                value={insurancePayer}
                onChange={(e) => {
                  setInsurancePayer(e.target.value);
                  if (e.target.value === 'Aetna Health') setPayerId('AETNA-60054');
                  else if (e.target.value === 'UnitedHealthcare') setPayerId('UHC-87726');
                  else if (e.target.value === 'Cigna') setPayerId('CIGNA-62308');
                  else setPayerId('BCBS-00192');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              >
                <option value="BlueCross BlueShield">BlueCross BlueShield</option>
                <option value="Aetna Health">Aetna Health</option>
                <option value="UnitedHealthcare">UnitedHealthcare</option>
                <option value="Cigna Healthcare">Cigna Healthcare</option>
                <option value="Medicare Part B">Medicare Part B</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Member Policy ID
              </label>
              <input
                type="text"
                required
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Group Number
              </label>
              <input
                type="text"
                value={groupNumber}
                onChange={(e) => setGroupNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Date of Service
              </label>
              <input
                type="date"
                required
                value={dateOfService}
                onChange={(e) => setDateOfService(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              ICD-10 Primary & Secondary Diagnosis
            </label>
            <input
              type="text"
              required
              value={icd10Diagnosis}
              onChange={(e) => setIcd10Diagnosis(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                CPT Codes
              </label>
              <input
                type="text"
                required
                value={cptCodes}
                onChange={(e) => setCptCodes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Billed Fee ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={billedAmount}
                onChange={(e) => setBilledAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-sora font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Copay ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={copayAmount}
                onChange={(e) => setCopayAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-sora font-semibold"
              />
            </div>
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
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-sora font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              Submit to Clearinghouse →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
