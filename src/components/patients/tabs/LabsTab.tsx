import React from 'react';
import {
  FlaskConical,
  Download,
} from 'lucide-react';
import { PatientRecord } from '../../../mockData/patientsData';

interface LabsTabProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const LabsTab: React.FC<LabsTabProps> = ({ onToast }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sora font-bold text-base text-slate-900">
                Diagnostic Laboratory Results
              </h4>
              <p className="text-xs text-slate-500">
                Recent blood panels, biochemistry & metabolic profiles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToast('Downloading Official Lab Results PDF...')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#5C24FF] hover:bg-purple-50 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => onToast('Order Lab Test requisition panel opened.')}
              className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl hover:opacity-95"
            >
              + Order New Lab
            </button>
          </div>
        </div>

        {/* Lab Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Panel 1: Comprehensive Metabolic Panel (CMP) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-800">
                Comprehensive Metabolic Panel
              </span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Completed Oct 24, 2026
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Fasting Glucose</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">94 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Normal (70-99)
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Serum Creatinine</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">0.8 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Normal (0.6-1.1)
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">eGFR (MDRD)</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">&gt; 90 mL/min</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Optimal
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-600">BUN</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">14 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Normal (7-20)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Lipid Profile */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-800">
                Lipid Profile (Fasting)
              </span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Completed Oct 24, 2026
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Total Cholesterol</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">188 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Desirable (&lt;200)
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">HDL (Good) Cholesterol</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">56 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Optimal (&gt;50)
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">LDL (Bad) Cholesterol</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">112 mg/dL</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                    Borderline (100-129)
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-600">Triglycerides</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">148 mg/dL</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Normal (&lt;150)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Complete Blood Count */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-800">
                Complete Blood Count (CBC)
              </span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Hemoglobin</span>
                <span className="font-bold text-slate-900">13.4 g/dL</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">WBC Count</span>
                <span className="font-bold text-slate-900">6.8 x10³/µL</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Platelets</span>
                <span className="font-bold text-slate-900">240 x10³/µL</span>
              </div>
            </div>
          </div>

          {/* Panel 4: Hormonal & Endocrine */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sora font-bold text-xs sm:text-sm text-slate-800">
                Hormonal & Glycemic Biomarkers
              </span>
              <span className="text-[10px] font-semibold bg-purple-50 text-[#5C24FF] px-2 py-0.5 rounded-full">
                PCOS Protocol
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">HbA1c</span>
                <span className="font-bold text-slate-900">5.4%</span>
                <span className="text-[9px] text-emerald-600 block">Optimal</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">TSH (Thyroid)</span>
                <span className="font-bold text-slate-900">1.85 mIU/L</span>
                <span className="text-[9px] text-emerald-600 block">Normal</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Fasting Insulin</span>
                <span className="font-bold text-slate-900">8.2 µIU/mL</span>
                <span className="text-[9px] text-emerald-600 block">Controlled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
