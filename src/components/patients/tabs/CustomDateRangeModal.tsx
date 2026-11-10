import React from 'react';
import {
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface CustomDateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customFrom: string;
  customTo: string;
  setCustomFrom: (d: string) => void;
  setCustomTo: (d: string) => void;
  calendarYear: number;
  calendarMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick: (day: number) => void;
  onApplyPreset: (from: string, to: string, label: string) => void;
  onApplyRange: () => void;
  formatDateDisplay: (isoStr: string) => string;
}

export const CustomDateRangeModal: React.FC<CustomDateRangeModalProps> = ({
  isOpen,
  onClose,
  customFrom,
  customTo,
  setCustomFrom,
  setCustomTo,
  calendarYear,
  calendarMonth,
  onPrevMonth,
  onNextMonth,
  onDayClick,
  onApplyPreset,
  onApplyRange,
  formatDateDisplay,
}) => {
  if (!isOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();

  const renderCalendarDays = () => {
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<div key={`blank-${i}`} className="h-8 flex items-center justify-center" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isStart = dateStr === customFrom;
      const isEnd = dateStr === customTo;
      const inRange = Boolean(
        customFrom && customTo && dateStr > customFrom && dateStr < customTo
      );

      let cellClass =
        'h-8 flex items-center justify-center text-xs font-semibold cursor-pointer transition-all ';

      if (isStart && isEnd) {
        cellClass += 'bg-[#5C24FF] text-white rounded-full shadow-sm';
      } else if (isStart) {
        cellClass += 'bg-[#5C24FF] text-white rounded-l-full shadow-sm';
      } else if (isEnd) {
        cellClass += 'bg-[#5C24FF] text-white rounded-r-full shadow-sm';
      } else if (inRange) {
        cellClass += 'bg-purple-100 text-[#5C24FF] font-bold';
      } else {
        cellClass += 'hover:bg-slate-100 text-slate-700 rounded-lg';
      }

      cells.push(
        <button
          key={dateStr}
          type="button"
          onClick={() => onDayClick(day)}
          className={cellClass}
        >
          {day}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50/50 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#5C24FF] text-white flex items-center justify-center shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sora font-bold text-base text-slate-900">
                Select Custom Date Range
              </h4>
              <p className="text-xs text-slate-500">
                Choose a From and To date to filter telemetry readings
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

        <div className="p-5 space-y-4">
          {/* Dual Range Input Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50/60 p-3 rounded-2xl border border-purple-100/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#5C24FF] font-bold uppercase tracking-wider">
                <span>From Date</span>
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="w-full bg-white border border-purple-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]"
              />
              <div className="text-[11px] text-slate-500 font-medium">
                {formatDateDisplay(customFrom)}
              </div>
            </div>

            <div className="bg-purple-50/60 p-3 rounded-2xl border border-purple-100/80 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#5C24FF] font-bold uppercase tracking-wider">
                <span>To Date</span>
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="w-full bg-white border border-purple-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]"
              />
              <div className="text-[11px] text-slate-500 font-medium">
                {formatDateDisplay(customTo)}
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Quick Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onApplyPreset('2026-11-03', '2026-11-10', 'Last 7 Days')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                Last 7 Days
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('2026-10-11', '2026-11-10', 'Last 30 Days')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                Last 30 Days
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('2026-11-01', '2026-11-10', 'Nov 2026')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                This Month
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('2026-10-01', '2026-10-31', 'Oct 2026')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                October 2026
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('2026-08-10', '2026-11-10', 'Last 3 Months')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                Last 3 Months
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('2026-01-01', '2026-11-10', 'All 2026')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 font-medium text-[11px] transition-colors"
              >
                All 2026
              </button>
            </div>
          </div>

          {/* Interactive Calendar Month Picker */}
          <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onPrevMonth}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-sora font-bold text-slate-800 text-sm">
                {monthNames[calendarMonth]} {calendarYear}
              </span>
              <button
                type="button"
                onClick={onNextMonth}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 text-center font-bold text-[10px] text-slate-400">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setCustomFrom('2026-10-01');
                setCustomTo('2026-11-10');
              }}
              className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-medium text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onApplyRange}
                className="px-5 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold rounded-xl text-xs shadow-md hover:opacity-95 transition-all"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
