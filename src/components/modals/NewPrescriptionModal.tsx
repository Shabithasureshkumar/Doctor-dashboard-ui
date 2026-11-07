import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Check, Send } from 'lucide-react';

interface NewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

export const NewPrescriptionModal: React.FC<NewPrescriptionModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Sarah Johnson',
}) => {
  const [medication, setMedication] = useState('Lisinopril');
  const [dosage, setDosage] = useState('10 mg');
  const [frequency, setFrequency] = useState('Once daily');
  const [dispense, setDispense] = useState('30 Tablets');
  const [refills, setRefills] = useState('2');
  const [pharmacy, setPharmacy] = useState('CVS Pharmacy #4128 (Main St)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="E-Prescribe Medication"
      subtitle={`Prescribing for ${patientName}`}
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-75">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h4 className="font-sora font-semibold text-slate-900 text-base">
            Prescription Sent Successfully
          </h4>
          <p className="text-xs text-slate-500">
            Transmitted to {pharmacy} for {patientName}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
              Medication Name
            </label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                Frequency
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                Quantity to Dispense
              </label>
              <input
                type="text"
                value={dispense}
                onChange={(e) => setDispense(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                Refills Allowed
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={refills}
                onChange={(e) => setRefills(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
              Destination Pharmacy
            </label>
            <select
              value={pharmacy}
              onChange={(e) => setPharmacy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] focus:outline-none"
            >
              <option>CVS Pharmacy #4128 (Main St)</option>
              <option>Walgreens #10842 (Broadway Ave)</option>
              <option>Rite Aid #0492 (Market St)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#5C24FF] hover:bg-[#4A15E8] text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-sm transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Prescription</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
