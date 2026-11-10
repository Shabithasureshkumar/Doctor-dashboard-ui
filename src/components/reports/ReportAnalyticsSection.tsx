import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  REPORTS_OVER_TIME,
  REPORTS_BY_CATEGORY,
  REVIEW_STATUS_DISTRIBUTION,
} from '../../mockData/reportsData';

export const ReportAnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '3months'>('7days');

  // Max for relative scaling
  const maxOverTime = Math.max(...REPORTS_OVER_TIME.map((d) => d.count), 40);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Analytics Header & Date Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#5C24FF]" />
            <span>Clinical Diagnostics Analytics</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Throughput, category breakdowns, and clinical sign-off distribution
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl self-start sm:self-center">
          {(
            [
              { id: '7days', label: 'Last 7 Days' },
              { id: '30days', label: 'Last 30 Days' },
              { id: '3months', label: 'Last 3 Months' },
            ] as const
          ).map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sora font-semibold transition-all ${
                timeRange === range.id
                  ? 'bg-white text-[#5C24FF] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 3 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Reports Received Over Time (Visual Bar / Line Hybrid) */}
        <div className="lg:col-span-6 bg-slate-50/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
                Reports Received Over Time
              </span>
              <span className="text-[11px] text-slate-400">Weekly intake volume vs abnormal cases</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#5C24FF]" /> Total Received
              </span>
              <span className="flex items-center gap-1 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Abnormal
              </span>
            </div>
          </div>

          {/* Bar Visualization */}
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {REPORTS_OVER_TIME.map((item) => {
              const heightPct = Math.round((item.count / maxOverTime) * 100);
              const abnormalPct = Math.round((item.abnormal / item.count) * 100);

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap shadow-md z-10">
                    {item.count} Reports ({item.abnormal} Abnormal)
                  </div>

                  <div className="w-full max-w-[28px] bg-purple-100/80 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover:bg-purple-200" style={{ height: `${heightPct}%` }}>
                    <div
                      className="w-full bg-gradient-to-t from-[#5C24FF] to-[#9A6AFB] rounded-t-lg transition-all"
                      style={{ height: '70%' }}
                    />
                    {item.abnormal > 0 && (
                      <div
                        className="w-full bg-rose-500"
                        style={{ height: `${abnormalPct}%` }}
                        title={`${item.abnormal} Abnormal`}
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 group-hover:text-[#5C24FF] transition-colors">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Reports by Category (Donut / Segmented Visual) */}
        <div className="lg:col-span-3 bg-slate-50/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div>
            <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
              Reports by Category
            </span>
            <span className="text-[11px] text-slate-400">Modality distribution breakdown</span>
          </div>

          {/* Category Progress Bars & Distribution */}
          <div className="space-y-3 py-1">
            {REPORTS_BY_CATEGORY.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{cat.name}</span>
                  <span className="font-sora font-bold text-slate-900">{cat.percentage}% ({cat.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Total Investigated:</span>
            <strong className="text-slate-800 font-sora">142 Investigations</strong>
          </div>
        </div>

        {/* Chart 3: Review Status Distribution (Status Pipeline) */}
        <div className="lg:col-span-3 bg-slate-50/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div>
            <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block">
              Review Status Pipeline
            </span>
            <span className="text-[11px] text-slate-400">Physician triage &amp; sign-off rate</span>
          </div>

          <div className="space-y-3 py-1">
            {REVIEW_STATUS_DISTRIBUTION.map((item) => (
              <div key={item.status} className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-semibold text-slate-800">{item.status}</span>
                </div>
                <span className="font-sora font-extrabold text-xs text-slate-900 px-2 py-0.5 rounded-md bg-slate-100">
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Sign-off SLA:</span>
            <strong className="text-emerald-600 font-semibold">&lt; 4 Hours avg</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
