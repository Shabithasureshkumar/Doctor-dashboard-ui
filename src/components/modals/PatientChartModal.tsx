import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Activity, AlertTriangle, FileText, Pill, Plus } from 'lucide-react';
import { Avatar } from '../common/Avatar';

interface PatientChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  onNewPrescription?: (name: string) => void;
  onVirtualVisit?: (name: string) => void;
}

export const PatientChartModal: React.FC<PatientChartModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Sarah Johnson',
  onNewPrescription,
  onVirtualVisit,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'meds' | 'labs'>('overview');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Patient Chart — ${patientName}`}
      subtitle="Comprehensive Electronic Health Record (EHR)"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Patient Profile Header */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              alt={patientName}
              initials="SJ"
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                  {patientName}
                </h4>
                <span className="bg-purple-100 text-[#6E56CF] text-[10px] font-sora font-bold px-2 py-0.5 rounded">
                  61 F · MRN-849201
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary Condition:{' '}
                <strong className="text-[#6E56CF] font-semibold">Hypertension follow-up</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onVirtualVisit?.(patientName);
                onClose();
              }}
              className="bg-[#6E56CF] hover:bg-[#5E45BE] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all"
            >
              Start Visit
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-sora font-semibold">
          {(['overview', 'vitals', 'meds', 'labs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-[#6E56CF] text-[#6E56CF]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* Active Alert */}
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-sora font-bold text-xs text-rose-700 block">
                  Active Clinical Alert: High Blood Pressure
                </span>
                <p className="text-xs text-rose-600 mt-0.5">
                  BP 152/103 mmHg trending up over 5 days. Consider medication titration or lifestyle review.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">BP Average</span>
                <p className="font-sora font-bold text-base text-slate-900 mt-0.5">133/86 mmHg</p>
                <span className="text-[10px] text-amber-600 font-medium">Recent spike: 152/103</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">LDL Cholesterol</span>
                <p className="font-sora font-bold text-base text-slate-900 mt-0.5">135 mg/dL</p>
                <span className="text-[10px] text-emerald-600 font-medium">Improving (-12%)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Rx Adherence</span>
                <p className="font-sora font-bold text-base text-slate-900 mt-0.5">92%</p>
                <span className="text-[10px] text-slate-500 font-medium">Past 30 days</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Today (Office / Telehealth)</span>
              <span className="font-sora font-bold text-rose-600">152/103 mmHg</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-600">3 Days Ago (Home Monitor)</span>
              <span className="font-sora font-semibold text-slate-800">144/94 mmHg</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-600">1 Week Ago (Home Monitor)</span>
              <span className="font-sora font-semibold text-slate-800">136/88 mmHg</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Heart Rate (Resting)</span>
              <span className="font-sora font-semibold text-slate-800">74 bpm (Regular)</span>
            </div>
          </div>
        )}

        {activeTab === 'meds' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="font-sora font-semibold text-slate-900 block">Lisinopril 10mg</span>
                <span className="text-slate-400 text-[11px]">1 tablet daily · 2 refills remaining</span>
              </div>
              <button
                onClick={() => {
                  onNewPrescription?.(patientName);
                  onClose();
                }}
                className="text-xs font-semibold text-[#6E56CF] hover:underline"
              >
                Modify Rx
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="font-sora font-semibold text-slate-900 block">Atorvastatin 20mg</span>
                <span className="text-slate-400 text-[11px]">1 tablet nightly at bedtime</span>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Adherent
              </span>
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="font-sora font-semibold text-slate-900 block">Comprehensive Metabolic Panel (CMP)</span>
                <span className="text-slate-400 text-[11px]">Collected Jun 20, 2026 · LabCorp</span>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                Normal
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="font-sora font-semibold text-slate-900 block">Lipid Panel with Non-HDL</span>
                <span className="text-slate-400 text-[11px]">Collected May 15, 2026 · LDL 135 mg/dL</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Improving
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close Chart
          </button>
          <button
            onClick={() => {
              onNewPrescription?.(patientName);
              onClose();
            }}
            className="flex items-center gap-1.5 bg-[#6E56CF] hover:bg-[#5E45BE] text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Prescription</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
