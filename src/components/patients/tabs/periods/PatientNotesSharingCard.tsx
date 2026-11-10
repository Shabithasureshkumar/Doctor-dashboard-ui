import React, { useState } from 'react';
import { FileText, Clock, Share2, Layers, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const PatientNotesSharingCard: React.FC<{ onToast?: (msg: string) => void }> = ({ onToast }) => {
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
            <div className="w-7 h-7 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-sora font-bold text-slate-900 text-sm">
              Patient Notes &amp; Sharing
            </h4>
          </div>

          <div className="pt-3 space-y-3">
            {/* Patient Notes Quote Box */}
            <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100/60 relative">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] mb-1">
                <FileText className="w-3 h-3" />
                <span>Patient Notes</span>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                “Experiencing more cramps this cycle. Taking ibuprofen as needed.”
              </p>
              <span className="text-[10px] text-slate-400 block mt-1 font-medium">
                Jun 02, 2026
              </span>
            </div>

            {/* Last Updated */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Updated</span>
              </div>
              <span className="font-semibold text-slate-800">Jun 05, 2026, 8:30 AM</span>
            </div>

            {/* Data Sharing Status */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Data Sharing Status</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Shared with provider
              </span>
            </div>

            {/* Shared Sections */}
            <div className="text-xs py-1 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">Shared Sections</span>
              </div>
              <p className="text-[11px] text-slate-600 pl-5 leading-normal">
                Cycle data, Symptoms, Period logs, Fertility tracking (as permitted)
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2">
          <button
            onClick={() => setIsPermissionsOpen(true)}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>View Sharing Permissions</span>
          </button>
        </div>
      </div>

      {/* Permissions Modal */}
      {isPermissionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-slate-900 text-sm">
                    Sharing Permissions &amp; Consent
                  </h4>
                  <span className="text-[11px] text-slate-400">HIPAA Compliant Patient Telemetry</span>
                </div>
              </div>
              <button
                onClick={() => setIsPermissionsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-[11px] leading-relaxed flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Patient has consented to full clinical telemetry synchronization with Dr. Sarah Jenkins.</span>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { name: 'Menstrual Cycle Timeline', status: 'Active Access', allowed: true },
                  { name: 'Symptom & Pain Logs', status: 'Active Access', allowed: true },
                  { name: 'Basal Temperature Telemetry', status: 'Active Access', allowed: true },
                  { name: 'Ovulation & Fertility Predictors', status: 'Active Access', allowed: true },
                  { name: 'Direct Clinical Messaging Notes', status: 'Active Access', allowed: true },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                  >
                    <span className="font-medium text-slate-800">{p.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setIsPermissionsOpen(false);
                  onToast?.('Sharing permissions verified.');
                }}
                className="px-4 py-2 bg-slate-900 text-white font-sora font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
