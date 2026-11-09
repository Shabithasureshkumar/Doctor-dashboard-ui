import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Video,
  Plus,
  Eye,
  X,
} from 'lucide-react';
import { ClinicalVisit } from '../../../types/clinical';
import { MOCK_CLINICAL_VISITS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab06VisitsProps {
  patient: PatientRecord;
  onOpenVirtualVisit: (name: string) => void;
  onOpenNewAppointment: () => void;
  onToast: (msg: string) => void;
}

export const Tab06Visits: React.FC<Tab06VisitsProps> = ({
  patient,
  onOpenVirtualVisit,
  onOpenNewAppointment,
  onToast,
}) => {
  const [visits] = useState<ClinicalVisit[]>(MOCK_CLINICAL_VISITS);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Completed' | 'Upcoming' | 'Cancelled' | 'Missed'>('All');
  const [selectedVisit, setSelectedVisit] = useState<ClinicalVisit | null>(null);

  const filters = ['All', 'Completed', 'Upcoming', 'Cancelled', 'Missed'] as const;

  const filteredVisits = useMemo(() => {
    if (activeFilter === 'All') return visits;
    return visits.filter((v) => v.status === activeFilter);
  }, [visits, activeFilter]);

  const handleStartConsult = (v: ClinicalVisit) => {
    if (v.mode === 'Video Call') {
      onOpenVirtualVisit(patient.name);
    } else {
      setSelectedVisit(v);
      onToast(`In-person clinical encounter active for ${patient.name}`);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Consultation & Clinical Visit History
              </h3>
              <p className="text-xs text-slate-500">
                Chronological outpatient encounters, notes, clinical orders & follow-ups
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenNewAppointment}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Visit</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit text-xs font-semibold">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFilter === f
                ? 'bg-white text-[#5C24FF] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {f === 'All' ? 'All Visits' : f} ({f === 'All' ? visits.length : visits.filter((v) => v.status === f).length})
          </button>
        ))}
      </div>

      {/* Visits Chronological Timeline List */}
      <div className="space-y-4">
        {filteredVisits.map((v) => {
          const isUpcoming = v.status === 'Upcoming';
          return (
            <div
              key={v.id}
              className={`rounded-3xl border p-5 sm:p-6 space-y-4 transition-all ${
                isUpcoming
                  ? 'bg-purple-50/40 border-purple-200 shadow-sm'
                  : 'bg-white border-slate-100 shadow-sm hover:border-purple-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      v.mode === 'Video Call' ? 'bg-purple-100 text-[#5C24FF]' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {v.mode === 'Video Call' ? <Video className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-sora font-bold text-base text-slate-900">
                        {v.specialty}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          v.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : v.status === 'Upcoming'
                            ? 'bg-purple-100 text-[#5C24FF]'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {v.status}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">({v.mode})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {v.date} at {v.time} • Attending: {v.doctorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {isUpcoming && (
                    <button
                      onClick={() => handleStartConsult(v)}
                      className="px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white rounded-xl text-xs font-semibold shadow-sm hover:opacity-95"
                    >
                      Join Consultation
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedVisit(v)}
                    className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Encounter Record</span>
                  </button>
                </div>
              </div>

              {/* Chief complaint & Clinical notes summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Chief Complaint</span>
                  <p className="text-slate-800 leading-relaxed font-medium">{v.chiefComplaint}</p>
                </div>

                <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Diagnosis</span>
                  <p className="text-slate-800 leading-relaxed whitespace-pre-line font-medium">{v.diagnosis}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Follow-up: <strong>{v.followUpDate}</strong></span>
                <span>Clinical Orders: <strong>{v.testsOrdered.length} Lab/Imaging</strong></span>
              </div>
            </div>
          );
        })}

        {filteredVisits.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
            No visits recorded for the selected filter.
          </div>
        )}
      </div>

      {/* Full Consultation Details Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">
                  Encounter Note: {selectedVisit.date}
                </h4>
                <p className="text-slate-500">{selectedVisit.doctorName} • {selectedVisit.specialty}</p>
              </div>
              <button
                onClick={() => setSelectedVisit(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Subjective / Chief Complaint</span>
                <p className="text-slate-800 leading-relaxed">{selectedVisit.chiefComplaint}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessment & Clinical Impression</span>
                <p className="text-slate-800 leading-relaxed whitespace-pre-line">{selectedVisit.diagnosis}</p>
              </div>

              <div className="p-3.5 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#5C24FF] block">Doctor Clinical Notes</span>
                <p className="text-slate-800 leading-relaxed">{selectedVisit.clinicalNotes}</p>
              </div>

              {selectedVisit.prescriptions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-700">Prescriptions Issued:</span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedVisit.prescriptions.map((rx) => (
                      <span key={rx} className="px-2.5 py-1 bg-purple-50 text-[#5C24FF] rounded-lg font-medium">
                        {rx}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="px-5 py-2 bg-[#5C24FF] text-white font-semibold rounded-xl"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
