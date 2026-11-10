import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Thermometer,
  Smile,
  Activity,
  Flame,
} from 'lucide-react';

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

  const bbtDays = [
    { day: 'Mon', temp: 97.4, phase: 'Follicular' },
    { day: 'Tue', temp: 97.5, phase: 'Follicular' },
    { day: 'Wed', temp: 97.3, phase: 'Pre-ovulatory' },
    { day: 'Thu', temp: 98.2, phase: 'Ovulation Spike', isSpike: true },
    { day: 'Fri', temp: 98.4, phase: 'Luteal' },
    { day: 'Sat', temp: 98.5, phase: 'Luteal' },
    { day: 'Today', temp: 98.6, phase: 'Luteal', isToday: true },
  ];

  const painLogs = [
    { day: 'Day 1 (Jun 01)', score: 8, severity: 'Severe Cramps', color: 'bg-rose-500', notes: 'Pelvic cramping, Ibuprofen 400mg' },
    { day: 'Day 2 (Jun 02)', score: 6, severity: 'Moderate', color: 'bg-amber-500', notes: 'Lower back ache & uterine tension' },
    { day: 'Day 3 (Jun 03)', score: 4, severity: 'Mild Bloat', color: 'bg-indigo-400', notes: 'Decreasing prostaglandin' },
    { day: 'Day 4 (Jun 04)', score: 2, severity: 'Minimal', color: 'bg-emerald-400', notes: 'Almost pain-free' },
    { day: 'Day 5 (Jun 05)', score: 1, severity: 'Baseline', color: 'bg-emerald-500', notes: 'Normal pelvic comfort' },
  ];

  const moodLogs = [
    { day: 'Mon', mood: 'Irritable', emoji: '😠', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { day: 'Tue', mood: 'Tired', emoji: '😴', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { day: 'Wed', mood: 'Okay', emoji: '😐', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { day: 'Thu', mood: 'Better', emoji: '😊', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { day: 'Fri', mood: 'Happy', emoji: '😄', color: 'text-pink-600 bg-pink-50 border-pink-200' },
  ];

  return (
    <div className="bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] h-[272px] flex flex-col justify-between">
      {/* Pinned Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-3 h-3" />
          </div>
          <div>
            <h4 className="font-sora font-bold text-slate-900 text-xs sm:text-sm">Trend Analysis</h4>
            <p className="text-[9px] text-slate-400">
              Scroll below for all logged period &amp; phase telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setRangeFilter((r) => (r === 'Last 7 Days' ? 'Current Cycle (30D)' : 'Last 7 Days'))}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[9px] font-semibold hover:bg-slate-50 transition-colors"
          >
            <span>{rangeFilter}</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Comprehensive Scrollable Trends Container */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 custom-scrollbar space-y-3 pt-1.5">
        {/* Trend 1: Flow Intensity Bar Chart */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                1. FLOW INTENSITY
              </span>
              <span className="text-[9px] text-slate-400 block">Daily cycle volume comparison</span>
            </div>

            <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-200" /> Light
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Med
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Heavy
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-700" /> V.Heavy
              </span>
            </div>
          </div>

          <div className="h-16 pt-1.5 flex items-end justify-between gap-1.5 px-0.5">
            {flowDays.map((f, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div
                  className={`w-full max-w-[22px] rounded-md bg-gradient-to-t ${f.color} transition-all duration-300 group-hover:opacity-90 relative ${
                    f.isToday ? 'ring-1.5 ring-rose-400/50' : ''
                  }`}
                  style={{ height: f.height }}
                  title={`${f.day}: ${f.intensity} Flow`}
                />
                <span
                  className={`text-[8px] mt-0.5 block font-medium ${
                    f.isToday ? 'text-rose-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {f.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend 2: Cervical Mucus Consistency */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                2. CERVICAL MUCUS
              </span>
              <span className="text-[9px] text-slate-400 block">Consistency &amp; fertility timeline</span>
            </div>

            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-100">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
              Peak Fertility
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 pt-1 text-center">
            {mucusDays.map((m, i) => (
              <div
                key={i}
                className={`p-1 rounded-lg border flex flex-col items-center justify-between ${
                  m.isToday
                    ? 'border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200 shadow-xs'
                    : 'border-slate-100 bg-slate-50/40'
                }`}
              >
                <span className="text-slate-500 text-[10px]">{m.icon}</span>
                <span
                  className={`text-[8px] font-semibold mt-0.5 leading-tight ${
                    m.isToday ? 'text-emerald-700 font-bold' : 'text-slate-600'
                  }`}
                >
                  {m.label}
                </span>
                <span className="text-[7px] text-slate-400">{m.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend 3: Basal Body Temperature (BBT) & Ovulatory Shift Curve */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-purple-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                  3. BASAL BODY TEMPERATURE (BBT)
                </span>
                <span className="text-[9px] text-slate-400 block">Thermal shift curve</span>
              </div>
            </div>

            <span className="text-[8px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-full border border-purple-100">
              🔥 +0.9°F Spike
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 pt-1 text-center">
            {bbtDays.map((b, i) => (
              <div
                key={i}
                className={`p-1 rounded-lg border text-center transition-all ${
                  b.isSpike
                    ? 'border-purple-300 bg-purple-50/70 ring-1 ring-purple-300'
                    : 'border-slate-100 bg-slate-50/40'
                }`}
              >
                <span className="text-[7px] text-slate-400 block">{b.day}</span>
                <span className={`text-[10px] font-extrabold block ${b.isSpike ? 'text-[#7C3AED]' : 'text-slate-800'}`}>
                  {b.temp}°
                </span>
                <span className={`text-[7px] font-medium block truncate ${b.isSpike ? 'text-purple-600 font-bold' : 'text-slate-400'}`}>
                  {b.isSpike ? 'Spike' : b.temp > 98 ? 'Luteal' : 'Follicular'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend 4: Dysmenorrhea & Pain Severity Tracker */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-500" />
              <div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                  4. CRAMPS &amp; PAIN SEVERITY
                </span>
                <span className="text-[9px] text-slate-400 block">Pelvic discomfort tracking</span>
              </div>
            </div>

            <span className="text-[8px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100">
              Peak: Day 1 (8/10)
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {painLogs.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-1 bg-slate-50/60 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded ${p.color} text-white flex items-center justify-center font-bold text-[9px]`}>
                    {p.score}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px]">{p.day}: </span>
                    <span className="text-slate-500 text-[9px]">{p.notes}</span>
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-slate-600">{p.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend 5: Mood & Emotional Rhythm */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Smile className="w-3 h-3 text-amber-500" />
              <div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                  5. MOOD &amp; EMOTIONAL RHYTHM
                </span>
                <span className="text-[9px] text-slate-400 block">Hormonal mood correlation</span>
              </div>
            </div>
            <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              Post-Period Energy
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1 text-center">
            {moodLogs.map((m, i) => (
              <div key={i} className={`p-1 rounded-lg border ${m.color}`}>
                <span className="text-xs block">{m.emoji}</span>
                <span className="text-[9px] font-bold block">{m.mood}</span>
                <span className="text-[7px] text-slate-400 block">{m.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend 6: LH Surge & Ovulation Predictor */}
        <div className="pt-2 border-t border-slate-100 pb-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-indigo-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block">
                  6. LH SURGE &amp; OVULATION (OPK)
                </span>
                <span className="text-[9px] text-slate-400 block">Luteinizing Hormone (mIU/mL)</span>
              </div>
            </div>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">
              Peak: Day 12
            </span>
          </div>

          <div className="p-1.5 bg-indigo-50/40 rounded-lg border border-indigo-100/60 mt-1 text-[9px] text-slate-700 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-600">Day 11 (Surge Init):</span>
              <strong className="text-indigo-600">38 mIU/mL</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-600">Day 12 (Peak Surge):</span>
              <strong className="text-emerald-700">68 mIU/mL (Confirmed)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
