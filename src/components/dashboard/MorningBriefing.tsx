import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CURRENT_DOCTOR } from '../../mockData';

interface MorningBriefingProps {
  onViewBriefing: () => void;
  onReviewCriticalLab: () => void;
  onReviewNotes: () => void;
}

export const MorningBriefing: React.FC<MorningBriefingProps> = ({
  onViewBriefing,
  onReviewCriticalLab,
  onReviewNotes,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-purple-100/90 shadow-card transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Icon + Content */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5C24FF] to-[#9A6AFB] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_14px_rgba(92, 36, 255,0.3)]">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-sora font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                Ava — Your Day at a Glance
              </h2>
              <span className="bg-purple-100 text-[#5C24FF] text-[11px] font-sora font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                MORNING BRIEF
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Good morning, {CURRENT_DOCTOR.greetingName}. You have{' '}
              <span className="font-bold text-slate-900">
                {CURRENT_DOCTOR.appointmentsToday} appointments
              </span>{' '}
              today.
            </p>

            {/* Status Dots (Single line) */}
            <div className="flex items-center gap-3.5 sm:gap-5 flex-wrap text-xs text-slate-700 pt-0.5">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>2 elevated BP readings</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>1 critical lab to review</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5C24FF]" />
                <span>3 SOAP notes pending</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>1 adherence decline</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 pt-0.5">
              <span className="font-bold text-slate-700">Suggested:</span> Review Sarah
              Johnson's pre-visit summary before 10:30 AM.
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap lg:flex-nowrap justify-start lg:justify-end flex-shrink-0">
          <button
            onClick={onViewBriefing}
            className="flex items-center gap-2 bg-[#5C24FF] hover:bg-[#4A15E8] text-white px-5 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm shadow-[0_2px_8px_rgba(92, 36, 255,0.25)] transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <span>View Full Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReviewCriticalLab}
            className="bg-rose-50/50 hover:bg-rose-50 text-rose-600 border border-rose-200/80 px-4 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            Review Critical Lab
          </button>

          <button
            onClick={onReviewNotes}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 px-4 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            Review Notes
          </button>
        </div>
      </div>
    </div>
  );
};
