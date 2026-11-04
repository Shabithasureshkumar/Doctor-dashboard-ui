import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';
import { QUEUE_PATIENTS } from '../../mockData';

interface RequestRefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPatient?: string;
  onSuccess?: (patient: string, medication: string) => void;
}

export const RequestRefillModal: React.FC<RequestRefillModalProps> = ({
  isOpen,
  onClose,
  defaultPatient = 'Sarah Johnson',
  onSuccess,
}) => {
  const [patientName, setPatientName] = useState(defaultPatient);
  const [medication, setMedication] = useState('Lisinopril 10mg');
  const [dosage, setDosage] = useState('10 mg once daily');
  const [refillQuantity, setRefillQuantity] = useState('30 Tablets');
  const [pharmacy, setPharmacy] = useState('CVS Pharmacy #4128 (Main St)');
  const [notes, setNotes] = useState('Authorized 90-day maintenance refill.');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const commonMeds = [
    { name: 'Lisinopril 10mg', defaultDosage: '10 mg once daily' },
    { name: 'Amlodipine 5mg', defaultDosage: '5 mg once daily' },
    { name: 'Atorvastatin 20mg', defaultDosage: '20 mg at bedtime' },
    { name: 'Metformin 500mg', defaultDosage: '500 mg twice daily with meals' },
    { name: 'Losartan 50mg', defaultDosage: '50 mg once daily' },
    { name: 'Aspirin 81mg', defaultDosage: '81 mg once daily' },
  ];

  const handleMedChange = (medName: string) => {
    setMedication(medName);
    const found = commonMeds.find((m) => m.name === medName);
    if (found) {
      setDosage(found.defaultDosage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !medication.trim() || !dosage.trim() || !refillQuantity.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    setErrorMessage('');
    setIsSuccess(true);
    onSuccess?.(patientName, medication);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Refill"
      subtitle="Request medication refill for patient"
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h4 className="font-sora font-semibold text-slate-900 text-lg">
            Refill Request Submitted
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Refill request for <strong className="text-slate-800">{medication}</strong> for{' '}
            <strong className="text-slate-800">{patientName}</strong> has been transmitted to {pharmacy}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Select Patient */}
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
              Select Patient *
            </label>
            <select
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
              required
            >
              {QUEUE_PATIENTS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.age} y/o {p.gender} · {p.mrn})
                </option>
              ))}
              <option value="Tom Becker">Tom Becker (52 M · MRN-482019)</option>
              <option value="Olivia Park">Olivia Park (34 F · MRN-391824)</option>
            </select>
          </div>

          {/* Select Medication */}
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
              Select Medication *
            </label>
            <select
              value={medication}
              onChange={(e) => handleMedChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
              required
            >
              {commonMeds.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Dosage */}
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                Dosage *
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 10 mg once daily"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
                required
              />
            </div>

            {/* Refill Quantity */}
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                Refill Quantity *
              </label>
              <input
                type="text"
                value={refillQuantity}
                onChange={(e) => setRefillQuantity(e.target.value)}
                placeholder="e.g. 30 Tablets, 90 Tablets"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Pharmacy */}
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
              Pharmacy
            </label>
            <select
              value={pharmacy}
              onChange={(e) => setPharmacy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
            >
              <option>CVS Pharmacy #4128 (Main St)</option>
              <option>Walgreens #10842 (Broadway Ave)</option>
              <option>Rite Aid #0492 (Market St)</option>
              <option>Patient Preferred Pharmacy On File</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
              Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Clinical refill notes or authorization instructions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none resize-none"
            />
          </div>

          {/* Buttons: Cancel & Request Refill */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5E45BE] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sora font-semibold shadow-sm transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Request Refill</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
