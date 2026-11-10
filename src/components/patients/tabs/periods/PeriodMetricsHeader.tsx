import React from 'react';
import {
  Calendar,
  RotateCw,
  Droplet,
  BarChart2,
  Info,
} from 'lucide-react';

interface PeriodMetricsHeaderProps {
  onInfoClick?: () => void;
}

export const PeriodMetricsHeader: React.FC<PeriodMetricsHeaderProps> = ({ onInfoClick }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap gap-3 sm:gap-3.5 w-full items-stretch">
      {/* 1. Current Cycle Status (Wider, Pink Gradient Card) */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:w-[27%] flex-shrink-0 bg-gradient-to-r from-[#FFE8F0] via-[#FFDCE6] to-[#FFD5E3] rounded-[22px] p-3.5 sm:p-4 border border-rose-200/60 shadow-[0_2px_14px_rgba(255,100,130,0.08)] relative overflow-hidden flex flex-col justify-between min-h-[118px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold">
            <span className="w-4.5 h-4.5 rounded-full bg-rose-200/60 flex items-center justify-center text-rose-600">
              <Droplet className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
            </span>
            <span>Current Cycle Status</span>
            <button
              onClick={onInfoClick}
              className="text-rose-400 hover:text-rose-600 transition-colors ml-0.5"
              title="Cycle status details"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="space-y-0.5 min-w-0">
            <span className="inline-flex items-center gap-1 bg-white text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-rose-100">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Day 2 of 5
            </span>

            <h3 className="font-sora font-extrabold text-lg sm:text-xl text-rose-600 tracking-tight leading-tight truncate">
              Menstruation Phase
            </h3>

            <p className="text-[10px] text-rose-500/90 font-medium truncate">
              Jun 01, 2026 – Jun 05, 2026
            </p>
          </div>

          {/* 3D Calendar with Droplets matching exact height */}
          <div className="flex-shrink-0">
            <img
              src="/vitals/periods_3d_calendar_transparent.png"
              alt="Cycle status 3D illustration"
              className="w-20 h-16 object-contain pointer-events-none select-none drop-shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* 2. Last Menstrual Period (LMP) */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:flex-1 bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between min-h-[118px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-4.5 h-4.5 rounded-lg bg-pink-50 text-rose-500 flex items-center justify-center">
              <Calendar className="w-3 h-3" />
            </div>
            <span className="truncate">Last Menstrual Period (LMP)</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-sm sm:text-base pt-0.5 truncate">
            Jun 01 – Jun 05, 2026
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className="flex-1 h-2.5 rounded-md bg-gradient-to-r from-rose-400 to-rose-500 shadow-xs"
                title={`Day ${d}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            5 days duration
          </span>
        </div>
      </div>

      {/* 3. Average Cycle Length */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:flex-1 bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between min-h-[118px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-4.5 h-4.5 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
              <RotateCw className="w-3 h-3" />
            </div>
            <span className="truncate">Average Cycle Length</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-lg sm:text-xl pt-0.5">
            28 days
          </div>
        </div>

        <div className="pt-1 space-y-1">
          <div className="h-4 flex items-center">
            <svg className="w-full h-3.5 text-[#8B5CF6]" viewBox="0 0 140 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M 0 9 Q 20 2, 40 9 T 80 9 T 120 9 T 140 9" />
            </svg>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            Based on last 6 cycles
          </span>
        </div>
      </div>

      {/* 4. Average Period Duration */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:flex-1 bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between min-h-[118px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-4.5 h-4.5 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <Droplet className="w-3 h-3" />
            </div>
            <span className="truncate">Average Period Duration</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-lg sm:text-xl pt-0.5">
            5 days
          </div>
        </div>

        <div className="pt-1 space-y-1">
          <div className="h-4 flex items-center">
            <svg className="w-full h-3.5 text-rose-400" viewBox="0 0 140 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M 0 11 Q 25 14, 50 10 T 90 8 T 140 10" />
            </svg>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            Based on last 6 cycles
          </span>
        </div>
      </div>

      {/* 5. Cycle Regularity */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:flex-1 bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between min-h-[118px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-4.5 h-4.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BarChart2 className="w-3 h-3" />
            </div>
            <span className="truncate">Cycle Regularity</span>
          </div>

          <div className="font-sora font-extrabold text-emerald-600 text-lg sm:text-xl pt-0.5">
            Regular
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          <div className="relative h-2 bg-slate-100 rounded-full flex items-center px-1">
            <div className="absolute left-[35%] right-[30%] h-1.5 bg-emerald-300 rounded-full" />
            <div className="absolute left-[52%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            Cycle range: 26–30 days
          </span>
        </div>
      </div>

      {/* 6. Next Period (Predicted) */}
      <div className="w-full sm:w-[calc(50%-6px)] xl:flex-1 bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between min-h-[118px]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-4.5 h-4.5 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
              <Calendar className="w-3 h-3" />
            </div>
            <span className="truncate">Next Period (Predicted)</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-sm sm:text-base pt-0.5 truncate">
            Jun 29, 2026
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-[#7C3AED] rounded-full w-[15%]" />
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">
            In 27 days
          </span>
        </div>
      </div>
    </div>
  );
};
