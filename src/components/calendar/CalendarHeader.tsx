import React from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Plus, Clock, Download, List } from 'lucide-react';

interface CalendarHeaderProps {
  onBackToDashboard: () => void;
  onNavigateToList?: () => void;
  onNewAppointment: () => void;
  onBlockTime: () => void;
  onExport: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  onBackToDashboard,
  onNavigateToList,
  onNewAppointment,
  onBlockTime,
  onExport,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Back button + Title & Subtitle */}
      <div className="flex items-start sm:items-center gap-3">
        <button
          onClick={onBackToDashboard}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 flex items-center justify-center transition-colors flex-shrink-0"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(154,106,251,0.3)] hidden sm:flex">
          <CalendarIcon className="w-5 h-5" />
        </div>

        <div>
          <h2 className="font-sora font-bold text-lg sm:text-xl text-slate-900 leading-tight">
            Schedule Calendar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage appointments, patient visits, provider availability, and AI-powered scheduling
            insights.
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-start sm:justify-end">
        {onNavigateToList && (
          <button
            onClick={onNavigateToList}
            className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] border border-purple-200/90 px-3.5 py-2.5 rounded-xl font-sora font-semibold text-xs sm:text-sm transition-all active:scale-95 whitespace-nowrap"
            title="Switch to Appointment List View"
          >
            <List className="w-4 h-4 text-[#5C24FF]" />
            <span>List View</span>
          </button>
        )}

        <button
          onClick={onNewAppointment}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2.5 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>

        <button
          onClick={onBlockTime}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-3.5 py-2.5 rounded-xl font-sora font-medium text-xs sm:text-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Block Time</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-3.5 py-2.5 rounded-xl font-sora font-medium text-xs sm:text-sm transition-all active:scale-95 whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};
