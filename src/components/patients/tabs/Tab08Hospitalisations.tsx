import React, { useState, useMemo } from 'react';
import {
  Building2,
  CheckCircle2,
  Download,
  Eye,
  X,
} from 'lucide-react';
import { HospitalisationRecord } from '../../../types/clinical';
import { MOCK_HOSPITALISATIONS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab08HospitalisationsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab08Hospitalisations: React.FC<Tab08HospitalisationsProps> = ({
  patient,
  onToast,
}) => {
  const [records] = useState<HospitalisationRecord[]>(MOCK_HOSPITALISATIONS);
  const [selectedRecord, setSelectedRecord] = useState<HospitalisationRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Currently Admitted' | 'Discharged' | 'Transferred'>('All');

  const filteredRecords = useMemo(() => {
    if (filterStatus === 'All') return records;
    return records.filter((r) => r.status === filterStatus);
  }, [records, filterStatus]);

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Inpatient & Hospitalisation History
              </h3>
              <p className="text-xs text-slate-500">
                Hospital admissions, ward surgical interventions, discharge summaries & readmission risk
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Currently in Outpatient Ambulatory Care</span>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit text-xs font-semibold">
        {(['All', 'Currently Admitted', 'Discharged', 'Transferred'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterStatus === st
                ? 'bg-white text-[#5C24FF] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {st} ({st === 'All' ? records.length : records.filter((r) => r.status === st).length})
          </button>
        ))}
      </div>

      {/* Admissions Timeline Cards */}
      <div className="space-y-4">
        {filteredRecords.map((hosp) => (
          <div
            key={hosp.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 hover:border-purple-200 transition-all text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-sora font-bold text-base text-slate-900">
                      {hosp.hospitalName}
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {hosp.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Admission: {hosp.admissionDate} • Discharge: {hosp.dischargeDate} • Ward: {hosp.wardDepartment}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(hosp)}
                className="px-4 py-2 bg-[#5C24FF] text-white hover:opacity-95 font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Discharge Summary</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Rationale</span>
                <p className="text-slate-800 leading-relaxed font-medium">{hosp.reasonForAdmission}</p>
              </div>

              <div className="p-3.5 bg-purple-50/40 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#5C24FF] block">Discharge Diagnosis</span>
                <p className="text-slate-800 leading-relaxed font-medium">{hosp.dischargeDiagnosis}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50/60 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Procedures Performed</span>
              <div className="flex items-center gap-2 flex-wrap">
                {hosp.proceduresPerformed.map((p, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Attending Physician: <strong>{hosp.attendingPhysician}</strong></span>
              <span>Discharge Medications: <strong>{hosp.dischargeMedications.length} items prescribed</strong></span>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
            No inpatient records found for the selected status.
          </div>
        )}
      </div>

      {/* Discharge Summary Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Hospital Discharge Summary</h4>
                <p className="text-slate-500">{selectedRecord.hospitalName} • {selectedRecord.dischargeDate}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient</span>
                  <span className="font-bold text-slate-900">{patient.name} ({patient.patientId})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Attending MD</span>
                  <span className="font-bold text-slate-900">{selectedRecord.attendingPhysician}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Admission / Discharge</span>
                  <span className="text-slate-800">{selectedRecord.admissionDate} — {selectedRecord.dischargeDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Status at Discharge</span>
                  <span className="font-bold text-emerald-700">Clinically Stable / Ambulatory</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Discharge Instructions:</span>
                <p className="p-3 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed">
                  {selectedRecord.dischargeInstructions}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 block">Discharge Medications:</span>
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1 text-slate-700">
                  {selectedRecord.dischargeMedications.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-[#5C24FF]">•</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-1">
                <span className="font-bold text-[#5C24FF] block">Follow-Up Directives:</span>
                <p className="text-slate-800">{selectedRecord.followUpRecommendations}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onToast('Downloading printable Hospital Discharge Summary PDF...')}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Summary</span>
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-5 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold hover:opacity-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
