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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5">
      {/* 1. Current Cycle Status (Wider, Pink Gradient Card) */}
      <div className="lg:col-span-2 bg-gradient-to-br from-[#FFF1F3] via-[#FFE4E8] to-[#FFF5F7] rounded-[24px] p-5 border border-rose-100 shadow-[0_2px_14px_rgba(255,100,130,0.08)] relative overflow-hidden flex flex-col justify-between">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
            </span>
            <span>Current Cycle Status</span>
            <button
              onClick={onInfoClick}
              className="text-rose-400 hover:text-rose-600 transition-colors"
              title="Cycle status details"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-3">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 bg-white/90 text-rose-600 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-rose-100/60">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Day 2 of 5
            </span>

            <h3 className="font-sora font-extrabold text-2xl text-rose-600 tracking-tight">
              Menstruation Phase
            </h3>

            <p className="text-xs text-rose-600/90 font-medium">
              Jun 01, 2026 – Jun 05, 2026
            </p>
          </div>

          {/* 3D-styled Calendar & Droplet Illustration */}
          <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
            {/* Background glowing droplet */}
            <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 opacity-90 shadow-lg flex items-center justify-center text-white">
              <Droplet className="w-5 h-5 fill-white text-white drop-shadow" />
            </div>

            {/* Floating mini heart */}
            <div className="absolute bottom-2 left-0 w-5 h-5 rounded-full bg-pink-100 text-rose-500 flex items-center justify-center shadow-xs">
              <span className="text-[10px]">❤️</span>
            </div>

            {/* Modern 3D Calendar Card */}
            <div className="w-18 h-18 bg-white/95 rounded-2xl p-2.5 shadow-[0_8px_20px_rgba(255,100,130,0.18)] border border-rose-100 flex flex-col justify-between transform rotate-[-3deg] hover:rotate-0 transition-transform">
              <div className="flex items-center justify-between pb-1 border-b border-rose-100">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                </div>
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">JUN</span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-200" />
                <span className="w-2 h-2 rounded-full bg-rose-300" />
                <span className="w-2 h-2 rounded-full bg-rose-200" />
                <span className="w-2 h-2 rounded-full bg-rose-200" />
                <span className="w-2 h-2 rounded-full bg-slate-100" />
                <span className="w-2 h-2 rounded-full bg-slate-100" />
                <span className="w-2 h-2 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Last Menstrual Period (LMP) */}
      <div className="bg-white rounded-[24px] p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-5 h-5 rounded-lg bg-pink-50 text-rose-500 flex items-center justify-center">
              <Calendar className="w-3 h-3" />
            </div>
            <span>Last Menstrual Period (LMP)</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-base sm:text-lg pt-1">
            Jun 01 – Jun 05, 2026
          </div>
        </div>

        <div className="pt-3 space-y-1.5">
          {/* 5 blocks indicating 5 days duration */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className="flex-1 h-3 rounded-md bg-gradient-to-r from-rose-400 to-rose-500 shadow-xs"
                title={`Day ${d}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">
            5 days duration
          </span>
        </div>
      </div>

      {/* 3. Average Cycle Length */}
      <div className="bg-white rounded-[24px] p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-5 h-5 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
              <RotateCw className="w-3 h-3" />
            </div>
            <span>Average Cycle Length</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-xl pt-1">
            28 days
          </div>
        </div>

        <div className="pt-2 space-y-1">
          {/* Purple Sine-wave Sparkline */}
          <div className="h-6 flex items-center">
            <svg className="w-full h-5 text-[#8B5CF6]" viewBox="0 0 140 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M 0 10 Q 18 2, 35 10 T 70 10 T 105 10 T 140 10" />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">
            Based on last 6 cycles
          </span>
        </div>
      </div>

      {/* 4. Average Period Duration */}
      <div className="bg-white rounded-[24px] p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-5 h-5 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <Droplet className="w-3 h-3" />
            </div>
            <span>Average Period Duration</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-xl pt-1">
            5 days
          </div>
        </div>

        <div className="pt-2 space-y-1">
          {/* Rose line Sparkline */}
          <div className="h-6 flex items-center">
            <svg className="w-full h-5 text-rose-400" viewBox="0 0 140 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M 0 12 Q 25 15, 50 11 T 90 9 T 140 11" />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">
            Based on last 6 cycles
          </span>
        </div>
      </div>

      {/* 5. Cycle Regularity */}
      <div className="bg-white rounded-[24px] p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BarChart2 className="w-3 h-3" />
            </div>
            <span>Cycle Regularity</span>
          </div>

          <div className="font-sora font-extrabold text-emerald-600 text-xl pt-1">
            Regular
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          {/* Range Slider Track */}
          <div className="relative h-2 bg-slate-100 rounded-full flex items-center px-1">
            <div className="absolute left-[35%] right-[30%] h-1.5 bg-emerald-300 rounded-full" />
            <div className="absolute left-[52%] w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">
            Cycle range: 26–30 days
          </span>
        </div>
      </div>

      {/* 6. Next Period (Predicted) */}
      <div className="bg-white rounded-[24px] p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <div className="w-5 h-5 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
              <Calendar className="w-3 h-3" />
            </div>
            <span>Next Period (Predicted)</span>
          </div>

          <div className="font-sora font-extrabold text-slate-900 text-lg pt-1">
            Jun 29, 2026
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          {/* Progress bar */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-[#7C3AED] rounded-full w-[12%]" />
          </div>
          <span className="text-[11px] text-slate-400 font-medium block">
            In 27 days
          </span>
        </div>
      </div>
    </div>
  );
};
