import React from 'react';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { ReportsFilterOptions } from '../../types/reports';

interface ReportFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ReportsFilterOptions;
  onChangeFilters: (filters: ReportsFilterOptions) => void;
  onResetFilters: () => void;
}

export const ReportFilterModal: React.FC<ReportFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const handleTypeChange = (type: ReportsFilterOptions['type']) => {
    onChangeFilters({ ...filters, type });
  };

  const handleStatusChange = (status: ReportsFilterOptions['status']) => {
    onChangeFilters({ ...filters, status });
  };

  const handlePriorityChange = (priority: ReportsFilterOptions['priority']) => {
    onChangeFilters({ ...filters, priority });
  };

  const handleDateChange = (dateRange: ReportsFilterOptions['dateRange']) => {
    onChangeFilters({ ...filters, dateRange });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-base text-slate-900">Filter Reports</h3>
              <p className="text-xs text-slate-500">Refine diagnostics by type, status, and urgency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* 1. Report Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Investigation Modality / Type
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Lab', 'Imaging', 'Diagnostic', 'Clinical'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTypeChange(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filters.type === t
                      ? 'bg-[#5C24FF] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t === 'all' ? 'All Types' : t}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Review Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Review Status
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Pending Review', 'Reviewed', 'Abnormal', 'Critical'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filters.status === s
                      ? 'bg-[#5C24FF] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s === 'all' ? 'All Statuses' : s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Clinical Priority */}
          <div className="space-y-1.5">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Clinical Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Normal', 'High', 'Urgent'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePriorityChange(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filters.priority === p
                      ? 'bg-[#5C24FF] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p === 'all' ? 'All Priorities' : p}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Date Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Receipt Date Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: 'all', label: 'All Time' },
                  { id: 'today', label: 'Today' },
                  { id: '7days', label: 'Last 7 Days' },
                  { id: '30days', label: 'Last 30 Days' },
                  { id: '3months', label: 'Last 3 Months' },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDateChange(d.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center ${
                    filters.dateRange === d.id
                      ? 'bg-[#5C24FF] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sora font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white text-xs font-sora font-semibold shadow-md hover:opacity-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
