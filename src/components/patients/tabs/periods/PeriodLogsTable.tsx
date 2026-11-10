import React from 'react';
import { FileEdit, ArrowRight, Droplet } from 'lucide-react';

interface PeriodLogItem {
  date: string;
  flowLevel: 'Heavy' | 'Medium' | 'Light';
  dropletsCount: number;
  symptoms: string[];
  mood: string;
  moodColor: string;
  painLevel: number;
  painColor: string;
  notes: string;
}

export const PeriodLogsTable: React.FC<{ onViewAll?: () => void }> = ({ onViewAll }) => {
  const logs: PeriodLogItem[] = [
    {
      date: 'Jun 01, 2026',
      flowLevel: 'Heavy',
      dropletsCount: 3,
      symptoms: ['Cramps', 'Bloating', 'Fatigue'],
      mood: 'Irritable',
      moodColor: 'bg-amber-50 text-amber-700 border-amber-100',
      painLevel: 8,
      painColor: 'text-rose-600',
      notes: 'Severe cramps',
    },
    {
      date: 'Jun 02, 2026',
      flowLevel: 'Medium',
      dropletsCount: 2,
      symptoms: ['Cramps', 'Headache'],
      mood: 'Tired',
      moodColor: 'bg-blue-50 text-blue-700 border-blue-100',
      painLevel: 6,
      painColor: 'text-amber-600',
      notes: '-',
    },
    {
      date: 'Jun 03, 2026',
      flowLevel: 'Medium',
      dropletsCount: 2,
      symptoms: ['Bloating'],
      mood: 'Okay',
      moodColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      painLevel: 4,
      painColor: 'text-indigo-600',
      notes: '-',
    },
    {
      date: 'Jun 04, 2026',
      flowLevel: 'Light',
      dropletsCount: 1,
      symptoms: [],
      mood: 'Better',
      moodColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      painLevel: 2,
      painColor: 'text-emerald-600',
      notes: '-',
    },
    {
      date: 'Jun 05, 2026',
      flowLevel: 'Light',
      dropletsCount: 1,
      symptoms: [],
      mood: 'Happy',
      moodColor: 'bg-pink-50 text-pink-700 border-pink-100',
      painLevel: 1,
      painColor: 'text-emerald-600',
      notes: '-',
    },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center">
              <FileEdit className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-sora font-bold text-slate-900 text-sm">
              Period Logs &amp; Symptoms
            </h4>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-semibold transition-colors"
          >
            <span>View All Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 font-medium text-[11px] border-b border-slate-100">
                <th className="pb-2.5 font-semibold">DATE ↑</th>
                <th className="pb-2.5 font-semibold">FLOW INTENSITY</th>
                <th className="pb-2.5 font-semibold">SYMPTOMS</th>
                <th className="pb-2.5 font-semibold">MOOD</th>
                <th className="pb-2.5 font-semibold">PAIN LEVEL</th>
                <th className="pb-2.5 font-semibold">NOTES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 font-semibold text-slate-800 whitespace-nowrap">
                    {log.date}
                  </td>

                  <td className="py-2.5">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: log.dropletsCount }).map((_, i) => (
                          <Droplet key={i} className="w-3 h-3 fill-rose-500 text-rose-500" />
                        ))}
                      </div>
                      <span className="font-medium text-slate-700 ml-1">{log.flowLevel}</span>
                    </div>
                  </td>

                  <td className="py-2.5">
                    {log.symptoms.length > 0 ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {log.symptoms.map((s, i) => {
                          const tagStyle =
                            s === 'Cramps'
                              ? 'bg-rose-50 text-rose-600 border border-rose-100'
                              : s === 'Bloating'
                              ? 'bg-purple-50 text-purple-600 border border-purple-100'
                              : s === 'Fatigue'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : s === 'Headache'
                              ? 'bg-sky-50 text-sky-600 border border-sky-100'
                              : 'bg-slate-100 text-slate-700';
                          return (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tagStyle}`}
                            >
                              {s}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>

                  <td className="py-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${log.moodColor}`}
                    >
                      {log.mood}
                    </span>
                  </td>

                  <td className="py-2.5">
                    <span className={`font-sora font-extrabold text-xs ${log.painColor}`}>
                      {log.painLevel}
                    </span>
                  </td>

                  <td className="py-2.5 text-slate-600 text-[11px] truncate max-w-[120px]">
                    {log.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
