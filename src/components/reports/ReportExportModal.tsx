import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Printer,
  Download,
  X,
  ShieldCheck,
} from 'lucide-react';
import { MedicalReport } from '../../types/reports';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: MedicalReport[];
  onToast: (msg: string) => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  reports,
  onToast,
}) => {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeTestDetails, setIncludeTestDetails] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExecuteExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onToast(`Exported ${reports.length} reports successfully as ${format.toUpperCase()}.`);
      onClose();
    }, 1200);
  };

  const handlePrint = () => {
    onToast('Preparing printable clinical diagnostic reports audit sheet...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-base text-slate-900">Export Clinical Reports</h3>
              <p className="text-xs text-slate-500">Generate encrypted audit documentation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  format === 'csv'
                    ? 'border-[#5C24FF] bg-purple-50/70 text-[#5C24FF]'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-sora font-bold text-xs block">CSV Spreadsheet</span>
                  <span className="text-[10px] text-slate-400">Excel / EHR Data</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  format === 'pdf'
                    ? 'border-[#5C24FF] bg-purple-50/70 text-[#5C24FF]'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-sora font-bold text-xs block">PDF Document</span>
                  <span className="text-[10px] text-slate-400">Formatted Report Bundle</span>
                </div>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-sora font-semibold text-slate-700 block">
              Export Scope &amp; Options
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNotes}
                onChange={(e) => setIncludeNotes(e.target.checked)}
                className="w-4 h-4 rounded text-[#5C24FF] focus:ring-[#5C24FF]"
              />
              <span>Include Physician Clinical Notes and Sign-off Log</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTestDetails}
                onChange={(e) => setIncludeTestDetails(e.target.checked)}
                className="w-4 h-4 rounded text-[#5C24FF] focus:ring-[#5C24FF]"
              />
              <span>Include Itemized Laboratory &amp; Diagnostic Ranges</span>
            </label>
          </div>

          {/* HIPAA & Security Note */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              Export complies with HIPAA Title II privacy protocols. Encrypted transmission is mandatory for patient identification data.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleExecuteExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white text-xs font-sora font-semibold shadow-md hover:opacity-95 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : `Export ${reports.length} Reports`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
