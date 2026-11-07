import React from 'react';
import { FlaskConical, ClipboardCheck, ChevronRight } from 'lucide-react';

interface PendingReviewsCardsProps {
  onOpenLabReviews: () => void;
  onOpenTasks: () => void;
}

export const PendingReviewsCards: React.FC<PendingReviewsCardsProps> = ({
  onOpenLabReviews,
  onOpenTasks,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 h-full">
      {/* 1. Pending Lab Reviews */}
      <div
        onClick={onOpenLabReviews}
        className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group flex flex-1 items-center justify-between gap-3 overflow-hidden"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(154,106,251,0.35)] group-hover:scale-105 transition-transform">
            <FlaskConical className="w-6 h-6" />
          </div>

          <div className="min-w-0">
            <h4 className="font-sora font-bold text-slate-900 text-sm sm:text-base">
              Pending Lab Reviews
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
              Review abnormal and pending lab results
            </p>

            {/* Badges */}
            <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>4 High</span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>7 Medium</span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>3 Normal</span>
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5 shadow-[0_2px_8px_rgba(154,106,251,0.3)] ml-1"
          aria-label="Open Lab Reviews"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Pending Tasks */}
      <div
        onClick={onOpenTasks}
        className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group flex flex-1 items-center justify-between gap-3 overflow-hidden"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(154,106,251,0.35)] group-hover:scale-105 transition-transform">
            <ClipboardCheck className="w-6 h-6" />
          </div>

          <div className="min-w-0">
            <h4 className="font-sora font-bold text-slate-900 text-sm sm:text-base">
              Pending Tasks
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
              Complete pending clinical actions
            </p>

            {/* Badges */}
            <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>2 Critical</span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>3 Overdue</span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>5 Today</span>
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5 shadow-[0_2px_8px_rgba(154,106,251,0.3)] ml-1"
          aria-label="Open Tasks"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
