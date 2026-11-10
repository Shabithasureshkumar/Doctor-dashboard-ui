import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

interface ReportSummaryCardsProps {
  totalCount: number;
  pendingCount: number;
  reviewedCount: number;
  abnormalCount: number;
  onFilterByStatus?: (status: string) => void;
}

export const ReportSummaryCards: React.FC<ReportSummaryCardsProps> = ({
  totalCount,
  pendingCount,
  reviewedCount,
  abnormalCount,
  onFilterByStatus,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Total Reports */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-purple-100/70 transition-colors" />
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            +12.4% vs last mo
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Reports
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {totalCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">all investigations</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Aggregated diagnostic &amp; laboratory results across enrolled patients.
          </p>
        </div>
      </div>

      {/* 2. Pending Reviews */}
      <div
        onClick={() => onFilterByStatus?.('Pending Review')}
        className="bg-white rounded-3xl border border-amber-100/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/70 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-amber-100/80 transition-colors" />
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-xs">
            <Clock className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Action Required
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Pending Reviews
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {pendingCount}
            </span>
            <span className="text-xs text-amber-600 font-medium">awaiting sign-off</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Clinical results waiting for physician evaluation and sign-off.
          </p>
        </div>
      </div>

      {/* 3. Reviewed Reports */}
      <div
        onClick={() => onFilterByStatus?.('Reviewed')}
        className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-emerald-100/70 transition-colors" />
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            92% rate
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Reviewed Reports
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {reviewedCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">signed off</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Care notes entered and shared with patient telehealth record.
          </p>
        </div>
      </div>

      {/* 4. Abnormal / Critical Results */}
      <div
        onClick={() => onFilterByStatus?.('Abnormal')}
        className="bg-white rounded-3xl border border-rose-100/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/70 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-rose-100/80 transition-colors" />
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <ArrowUpRight className="w-3 h-3 text-rose-600" />
            Clinical Alerts
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
            Abnormal Results
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-sora font-extrabold text-2xl sm:text-3xl text-rose-600 tracking-tight">
              {abnormalCount}
            </span>
            <span className="text-xs text-rose-600/80 font-medium">out-of-range</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Values outside reference boundaries requiring priority follow-up.
          </p>
        </div>
      </div>
    </div>
  );
};
