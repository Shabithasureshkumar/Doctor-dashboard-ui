import React from 'react';
import {
  Video,
  UserCheck,
  Phone,
} from 'lucide-react';
import { ConsultationPreferences } from '../../../types/settings';

interface ConsultationSectionProps {
  preferences: ConsultationPreferences;
  onChange: (updated: Partial<ConsultationPreferences>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  preferences,
  onChange,
  onSave,
  onToast: _onToast,
}) => {
  return (
    <div className="space-y-5">
      {/* 1. Primary Consultation Mode Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Consultation Delivery &amp; Default Modes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default modality suggested during patient booking and scheduling triage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {[
            {
              id: 'Video Consultation' as const,
              title: 'Video Visit',
              subtitle: 'HD Telehealth with Scribe',
              icon: Video,
              color: 'text-[#5C24FF]',
              bg: 'bg-purple-50',
            },
            {
              id: 'In-person' as const,
              title: 'In-Person Clinic',
              subtitle: 'Mednevo Central Clinic',
              icon: UserCheck,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
            },
            {
              id: 'Audio / Phone' as const,
              title: 'Audio / Phone',
              subtitle: 'Direct telephone consult',
              icon: Phone,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
          ].map((mode) => {
            const isSelected = preferences.defaultConsultationType === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => onChange({ defaultConsultationType: mode.id })}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'border-[#7F47FA] bg-purple-50/40 shadow-sm'
                    : 'border-slate-100 hover:border-purple-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl ${mode.bg} ${mode.color} flex items-center justify-center shadow-xs`}>
                    <mode.icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-[#5C24FF] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-sora font-bold text-sm text-slate-900">{mode.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{mode.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Automated Confirmation & Triage Policy */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Booking Rules &amp; Patient Self-Service Policies
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Control automated confirmations, rescheduling notice periods, and cancellations
          </p>
        </div>

        <div className="space-y-4 divide-y divide-slate-100">
          {/* Auto Confirmation */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Automatic Appointment Confirmation
              </span>
              <p className="text-xs text-slate-500 max-w-xl">
                When enabled, valid patient booking requests are immediately approved and confirmed without requiring physician triage.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onChange({ autoConfirmAppointments: !preferences.autoConfirmAppointments })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                preferences.autoConfirmAppointments ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  preferences.autoConfirmAppointments ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Rescheduling Policy */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-sora font-bold text-xs sm:text-sm text-slate-900">
                  Allow Patient Rescheduling
                </span>
                <span className="text-[10px] font-bold text-[#5C24FF] bg-purple-50 px-2 py-0.5 rounded-full">
                  Self-Service
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl">
                Permit patients to change appointment date/time via patient portal within the minimum advance cutoff.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                disabled={!preferences.allowPatientRescheduling}
                value={preferences.rescheduleCutoffHours}
                onChange={(e) => onChange({ rescheduleCutoffHours: parseInt(e.target.value) || 12 })}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
              >
                <option value={6}>Up to 6 hours before</option>
                <option value={12}>Up to 12 hours before</option>
                <option value={24}>Up to 24 hours before</option>
                <option value={48}>Up to 48 hours before</option>
              </select>

              <button
                type="button"
                onClick={() => onChange({ allowPatientRescheduling: !preferences.allowPatientRescheduling })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                  preferences.allowPatientRescheduling ? 'bg-[#5C24FF]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    preferences.allowPatientRescheduling ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Allow Patient Cancellation
              </span>
              <p className="text-xs text-slate-500 max-w-xl">
                Define the minimum notice window required before an appointment can be cancelled without a late fee.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                disabled={!preferences.allowPatientCancellation}
                value={preferences.cancellationCutoffHours}
                onChange={(e) => onChange({ cancellationCutoffHours: parseInt(e.target.value) || 24 })}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
              >
                <option value={12}>At least 12h advance notice</option>
                <option value={24}>At least 24h advance notice</option>
                <option value={48}>At least 48h advance notice</option>
              </select>

              <button
                type="button"
                onClick={() => onChange({ allowPatientCancellation: !preferences.allowPatientCancellation })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                  preferences.allowPatientCancellation ? 'bg-[#5C24FF]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    preferences.allowPatientCancellation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Follow-up Duration */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Routine Follow-up Consultation Duration
              </span>
              <p className="text-xs text-slate-500 max-w-xl">
                Allocated slot time for scheduled check-ups, medication reviews, and post-op follow-ups.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {([15, 20, 30] as const).map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => onChange({ followUpDuration: mins })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    preferences.followUpDuration === mins
                      ? 'bg-[#5C24FF] text-white border-[#5C24FF]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50/50'
                  }`}
                >
                  {mins} Mins
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Virtual Telehealth Waiting Room */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Virtual Telehealth Waiting Room
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure virtual waiting room holding area and patient intake questionnaire rules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Waiting Room Enabled */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Enable Digital Waiting Room</span>
              <span className="text-[11px] text-slate-500">Patients wait in holding area until admitted</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ waitingRoomEnabled: !preferences.waitingRoomEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                preferences.waitingRoomEnabled ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  preferences.waitingRoomEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Intake Questionnaire */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Mandatory Pre-visit Intake</span>
              <span className="text-[11px] text-slate-500">Require symptoms &amp; vitals check before room entry</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ waitingRoomIntakeRequired: !preferences.waitingRoomIntakeRequired })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                preferences.waitingRoomIntakeRequired ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  preferences.waitingRoomIntakeRequired ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Consultation Preferences
        </button>
      </div>
    </div>
  );
};
