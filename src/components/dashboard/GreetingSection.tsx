import React from 'react';
import { Calendar as CalendarIcon, Download, CheckSquare } from 'lucide-react';
import { CURRENT_DOCTOR } from '../../mockData';

interface GreetingSectionProps {
  onOpenCalendar: () => void;
  onExport: () => void;
  onOpenTasks: () => void;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({
  onOpenCalendar,
  onExport,
  onOpenTasks,
}) => {
  return (
    <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 pb-2">
      <div>
        <h1 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-[32px] text-slate-900 tracking-tight flex flex-wrap items-center gap-x-2.5">
          <span>Good Morning,</span>
          <span className="text-[#5C24FF]">{CURRENT_DOCTOR.greetingName}</span>
          <span className="inline-block origin-bottom-right">👋</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          You have{' '}
          <strong className="font-bold text-slate-800">
            {CURRENT_DOCTOR.appointmentsToday} appointments
          </strong>{' '}
          today ·{' '}
          <strong className="font-bold text-slate-800">
            {CURRENT_DOCTOR.patientsWaiting} patients
          </strong>{' '}
          waiting
        </p>
      </div>

      {/* Action Buttons: Calendar | Export | My Tasks */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onOpenCalendar}
          className="flex items-center gap-2.5 bg-[#5C24FF] hover:bg-[#4A15E8] text-white px-5 py-2.5 sm:py-3 rounded-2xl font-sora font-semibold text-sm shadow-[0_2px_8px_rgba(92, 36, 255,0.25)] transition-all duration-150 active:scale-95 whitespace-nowrap"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Calendar</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-5 py-2.5 sm:py-3 rounded-2xl font-sora font-medium text-sm shadow-2xs transition-all duration-150 active:scale-95 whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export</span>
        </button>

        <button
          onClick={onOpenTasks}
          className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-5 py-2.5 sm:py-3 rounded-2xl font-sora font-medium text-sm shadow-2xs transition-all duration-150 active:scale-95 whitespace-nowrap"
        >
          <CheckSquare className="w-4 h-4 text-slate-500" />
          <span>My Tasks</span>
        </button>
      </div>
    </section>
  );
};
