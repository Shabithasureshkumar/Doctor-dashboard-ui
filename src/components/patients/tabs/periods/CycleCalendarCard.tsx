import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CycleCalendarCardProps {
  onSelectDate?: (dateStr: string) => void;
}

export const CycleCalendarCard: React.FC<CycleCalendarCardProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('2026-06-02');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // June 2026 calendar structure
  // May 31 (Sun)
  // Jun 1-6 (Mon-Sat)
  // Jun 7-13
  // Jun 14-20
  // Jun 21-27
  // Jun 28-30 + Jul 1-4
  const calendarCells = [
    { day: 31, isCurrentMonth: false, phase: 'none' },
    { day: 1, isCurrentMonth: true, phase: 'menstruation', dateStr: '2026-06-01' },
    { day: 2, isCurrentMonth: true, phase: 'menstruation', isToday: true, dateStr: '2026-06-02' },
    { day: 3, isCurrentMonth: true, phase: 'menstruation', dateStr: '2026-06-03' },
    { day: 4, isCurrentMonth: true, phase: 'menstruation', dateStr: '2026-06-04' },
    { day: 5, isCurrentMonth: true, phase: 'menstruation', dateStr: '2026-06-05' },
    { day: 6, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-06' },

    { day: 7, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-07' },
    { day: 8, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-08' },
    { day: 9, isCurrentMonth: true, phase: 'fertile', dateStr: '2026-06-09' },
    { day: 10, isCurrentMonth: true, phase: 'fertile', dateStr: '2026-06-10' },
    { day: 11, isCurrentMonth: true, phase: 'fertile', dateStr: '2026-06-11' },
    { day: 12, isCurrentMonth: true, phase: 'ovulation', dateStr: '2026-06-12' },
    { day: 13, isCurrentMonth: true, phase: 'fertile', dateStr: '2026-06-13' },

    { day: 14, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-14' },
    { day: 15, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-15' },
    { day: 16, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-16' },
    { day: 17, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-17' },
    { day: 18, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-18' },
    { day: 19, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-19' },
    { day: 20, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-20' },

    { day: 21, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-21' },
    { day: 22, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-22' },
    { day: 23, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-23' },
    { day: 24, isCurrentMonth: true, phase: 'luteal', dateStr: '2026-06-24' },
    { day: 25, isCurrentMonth: true, phase: 'luteal', dateStr: '2026-06-25' },
    { day: 26, isCurrentMonth: true, phase: 'luteal', dateStr: '2026-06-26' },
    { day: 27, isCurrentMonth: true, phase: 'luteal', dateStr: '2026-06-27' },

    { day: 28, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-28' },
    { day: 29, isCurrentMonth: true, phase: 'predicted', dateStr: '2026-06-29' },
    { day: 30, isCurrentMonth: true, phase: 'none', dateStr: '2026-06-30' },
    { day: 1, isCurrentMonth: false, phase: 'none' },
    { day: 2, isCurrentMonth: false, phase: 'none' },
    { day: 3, isCurrentMonth: false, phase: 'none' },
    { day: 4, isCurrentMonth: false, phase: 'none' },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header & Controls */}
        <div className="flex items-center justify-between pb-3">
          <div>
            <h4 className="font-sora font-bold text-slate-900 text-sm">Cycle Calendar</h4>
            <span className="text-[11px] text-slate-400 font-medium">June 2026</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedDate('2026-06-02')}
              className="px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 py-1.5 border-b border-slate-50">
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-1.5 pt-2 text-center text-xs">
          {calendarCells.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div key={idx} className="h-8 flex items-center justify-center text-slate-300 font-medium text-[11px]">
                  {cell.day}
                </div>
              );
            }

            let cellStyle = 'text-slate-700 hover:bg-slate-50';
            if (cell.phase === 'menstruation') {
              cellStyle = cell.isToday
                ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white font-bold ring-2 ring-rose-300/80 shadow-xs'
                : 'bg-rose-100 text-rose-700 font-medium';
            } else if (cell.phase === 'fertile') {
              cellStyle = 'bg-amber-100/90 text-amber-800 font-medium';
            } else if (cell.phase === 'ovulation') {
              cellStyle = 'bg-emerald-500 text-white font-bold shadow-xs';
            } else if (cell.phase === 'luteal') {
              cellStyle = 'bg-purple-100 text-purple-700 font-medium';
            } else if (cell.phase === 'predicted') {
              cellStyle = 'border border-dashed border-rose-300 text-rose-500 font-medium bg-rose-50/50';
            }

            const isSelected = cell.dateStr === selectedDate;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (cell.dateStr) {
                    setSelectedDate(cell.dateStr);
                    onSelectDate?.(cell.dateStr);
                  }
                }}
                className={`h-8 w-full rounded-full flex items-center justify-center text-[11px] transition-all relative ${cellStyle} ${
                  isSelected && !cell.isToday ? 'ring-2 ring-[#5C24FF]' : ''
                }`}
              >
                {cell.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between text-[10px] text-slate-500 flex-wrap gap-y-1.5">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Menstruation
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-300" />
          Fertility Window
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Ovulation
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-300" />
          Luteal Phase
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-400" />
          Intercourse
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          Med taken
        </span>
      </div>
    </div>
  );
};
