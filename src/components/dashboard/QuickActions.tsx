import React from 'react';
import {
  Video,
  Search,
  Pill,
  Send,
  FileText,
  CalendarClock,
  Plus,
} from 'lucide-react';

interface QuickActionsProps {
  onNewVirtualVisit: () => void;
  onSearchPatient: () => void;
  onNewPrescription: () => void;
  onReferPatient: () => void;
  onOpenAIScribe: () => void;
  onAdjustSchedule: () => void;
  onAddQuickAction?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNewVirtualVisit,
  onSearchPatient,
  onNewPrescription,
  onReferPatient,
  onOpenAIScribe,
  onAdjustSchedule,
  onAddQuickAction,
}) => {
  const actions = [
    {
      id: 'virtual-visit',
      title: 'New Virtual Visit',
      subtitle: 'Start instant call',
      icon: Video,
      iconBg: 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF]',
      onClick: onNewVirtualVisit,
    },
    {
      id: 'search-patient',
      title: 'Search Patient',
      subtitle: 'Find by name or MRN',
      icon: Search,
      iconBg: 'bg-[#D946EF]',
      onClick: onSearchPatient,
    },
    {
      id: 'new-prescription',
      title: 'New Prescription',
      subtitle: 'E-prescribe meds',
      icon: Pill,
      iconBg: 'bg-[#D946EF]',
      onClick: onNewPrescription,
    },
    {
      id: 'refer-patient',
      title: 'Refer a Patient',
      subtitle: 'To specialist',
      icon: Send,
      iconBg: 'bg-[#3B82F6]',
      onClick: onReferPatient,
    },
    {
      id: 'ai-scribe',
      title: 'Open AI Scribe',
      subtitle: 'For current visit',
      icon: FileText,
      iconBg: 'bg-[#D946EF]',
      onClick: onOpenAIScribe,
    },
    {
      id: 'adjust-schedule',
      title: 'Adjust Schedule',
      subtitle: 'Modify availability',
      icon: CalendarClock,
      iconBg: 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF]',
      onClick: onAdjustSchedule,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="font-sora font-bold text-slate-900 text-base sm:text-lg">
          Quick Actions
        </h3>
        <button
          onClick={onAddQuickAction || onNewPrescription}
          className="w-7 h-7 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          title="Add Action"
          aria-label="Add Action"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column / 3-Row Action Grid */}
      <div className="grid grid-cols-2 auto-rows-fr gap-3 sm:gap-3.5 flex-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl border border-slate-100 bg-[#FBFBFE] hover:bg-purple-50/50 hover:border-purple-200/80 transition-all duration-150 group active:scale-98 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${act.iconBg} text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-sora font-semibold text-xs sm:text-[13px] text-slate-800 leading-snug group-hover:text-[#5C24FF] transition-colors">
                {act.title}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                {act.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
