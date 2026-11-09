import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  MapPin,
  CalendarX2,
  ChevronDown,
  Edit3,
  Wind,
  Flame,
  HeartPulse,
  Sparkles,
  Accessibility,
  Eye,
  Activity,
} from 'lucide-react';
import { DetailedAppointment } from '../../mockData/appointmentListData';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: DetailedAppointment | null;
  onConfirmCancel: (appointmentId: string, reason: string) => void;
  onRescheduleInstead: (appointment: DetailedAppointment) => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmCancel,
  onRescheduleInstead,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [isManualMode, setIsManualMode] = useState<boolean>(false);

  if (!isOpen || !appointment) return null;

  const presetReasons = [
    'Patient is not feeling well',
    'Personal / Emergency',
    'Scheduling conflict',
    'Already consulted elsewhere',
    'Doctor unavailable / Clinical emergency',
    'Other (Please specify)',
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = isManualMode || selectedReason === 'Other (Please specify)'
      ? customReason.trim() || 'Other'
      : selectedReason || 'Scheduling conflict';
    onConfirmCancel(appointment.id, finalReason);
    onClose();
  };

  const renderReasonIcon = (iconType: DetailedAppointment['iconType']) => {
    switch (iconType) {
      case 'lungs':
        return <Wind className="w-4 h-4 text-[#5C24FF]" />;
      case 'stomach':
        return <Flame className="w-4 h-4 text-pink-600" />;
      case 'heart':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'skin':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'bone':
        return <Accessibility className="w-4 h-4 text-indigo-600" />;
      case 'eye':
        return <Eye className="w-4 h-4 text-teal-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* 1. Header with soft pink calendar-x icon */}
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0 shadow-sm">
              <CalendarX2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">Cancel Appointment</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Are you sure you want to cancel this appointment?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Form Body */}
        <form onSubmit={handleConfirm} className="p-5 sm:p-6 space-y-4">
          {/* Patient Card Preview */}
          <div className="p-4 bg-[#F8F9FE] rounded-2xl border border-purple-100/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={appointment.avatarUrl}
                  alt={appointment.patientName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                />
                <div>
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    {appointment.patientName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    ID: {appointment.patientId} • Age: {appointment.patientAge} • {appointment.patientGender}
                  </p>
                </div>
              </div>

              {/* Mode badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-purple-100 text-[#5C24FF]">
                {appointment.mode === 'Video Call' ? (
                  <>
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Call</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>In-Person</span>
                  </>
                )}
              </span>
            </div>

            {/* Time & Clinical Reason strip */}
            <div className="pt-2 border-t border-purple-100/60 flex items-center justify-between gap-2 text-xs text-slate-600 flex-wrap">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#5C24FF]" />
                <span>Wed, Nov 10, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#5C24FF]" />
                <span>{appointment.time} – 10:30 AM</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                {renderReasonIcon(appointment.iconType)}
                <span className="truncate max-w-[170px]">{appointment.reason}</span>
              </div>
            </div>
          </div>

          {/* Reason for Cancellation Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Reason for Cancellation <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsManualMode(!isManualMode)}
                className="text-[11px] font-semibold text-[#5C24FF] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isManualMode ? 'Choose from list' : 'Type manual reason'}</span>
              </button>
            </div>

            {!isManualMode ? (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    required
                    className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:border-transparent transition-all pr-10 font-medium cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    {presetReasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {selectedReason === 'Other (Please specify)' && (
                  <textarea
                    rows={2}
                    required
                    placeholder="Please specify the cancellation reason manually..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all resize-none"
                    autoFocus
                  />
                )}
              </div>
            ) : (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <textarea
                  rows={3}
                  required
                  placeholder="Type your manual cancellation reason here..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all resize-none"
                  autoFocus
                />
                <span className="text-[11px] text-slate-400 block">
                  This note will be logged in the patient's visit history and sent via notification.
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons: [Reschedule Instead] and [Yes, Cancel Appointment] */}
          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRescheduleInstead(appointment);
              }}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#5C24FF]" />
              <span>Reschedule Instead</span>
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition-all active:scale-95 text-center"
            >
              Yes, Cancel Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
