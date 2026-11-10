import React from 'react';
import {
  User,
  AlertTriangle,
  Pill,
  Activity,
  Calendar,
  Video,
  FileText,
  Clock,
  Phone,
  Mail,
  ShieldAlert,
  ChevronRight,
  Droplet,
} from 'lucide-react';
import { PatientBriefContext } from '../../types/chat';

interface PatientContextPanelProps {
  patient: PatientBriefContext;
  onOpenPatientChart: (name: string) => void;
  onOpenVirtualVisit: (name: string) => void;
  onOpenSchedule: (name: string) => void;
  onToast: (msg: string) => void;
}

export const PatientContextPanel: React.FC<PatientContextPanelProps> = ({
  patient,
  onOpenPatientChart,
  onOpenVirtualVisit,
  onOpenSchedule,
  onToast,
}) => {
  return (
    <div className="h-full bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex-shrink-0 flex items-center justify-between">
        <div>
          <h3 className="font-sora font-extrabold text-base text-slate-900 tracking-tight">
            Patient Summary
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Clinical context &amp; medical telemetry</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#5C24FF] border border-purple-100">
          EHR Synced
        </span>
      </div>

      {/* Scrollable Context Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
        {/* Section 1: Patient Overview Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/60 to-slate-50 border border-purple-100/80 space-y-3.5">
          <div className="flex items-center gap-3">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-200 shadow-xs flex-shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-sora font-bold text-sm text-slate-900 truncate">
                {patient.name}
              </h4>
              <span className="text-[11px] font-mono font-bold text-[#5C24FF] block">
                {patient.patientId}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.age} yrs • {patient.gender}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-purple-100/60 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Droplet className="w-3.5 h-3.5 text-rose-500" />
              <span>Blood: <strong>{patient.bloodGroup}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 truncate">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span className="truncate">{patient.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 text-xs truncate">
            <Mail className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
            <span className="truncate text-[11px] text-slate-500">{patient.email}</span>
          </div>
        </div>

        {/* Section 2: Medical Summary (Allergies, Conditions, Meds, Alerts) */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <ShieldAlert className="w-4 h-4 text-[#5C24FF]" />
            <span>Clinical Medical Summary</span>
          </div>

          {/* Critical Alerts */}
          {patient.medicalAlerts.length > 0 && (
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Active Clinical Alerts</span>
              </div>
              <ul className="list-disc pl-4 text-[11px] text-amber-900 space-y-0.5">
                {patient.medicalAlerts.map((alt) => (
                  <li key={alt}>{alt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Allergies */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Known Allergies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {patient.allergies.map((alg) => (
                <span
                  key={alg}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100"
                >
                  {alg}
                </span>
              ))}
            </div>
          </div>

          {/* Existing Conditions */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Diagnosed Conditions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {patient.conditions.map((cnd) => (
                <span
                  key={cnd}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-50 text-slate-800 border border-slate-200/80"
                >
                  {cnd}
                </span>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Prescriptions
            </span>
            <div className="space-y-1.5">
              {patient.currentMedications.map((med) => (
                <div
                  key={med}
                  className="p-2 rounded-xl bg-purple-50/50 border border-purple-100/70 flex items-center gap-2 text-xs text-slate-800"
                >
                  <Pill className="w-3.5 h-3.5 text-[#5C24FF] flex-shrink-0" />
                  <span className="font-semibold truncate">{med}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Recent Activity */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Recent Activity &amp; Encounters</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Last Encounter</span>
              <p className="font-semibold text-slate-800">{patient.lastConsultation}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Visit</span>
              <p className="font-semibold text-slate-800">{patient.lastAppointment}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Latest Lab Reports</span>
              {patient.recentLabReports.map((lab) => (
                <p key={lab} className="text-[11px] text-slate-700 truncate flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{lab}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Quick Actions */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Clinical Quick Actions
          </span>

          <button
            type="button"
            onClick={() => onOpenVirtualVisit(patient.name)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs flex items-center justify-between shadow-xs hover:opacity-95 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Launch Video Consult</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenPatientChart(patient.name)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-purple-200 bg-white hover:bg-purple-50/50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>View Full Patient Chart</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenSchedule(patient.name)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-purple-200 bg-white hover:bg-purple-50/50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Next Appointment</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onToast(`Opening electronic medical records archive for ${patient.name}...`)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-purple-200 bg-white hover:bg-purple-50/50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Historical EMR Archives</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
