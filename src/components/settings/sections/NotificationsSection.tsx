import React from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  Users,
  Activity,
  CreditCard,
} from 'lucide-react';
import { ChannelSettings, NotificationPreferences } from '../../../types/settings';

interface NotificationsSectionProps {
  notifications: NotificationPreferences;
  onChange: (updated: Partial<NotificationPreferences>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  onChange,
  onSave,
  onToast: _onToast,
}) => {
  const toggleChannel = (
    category: keyof NotificationPreferences,
    key: string,
    channel: keyof ChannelSettings
  ) => {
    const catObj = { ...notifications[category] } as Record<string, ChannelSettings>;
    if (catObj[key]) {
      catObj[key] = {
        ...catObj[key],
        [channel]: !catObj[key][channel],
      };
      onChange({ [category]: catObj });
    }
  };

  const renderChannelToggle = (
    category: keyof NotificationPreferences,
    key: string,
    channel: keyof ChannelSettings,
    active: boolean
  ) => (
    <button
      type="button"
      onClick={() => toggleChannel(category, key, channel)}
      className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 mx-auto ${
        active ? 'bg-[#5C24FF]' : 'bg-slate-200'
      }`}
      title={`Toggle ${channel} notification`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
          active ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Notification Preferences &amp; Delivery Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure delivery channels (Email, SMS, Push, In-App) for patient clinical events and reminders
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="min-w-[620px] space-y-5">
            {/* Channel Legend Header */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center justify-between gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#5C24FF]" />
                <span>Event Notification Type</span>
              </div>

              <div className="flex items-center gap-8 sm:gap-12 pr-2 text-center">
                <span className="flex items-center gap-1.5 w-12 justify-center">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>Email</span>
                </span>
                <span className="flex items-center gap-1.5 w-12 justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>SMS</span>
                </span>
                <span className="flex items-center gap-1.5 w-12 justify-center">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Push</span>
                </span>
                <span className="flex items-center gap-1.5 w-12 justify-center">
                  <Bell className="w-3.5 h-3.5 text-amber-600" />
                  <span>In-App</span>
                </span>
              </div>
            </div>

        {/* 1. Appointment Notifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 text-slate-900 font-sora font-bold text-sm">
            <Calendar className="w-4 h-4 text-[#5C24FF]" />
            <span>Appointments</span>
          </div>

          {[
            { key: 'newAppointment', label: 'New Patient Booking', desc: 'Alert when a patient books a new consultation' },
            { key: 'confirmation', label: 'Appointment Confirmation', desc: 'Notice when schedule slot is confirmed' },
            { key: 'reminder', label: 'Upcoming Consult Reminder', desc: '15-minute advance alert prior to consult start' },
            { key: 'cancellation', label: 'Appointment Cancellation', desc: 'Immediate notification if a patient cancels' },
            { key: 'rescheduled', label: 'Appointment Rescheduled', desc: 'Notice when slot time or date is modified' },
          ].map((item) => {
            const channels = (notifications.appointments as Record<string, ChannelSettings>)[item.key];
            return (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl hover:bg-slate-50/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>

                <div className="flex items-center gap-8 sm:gap-12 pr-2 justify-end">
                  <div className="w-12 text-center">{renderChannelToggle('appointments', item.key, 'email', channels.email)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('appointments', item.key, 'sms', channels.sms)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('appointments', item.key, 'push', channels.push)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('appointments', item.key, 'inApp', channels.inApp)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Patient Communications */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 text-slate-900 font-sora font-bold text-sm">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Patients</span>
          </div>

          {[
            { key: 'newRegistration', label: 'New Patient Intake Registered', desc: 'EHR profile created for new patient' },
            { key: 'messages', label: 'Direct Patient Message', desc: 'Inbound chat or clinical query from patient portal' },
            { key: 'followUpDue', label: 'Patient Follow-up Due', desc: 'Reminder for overdue chronic care follow-ups' },
          ].map((item) => {
            const channels = (notifications.patients as Record<string, ChannelSettings>)[item.key];
            return (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl hover:bg-slate-50/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>

                <div className="flex items-center gap-8 sm:gap-12 pr-2 justify-end">
                  <div className="w-12 text-center">{renderChannelToggle('patients', item.key, 'email', channels.email)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('patients', item.key, 'sms', channels.sms)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('patients', item.key, 'push', channels.push)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('patients', item.key, 'inApp', channels.inApp)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Clinical & Diagnostic Alerts */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 text-slate-900 font-sora font-bold text-sm">
            <Activity className="w-4 h-4 text-rose-500" />
            <span>Clinical &amp; Diagnostic Telemetry</span>
          </div>

          {[
            { key: 'labUpdates', label: 'Diagnostic Lab Results Ingested', desc: 'New panel or imaging report available from Labcorp/Quest' },
            { key: 'clinicalAlerts', label: 'Critical Physiological Alerts', desc: 'High priority alert for abnormal BP, SpO2, or critical lab values' },
            { key: 'prescriptionUpdates', label: 'Pharmacy E-Rx Sync & Refills', desc: 'Patient pharmacy refill authorization requests' },
          ].map((item) => {
            const channels = (notifications.clinical as Record<string, ChannelSettings>)[item.key];
            return (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl hover:bg-slate-50/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>

                <div className="flex items-center gap-8 sm:gap-12 pr-2 justify-end">
                  <div className="w-12 text-center">{renderChannelToggle('clinical', item.key, 'email', channels.email)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('clinical', item.key, 'sms', channels.sms)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('clinical', item.key, 'push', channels.push)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('clinical', item.key, 'inApp', channels.inApp)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Financial & System Notifications */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100 text-slate-900 font-sora font-bold text-sm">
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span>Billing, Payouts &amp; Platform</span>
          </div>

          {[
            { key: 'payments', label: 'Cleared Payouts & Claims Remittance', desc: 'Automated bi-weekly bank deposits and cleared claims' },
            { key: 'systemUpdates', label: 'System & Security Compliance Notices', desc: 'Maintenance updates, NPI renewal reminders & audit logs' },
          ].map((item) => {
            const channels = (notifications.other as Record<string, ChannelSettings>)[item.key];
            return (
              <div
                key={item.key}
                className="p-3.5 rounded-2xl hover:bg-slate-50/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>

                <div className="flex items-center gap-8 sm:gap-12 pr-2 justify-end">
                  <div className="w-12 text-center">{renderChannelToggle('other', item.key, 'email', channels.email)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('other', item.key, 'sms', channels.sms)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('other', item.key, 'push', channels.push)}</div>
                  <div className="w-12 text-center">{renderChannelToggle('other', item.key, 'inApp', channels.inApp)}</div>
                </div>
              </div>
            );
          })}
        </div>
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Notification Matrix
        </button>
      </div>
    </div>
  );
};
