import React from 'react';
import { X, Edit2 } from 'lucide-react';
import { VitalMeasurement } from '../../../types/clinical';

interface EditVitalModalProps {
  reading: VitalMeasurement | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setReading: (reading: VitalMeasurement) => void;
}

export const EditVitalModal: React.FC<EditVitalModalProps> = ({
  reading,
  onClose,
  onSubmit,
  setReading,
}) => {
  if (!reading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
        <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <Edit2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sora font-bold text-base text-slate-900">Edit Vital Reading</h4>
              <p className="text-xs text-slate-500">{reading.date} • {reading.time}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Systolic</label>
              <input
                type="number"
                value={reading.systolic}
                onChange={(e) =>
                  setReading({
                    ...reading,
                    systolic: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Diastolic</label>
              <input
                type="number"
                value={reading.diastolic}
                onChange={(e) =>
                  setReading({
                    ...reading,
                    diastolic: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Heart Rate (bpm)</label>
            <input
              type="number"
              value={reading.heartRate}
              onChange={(e) =>
                setReading({
                  ...reading,
                  heartRate: parseInt(e.target.value) || 0,
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
            />
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
              className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md hover:opacity-95"
            >
              Update Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
