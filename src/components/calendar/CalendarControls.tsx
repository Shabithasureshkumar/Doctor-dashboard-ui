import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Search, SlidersHorizontal, Check } from 'lucide-react';
import { AppointmentType, CalendarViewType } from '../../types';

interface CalendarControlsProps {
  view: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  dateRangeText: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilters: AppointmentType[];
  onToggleTypeFilter: (type: AppointmentType) => void;
  onClearFilters: () => void;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
  view,
  onViewChange,
  dateRangeText,
  onPrev,
  onNext,
  onToday,
  searchQuery,
  onSearchChange,
  typeFilters,
  onToggleTypeFilter,
  onClearFilters,
}) => {
  const views: CalendarViewType[] = ['Day', 'Week', 'Month', 'Agenda'];
  const allTypes: AppointmentType[] = ['Video Visit', 'In-person', 'Follow-up', 'Procedure', 'New Patient'];

  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // close the filter popover on an outside click or Escape
  useEffect(() => {
    if (!filtersOpen) return;
    const onDown = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFiltersOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFiltersOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [filtersOpen]);

  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-card flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      {/* Left: View Switcher + Today + Range */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Segmented View Control */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl">
          {views.map((v) => {
            const isActive = view === v;
            return (
              <button
                key={v}
                onClick={() => onViewChange(v)}
                className={`px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg text-xs font-sora font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {v}
              </button>
            );
          })}
        </div>

        {/* Today Button */}
        <button
          onClick={onToday}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-xl font-sora font-semibold text-xs shadow-2xs transition-all active:scale-95"
        >
          Today
        </button>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="w-7 h-7 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors"
            title="Previous period"
            aria-label="Previous period"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="w-7 h-7 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors"
            title="Next period"
            aria-label="Next period"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Date Range Display */}
        <div className="flex items-center gap-1.5 text-slate-700 font-sora font-semibold text-xs px-1">
          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>{dateRangeText}</span>
        </div>
      </div>

      {/* Right: Search Input + Filters Button */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search appointments, patients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50/90 border border-slate-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] transition-all"
          />
        </div>

        <div className="relative flex-shrink-0" ref={filterRef}>
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            aria-haspopup="true"
            className={`flex items-center gap-1.5 border px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-xl font-sora font-semibold text-xs transition-all active:scale-95 ${
              typeFilters.length
                ? 'bg-purple-50 border-purple-200 text-[#6E56CF]'
                : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700'
            }`}
          >
            <SlidersHorizontal
              className={`w-3.5 h-3.5 ${typeFilters.length ? 'text-[#6E56CF]' : 'text-slate-500'}`}
            />
            <span>Filters</span>
            {typeFilters.length > 0 && (
              <span className="bg-[#6E56CF] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {typeFilters.length}
              </span>
            )}
          </button>

          {filtersOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-2 z-30 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="font-sora font-bold text-[10px] uppercase tracking-wider text-slate-400">
                  Visit type
                </span>
                {typeFilters.length > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="text-[11px] font-semibold text-[#6E56CF] hover:text-[#5E45BE]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {allTypes.map((t) => {
                const active = typeFilters.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => onToggleTypeFilter(t)}
                    role="menuitemcheckbox"
                    aria-checked={active}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span
                      className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                        active ? 'bg-[#6E56CF] border-[#6E56CF]' : 'border-slate-300'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
