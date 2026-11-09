import React, { useState, useMemo } from 'react';
import {
  Pill,
  ShieldCheck,
  Plus,
  RefreshCw,
  Ban,
  Eye,
  Edit2,
  X,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { MedicationItem } from '../../../types/clinical';
import { MOCK_MEDICATIONS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab05MedicationsProps {
  patient: PatientRecord;
  onOpenNewPrescriptionModal: (patientName: string) => void;
  onToast: (msg: string) => void;
}

export const Tab05Medications: React.FC<Tab05MedicationsProps> = ({
  patient,
  onOpenNewPrescriptionModal,
  onToast,
}) => {
  const [medications, setMedications] = useState<MedicationItem[]>(MOCK_MEDICATIONS);
  const [activeSubTab, setActiveSubTab] = useState<'Active' | 'Past' | 'Discontinued'>('Active');

  // Modals & Confirmation dialogs
  const [viewingMed, setViewingMed] = useState<MedicationItem | null>(null);
  const [editingMed, setEditingMed] = useState<MedicationItem | null>(null);
  const [discontinuingMed, setDiscontinuingMed] = useState<MedicationItem | null>(null);
  const [discontinueReason, setDiscontinueReason] = useState('');

  // Add Prescription modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGeneric, setNewGeneric] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFreq, setNewFreq] = useState('Once daily');
  const [newRoute, setNewRoute] = useState<MedicationItem['route']>('Oral');
  const [newIndication, setNewIndication] = useState('');

  const filteredMeds = useMemo(() => {
    return medications.filter((m) => m.status === activeSubTab);
  }, [medications, activeSubTab]);

  const handleRefill = (med: MedicationItem) => {
    if (med.refillsRemaining <= 0) {
      onToast(`No refills remaining for ${med.name}. Please create new prescription.`);
      return;
    }
    setMedications((prev) =>
      prev.map((m) =>
        m.id === med.id ? { ...m, refillsRemaining: m.refillsRemaining - 1 } : m
      )
    );
    onToast(`Refill approved for ${med.name}. 30-day electronic script transmitted.`);
  };

  const handleConfirmDiscontinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discontinuingMed) return;
    setMedications((prev) =>
      prev.map((m) =>
        m.id === discontinuingMed.id
          ? {
              ...m,
              status: 'Discontinued',
              endDate: 'Today',
              discontinueReason: discontinueReason || 'Physician clinical discretion',
            }
          : m
      )
    );
    onToast(`${discontinuingMed.name} discontinued. Rationale logged in EHR.`);
    setDiscontinuingMed(null);
    setDiscontinueReason('');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMedItem: MedicationItem = {
      id: `med-${Date.now()}`,
      name: newName,
      genericName: newGeneric || newName,
      dosage: newDosage,
      frequency: newFreq,
      route: newRoute,
      duration: 'Ongoing',
      startDate: 'Today',
      prescribingDoctor: 'Dr. Elena Vance, MD',
      status: 'Active',
      refillsRemaining: 3,
      indications: newIndication || 'Therapeutic maintenance',
    };
    setMedications([newMedItem, ...medications]);
    setIsAddOpen(false);
    setNewName('');
    setNewGeneric('');
    setNewDosage('');
    onToast(`Prescription for ${newMedItem.name} ${newMedItem.dosage} issued and authorized.`);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMed) return;
    setMedications((prev) =>
      prev.map((m) => (m.id === editingMed.id ? editingMed : m))
    );
    onToast(`Medication ${editingMed.name} updated.`);
    setEditingMed(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Medication & E-Prescription Management
              </h3>
              <p className="text-xs text-slate-500">
                Drug-drug interaction screening, dosage schedules & refill authorizations
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenNewPrescriptionModal(patient.name)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <FileText className="w-3.5 h-3.5 text-[#5C24FF]" />
            <span>Open E-Rx Writer</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Safety Screening Banner & Adherence Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-3xl flex items-center gap-3 text-xs text-emerald-900 md:col-span-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div className="leading-relaxed">
            <span className="font-bold">Automated Clinical Interaction Checker:</span> Zero high-risk adverse drug interactions detected. All active regimens cross-referenced against patient's allergy profile (NKDA) and kidney function (eGFR &gt; 90).
          </div>
        </div>

        <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-3xl flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 font-medium block">Adherence Rate</span>
            <span className="font-sora font-extrabold text-2xl text-[#5C24FF]">94%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">High Compliance (30 Days)</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#5C24FF] shadow-sm font-bold text-xs">
            A+
          </div>
        </div>
      </div>

      {/* Sub-tabs: Active | Past | Discontinued */}
      <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit text-xs font-semibold">
        {(['Active', 'Past', 'Discontinued'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === tab
                ? 'bg-white text-[#5C24FF] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab} Medications ({medications.filter((m) => m.status === tab).length})
          </button>
        ))}
      </div>

      {/* Medications List */}
      <div className="space-y-3.5">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-3 hover:border-purple-200 transition-all text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                      {med.name} {med.dosage}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        med.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : med.status === 'Past'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {med.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Generic: {med.genericName} • Route: {med.route}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <button
                  onClick={() => setViewingMed(med)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                {med.status === 'Active' && (
                  <>
                    <button
                      onClick={() => handleRefill(med)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#5C24FF] hover:bg-purple-100 font-semibold flex items-center gap-1"
                      title="Authorize 30-day refill"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refill ({med.refillsRemaining})</span>
                    </button>
                    <button
                      onClick={() => setEditingMed(med)}
                      className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#5C24FF]"
                      title="Edit dose or schedule"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDiscontinuingMed(med)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-1"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Discontinue</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400 block font-medium">Frequency & Timing:</span>
                <span className="font-semibold text-slate-800">{med.frequency}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Indication:</span>
                <span className="font-semibold text-slate-800">{med.indications}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Start Date:</span>
                <span className="font-semibold text-slate-800">{med.startDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Prescribing Doctor:</span>
                <span className="font-semibold text-slate-800">{med.prescribingDoctor}</span>
              </div>
            </div>

            {med.discontinueReason && (
              <div className="p-2.5 bg-rose-50/70 rounded-xl border border-rose-100 text-[11px] text-rose-900">
                <strong>Discontinuation Rationale:</strong> {med.discontinueReason}
              </div>
            )}
          </div>
        ))}

        {filteredMeds.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
            No medications found in the {activeSubTab} category.
          </div>
        )}
      </div>

      {/* View Prescription Modal */}
      {viewingMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">{viewingMed.name}</h4>
                <p className="text-slate-500">Authorized Electronic Prescription (E-Rx)</p>
              </div>
              <button
                onClick={() => setViewingMed(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-900">{patient.name} ({patient.patientId})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dosage:</span>
                  <span className="font-bold text-slate-900">{viewingMed.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency:</span>
                  <span className="font-bold text-slate-900">{viewingMed.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="font-bold text-slate-900">{viewingMed.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Refills Remaining:</span>
                  <span className="font-bold text-[#5C24FF]">{viewingMed.refillsRemaining}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setViewingMed(null)}
                  className="px-4 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discontinue Confirmation Modal (Doctor Safety Requirement) */}
      {discontinuingMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h4 className="font-sora font-bold text-base text-slate-900">Confirm Discontinuation</h4>
              </div>
              <button
                onClick={() => setDiscontinuingMed(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmDiscontinue} className="p-5 space-y-3.5">
              <p className="text-slate-600">
                Are you sure you want to discontinue <strong>{discontinuingMed.name} {discontinuingMed.dosage}</strong>? This action will immediately halt active refills.
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Clinical Rationale (Required) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Patient developed adverse effect / Reached treatment endpoint..."
                  value={discontinueReason}
                  onChange={(e) => setDiscontinueReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDiscontinuingMed(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700"
                >
                  Yes, Discontinue Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">Add New Medication</h4>
                  <p className="text-slate-500">Authorize electronic prescription</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medication Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Glucophage"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Generic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Metformin HCl"
                    value={newGeneric}
                    onChange={(e) => setNewGeneric(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Strength / Dosage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 mg"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="Once daily (OD)">Once daily (OD)</option>
                    <option value="Twice daily (BD)">Twice daily (BD)</option>
                    <option value="Three times daily (TID)">Three times daily (TID)</option>
                    <option value="At bedtime (QHS)">At bedtime (QHS)</option>
                    <option value="As needed (PRN)">As needed (PRN)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Route</label>
                  <select
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="Oral">Oral (PO)</option>
                    <option value="Subcutaneous">Subcutaneous (SC)</option>
                    <option value="Inhalation">Inhalation</option>
                    <option value="Topical">Topical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Indication</label>
                <input
                  type="text"
                  placeholder="e.g. Glycemic Regulation / PCOS"
                  value={newIndication}
                  onChange={(e) => setNewIndication(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Authorize Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Medication Modal */}
      {editingMed && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-purple-100 text-xs">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#5C24FF]" />
                <h3 className="font-sora font-bold text-slate-900 text-sm">
                  Edit Dosage & Schedule
                </h3>
              </div>
              <button
                onClick={() => setEditingMed(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medication</label>
                <input
                  type="text"
                  disabled
                  value={`${editingMed.name} (${editingMed.genericName})`}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dosage / Strength</label>
                <input
                  type="text"
                  required
                  value={editingMed.dosage}
                  onChange={(e) => setEditingMed({ ...editingMed, dosage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                <select
                  value={editingMed.frequency}
                  onChange={(e) => setEditingMed({ ...editingMed, frequency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="Once daily (OD)">Once daily (OD)</option>
                  <option value="Twice daily (BD)">Twice daily (BD)</option>
                  <option value="Three times daily (TID)">Three times daily (TID)</option>
                  <option value="At bedtime (QHS)">At bedtime (QHS)</option>
                  <option value="As needed (PRN)">As needed (PRN)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Refills Remaining</label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={editingMed.refillsRemaining}
                  onChange={(e) =>
                    setEditingMed({ ...editingMed, refillsRemaining: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMed(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
