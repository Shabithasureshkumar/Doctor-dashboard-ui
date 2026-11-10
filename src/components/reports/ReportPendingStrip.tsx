import React from 'react';
import { ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { MedicalReport } from '../../types/reports';

interface ReportPendingStripProps {
  pendingReports: MedicalReport[];
  onSelectReport: (report: MedicalReport) => void;
}

export const ReportPendingStrip: React.FC<ReportPendingStripProps> = ({
  pendingReports,
  onSelectReport,
}) => {
  if (pendingReports.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50/90 via-white to-amber-50/60 rounded-3xl border border-purple-200/80 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sora font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>Urgent &amp; Pending Reviews</span>
              <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {pendingReports.length} Needs Attention
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Diagnostic findings requiring timely physician triage and therapeutic decision
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#5C24FF]" />
          <span>Priority Triage Queue</span>
        </div>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {pendingReports.slice(0, 3).map((rep) => {
          const isUrgent = rep.priority === 'Urgent';
          return (
            <div
              key={rep.id}
              onClick={() => onSelectReport(rep)}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={rep.patientAvatar}
                  alt={rep.patientName}
                  className="w-10 h-10 rounded-xl object-cover border border-purple-100 flex-shrink-0 shadow-2xs"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-sora font-bold text-xs text-slate-900 truncate">
                      {rep.patientName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {rep.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                    {rep.testName}
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    Received: {rep.receivedDate}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectReport(rep);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-[#5C24FF] text-[#5C24FF] hover:text-white font-sora font-semibold text-xs transition-colors shadow-2xs flex-shrink-0"
              >
                <span>Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
