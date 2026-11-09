import React, { useState } from 'react';
import {
  FileSignature,
  Sparkles,
  Save,
  CheckCircle2,
  Edit2,
  History,
  Lock,
  Plus,
} from 'lucide-react';
import { SoapNoteRecord } from '../../../types/clinical';
import { MOCK_SOAP_NOTES } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab12SoapNoteProps {
  patient: PatientRecord;
  onOpenAskAva: () => void;
  onToast: (msg: string) => void;
}

export const Tab12SoapNote: React.FC<Tab12SoapNoteProps> = ({
  patient,
  onOpenAskAva,
  onToast,
}) => {
  const [soapNotes, setSoapNotes] = useState<SoapNoteRecord[]>(MOCK_SOAP_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(soapNotes[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);

  // Active note in viewer/editor
  const activeNote = soapNotes.find((n) => n.id === selectedNoteId) || soapNotes[0];

  // Editable fields state
  const [chiefComplaint, setChiefComplaint] = useState(activeNote.subjective.chiefComplaint);
  const [hpi, setHpi] = useState(activeNote.subjective.historyOfPresentIllness);
  const [vitalsObjective, setVitalsObjective] = useState(activeNote.objective.vitalSigns);
  const [examObjective, setExamObjective] = useState(activeNote.objective.physicalExamination);
  const [primaryDiag, setPrimaryDiag] = useState(activeNote.assessment.primaryDiagnosis);
  const [assessmentText, setAssessmentText] = useState(activeNote.assessment.clinicalAssessment);
  const [treatmentPlan, setTreatmentPlan] = useState(activeNote.plan.treatmentPlan);
  const [followUpInst, setFollowUpInst] = useState(activeNote.plan.followUpInstructions);

  const handleCreateNewNote = () => {
    const newNote: SoapNoteRecord = {
      id: `soap-${Date.now()}`,
      date: 'Today',
      time: 'Current Encounter',
      authorDoctor: 'Dr. Elena Vance, MD',
      status: 'Draft',
      version: 1,
      subjective: {
        chiefComplaint: 'Follow-up consultation and vitals review',
        historyOfPresentIllness: `${patient.name} (${patient.age}yo ${patient.gender}) presents for ongoing clinical evaluation.`,
        symptoms: ['No acute distress'],
        medicalHistory: patient.medicalConditions.join(', '),
        patientStatements: '"Feeling good, continuing active treatment schedule."',
      },
      objective: {
        vitalSigns: `BP ${patient.vitals.bp}, HR ${patient.vitals.heartRate} bpm, SpO2 ${patient.vitals.spo2}%, Weight ${patient.vitals.weight}.`,
        physicalExamination: 'Cardiovascular regular, lungs clear bilaterally, non-toxic appearance.',
        laboratoryFindings: 'CMP & Lipid Profile on file in diagnostic archive.',
        diagnosticFindings: 'Prior imaging verified without acute cardiopulmonary anomalies.',
      },
      assessment: {
        clinicalAssessment: 'Chronic condition maintenance under stable therapeutic control.',
        primaryDiagnosis: patient.medicalConditions[0] || 'Health Evaluation',
        secondaryDiagnosis: patient.medicalConditions[1] || 'None',
        clinicalObservations: 'High medication adherence confirmed.',
      },
      plan: {
        treatmentPlan: 'Maintain current medication regimen. Re-evaluate at next scheduled appointment.',
        medications: patient.medications.map((m) => `${m.name} ${m.dosage}`),
        testsOrdered: ['Routine 90-day metabolic follow-up'],
        referrals: 'None needed at present.',
        followUpInstructions: 'Scheduled video or in-person visit in 3 months.',
      },
    };

    setSoapNotes([newNote, ...soapNotes]);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
    onToast('New SOAP note draft initiated.');
  };

  const handleGenerateAIDraft = () => {
    setChiefComplaint('Follow-up review for dry cough post exercise and metabolic checkup.');
    setHpi(
      'Patient reports cough has completely resolved with warm humidification. Adherence to Metformin 500mg BID and Amlodipine 2.5mg QD is 100% over the last week. No adverse dizziness or pedal edema.'
    );
    setAssessmentText('1. Resolved acute post-viral airway hyperresponsiveness. 2. Stable essential hypertension. 3. Well-managed PCOS.');
    setTreatmentPlan('Continue current anti-hypertensive and insulin sensitizer therapy. Repeat fasting lipid panel in 4 weeks.');
    onToast('Ava AI Ambient Scribe generated structured SOAP draft. Review and approve before signing.');
  };

  const handleSaveDraft = () => {
    setSoapNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              subjective: {
                ...n.subjective,
                chiefComplaint,
                historyOfPresentIllness: hpi,
              },
              objective: {
                ...n.objective,
                vitalSigns: vitalsObjective,
                physicalExamination: examObjective,
              },
              assessment: {
                ...n.assessment,
                primaryDiagnosis: primaryDiag,
                clinicalAssessment: assessmentText,
              },
              plan: {
                ...n.plan,
                treatmentPlan,
                followUpInstructions: followUpInst,
              },
            }
          : n
      )
    );
    setIsEditing(false);
    onToast('SOAP note draft saved successfully.');
  };

  const handleSignAndFinalize = () => {
    setSoapNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              status: 'Finalized & Signed',
              signature: 'Dr. Elena Vance, MD (Digital Signature #MED-849204)',
            }
          : n
      )
    );
    setIsEditing(false);
    onToast('SOAP Note signed and permanently sealed in EHR.');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Clinical SOAP Documentation & Scribe
              </h3>
              <p className="text-xs text-slate-500">
                Subjective, Objective, Assessment, Plan structured EHR notes with AI Ambient Scribe
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenAskAva}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-200 text-[#5C24FF] hover:bg-purple-50 text-xs font-semibold"
            title="Open Ava AI Scribe"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Ava</span>
          </button>

          <button
            onClick={handleGenerateAIDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-[#5C24FF] hover:bg-purple-100 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Draft</span>
          </button>

          <button
            onClick={handleCreateNewNote}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>New SOAP Note</span>
          </button>
        </div>
      </div>

      {/* Note Selector & Status Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#5C24FF]" />
          <span className="font-bold text-slate-700">Encounter Note Version:</span>
          <select
            value={selectedNoteId}
            onChange={(e) => {
              setSelectedNoteId(e.target.value);
              setIsEditing(false);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800"
          >
            {soapNotes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.date} – {n.authorDoctor} ({n.status})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full font-bold text-[11px] ${
              activeNote.status === 'Finalized & Signed'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-amber-50 text-amber-700 border border-amber-100'
            }`}
          >
            ● {activeNote.status}
          </span>

          {activeNote.status === 'Draft' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
              <button
                onClick={handleSignAndFinalize}
                className="flex items-center gap-1 px-3.5 py-1.5 bg-[#5C24FF] text-white rounded-xl font-semibold shadow-sm hover:opacity-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign & Finalize</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'View Mode' : 'Amend Note'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Structured SOAP Sections */}
      <div className="grid grid-cols-1 gap-4 text-xs">
        {/* S – SUBJECTIVE */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#5C24FF] font-bold flex items-center justify-center text-xs">
                S
              </span>
              <h4 className="font-sora font-bold text-sm text-slate-900">
                SUBJECTIVE – Patient History & Chief Complaint
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">Symptoms & Patient Testimony</span>
          </div>

          <div className="space-y-3 text-slate-800">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Chief Complaint:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed">{chiefComplaint}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">History of Present Illness (HPI):</label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={hpi}
                  onChange={(e) => setHpi(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed whitespace-pre-line">{hpi}</p>
              )}
            </div>

            <div className="text-[11px] text-slate-500 italic">
              Patient Direct Statement: {activeNote.subjective.patientStatements}
            </div>
          </div>
        </div>

        {/* O – OBJECTIVE */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                O
              </span>
              <h4 className="font-sora font-bold text-sm text-slate-900">
                OBJECTIVE – Vitals, Physical Exam & Diagnostics
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">Clinical Measurements</span>
          </div>

          <div className="space-y-3 text-slate-800">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Vital Signs Recorded:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={vitalsObjective}
                  onChange={(e) => setVitalsObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed">{vitalsObjective}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Physical Examination by Systems:</label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={examObjective}
                  onChange={(e) => setExamObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed whitespace-pre-line">{examObjective}</p>
              )}
            </div>
          </div>
        </div>

        {/* A – ASSESSMENT */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
                A
              </span>
              <h4 className="font-sora font-bold text-sm text-slate-900">
                ASSESSMENT – Clinical Diagnoses & Differential Impression
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">Medical Decision</span>
          </div>

          <div className="space-y-3 text-slate-800">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Diagnoses (ICD-10):</label>
              {isEditing ? (
                <input
                  type="text"
                  value={primaryDiag}
                  onChange={(e) => setPrimaryDiag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed font-bold">{primaryDiag}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Clinical Assessment Synthesis:</label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={assessmentText}
                  onChange={(e) => setAssessmentText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed">{assessmentText}</p>
              )}
            </div>
          </div>
        </div>

        {/* P – PLAN */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                P
              </span>
              <h4 className="font-sora font-bold text-sm text-slate-900">
                PLAN – Therapeutic Orders, Rx, Tests & Follow-up
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">Clinical Directives</span>
          </div>

          <div className="space-y-3 text-slate-800">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Treatment Plan & Pharmacotherapy:</label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={treatmentPlan}
                  onChange={(e) => setTreatmentPlan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-2xl leading-relaxed">{treatmentPlan}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">Follow-Up & Safety Netting:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={followUpInst}
                  onChange={(e) => setFollowUpInst(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              ) : (
                <p className="p-3 bg-purple-50/50 border border-purple-100 rounded-2xl leading-relaxed">
                  {followUpInst}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signature Verification Footer */}
      {activeNote.signature && (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Digitally Signed & Certified:</strong> {activeNote.signature} • Timestamp: {activeNote.date} {activeNote.time}
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
            SHA256: e8b4...91f2
          </span>
        </div>
      )}
    </div>
  );
};
