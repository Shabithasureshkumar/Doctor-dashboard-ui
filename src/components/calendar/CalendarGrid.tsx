import React from 'react';
import { Clock } from 'lucide-react';
import { Appointment, CalendarViewType } from '../../types';

interface CalendarGridProps {
  view: CalendarViewType;
  appointments: Appointment[];
  onSelectAppointment: (appointment: Appointment) => void;
  onSelectSlot: (day: string, time: string) => void;
  selectedDay?: string;
  onSelectDay?: (day: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  view,
  appointments,
  onSelectAppointment,
  onSelectSlot,
  selectedDay,
  onSelectDay,
}) => {
  const days = [
    { label: 'MON', num: 17, isToday: true },
    { label: 'TUE', num: 18, isToday: false },
    { label: 'WED', num: 19, isToday: false },
    { label: 'THU', num: 20, isToday: false },
    { label: 'FRI', num: 21, isToday: false },
    { label: 'SAT', num: 22, isToday: false },
    { label: 'SUN', num: 23, isToday: false },
  ];

  const hours = [
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
  ];

  const tagColors = {
    purple: {
      bg: 'bg-purple-100',
      text: 'text-[#5C24FF]',
      border: 'border-purple-200',
      cardBorder: 'hover:border-purple-300',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
      cardBorder: 'hover:border-amber-300',
    },
    blue: {
      bg: 'bg-sky-100',
      text: 'text-sky-600',
      border: 'border-sky-200',
      cardBorder: 'hover:border-sky-300',
    },
    rose: {
      bg: 'bg-rose-100',
      text: 'text-rose-600',
      border: 'border-rose-200',
      cardBorder: 'hover:border-rose-300',
    },
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      cardBorder: 'hover:border-emerald-300',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      cardBorder: 'hover:border-indigo-300',
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      border: 'border-pink-200',
      cardBorder: 'hover:border-pink-300',
    },
    slate: {
      bg: 'bg-slate-200',
      text: 'text-slate-700',
      border: 'border-slate-300',
      cardBorder: 'hover:border-slate-400',
    },
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-600',
      border: 'border-teal-200',
      cardBorder: 'hover:border-teal-300',
    },
  };

  const getAppointmentsForSlot = (dayLabel: string, hourStr: string) => {
    return appointments.filter((apt) => {
      if (apt.day !== dayLabel) return false;
      const [aptHourStr] = apt.startTime.split(':');
      const aptHour = parseInt(aptHourStr, 10);
      const isPM = hourStr.includes('PM');
      let slotHour = parseInt(hourStr, 10);
      if (isPM && slotHour !== 12) slotHour += 12;
      if (!isPM && slotHour === 12) slotHour = 0;
      return aptHour === slotHour;
    });
  };

  if (view === 'Agenda') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card">
        <h3 className="font-sora font-semibold text-slate-900 text-base mb-4">Agenda View</h3>
        <div className="divide-y divide-slate-100">
          {appointments.map((apt) => {
            const colors = tagColors[apt.colorTag] || tagColors.purple;
            return (
              <div
                key={apt.id}
                onClick={() => onSelectAppointment(apt)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${colors.bg} ${colors.text} font-bold text-xs flex items-center justify-center`}
                  >
                    {apt.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-sora font-semibold text-sm text-slate-900">
                      {apt.patientName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {apt.day}, Jun {apt.dateNumber} · {apt.time} ({apt.type})
                    </p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'Month') {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card">
        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {days.map((d) => (
            <div key={d.label} className="font-sora font-semibold text-xs text-slate-500 py-2">
              {d.label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => {
            const dayNum = i + 1;
            const dayApts = appointments.filter((a) => a.dateNumber === dayNum);
            return (
              <div
                key={i}
                onClick={() => onSelectSlot('MON', '09:00 AM')}
                className="min-h-[75px] p-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <span
                  className={`text-xs font-sora font-semibold ${
                    dayNum === 17
                      ? 'w-6 h-6 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white inline-flex items-center justify-center'
                      : 'text-slate-700'
                  }`}
                >
                  {dayNum}
                </span>
                <div className="space-y-1 mt-1">
                  {dayApts.map((a) => (
                    <div
                      key={a.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAppointment(a);
                      }}
                      className="text-[10px] truncate bg-purple-50 text-[#5C24FF] px-1 py-0.5 rounded font-medium"
                    >
                      {a.patientName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'Day') {
    const activeDay = days.find((d) => d.label === selectedDay) || days[0];

    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        {/* Day picker — one tap per day, no sideways scrolling of the grid */}
        <div className="flex items-stretch gap-1 p-2 border-b border-slate-100 overflow-x-auto scrollbar-none">
          {days.map((day) => {
            const isActive = day.label === activeDay.label;
            return (
              <button
                key={day.label}
                onClick={() => onSelectDay?.(day.label)}
                className={`flex-1 min-w-[42px] rounded-xl py-1.5 transition-all ${
                  isActive ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-[0_2px_8px_rgba(154,106,251,0.35)]' : 'hover:bg-slate-50 text-slate-700'
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`font-sora text-[10px] font-semibold uppercase tracking-wider block ${
                    isActive ? 'text-white/80' : 'text-slate-400'
                  }`}
                >
                  {day.label}
                </span>
                <span className="font-sora font-bold text-sm block mt-0.5">{day.num}</span>
                {day.isToday && !isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#5C24FF] mx-auto block mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Single-day time grid */}
        <div>
          {hours.map((hour) => {
            const slotApts = getAppointmentsForSlot(activeDay.label, hour);
            return (
              <div
                key={hour}
                className="grid grid-cols-[56px_1fr] sm:grid-cols-[64px_1fr] border-b border-slate-100/80 min-h-[62px] last:border-b-0"
              >
                <div className="border-r border-slate-100/80 pr-2 pt-1 text-right select-none">
                  <span className="font-sora text-[10px] sm:text-[11px] font-medium text-slate-400">
                    {hour}
                  </span>
                </div>

                <div
                  onClick={() => slotApts.length === 0 && onSelectSlot(activeDay.label, hour)}
                  className="p-1.5 space-y-1.5 relative transition-colors hover:bg-slate-50/40 cursor-pointer"
                >
                  {slotApts.map((apt) => {
                    const colors = tagColors[apt.colorTag] || tagColors.purple;
                    return (
                      <div
                        key={apt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAppointment(apt);
                        }}
                        className={`w-full bg-white rounded-xl p-2 border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${colors.cardBorder} hover:shadow-md transition-all duration-150 cursor-pointer animate-in fade-in zoom-in-95 group/card`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full ${colors.bg} ${colors.text} font-sora font-bold text-[10px] flex items-center justify-center flex-shrink-0`}
                          >
                            {apt.avatarInitials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-sora font-semibold text-xs text-slate-800 block truncate group-hover/card:text-[#5C24FF] transition-colors leading-tight">
                              {apt.patientName}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                              <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                              <span>{apt.time}</span>
                              <span className="text-slate-300">·</span>
                              <span className="truncate">{apt.type}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
      {/* Calendar Header Row with Day Column Titles */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] sm:grid-cols-[64px_repeat(7,1fr)] border-b border-slate-100 bg-white sticky top-0 z-20">
        {/* Empty corner */}
        <div className="border-r border-slate-100/70 p-2 sm:p-3" />

        {/* 7 Days */}
        {days.map((day) => (
          <div
            key={day.label}
            className="text-center py-2.5 sm:py-3 border-r border-slate-100/70 last:border-r-0"
          >
            <span className="font-sora text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              {day.label}
            </span>
            <div className="mt-1 flex justify-center">
              {day.isToday ? (
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center font-sora font-bold text-xs sm:text-sm shadow-[0_2px_8px_rgba(154,106,251,0.35)]">
                  {day.num}
                </span>
              ) : (
                <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-sora font-semibold text-xs sm:text-sm text-slate-700">
                  {day.num}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid Body */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-[56px_repeat(7,1fr)] sm:grid-cols-[64px_repeat(7,1fr)] border-b border-slate-100/80 min-h-[62px] relative group"
            >
              {/* Time Label on left */}
              <div className="border-r border-slate-100/80 pr-2 pt-1 text-right select-none">
                <span className="font-sora text-[10px] sm:text-[11px] font-medium text-slate-400">
                  {hour}
                </span>
              </div>

              {/* 7 Day Slot Cells */}
              {days.map((day) => {
                const slotApts = getAppointmentsForSlot(day.label, hour);

                return (
                  <div
                    key={day.label}
                    onClick={() => slotApts.length === 0 && onSelectSlot(day.label, hour)}
                    className="border-r border-slate-100/70 last:border-r-0 p-1 relative transition-colors hover:bg-slate-50/40 cursor-pointer"
                  >
                    {slotApts.map((apt) => {
                      const colors = tagColors[apt.colorTag] || tagColors.purple;
                      const isHalfHour = apt.time.includes(':30');

                      return (
                        <div
                          key={apt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAppointment(apt);
                          }}
                          className={`w-full bg-white rounded-xl p-1.5 sm:p-2 border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                            colors.cardBorder
                          } hover:shadow-md transition-all duration-150 cursor-pointer animate-in fade-in zoom-in-95 group/card ${
                            isHalfHour ? 'mt-4' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            {/* Initials badge */}
                            <div
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${colors.bg} ${colors.text} font-sora font-bold text-[9px] sm:text-[10px] flex items-center justify-center flex-shrink-0`}
                            >
                              {apt.avatarInitials}
                            </div>

                            <div className="min-w-0 flex-1">
                              <span className="font-sora font-semibold text-[11px] sm:text-xs text-slate-800 block truncate group-hover/card:text-[#5C24FF] transition-colors leading-tight">
                                {apt.patientName}
                              </span>
                              <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-400 mt-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{apt.time}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
