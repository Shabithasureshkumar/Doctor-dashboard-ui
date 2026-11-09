import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  MapPin,
  CalendarClock,
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

interface RescheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: DetailedAppointment | null;
  onConfirmReschedule: (
    appointmentId: string,
    newDate: string,
    newTime: string,
    reason?: string
  ) => void;
}

export const RescheduleAppointmentModal: React.FC<RescheduleAppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmReschedule,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-13');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [isManualTimeMode, setIsManualTimeMode] = useState<boolean>(false);
  const [manualTime, setManualTime] = useState<string>('10:00 AM');
  const [rescheduleReason, setRescheduleReason] = useState<string>('');

  if (!isOpen || !appointment) return null;

  const presetTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTime = isManualTimeMode ? manualTime.trim() || '10:00 AM' : selectedTime;
    // Format date string for user
    const dateObj = new Date(selectedDate);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = isNaN(dateObj.getTime())
      ? selectedDate
      : dateObj.toLocaleDateString('en-US', options);

    onConfirmReschedule(appointment.id, formattedDate, finalTime, rescheduleReason.trim());
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
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* 1. Header with purple calendar-clock icon */}
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0 shadow-sm">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">Reschedule Appointment</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose a new date and time for this appointment.
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

        {/* 2. Form Body (scrollable if needed) */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
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

          {/* Select New Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Select New Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 font-sora font-semibold focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Select New Time + Manual Entry Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Select New Time <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsManualTimeMode(!isManualTimeMode)}
                className="text-[11px] font-semibold text-[#5C24FF] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isManualTimeMode ? 'Choose from slots' : 'Enter manual time'}</span>
              </button>
            </div>

            {!isManualTimeMode ? (
              /* Preset Time Slots */
              <div className="flex items-center gap-2 flex-wrap">
                {presetTimes.map((t) => {
                  const isSelected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#5C24FF] text-white shadow-sm ring-2 ring-purple-300'
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Manual Time Entry */
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11:15 AM or 04:45 PM"
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
                    autoFocus
                  />
                </div>
                <span className="text-[11px] text-slate-400 block">
                  You can type any custom consultation time or interval manually.
                </span>
              </div>
            )}
          </div>

          {/* Manual Reschedule Reason (as requested) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-800">
                Reschedule Reason / Clinical Note <span className="text-slate-400 font-normal">(Manual entry)</span>
              </label>
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Patient requested morning slot due to work conflict / Follow-up lab results delayed"
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Action Buttons: [Cancel] and [Reschedule Appointment] */}
          <div className="pt-3 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-sora font-semibold text-xs sm:text-sm transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <CalendarClock className="w-4 h-4" />
              <span>Reschedule Appointment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
