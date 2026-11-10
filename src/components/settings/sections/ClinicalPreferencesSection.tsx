import React, { useState, useRef } from 'react';
import {
  FileText,
  Stethoscope,
  Activity,
  Plus,
  X,
  Upload,
  PenTool,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { ClinicalPreferences } from '../../../types/settings';

interface ClinicalPreferencesSectionProps {
  clinical: ClinicalPreferences;
  onChange: (updated: Partial<ClinicalPreferences>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const ClinicalPreferencesSection: React.FC<ClinicalPreferencesSectionProps> = ({
  clinical,
  onChange,
  onSave,
  onToast,
}) => {
  // New Diagnosis / Procedure quick-add state
  const [newDiagCode, setNewDiagCode] = useState('');
  const [newDiagName, setNewDiagName] = useState('');
  const [isAddingDiag, setIsAddingDiag] = useState(false);

  const [newProcCode, setNewProcCode] = useState('');
  const [newProcName, setNewProcName] = useState('');
  const [isAddingProc, setIsAddingProc] = useState(false);

  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleAddDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagName.trim()) return;
    const tag = {
      code: newDiagCode.trim().toUpperCase() || 'ICD-10',
      name: newDiagName.trim(),
    };
    onChange({ frequentlyUsedDiagnoses: [...clinical.frequentlyUsedDiagnoses, tag] });
    setNewDiagCode('');
    setNewDiagName('');
    setIsAddingDiag(false);
    onToast(`Added diagnosis shortcut: ${tag.name} (${tag.code})`);
  };

  const handleRemoveDiagnosis = (code: string) => {
    onChange({
      frequentlyUsedDiagnoses: clinical.frequentlyUsedDiagnoses.filter((d) => d.code !== code),
    });
  };

  const handleAddProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProcName.trim()) return;
    const tag = {
      code: newProcCode.trim() || 'CPT-CODE',
      name: newProcName.trim(),
    };
    onChange({ frequentlyUsedProcedures: [...clinical.frequentlyUsedProcedures, tag] });
    setNewProcCode('');
    setNewProcName('');
    setIsAddingProc(false);
    onToast(`Added procedure shortcut: ${tag.name} (${tag.code})`);
  };

  const handleRemoveProcedure = (code: string) => {
    onChange({
      frequentlyUsedProcedures: clinical.frequentlyUsedProcedures.filter((p) => p.code !== code),
    });
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          signatureUrl: reader.result as string,
          signatureType: 'uploaded',
        });
        onToast('Digital signature graphic updated. Validated for e-prescriptions.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. SOAP Note & EHR Documentation Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Clinical Documentation &amp; SOAP Templates
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default clinical note structures, automated coding rules, and terminology systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Default SOAP Template */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#5C24FF]" />
              Default SOAP Note Structure
            </label>
            <select
              value={clinical.defaultSoapTemplate}
              onChange={(e) => onChange({ defaultSoapTemplate: e.target.value as ClinicalPreferences['defaultSoapTemplate'] })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            >
              <option value="Standard Comprehensive">Standard Comprehensive (Outpatient)</option>
              <option value="Focused Follow-up">Focused Follow-up &amp; Vitals Review</option>
              <option value="Cardiology Telemetry">Cardiology &amp; Arrhythmia Protocol</option>
              <option value="Pediatric">Pediatric Growth &amp; Development</option>
            </select>
          </div>

          {/* Preferred Medical Terminology */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#5C24FF]" />
              Standard Medical Terminology
            </label>
            <select
              value={clinical.preferredTerminology}
              onChange={(e) => onChange({ preferredTerminology: e.target.value as ClinicalPreferences['preferredTerminology'] })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            >
              <option value="ICD-10-CM">ICD-10-CM (Clinical Modification)</option>
              <option value="SNOMED CT">SNOMED CT (Systematized Clinical Terms)</option>
              <option value="RxNorm">RxNorm (US National Library of Medicine)</option>
            </select>
          </div>
        </div>

        {/* Documentation Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          {[
            {
              key: 'autoCapitalizeDiagnoses' as const,
              title: 'Auto-format Clinical Diagnoses',
              desc: 'Automatically standardize capitalization and clinical formatting for encounter summaries.',
              active: clinical.autoCapitalizeDiagnoses,
            },
            {
              key: 'includeIcd10Codes' as const,
              title: 'Embed ICD-10 Coding in Patient Summary',
              desc: 'Include alphanumeric diagnostic billing codes directly in the clinical impression.',
              active: clinical.includeIcd10Codes,
            },
            {
              key: 'autoLinkPrescriptions' as const,
              title: 'Auto-link Active Rx to Diagnoses',
              desc: 'Intelligently correlate active medications with corresponding ICD-10 diagnostic entries.',
              active: clinical.autoLinkPrescriptions,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-4"
            >
              <div>
                <span className="font-sora font-bold text-xs text-slate-900 block">{item.title}</span>
                <span className="text-[11px] text-slate-500">{item.desc}</span>
              </div>

              <button
                type="button"
                onClick={() => onChange({ [item.key]: !item.active })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                  item.active ? 'bg-[#5C24FF]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    item.active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. E-Prescribing & Pharmacy Safety Protocol */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            E-Prescriptions &amp; Pharmacy Safety Protocols
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default refill allocations, automated drug-drug interaction screening, and generic substitution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Default Refill Window</label>
            <select
              value={clinical.defaultRefillDurationDays}
              onChange={(e) => onChange({ defaultRefillDurationDays: parseInt(e.target.value) || 30 })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value={30}>30 Days (Standard Monthly)</option>
              <option value={60}>60 Days (Bimonthly)</option>
              <option value={90}>90 Days (Chronic Maintenance / Mail-order)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Drug Interaction Screening</span>
              <span className="text-[10px] text-slate-500">Real-time Surescripts safety alert</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ autoCheckDrugInteractions: !clinical.autoCheckDrugInteractions })}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                clinical.autoCheckDrugInteractions ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  clinical.autoCheckDrugInteractions ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Allow Generic Substitution</span>
              <span className="text-[10px] text-slate-500">Enable generic bioequivalent dispensing</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ genericSubstitutionAllowed: !clinical.genericSubstitutionAllowed })}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                clinical.genericSubstitutionAllowed ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  clinical.genericSubstitutionAllowed ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Frequently Used Diagnoses & Procedures Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Frequently Used Diagnoses */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3.5 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#5C24FF]" />
              <h4 className="font-sora font-bold text-sm text-slate-900">
                Frequently Used Diagnoses
              </h4>
            </div>

            <button
              onClick={() => setIsAddingDiag(!isAddingDiag)}
              className="text-xs font-semibold text-[#5C24FF] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Code</span>
            </button>
          </div>

          {isAddingDiag && (
            <form onSubmit={handleAddDiagnosis} className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. I10)"
                  value={newDiagCode}
                  onChange={(e) => setNewDiagCode(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
                  required
                />
                <input
                  type="text"
                  placeholder="Condition name..."
                  value={newDiagName}
                  onChange={(e) => setNewDiagName(e.target.value)}
                  className="col-span-2 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDiag(false)}
                  className="px-2.5 py-1 text-slate-500 hover:bg-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 bg-[#5C24FF] text-white font-bold rounded-lg"
                >
                  Save Tag
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {clinical.frequentlyUsedDiagnoses.map((diag) => (
              <span
                key={diag.code}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-[#5C24FF] border border-slate-200/80 text-xs transition-colors group"
              >
                <span className="font-mono font-bold text-[#5C24FF]">{diag.code}</span>
                <span className="font-medium truncate max-w-[170px]">{diag.name}</span>
                <button
                  onClick={() => handleRemoveDiagnosis(diag.code)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Frequently Used Procedures */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3.5 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h4 className="font-sora font-bold text-sm text-slate-900">
                Frequently Used Procedures (CPT)
              </h4>
            </div>

            <button
              onClick={() => setIsAddingProc(!isAddingProc)}
              className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add CPT</span>
            </button>
          </div>

          {isAddingProc && (
            <form onSubmit={handleAddProcedure} className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="CPT (e.g. 93000)"
                  value={newProcCode}
                  onChange={(e) => setNewProcCode(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
                  required
                />
                <input
                  type="text"
                  placeholder="Procedure name..."
                  value={newProcName}
                  onChange={(e) => setNewProcName(e.target.value)}
                  className="col-span-2 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProc(false)}
                  className="px-2.5 py-1 text-slate-500 hover:bg-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 bg-emerald-600 text-white font-bold rounded-lg"
                >
                  Save CPT
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {clinical.frequentlyUsedProcedures.map((proc) => (
              <span
                key={proc.code}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200/80 text-xs transition-colors group"
              >
                <span className="font-mono font-bold text-emerald-600">{proc.code}</span>
                <span className="font-medium truncate max-w-[170px]">{proc.name}</span>
                <button
                  onClick={() => handleRemoveProcedure(proc.code)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Preferred Clinical Units & Digital Signature */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Preferred Medical Units */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3.5 h-full flex flex-col justify-between">
          <div className="space-y-3.5">
            <h4 className="font-sora font-bold text-sm text-slate-900">
              Preferred Physiological &amp; Metric Units
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</label>
                <div className="p-2 bg-slate-50 rounded-xl font-bold text-slate-800 border border-slate-100 mt-1">
                  mmHg (Standard)
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Temperature</label>
                <div className="flex items-center gap-1 mt-1">
                  {(['°F', '°C'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() =>
                        onChange({
                          preferredUnits: { ...clinical.preferredUnits, temperature: unit },
                        })
                      }
                      className={`flex-1 py-1.5 rounded-xl font-bold border text-xs transition-all ${
                        clinical.preferredUnits.temperature === unit
                          ? 'bg-[#5C24FF] text-white border-[#5C24FF]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Body Weight</label>
                <div className="flex items-center gap-1 mt-1">
                  {(['kg', 'lbs'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() =>
                        onChange({
                          preferredUnits: { ...clinical.preferredUnits, weight: unit },
                        })
                      }
                      className={`flex-1 py-1.5 rounded-xl font-bold border text-xs transition-all ${
                        clinical.preferredUnits.weight === unit
                          ? 'bg-[#5C24FF] text-white border-[#5C24FF]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Blood Glucose</label>
                <div className="flex items-center gap-1 mt-1">
                  {(['mg/dL', 'mmol/L'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() =>
                        onChange({
                          preferredUnits: { ...clinical.preferredUnits, glucose: unit },
                        })
                      }
                      className={`flex-1 py-1.5 rounded-xl font-bold border text-xs transition-all ${
                        clinical.preferredUnits.glucose === unit
                          ? 'bg-[#5C24FF] text-white border-[#5C24FF]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3.5 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#5C24FF]" />
                <h4 className="font-sora font-bold text-sm text-slate-900">Digital Physician Signature</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> DEA &amp; EPCS Verified
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Cryptographically timestamped seal applied to finalized SOAP notes, orders, and electronic prescriptions
            </p>

            {/* Signature Preview Canvas */}
            <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center min-h-[85px] relative">
              <div className="font-serif italic text-2xl text-slate-800 tracking-wider select-none">
                Dr. David Brock, MD
              </div>
              <span className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-mono">
                SECURE TOKEN #MED-849204
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => signatureInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-purple-50 text-[#5C24FF] border border-purple-200 rounded-xl text-xs font-semibold transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Signature Image</span>
            </button>
            <input
              ref={signatureInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSignatureUpload}
            />
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Clinical Preferences
        </button>
      </div>
    </div>
  );
};
