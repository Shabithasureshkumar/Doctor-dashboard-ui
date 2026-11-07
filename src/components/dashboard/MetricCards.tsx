import React from 'react';
import { Users, Calendar as CalendarIcon, FileText, Eye, ArrowUp } from 'lucide-react';

interface MetricCardsProps {
  onCardClick?: (metric: string) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 items-center">
      {/* 1. Patients */}
      <div
        onClick={() => onCardClick?.('patients')}
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#5C24FF] bg-purple-50 px-2.5 py-1 rounded-full">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>8%</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Patients</p>
        <h3 className="font-sora font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          35
        </h3>
      </div>

      {/* 2. Appointments (Featured Purple Card) */}
      <div
        onClick={() => onCardClick?.('appointments')}
        className="bg-gradient-to-br from-[#9A6AFB] to-[#5C24FF] rounded-3xl px-5 sm:px-6 py-7 sm:py-9 text-white shadow-[0_6px_22px_rgba(154,106,251,0.4)] hover:opacity-95 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-xs">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>3%</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-purple-100 mb-1">Appointments</p>
        <h3 className="font-sora font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          16
        </h3>
      </div>

      {/* 3. Reports */}
      <div
        onClick={() => onCardClick?.('reports')}
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#5C24FF] bg-purple-50 px-2.5 py-1 rounded-full">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>5%</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Reports</p>
        <h3 className="font-sora font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          22
        </h3>
      </div>

      {/* 4. Total Visitor */}
      <div
        onClick={() => onCardClick?.('visitors')}
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Eye className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#5C24FF] bg-purple-50 px-2.5 py-1 rounded-full">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>3%</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Total Visitor</p>
        <h3 className="font-sora font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          32
        </h3>
      </div>
    </div>
  );
};
