import React from 'react';
import { X, HeartPulse } from 'lucide-react';
import { VitalMeasurement } from '../../../types/clinical';

interface AddVitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  systolic: string;
  setSystolic: (v: string) => void;
  diastolic: string;
  setDiastolic: (v: string) => void;
  hr: string;
  setHr: (v: string) => void;
  spo2: string;
  setSpo2: (v: string) => void;
  temp: string;
  setTemp: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  rr: string;
  setRr: (v: string) => void;
  source: VitalMeasurement['source'];
  setSource: (v: VitalMeasurement['source']) => void;
}

export const AddVitalModal: React.FC<AddVitalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  systolic,
  setSystolic,
  diastolic,
  setDiastolic,
  hr,
  setHr,
  spo2,
  setSpo2,
  temp,
  setTemp,
  weight,
  setWeight,
  height,
  setHeight,
  rr,
  setRr,
  source,
  setSource,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sora font-bold text-base text-slate-900">Record New Vital Signs</h4>
              <p className="text-xs text-slate-500">Manual clinical entry or Bluetooth peripheral audit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Systolic BP (mmHg)</label>
              <input
                type="number"
                required
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Diastolic BP (mmHg)</label>
              <input
                type="number"
                required
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Heart Rate (bpm)</label>
              <input
                type="number"
                required
                value={hr}
                onChange={(e) => setHr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">SpO₂ Oxygen (%)</label>
              <input
                type="number"
                required
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                required
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Height (cm)</label>
              <input
                type="number"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Resp Rate (/min)</label>
              <input
                type="number"
                required
                value={rr}
                onChange={(e) => setRr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Telemetry / Measurement Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as VitalMeasurement['source'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
            >
              <option value="Hospital Ward">Hospital Ward Clinical Stadiometer & Monitor</option>
              <option value="Bluetooth Clinic Cuff">Bluetooth Clinic Cuff (Direct Sync)</option>
              <option value="Patient App Sync">Patient Connected App Sync</option>
              <option value="Telehealth Kit">Telehealth Home Kit</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md hover:opacity-95"
            >
              Save Vitals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
