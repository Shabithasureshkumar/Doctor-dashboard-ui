import React, { useState } from 'react';
import { Sparkles, Maximize2, ChevronDown, CheckCircle2 } from 'lucide-react';

export const TrendAnalysisCard: React.FC = () => {
  const [rangeFilter, setRangeFilter] = useState('Last 7 Days');

  const flowDays = [
    { day: 'Mon', height: '45%', color: 'from-pink-300 to-pink-400', intensity: 'Light' },
    { day: 'Tue', height: '65%', color: 'from-pink-400 to-rose-400', intensity: 'Medium' },
    { day: 'Wed', height: '90%', color: 'from-rose-500 to-rose-600', intensity: 'Heavy' },
    { day: 'Thu', height: '85%', color: 'from-rose-500 to-rose-600', intensity: 'Heavy' },
    { day: 'Fri', height: '70%', color: 'from-pink-400 to-rose-500', intensity: 'Medium' },
    { day: 'Sat', height: '50%', color: 'from-pink-300 to-pink-400', intensity: 'Light' },
    { day: 'Today', height: '80%', color: 'from-pink-400 to-rose-500', intensity: 'Medium', isToday: true },
  ];

  const mucusDays = [
    { day: 'Mon', label: 'Dry', icon: '○' },
    { day: 'Tue', label: 'Sticky', icon: '◐' },
    { day: 'Wed', label: 'Creamy', icon: '◑' },
    { day: 'Thu', label: 'Creamy', icon: '◑' },
    { day: 'Fri', label: 'Egg White', icon: '●' },
    { day: 'Sat', label: 'Watery', icon: '◎' },
    { day: 'Today', label: 'Egg White', icon: '●', isToday: true },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-sora font-bold text-slate-900 text-sm">Trend Analysis</h4>
              <p className="text-[11px] text-slate-400">
                AI-powered cycle insights from your recent health data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRangeFilter((r) => (r === 'Last 7 Days' ? 'Last 30 Days' : 'Last 7 Days'))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>{rangeFilter}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section 1: Flow Intensity Bar Chart */}
        <div className="pt-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                FLOW INTENSITY
              </span>
              <span className="text-[10px] text-slate-400 block">Daily comparison</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-200" /> Light
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Medium
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Heavy
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-700" /> Very Heavy
              </span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-24 pt-3 flex items-end justify-between gap-2 px-1">
            {flowDays.map((f, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div
                  className={`w-full max-w-[26px] rounded-lg bg-gradient-to-t ${f.color} transition-all duration-300 group-hover:opacity-90 relative ${
                    f.isToday ? 'ring-2 ring-rose-400/50' : ''
                  }`}
                  style={{ height: f.height }}
                  title={`${f.day}: ${f.intensity} Flow`}
                />
                <span
                  className={`text-[10px] mt-1.5 block font-medium ${
                    f.isToday ? 'text-rose-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {f.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Cervical Mucus Consistency */}
        <div className="pt-4 border-t border-slate-50 mt-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                CERVICAL MUCUS
              </span>
              <span className="text-[10px] text-slate-400 block">Consistency timeline</span>
            </div>

            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Peak Fertility Detected
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-2 text-center">
            {mucusDays.map((m, i) => (
              <div
                key={i}
                className={`p-1.5 rounded-xl border flex flex-col items-center justify-between ${
                  m.isToday
                    ? 'border-emerald-300 bg-emerald-50/60 ring-2 ring-emerald-200 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <span className="text-slate-500 text-xs">{m.icon}</span>
                <span
                  className={`text-[9px] font-semibold mt-0.5 leading-tight ${
                    m.isToday ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {m.label}
                </span>
                <span className="text-[8px] text-slate-400 mt-0.5">{m.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
