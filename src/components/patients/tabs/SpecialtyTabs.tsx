import React from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  Users,
  Edit2,
  Dna,
  FileSignature,
  Flower2,
} from 'lucide-react';
import { PatientRecord } from '../../../mockData/patientsData';

export const HospitalisationsTab: React.FC<{ patient: PatientRecord }> = () => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Inpatient Admissions & Hospitalisation Records
          </h4>
        </div>
        <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
          Ambulatory Outpatient
        </span>
      </div>

      <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <h5 className="font-sora font-bold text-sm text-slate-900">
              No Active Inpatient Hospitalisations
            </h5>
            <p className="text-xs text-slate-500">
              Patient has zero acute emergency room admissions or ICU transfers within the past 24 months.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600">
          <span className="font-bold text-slate-800">Historical Ambulatory Record:</span> Jun 14, 2024 – Day-Care Laparoscopic Pelvic Diagnostic Procedure at Apollo Specialty Hospitals. Discharged same evening in stable condition.
        </div>
      </div>
    </div>
  </div>
);

export const DocumentsTab: React.FC<{ patient: PatientRecord; onToast: (m: string) => void }> = ({
  onToast,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Clinical Documents & EHR Uploads
          </h4>
        </div>
        <button
          onClick={() => onToast('Document upload picker opened.')}
          className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
        >
          + Upload Document
        </button>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#5C24FF]" />
            <div>
              <span className="font-bold text-slate-900 block">General Telehealth Informed Consent 2026.pdf</span>
              <span className="text-slate-400">Signed digitally on Oct 10, 2026 • 248 KB</span>
            </div>
          </div>
          <button
            onClick={() => onToast('Downloading Consent PDF...')}
            className="text-[#5C24FF] hover:underline font-semibold"
          >
            Download
          </button>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#5C24FF]" />
            <div>
              <span className="font-bold text-slate-900 block">Insurance Eligibility & Pre-Authorization Approval.pdf</span>
              <span className="text-slate-400">Aetna Health • Verified Active • 1.2 MB</span>
            </div>
          </div>
          <button
            onClick={() => onToast('Downloading Insurance PDF...')}
            className="text-[#5C24FF] hover:underline font-semibold"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const FamilySocialTab: React.FC<{ patient: PatientRecord; onToast: (m: string) => void }> = ({
  onToast,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Users className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Family Medical History & Social Determinants (SDOH)
          </h4>
        </div>
        <button
          onClick={() => onToast('Edit family history modal opened.')}
          className="flex items-center gap-1 text-xs text-[#5C24FF] font-semibold hover:underline"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 text-xs">
          <span className="font-sora font-bold text-slate-900 block">Pedigree & Family History</span>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span>Mother (Age 62)</span>
              <span className="font-semibold text-slate-800">Type 2 Diabetes, Diagnosed age 52</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span>Father (Age 66)</span>
              <span className="font-semibold text-slate-800">Essential Hypertension</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Maternal Grandfather</span>
              <span className="font-semibold text-slate-800">CAD (Coronary Artery Disease)</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 text-xs">
          <span className="font-sora font-bold text-slate-900 block">Social History & Lifestyle</span>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span>Tobacco / Smoking</span>
              <span className="font-semibold text-emerald-600">Never Smoker</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span>Alcohol Intake</span>
              <span className="font-semibold text-slate-800">Occasional / Social</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span>Physical Activity</span>
              <span className="font-semibold text-slate-800">Brisk walk 4 days/wk</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Occupation</span>
              <span className="font-semibold text-slate-800">Software Engineer (Desk)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const GeneticsRiskTab: React.FC<{ patient: PatientRecord }> = () => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Dna className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Genomic Markers & Cardiovascular Risk Index
          </h4>
        </div>
        <span className="text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full font-semibold">
          PGx Panel Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Framingham 10-Yr Risk</span>
          <span className="font-sora font-bold text-xl text-emerald-600 mt-1 block">2.1% (Low)</span>
          <p className="text-[11px] text-slate-500 mt-1">Age & BP adjusted</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">CYP2D6 Metabolizer</span>
          <span className="font-sora font-bold text-xl text-slate-900 mt-1 block">Normal (*1/*1)</span>
          <p className="text-[11px] text-slate-500 mt-1">Standard drug clearance</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Type 2 Diabetes Risk</span>
          <span className="font-sora font-bold text-xl text-amber-600 mt-1 block">Moderate</span>
          <p className="text-[11px] text-slate-500 mt-1">Maternal familial factor</p>
        </div>
      </div>
    </div>
  </div>
);

export const SoapNoteTab: React.FC<{
  patient: PatientRecord;
  onOpenAIScribe?: (name: string) => void;
  onOpenAskAva: () => void;
}> = ({ patient, onOpenAIScribe, onOpenAskAva }) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <FileSignature className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Clinical Encounter SOAP Scribe
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (onOpenAIScribe) onOpenAIScribe(patient.name);
              else onOpenAskAva();
            }}
            className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
          >
            AI Ambient Scribe
          </button>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-[#5C24FF] block mb-1">S – Subjective:</span>
          <p className="text-slate-700 leading-relaxed">
            29yo female presents for routine follow-up. Reports consistent energy levels and adherence to morning Metformin. Denies headaches, orthostatic dizziness, visual disturbances, or chest discomfort.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-[#5C24FF] block mb-1">O – Objective:</span>
          <p className="text-slate-700 leading-relaxed">
            Alert, conversational, pleasant. Vitals: BP 118/76 mmHg, HR 72 bpm regular rhythm, SpO2 98% room air. Lungs clear to auscultation bilaterally. Abdomen soft, non-tender without organomegaly. No lower extremity peripheral edema.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-[#5C24FF] block mb-1">A – Assessment:</span>
          <p className="text-slate-700 leading-relaxed">
            1. Essential Hypertension (ICD-10: I10) – well controlled on existing regimen.<br />
            2. Polycystic Ovarian Syndrome (ICD-10: E28.2) – stable glycemic and metabolic profile.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-[#5C24FF] block mb-1">P – Plan:</span>
          <p className="text-slate-700 leading-relaxed">
            Continue Metformin 500mg BD. Recheck lipid panel in 4 weeks. Maintain current aerobic exercise routine. Next scheduled video consultation in 3 days.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const PeriodsTab: React.FC<{ patient: PatientRecord }> = ({ patient }) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Flower2 className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Menstrual & Gynecological Cycle Health Tracker
          </h4>
        </div>
        <span className="text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full font-semibold">
          {patient.gender === 'Female' ? 'Active Cycle Monitoring' : 'Not Applicable'}
        </span>
      </div>

      {patient.gender === 'Female' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
            <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-[#5C24FF] block">Current Phase</span>
              <span className="font-sora font-bold text-base text-slate-900 mt-1 block">Day 14 (Ovulation)</span>
              <span className="text-[10px] text-purple-600 block mt-0.5">Peak LH Window</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg Cycle Length</span>
              <span className="font-sora font-bold text-base text-slate-900 mt-1 block">31 Days</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Regular Rhythm</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Last Period</span>
              <span className="font-sora font-bold text-base text-slate-900 mt-1 block">Oct 27 - Oct 31</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">5 Days Duration</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Next Predicted</span>
              <span className="font-sora font-bold text-base text-slate-900 mt-1 block">Nov 27, 2026</span>
              <span className="text-[10px] text-purple-600 block mt-0.5">In 18 Days</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
            <span className="font-sora font-bold text-slate-900 block">Clinical Gynecological Notes:</span>
            <p>
              Patient with documented PCOS history exhibits regulated 30–32 day cycles post Metformin initiation. Ovulation confirmed via basal body temperature curves and urinary LH testing. Symptoms logged: Mild Day 1 pelvic cramping, self-resolved without NSAID escalation.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <Flower2 className="w-8 h-8 text-slate-300 mx-auto" />
          <h5 className="font-sora font-bold text-slate-800">Menstrual Cycle Tracking Not Applicable</h5>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            This diagnostic module is configured for female reproductive health profiles. For {patient.name}, hormonal and metabolic parameters are monitored under Labs and Vitals.
          </p>
        </div>
      )}
    </div>
  </div>
);
