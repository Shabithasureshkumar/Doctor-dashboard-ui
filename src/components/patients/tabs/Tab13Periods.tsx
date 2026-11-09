import React, { useState } from 'react';
import {
  Flower2,
  Plus,
  X,
} from 'lucide-react';
import { MenstrualCycleData } from '../../../types/clinical';
import { MOCK_MENSTRUAL_CYCLE } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab13PeriodsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab13Periods: React.FC<Tab13PeriodsProps> = ({ patient, onToast }) => {
  const [cycleData, setCycleData] = useState<MenstrualCycleData>(MOCK_MENSTRUAL_CYCLE);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [symptomInput, setSymptomInput] = useState('');
  const [severityInput, setSeverityInput] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');

  if (patient.gender !== 'Female') {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3 shadow-sm animate-in fade-in">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Flower2 className="w-6 h-6" />
        </div>
        <h4 className="font-sora font-bold text-base text-slate-800">
          Menstrual Health Module Not Applicable
        </h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          This clinical module is designed specifically for female reproductive and gynecological cycle tracking. For {patient.name}, hormonal and metabolic parameters are monitored in the Labs and Vitals sections.
        </p>
      </div>
    );
  }

  const handleLogSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;
    setCycleData({
      ...cycleData,
      symptomsLog: [
        { symptom: symptomInput, severity: severityInput, phase: cycleData.currentCyclePhase },
        ...cycleData.symptomsLog,
      ],
    });
    setIsLogOpen(false);
    setSymptomInput('');
    onToast(`Logged symptom "${symptomInput}" for Day ${cycleData.cycleDay}.`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Flower2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Menstrual Health & Gynecological Cycle Monitoring
              </h3>
              <p className="text-xs text-slate-500">
                Cycle phases, basal body temperature, ovulation windows & PCOS therapeutic response
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsLogOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Cycle Symptom</span>
        </button>
      </div>

      {/* 6 Core Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Last Period */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Last Period (LMP)</span>
          <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
            {cycleData.lastMenstrualPeriod}
          </div>
          <span className="text-[10px] text-slate-500 block">5 Days duration</span>
        </div>

        {/* 2. Avg Cycle Length */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg Cycle Length</span>
          <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
            {cycleData.averageCycleLengthDays} Days
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Regulated Rhythm</span>
        </div>

        {/* 3. Avg Duration */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg Duration</span>
          <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
            {cycleData.averagePeriodDurationDays} Days
          </div>
          <span className="text-[10px] text-slate-500 block">Moderate flow</span>
        </div>

        {/* 4. Regularity */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Cycle Regularity</span>
          <div className="font-sora font-bold text-sm sm:text-base text-[#5C24FF]">
            {cycleData.cycleRegularity}
          </div>
          <span className="text-[10px] text-slate-500 block">Post-Metformin</span>
        </div>

        {/* 5. Predicted Next */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Predicted Next</span>
          <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
            {cycleData.predictedNextPeriod}
          </div>
          <span className="text-[10px] text-[#5C24FF] font-semibold block">In 18 Days</span>
        </div>

        {/* 6. Current Phase */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-4 border border-purple-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-[#5C24FF] block">Current Phase</span>
          <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
            Day {cycleData.cycleDay} ({cycleData.currentCyclePhase})
          </div>
          <span className="text-[10px] text-purple-700 font-semibold block">Ovulatory Peak Window</span>
        </div>
      </div>

      {/* 10 Subsections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        {/* Subsection 1 & 2: Cycle Calendar & 4-Phase Color Visualizer */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3.5">
          <h4 className="font-sora font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            1. Current Cycle Phase & Visual Rhythm (Day 1 – 31)
          </h4>

          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800">
              <span className="font-bold block">Menstrual</span>
              <span className="text-[10px] text-rose-600 block">Days 1 - 5</span>
              <span className="text-[9px] text-rose-500">Flow Phase</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800">
              <span className="font-bold block">Follicular</span>
              <span className="text-[10px] text-amber-600 block">Days 6 - 12</span>
              <span className="text-[9px] text-amber-500">Estrogen Rise</span>
            </div>
            <div className="p-3 rounded-2xl bg-purple-100 border border-purple-300 text-[#5C24FF] font-bold ring-2 ring-purple-400/40">
              <span className="block">Ovulatory</span>
              <span className="text-[10px] text-purple-700 block">Days 13 - 16</span>
              <span className="text-[9px] text-purple-600">Active Peak</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-800">
              <span className="font-bold block">Luteal</span>
              <span className="text-[10px] text-blue-600 block">Days 17 - 31</span>
              <span className="text-[9px] text-blue-500">Progesterone</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed text-[11px]">
            Patient is currently in <strong>Day 14 (Ovulatory Phase)</strong>. Ovulation confirmed with positive LH test surge and concurrent basal body temperature elevation.
          </div>
        </div>

        {/* Subsection 3 & 4: Previous Cycle History & Flow Tracking */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3.5">
          <h4 className="font-sora font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            2. Cycle History Comparison (Previous 4 Cycles)
          </h4>

          <div className="space-y-2">
            {cycleData.cycleHistory.map((ch, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{ch.month}</span>
                  <span className="text-slate-400 text-[11px]">Started: {ch.startDate}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-800 block">
                    {ch.cycleLengthDays} Days Cycle ({ch.durationDays}d Period)
                  </span>
                  <span className="text-[10px] text-purple-600 font-medium">Flow: {ch.flowIntensity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 5 & 6: Basal Body Temperature (BBT) & Ovulation Tracking */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-sora font-bold text-sm text-slate-900">
              3. Basal Body Temperature (BBT) & LH Surge Curve
            </h4>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Biphasic Curve Confirmed
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {cycleData.bbtTrend.map((t, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium">Day {t.day}</span>
                <span className="font-sora font-extrabold text-sm text-slate-900 block mt-0.5">
                  {t.temperatureF}°F
                </span>
                <span className="text-[9px] text-[#5C24FF] block mt-0.5 truncate">{t.phase}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-[11px] text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>LH Surge Test:</span>
              <strong className="text-emerald-700">✓ Positive Surge Detected (Day 13)</strong>
            </div>
            <div className="flex justify-between">
              <span>Cervical Mucus Quality:</span>
              <strong>{cycleData.ovulationTracking.cervicalMucusType}</strong>
            </div>
          </div>
        </div>

        {/* Subsection 7 & 8: Symptoms Log, Cycle Medications & Clinical Notes */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-sora font-bold text-sm text-slate-900">
              4. Logged Symptoms & Gynecological Notes
            </h4>
            <button
              onClick={() => setIsLogOpen(true)}
              className="text-xs text-[#5C24FF] font-semibold hover:underline"
            >
              + Log Symptom
            </button>
          </div>

          <div className="space-y-2">
            {cycleData.symptomsLog.map((sym, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800 block">{sym.symptom}</span>
                  <span className="text-[10px] text-slate-400">Phase: {sym.phase}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-purple-50 text-[#5C24FF] rounded-md font-semibold">
                  {sym.severity} Severity
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl text-[11px] text-slate-600 space-y-1.5 leading-relaxed">
            <span className="font-bold text-slate-800 block">Physician Gynecological Summary:</span>
            <p>{cycleData.clinicalGynecologicalNotes}</p>
          </div>
        </div>
      </div>

      {/* Log Symptom Modal */}
      {isLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Log Menstrual Symptom</h4>
                <p className="text-slate-500">Day {cycleData.cycleDay} • {cycleData.currentCyclePhase}</p>
              </div>
              <button
                onClick={() => setIsLogOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogSymptom} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observed Symptom</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mild headache / Bloating"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Severity</label>
                <select
                  value={severityInput}
                  onChange={(e) => setSeverityInput(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="Mild">Mild (Tolerable)</option>
                  <option value="Moderate">Moderate (Interferes with activity)</option>
                  <option value="Severe">Severe (Disabling)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-semibold rounded-xl shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
