import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Heart,
  Pill,
  Activity,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Check,
  ShieldCheck,
  X,
} from 'lucide-react';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab01AISummaryProps {
  patient: PatientRecord;
  onOpenAskAva: () => void;
  onNavigateTab: (tabId: string) => void;
  onToast: (msg: string) => void;
}

interface AIInsightItem {
  id: string;
  title: string;
  description: string;
  sourceRecord: string;
  date: string;
  clinicalContext: string;
  category: 'Metabolic' | 'Cardiovascular' | 'Pharmacology';
  status: 'Pending Review' | 'Accepted' | 'Dismissed';
}

export const Tab01AISummary: React.FC<Tab01AISummaryProps> = ({
  patient,
  onOpenAskAva,
  onNavigateTab,
  onToast,
}) => {
  const [insights, setInsights] = useState<AIInsightItem[]>([
    {
      id: 'ins-1',
      title: 'LDL Borderline Elevation & Dietary Fiber Optimization',
      description:
        'Fasting lipid panel demonstrates borderline LDL (112 mg/dL) with normal triglycerides (148 mg/dL). Consider adding plant sterols / psyllium husk fiber before statin consideration.',
      sourceRecord: 'Diagnostic Lipid Panel (Mednevo Labs)',
      date: 'Oct 24, 2026',
      clinicalContext: 'Preventive cardiovascular risk mitigation for 29yo female with mild PCOS.',
      category: 'Metabolic',
      status: 'Pending Review',
    },
    {
      id: 'ins-2',
      title: 'Consistent Blood Pressure Normalization',
      description:
        'Home telemetry and clinic readings reflect mean BP of 118/76 mmHg over the last 45 days on Amlodipine 2.5mg. Target MAP achieved with zero reported orthostatic episodes.',
      sourceRecord: 'Continuous Blood Pressure Telemetry (Clinic Cuff)',
      date: 'Nov 10, 2026',
      clinicalContext: 'Essential Hypertension treatment goal achieved.',
      category: 'Cardiovascular',
      status: 'Pending Review',
    },
    {
      id: 'ins-3',
      title: 'Optimal Metformin Adherence & Glycemic Stability',
      description:
        'Patient exhibits 94% on-time refill compliance. HbA1c stable at 5.4% without hypoglycemia. Ovulatory cycles regularized to 31-day intervals.',
      sourceRecord: 'Pharmacy E-Rx Sync & Ovulation Tracker',
      date: 'Nov 02, 2026',
      clinicalContext: 'PCOS insulin sensitizer efficacy verified.',
      category: 'Pharmacology',
      status: 'Pending Review',
    },
  ]);

  const [pendingActions, setPendingActions] = useState([
    { id: 'act-1', label: 'Order Repeat Lipid Panel in 4 Weeks', done: false },
    { id: 'act-2', label: 'Sign & Finalize SOAP Note from Nov 10 Consultation', done: false },
    { id: 'act-3', label: 'Review Blood Pressure 30-Day Trend Chart', done: false },
  ]);

  const handleInsightAction = (id: string, newStatus: 'Accepted' | 'Dismissed') => {
    setInsights((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    onToast(`AI Clinical Observation marked as ${newStatus}.`);
  };

  const handleToggleAction = (id: string) => {
    setPendingActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    );
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* 1. Sleek AI Intelligence Header with Integrated Safety Badge */}
      <div className="bg-white rounded-2xl border border-slate-100 px-4 py-2.5 shadow-sm flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-xs flex-shrink-0">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h3 className="font-sora font-bold text-sm sm:text-base text-slate-900 truncate">
              AI Clinical Intelligence Summary
            </h3>
            <span className="text-[10px] font-bold bg-purple-100 text-[#5C24FF] px-2 py-0.5 rounded-full whitespace-nowrap">
              Ava Scribe 3.5
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Decision Support Level 2
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAskAva}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-xs hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Ava Scribe</span>
        </button>
      </div>

      {/* 2. Four Core Summary Cards - Exact Same Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 items-stretch">
        {/* Card 1: Overall Health Status */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Overall Health Status</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="font-sora font-bold text-xl text-slate-900">Stable</span>
            <p className="text-[10px] text-emerald-600 font-medium">Chronic conditions controlled</p>
          </div>
        </div>

        {/* Card 2: Medication Adherence */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Medication Adherence</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Pill className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="font-sora font-bold text-xl text-slate-900">94%</span>
            <p className="text-[10px] text-[#5C24FF] font-medium">High compliance (30d)</p>
          </div>
        </div>

        {/* Card 3: Vitals Status */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Vitals Status</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="font-sora font-bold text-xl text-slate-900">Optimal</span>
            <p className="text-[10px] text-slate-500">BP 118/76 • HR 72 bpm</p>
          </div>
        </div>

        {/* Card 4: Proactive Alerts */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Proactive Alerts</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="font-sora font-bold text-xl text-amber-600">1 Review</span>
            <p className="text-[10px] text-amber-700 font-medium">Repeat fasting lipid in 4w</p>
          </div>
        </div>
      </div>

      {/* 3. Balanced Two-Column Diagnostic & Clinical Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
        {/* Left Column */}
        <div className="space-y-3.5 sm:space-y-4 flex flex-col">
          {/* Active Diagnoses Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#5C24FF]" />
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    Active Diagnoses &amp; Conditions
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">ICD-10 Coded</span>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 bg-purple-50/50 rounded-2xl border border-purple-100/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Essential (Primary) Hypertension</span>
                    <span className="text-slate-500 text-[11px]">ICD-10: I10 • Stably controlled on oral therapy</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Controlled
                  </span>
                </div>

                <div className="p-2.5 bg-purple-50/50 rounded-2xl border border-purple-100/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Polycystic Ovarian Syndrome (PCOS)</span>
                    <span className="text-slate-500 text-[11px]">ICD-10: E28.2 • Regularized ovulatory cycles</span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    Managed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Medications & Allergies */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#5C24FF]" />
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    Active Prescriptions &amp; Allergies
                  </h4>
                </div>
                <button
                  onClick={() => onNavigateTab('Medications')}
                  className="text-xs text-[#5C24FF] font-semibold hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs pt-2">
                {patient.medications.map((m) => (
                  <span
                    key={m.name}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-100 font-medium text-[11px]"
                  >
                    💊 <strong>{m.name}</strong> {m.dosage}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
              <span className="text-slate-500 font-medium text-[11px]">Allergies:</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-100">
                ✓ No Known Drug Allergies (NKDA)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3.5 sm:space-y-4 flex flex-col">
          {/* Recent Encounter & Follow-up */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#5C24FF]" />
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    Recent Encounter &amp; Follow-up
                  </h4>
                </div>
                <button
                  onClick={() => onNavigateTab('Visits')}
                  className="text-xs text-[#5C24FF] font-semibold hover:underline"
                >
                  Visits History →
                </button>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Last Encounter</span>
                    <span className="text-slate-500 text-[11px]">{patient.recentVisit.date}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 mt-0.5 text-xs">{patient.recentVisit.type}</h5>
                  <p className="text-slate-500 text-[11px] mt-0.5">{patient.recentVisit.reason}</p>
                </div>

                <div className="p-2.5 bg-purple-50/60 rounded-2xl border border-purple-100/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#5C24FF]">Upcoming Follow-up</span>
                    <span className="font-semibold text-slate-900 text-[11px]">{patient.nextAppointment?.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-slate-700 text-[11px]">{patient.nextAppointment?.time} • {patient.nextAppointment?.mode}</span>
                    <button
                      onClick={() => onNavigateTab('Visits')}
                      className="text-[11px] font-bold text-[#5C24FF] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Clinical Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#5C24FF]" />
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    Pending Clinical Actions
                  </h4>
                </div>
                <span className="text-xs text-slate-400">Doctor Tasks</span>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                {pendingActions.map((action) => (
                  <div
                    key={action.id}
                    onClick={() => handleToggleAction(action.id)}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-2.5 cursor-pointer transition-all ${
                      action.done
                        ? 'bg-slate-50 text-slate-400 line-through border-slate-200'
                        : 'bg-white hover:bg-purple-50/50 text-slate-800 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          action.done ? 'bg-[#5C24FF] border-[#5C24FF] text-white' : 'border-slate-300'
                        }`}
                      >
                        {action.done && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-[11px]">{action.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI-Generated Clinical Insights with Review Workflow */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5C24FF]" />
            <div>
              <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                AI Clinical Insights &amp; Decision Support
              </h4>
              <p className="text-[11px] text-slate-500">
                Evidence-grounded observations generated from structured EHR data
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
            {insights.filter((i) => i.status === 'Pending Review').length} Pending Doctor Approval
          </span>
        </div>

        <div className="space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                item.status === 'Accepted'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : item.status === 'Dismissed'
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-100 hover:border-purple-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h5 className="font-sora font-bold text-xs sm:text-sm text-slate-900">{item.title}</h5>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#5C24FF]">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Dismissed'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="space-y-0.5">
                  <div>
                    <span className="font-medium text-slate-400">Source Record: </span>
                    <span className="text-slate-700">{item.sourceRecord}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-400">Clinical Context: </span>
                    <span className="text-slate-700">{item.clinicalContext}</span>
                  </div>
                </div>

                {item.status === 'Pending Review' && (
                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleInsightAction(item.id, 'Dismissed')}
                      className="px-2.5 py-1 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Dismiss
                    </button>
                    <button
                      onClick={() => handleInsightAction(item.id, 'Accepted')}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white rounded-lg font-medium shadow-xs hover:opacity-95 transition-all flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Accept Insight
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
