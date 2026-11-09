import React from 'react';
import {
  BrainCircuit,
  Sparkles,
  Activity,
  HeartPulse,
  Heart,
  Droplets,
  Scale,
  Thermometer,
  Scan,
  Pill,
  ShieldCheck,
  Stethoscope,
  Video,
  CheckCircle2,
  ClipboardCheck,
} from 'lucide-react';
import { PatientRecord } from '../../../mockData/patientsData';

export const AISummaryTab: React.FC<{ patient: PatientRecord; onAskAva: () => void }> = ({
  patient,
  onAskAva,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-gradient-to-br from-[#FAF5FF] via-white to-purple-50/40 rounded-3xl border border-purple-100 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sora font-bold text-base text-slate-900 flex items-center gap-2">
              Mednevo Clinical Intelligence Summary
              <span className="text-[10px] font-bold bg-purple-100 text-[#5C24FF] px-2 py-0.5 rounded-full">
                Ava AI 3.5
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Synthesized EHR insights, longitudinal trends & care recommendations
            </p>
          </div>
        </div>
        <button
          onClick={onAskAva}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl hover:opacity-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Ava Scribe</span>
        </button>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          <strong>Clinical Overview:</strong> {patient.name} ({patient.age}yo {patient.gender}) maintains controlled hypertension and mild PCOS on oral therapy with high medication adherence (94%). Recent fasting CMP and HbA1c (5.4%) reflect optimal glycemic stability. Borderline LDL (112 mg/dL) is being addressed via dietary fiber enhancement and 150 minutes weekly aerobic physical activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-emerald-700 block">Compliance</span>
          <span className="font-sora font-bold text-lg text-emerald-800">94% Adherent</span>
          <p className="text-[11px] text-emerald-600 mt-0.5">Refills ordered on time</p>
        </div>
        <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-[#5C24FF] block">Vitals Status</span>
          <span className="font-sora font-bold text-lg text-slate-900">118/76 mmHg</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Within guideline target</p>
        </div>
        <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-amber-700 block">Proactive Alert</span>
          <span className="font-sora font-bold text-lg text-amber-800">Lipid Check</span>
          <p className="text-[11px] text-amber-700 mt-0.5">Due in 4 weeks</p>
        </div>
      </div>
    </div>
  </div>
);

export const VitalsTab: React.FC<{ patient: PatientRecord; onToast: (m: string) => void }> = ({
  patient,
  onToast,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Live Telemetry & Vitals History
          </h4>
        </div>
        <button
          onClick={() => onToast('New Vitals logging form opened.')}
          className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
        >
          + Record Vitals
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-rose-500 mb-1">
            <HeartPulse className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Blood Pressure</span>
          </div>
          <span className="font-sora font-bold text-xl text-slate-900">{patient.vitals.bp}</span>
          <span className="text-[10px] text-emerald-600 block mt-1">● Optimal Target</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-rose-500 mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Heart Rate</span>
          </div>
          <span className="font-sora font-bold text-xl text-slate-900">{patient.vitals.heartRate} bpm</span>
          <span className="text-[10px] text-emerald-600 block mt-1">● Resting Regular</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">SpO₂ Oxygen</span>
          </div>
          <span className="font-sora font-bold text-xl text-slate-900">{patient.vitals.spo2}%</span>
          <span className="text-[10px] text-emerald-600 block mt-1">● Room Air</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Scale className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Weight</span>
          </div>
          <span className="font-sora font-bold text-xl text-slate-900">{patient.vitals.weight}</span>
          <span className="text-[10px] text-emerald-600 block mt-1">↓ {patient.vitals.weightTrend} in 60d</span>
        </div>
      </div>

      <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Thermometer className="w-4 h-4 text-[#5C24FF]" />
          <span>Body Temp: <strong>98.6°F</strong> • Respiratory Rate: <strong>16 bpm</strong> • BMI: <strong>{patient.bmi}</strong></span>
        </div>
        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">All Vitals Normal</span>
      </div>
    </div>
  </div>
);

export const ImagingTab: React.FC<{ patient: PatientRecord; onToast: (m: string) => void }> = ({
  onToast,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Scan className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Radiology & Diagnostic Imaging
          </h4>
        </div>
        <span className="text-xs text-slate-400">3 Imaging Studies on File</span>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-sora font-bold text-sm text-slate-900">Pelvic Ultrasound (Transvaginal & Transabdominal)</span>
              <span className="text-[10px] bg-purple-100 text-[#5C24FF] px-2 py-0.5 rounded-full font-semibold">Ultrasound</span>
            </div>
            <p className="text-xs text-slate-500">
              Impression: Bilateral mild peripheral follicular distribution consistent with PCOS history. Normal endometrial thickness (7mm). No acute adnexal torsion.
            </p>
            <span className="text-[11px] text-slate-400 block">Report Date: Oct 18, 2026 • Radiologist: Dr. R. Sundar, MD (Radiology)</span>
          </div>
          <button
            onClick={() => onToast('Viewing DICOM slices for Pelvic Ultrasound...')}
            className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl whitespace-nowrap self-start sm:self-auto"
          >
            View DICOM
          </button>
        </div>

        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-sora font-bold text-sm text-slate-900">Chest X-Ray PA View</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">X-Ray</span>
            </div>
            <p className="text-xs text-slate-500">
              Impression: Clear lung parenchyma bilaterally. Normal cardiothoracic ratio (&lt;0.5). Costophrenic angles sharp. No acute pulmonary infiltrate.
            </p>
            <span className="text-[11px] text-slate-400 block">Report Date: Nov 10, 2026 • Radiologist: Dr. S. Kulkarni, MD</span>
          </div>
          <button
            onClick={() => onToast('Opening Chest X-Ray viewer...')}
            className="px-3.5 py-1.5 border border-slate-200 text-slate-700 hover:text-[#5C24FF] text-xs font-semibold rounded-xl whitespace-nowrap self-start sm:self-auto"
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const MedicationsTab: React.FC<{
  patient: PatientRecord;
  onNewPrescription: (name: string) => void;
}> = ({ patient, onNewPrescription }) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Pill className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Active & Past Medications
          </h4>
        </div>
        <button
          onClick={() => onNewPrescription(patient.name)}
          className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
        >
          + Prescribe Medication
        </button>
      </div>

      <div className="space-y-3">
        {patient.medications.map((m) => (
          <div
            key={m.name}
            className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sora font-bold text-sm text-slate-900 block">{m.name}</span>
                <span className="text-slate-500">Dosage: {m.dosage} • Oral Route • With meals</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Refills Remaining: 3 • Pharmacy: Mednevo E-Rx</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex-shrink-0">
              Active
            </span>
          </div>
        ))}

        <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Drug-Drug Interaction Screen: <strong>0 adverse contraindications detected</strong> across active prescriptions.</span>
        </div>
      </div>
    </div>
  </div>
);

export const VisitsTab: React.FC<{
  patient: PatientRecord;
  onVirtualVisit: (name: string) => void;
  onPatientChart: (name: string) => void;
  onNewAppointment: () => void;
}> = ({ patient, onVirtualVisit, onPatientChart, onNewAppointment }) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Stethoscope className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Clinical Encounters & Visit History
          </h4>
        </div>
        <button
          onClick={onNewAppointment}
          className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
        >
          + Schedule Visit
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sora font-bold text-sm text-slate-900 block">Upcoming Telehealth Consultation</span>
              <span className="text-slate-600">Nov 13, 2026 at 10:00 AM • Routine Hypertension & PCOS Follow-up</span>
            </div>
          </div>
          <button
            onClick={() => onVirtualVisit(patient.name)}
            className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl self-start sm:self-auto"
          >
            Join Telehealth Call
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="font-sora font-bold text-sm text-slate-900 block">General Consultation (In-Person)</span>
              <span className="text-slate-500">{patient.recentVisit.date} • {patient.recentVisit.reason}</span>
            </div>
          </div>
          <button
            onClick={() => onPatientChart(patient.name)}
            className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-[#5C24FF] text-xs font-semibold rounded-xl self-start sm:self-auto"
          >
            View Chart Note
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const CarePlansTab: React.FC<{ patient: PatientRecord; onToast: (m: string) => void }> = ({
  onToast,
}) => (
  <div className="space-y-4 animate-in fade-in duration-150">
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <ClipboardCheck className="w-5 h-5 text-[#5C24FF]" />
          <h4 className="font-sora font-bold text-base text-slate-900">
            Personalized Care Roadmaps
          </h4>
        </div>
        <button
          onClick={() => onToast('New Care Plan wizard started.')}
          className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
        >
          + Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sora font-bold text-sm text-slate-900">Hypertension Management 2026</span>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">85% Complete</span>
          </div>
          <p className="text-xs text-slate-500">
            Goal: Maintain resting SBP &lt; 120 mmHg and DBP &lt; 80 mmHg with dietary sodium limitation (&lt;2g/day) and daily log tracking.
          </p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] h-full rounded-full w-[85%]"></div>
          </div>
        </div>

        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sora font-bold text-sm text-slate-900">Metabolic PCOS Nutrition Roadmap</span>
            <span className="text-[10px] font-semibold bg-purple-50 text-[#5C24FF] px-2 py-0.5 rounded-full">70% Complete</span>
          </div>
          <p className="text-xs text-slate-500">
            Goal: Low glycemic index meals, resistance training twice weekly, and adherence to Metformin morning regimen.
          </p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] h-full rounded-full w-[70%]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
