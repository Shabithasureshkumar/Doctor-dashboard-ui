import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Coffee,
  Globe,
  Plus,
  Trash2,
  CalendarCheck,
  Palmtree,
} from 'lucide-react';
import { AvailabilitySchedule, LeaveRecord, WorkingDaySchedule } from '../../../types/settings';

interface AvailabilitySectionProps {
  availability: AvailabilitySchedule;
  onChange: (updated: Partial<AvailabilitySchedule>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  onChange,
  onSave,
  onToast,
}) => {
  // New Leave Form State
  const [isAddingLeave, setIsAddingLeave] = useState(false);
  const [leaveStart, setLeaveStart] = useState('2026-12-24');
  const [leaveEnd, setLeaveEnd] = useState('2026-12-26');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState<LeaveRecord['type']>('Vacation');

  const handleToggleDay = (dayName: WorkingDaySchedule['day']) => {
    const updated = availability.workingDays.map((d) =>
      d.day === dayName ? { ...d, enabled: !d.enabled } : d
    );
    onChange({ workingDays: updated });
  };

  const handleDayTimeChange = (
    dayName: WorkingDaySchedule['day'],
    field: 'startTime' | 'endTime' | 'breakStart' | 'breakEnd',
    val: string
  ) => {
    const updated = availability.workingDays.map((d) =>
      d.day === dayName ? { ...d, [field]: val } : d
    );
    onChange({ workingDays: updated });
  };

  const handleAddLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) {
      onToast('Please enter a reason for the leave.');
      return;
    }
    const newLeave: LeaveRecord = {
      id: `lv-${Date.now()}`,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
      type: leaveType,
      status: 'Approved',
    };
    onChange({ leaves: [...availability.leaves, newLeave] });
    setIsAddingLeave(false);
    setLeaveReason('');
    onToast(`Leave period scheduled for ${leaveStart} to ${leaveEnd}.`);
  };

  const handleDeleteLeave = (id: string) => {
    onChange({ leaves: availability.leaves.filter((l) => l.id !== id) });
    onToast('Leave record removed.');
  };

  const handleToggleHoliday = (id: string) => {
    const updated = availability.holidays.map((h) =>
      h.id === id ? { ...h, enabled: !h.enabled } : h
    );
    onChange({ holidays: updated });
  };

  const timeZones = [
    'America/New_York (GMT-05:00) Eastern Time',
    'America/Chicago (GMT-06:00) Central Time',
    'America/Denver (GMT-07:00) Mountain Time',
    'America/Los_Angeles (GMT-08:00) Pacific Time',
    'Europe/London (GMT+00:00) Greenwich Mean Time',
    'Asia/Kolkata (GMT+05:30) India Standard Time',
    'Asia/Singapore (GMT+08:00) Singapore Time',
  ];

  return (
    <div className="space-y-5">
      {/* 1. Working Hours & Weekly Schedule Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Weekly Clinic Hours &amp; Availability
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure active appointment booking windows and recurring clinic hours per day
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              {availability.workingDays.filter((d) => d.enabled).length} Days Active / Week
            </span>
          </div>
        </div>

        {/* Days of week schedule cards */}
        <div className="space-y-3">
          {availability.workingDays.map((schedule) => (
            <div
              key={schedule.day}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                schedule.enabled
                  ? 'bg-white border-slate-200/80 shadow-xs'
                  : 'bg-slate-50/70 border-slate-100 opacity-60'
              }`}
            >
              {/* Day Name & Toggle */}
              <div className="flex items-center gap-3 w-40 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleDay(schedule.day)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                    schedule.enabled ? 'bg-[#5C24FF]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      schedule.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="font-sora font-bold text-xs sm:text-sm text-slate-900">
                  {schedule.day}
                </span>
              </div>

              {/* Time Pickers (Enabled only if active) */}
              {schedule.enabled ? (
                <div className="flex flex-wrap items-center gap-3 flex-1 text-xs">
                  {/* Start & End Working Time */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#5C24FF]" />
                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) => handleDayTimeChange(schedule.day, 'startTime', e.target.value)}
                      className="bg-transparent font-medium text-slate-800 focus:outline-none"
                    />
                    <span className="text-slate-400 font-semibold">–</span>
                    <input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) => handleDayTimeChange(schedule.day, 'endTime', e.target.value)}
                      className="bg-transparent font-medium text-slate-800 focus:outline-none"
                    />
                  </div>

                  {/* Lunch / Break Time */}
                  <div className="flex items-center gap-1.5 bg-amber-50/70 border border-amber-200/80 rounded-xl px-3 py-1.5 text-amber-900">
                    <Coffee className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[11px] font-bold text-amber-700">Break:</span>
                    <input
                      type="time"
                      value={schedule.breakStart}
                      onChange={(e) => handleDayTimeChange(schedule.day, 'breakStart', e.target.value)}
                      className="bg-transparent font-medium text-amber-900 focus:outline-none"
                    />
                    <span className="text-amber-400 font-semibold">–</span>
                    <input
                      type="time"
                      value={schedule.breakEnd}
                      onChange={(e) => handleDayTimeChange(schedule.day, 'breakEnd', e.target.value)}
                      className="bg-transparent font-medium text-amber-900 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs font-semibold text-slate-400 italic">
                  Closed / Not Available for Bookings
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Consultation Duration, Buffer Time & Time Zone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Consultation Duration */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3 h-full flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-sora font-bold text-sm text-slate-900">Consultation Duration</h4>
            </div>
            <p className="text-xs text-slate-500">
              Default clinical appointment slot duration booked by patients
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {([15, 30, 45, 60] as const).map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onChange({ consultationDuration: mins })}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  availability.consultationDuration === mins
                    ? 'bg-[#5C24FF] text-white border-[#5C24FF] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50/50'
                }`}
              >
                {mins} Mins
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Buffer Time */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3 h-full flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <h4 className="font-sora font-bold text-sm text-slate-900">Appointment Buffer</h4>
            </div>
            <p className="text-xs text-slate-500">
              Automated rest / EHR charting gap reserved between appointments
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {([0, 5, 10, 15] as const).map((buf) => (
              <button
                key={buf}
                type="button"
                onClick={() => onChange({ bufferTime: buf })}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  availability.bufferTime === buf
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50'
                }`}
              >
                {buf === 0 ? 'No Buffer' : `${buf} Mins`}
              </button>
            ))}
          </div>
        </div>

        {/* Time Zone */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3 h-full flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="font-sora font-bold text-sm text-slate-900">Clinic Time Zone</h4>
            </div>
            <p className="text-xs text-slate-500">
              Synchronizes with patient telehealth bookings and calendar invites
            </p>
          </div>
          <div className="pt-1">
            <select
              value={availability.timeZone}
              onChange={(e) => onChange({ timeZone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            >
              {timeZones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Leave Management & Holiday Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Planned Leaves & Out-of-Office */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Palmtree className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sora font-bold text-sm text-slate-900">
                  Leaves &amp; Time-Off
                </h4>
                <p className="text-[11px] text-slate-400">Scheduled clinical out-of-office blocks</p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingLeave(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-[#5C24FF] hover:bg-purple-100 text-xs font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Leave</span>
            </button>
          </div>

          {/* Add Leave Form Drawer */}
          {isAddingLeave && (
            <form onSubmit={handleAddLeave} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3 animate-in fade-in">
              <div className="font-bold text-xs text-[#5C24FF]">Schedule New Time-Off</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">From Date</label>
                  <input
                    type="date"
                    value={leaveStart}
                    onChange={(e) => setLeaveStart(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">To Date</label>
                  <input
                    type="date"
                    value={leaveEnd}
                    onChange={(e) => setLeaveEnd(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Reason / Note</label>
                  <input
                    type="text"
                    placeholder="e.g. CME Conference"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as LeaveRecord['type'])}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  >
                    <option value="Vacation">Vacation</option>
                    <option value="Conference">Medical Conference</option>
                    <option value="Medical">Personal Medical</option>
                    <option value="Personal">Personal Leave</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingLeave(false)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg text-xs font-semibold bg-[#5C24FF] text-white hover:opacity-95"
                >
                  Confirm Block
                </button>
              </div>
            </form>
          )}

          {/* Leaves List */}
          <div className="space-y-2.5">
            {availability.leaves.map((leave) => (
              <div
                key={leave.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{leave.reason}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-[#5C24FF]">
                      {leave.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {leave.startDate} to {leave.endDate} • {leave.status}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteLeave(leave.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Remove Leave"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Public Holidays Sync */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sora font-bold text-sm text-slate-900">
                  National &amp; Clinic Holidays
                </h4>
                <p className="text-[11px] text-slate-400">Automatic closure on recognized statutory dates</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {availability.holidays.map((hol) => (
              <div
                key={hol.id}
                className="p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs hover:border-purple-200 transition-all"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{hol.name}</span>
                  <span className="text-[11px] text-slate-400">{hol.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold ${hol.enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {hol.enabled ? 'Closed' : 'Open'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleHoliday(hol.id)}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      hol.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        hol.enabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Schedule Settings
        </button>
      </div>
    </div>
  );
};
