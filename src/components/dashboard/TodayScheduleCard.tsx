import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { TODAY_SCHEDULE } from '../../mockData';

interface TodayScheduleCardProps {
  onOpenCalendar: () => void;
  onResumeVisit: (patientName: string) => void;
  onJoinVisit: (patientName: string) => void;
  onViewSummary: (patientName: string) => void;
}

export const TodayScheduleCard: React.FC<TodayScheduleCardProps> = ({
  onOpenCalendar,
  onResumeVisit,
  onJoinVisit,
  onViewSummary,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Clock className="w-5 h-5 text-slate-400" />
          <h3 className="font-sora font-bold text-base sm:text-lg">Today's Schedule</h3>
        </div>
        <button
          onClick={onOpenCalendar}
          className="font-sora text-xs sm:text-sm font-semibold text-[#6E56CF] hover:text-[#5E45BE] transition-colors inline-flex items-center px-1 -mr-1 min-h-[36px] sm:min-h-0 sm:px-0 sm:mr-0"
        >
          Open calendar
        </button>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col justify-around gap-2 flex-1">
        {TODAY_SCHEDULE.map((item) => {
          const isCompleted = item.status === 'Completed';
          const isResume = item.status === 'Resume';
          const isCurrent = item.time === '10:30';

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-1 p-1.5 rounded-2xl hover:bg-slate-50/70 transition-colors"
            >
              {/* Timeline Indicator & Time */}
              <div className="flex items-center gap-1.5 min-w-[48px] flex-shrink-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-[#6E56CF] ring-4 ring-purple-100'
                      : 'bg-slate-300'
                  }`}
                />
                <span className="font-sora text-xs font-semibold text-slate-600">
                  {item.time}
                </span>
              </div>

              {/* Patient Name & Tag */}
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <span className="font-sora font-bold text-xs text-slate-900 whitespace-nowrap">
                  {item.patientName}
                </span>
                <span className="bg-purple-50 text-[#6E56CF] text-[10px] font-semibold px-1 py-0.5 rounded-md whitespace-nowrap hidden sm:inline-block flex-shrink-0">
                  {item.type}
                </span>
              </div>

              {/* Status / Actions */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {item.hasSummary && (
                  <button
                    onClick={() => onViewSummary(item.patientName)}
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.5 min-h-[36px] sm:min-h-0 rounded-md hover:bg-emerald-100 transition-colors"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Summary</span>
                  </button>
                )}

                {item.isProcessing && (
                  <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1 py-0.5 rounded-md whitespace-nowrap">
                    Processing
                  </span>
                )}

                {isCompleted && (
                  <span className="text-[11px] font-semibold text-emerald-600 px-1 py-0.5 whitespace-nowrap">
                    Completed
                  </span>
                )}

                {isResume && (
                  <button
                    onClick={() => onResumeVisit(item.patientName)}
                    className="bg-[#6E56CF] hover:bg-[#5E45BE] text-white text-[11px] font-sora font-semibold px-2 py-1 min-h-[36px] sm:min-h-0 rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    Resume
                  </button>
                )}

                {item.status === 'Join' && (
                  <button
                    onClick={() => onJoinVisit(item.patientName)}
                    className="bg-white hover:bg-purple-50 text-[#6E56CF] border border-purple-200 text-[11px] font-sora font-semibold px-2 py-1 min-h-[36px] sm:min-h-0 rounded-xl transition-all active:scale-95"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
