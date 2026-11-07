import React from 'react';
import { Modal } from '../common/Modal';
import { Sparkles } from 'lucide-react';
import { CURRENT_DOCTOR } from '../../mockData';

interface FullBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChart: (patientName: string) => void;
}

export const FullBriefingModal: React.FC<FullBriefingModalProps> = ({
  isOpen,
  onClose,
  onOpenChart,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ava's Morning Intelligence Brief"
      subtitle={`Generated at 07:45 AM for ${CURRENT_DOCTOR.greetingName}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Executive Summary */}
        <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#6E56CF] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
              Executive AI Synthesis
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dr. Rivers, today is scheduled with 8 visits (4 video telehealth, 4 in-clinic). 2
              critical items require early intervention: Mike Lee's potassium result and Sarah
              Johnson's upward BP trend.
            </p>
          </div>
        </div>

        {/* Actionable Priorities */}
        <div className="space-y-2.5">
          <h5 className="font-sora font-bold text-xs text-slate-700 uppercase tracking-wider">
            High Priority Actions
          </h5>

          {/* Priority 1 */}
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between gap-3">
            <div>
              <span className="font-sora font-bold text-xs text-rose-700 block">
                1. Review Mike Lee's Critical Chemistry
              </span>
              <p className="text-[11px] text-rose-600">
                K+ 6.1 mmol/L (Severe hyperkalemia). ECG and medication hold recommended.
              </p>
            </div>
            <button
              onClick={() => {
                onOpenChart('Mike Lee');
                onClose();
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xs"
            >
              Review Lab
            </button>
          </div>

          {/* Priority 2 */}
          <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl flex items-center justify-between gap-3">
            <div>
              <span className="font-sora font-bold text-xs text-[#6E56CF] block">
                2. Sarah Johnson Pre-Visit Preparation
              </span>
              <p className="text-[11px] text-slate-600">
                Scheduled at 10:30 AM. AI pre-visit intake complete. Vitals review pending.
              </p>
            </div>
            <button
              onClick={() => {
                onOpenChart('Sarah Johnson');
                onClose();
              }}
              className="bg-[#6E56CF] hover:bg-[#5E45BE] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xs"
            >
              Open Chart
            </button>
          </div>

          {/* Priority 3 */}
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between gap-3">
            <div>
              <span className="font-sora font-bold text-xs text-amber-700 block">
                3. Emily Chen Statin Non-Adherence
              </span>
              <p className="text-[11px] text-slate-600">
                Pharmacy refill records show 48% compliance over last month. In-person visit at 12:00 PM.
              </p>
            </div>
            <button
              onClick={() => {
                onOpenChart('Emily Chen');
                onClose();
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xs"
            >
              Prepare Notes
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
