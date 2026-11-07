import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  Check,
  Video,
  Play,
  ArrowUpRight,
  Activity,
  Calendar,
  User,
} from 'lucide-react';
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
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredSchedule = TODAY_SCHEDULE.filter((item) => {
    if (filter === 'completed') return item.status === 'Completed';
    if (filter === 'upcoming') return item.status !== 'Completed';
    return true;
  });

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const getVisitTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Visit':
        return <Video className="w-3 h-3 text-[#5C24FF]" />;
      case 'Procedure':
        return <Activity className="w-3 h-3 text-rose-500" />;
      case 'Follow-up':
        return <Calendar className="w-3 h-3 text-indigo-500" />;
      case 'New Patient':
        return <User className="w-3 h-3 text-emerald-500" />;
      default:
        return <Calendar className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900 leading-tight">
                Today's Schedule
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              6 total visits · Live timeline
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCalendar}
          className="group inline-flex items-center gap-1 font-sora text-xs font-semibold text-[#5C24FF] hover:text-[#4A15E8] transition-colors"
          title="Open Schedule Calendar"
        >
          <span>Calendar</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl mb-4 text-xs font-sora font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 px-2.5 rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All (6)
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`flex-1 py-1 px-2.5 rounded-lg transition-all ${
            filter === 'upcoming'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Upcoming (4)
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex-1 py-1 px-2.5 rounded-lg transition-all ${
            filter === 'completed'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Done (2)
        </button>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-7 space-y-4 flex-1">
        {/* Continuous Timeline Spine */}
        <div
          className="absolute left-[11px] sm:left-[13px] top-3 bottom-4 w-0.5 bg-gradient-to-b from-emerald-400 via-[#9A6AFB] to-slate-200"
          aria-hidden="true"
        />

        {filteredSchedule.map((item) => {
          const isCompleted = item.status === 'Completed';
          const isResume = item.status === 'Resume';
          const isCurrent = item.time === '10:30';

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node on the Spine */}
              <div className="absolute -left-6 sm:-left-7 top-1.5 -translate-x-1/2 z-10">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-6 h-6 rounded-full bg-[#9A6AFB]/40 animate-ping" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                      <Video className="w-2.5 h-2.5" />
                    </div>
                  </div>
                ) : isResume ? (
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                    <Play className="w-2.5 h-2.5 ml-0.5 fill-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-300 ring-4 ring-white" />
                )}
              </div>

              {/* Timeline Event Card */}
              <div
                className={`p-3 rounded-2xl border transition-all duration-150 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#9A6AFB]/8 to-[#5C24FF]/8 border-[#9A6AFB]/40 shadow-[0_2px_12px_rgba(154,106,251,0.12)]'
                    : 'bg-slate-50/60 hover:bg-slate-50 border-slate-100 hover:border-slate-200/80 shadow-2xs'
                }`}
              >
                {/* Top Row: Time & Badges */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-sora text-xs font-bold ${
                        isCurrent
                          ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] bg-clip-text text-transparent'
                          : 'text-slate-800'
                      }`}
                    >
                      {item.time} AM
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">· 30m</span>
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center gap-1">
                    {isCurrent && (
                      <span className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white text-[9px] font-sora font-extrabold px-1.5 py-0.5 rounded-full tracking-wider uppercase shadow-2xs">
                        NOW
                      </span>
                    )}

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-1.5 py-0.5 rounded-full">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>Done</span>
                      </span>
                    )}

                    {item.isProcessing && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span>Intake Running</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Patient Information & Actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-sora font-bold flex-shrink-0 ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white shadow-2xs'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-purple-100 text-[#5C24FF]'
                      }`}
                    >
                      {getInitials(item.patientName)}
                    </div>

                    <div className="min-w-0">
                      <span className="font-sora font-bold text-xs sm:text-[13px] text-slate-900 block truncate leading-tight">
                        {item.patientName}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        {getVisitTypeIcon(item.type)}
                        <span className="truncate">{item.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Action Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {item.hasSummary && (
                      <button
                        onClick={() => onViewSummary(item.patientName)}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 px-2 py-1 rounded-lg transition-colors"
                        title="View AI pre-visit intake summary"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span className="hidden sm:inline">AI</span>
                        <span>Summary</span>
                      </button>
                    )}

                    {isResume && (
                      <button
                        onClick={() => onResumeVisit(item.patientName)}
                        className="inline-flex items-center gap-1 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-[11px] font-sora font-semibold px-2.5 py-1 rounded-xl shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95"
                      >
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>Resume</span>
                      </button>
                    )}

                    {item.status === 'Join' && (
                      <button
                        onClick={() => onJoinVisit(item.patientName)}
                        className={`inline-flex items-center gap-1 text-white text-[11px] font-sora font-semibold px-2.5 py-1 rounded-xl transition-all active:scale-95 ${
                          isCurrent
                            ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 shadow-[0_2px_10px_rgba(154,106,251,0.4)]'
                            : 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 shadow-[0_2px_8px_rgba(154,106,251,0.3)]'
                        }`}
                      >
                        <Video className="w-3 h-3" />
                        <span>Join</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
