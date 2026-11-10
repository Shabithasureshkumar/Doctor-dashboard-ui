import React, { useState } from 'react';
import { Flower2, X } from 'lucide-react';
import { PatientRecord } from '../../../mockData/patientsData';
import { PeriodMetricsHeader } from './periods/PeriodMetricsHeader';
import { CycleCalendarCard } from './periods/CycleCalendarCard';
import { TrendAnalysisCard } from './periods/TrendAnalysisCard';
import { CycleInsightsCard } from './periods/CycleInsightsCard';
import { PeriodLogsTable } from './periods/PeriodLogsTable';
import { OvulationTrackingCard } from './periods/OvulationTrackingCard';
import { PatientNotesSharingCard } from './periods/PatientNotesSharingCard';

interface Tab13PeriodsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab13Periods: React.FC<Tab13PeriodsProps> = ({ patient, onToast }) => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [symptomInput, setSymptomInput] = useState('');
  const [flowInput, setFlowInput] = useState<'Light' | 'Medium' | 'Heavy'>('Medium');
  const [moodInput, setMoodInput] = useState('Okay');
  const [painInput, setPainInput] = useState(3);

  // If patient is not female, provide a professional clinical notice with option to view demo
  const [forcePreview, setForcePreview] = useState(false);

  if (patient.gender !== 'Female' && !forcePreview) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4 shadow-sm animate-in fade-in">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <Flower2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-sora font-bold text-base text-slate-800">
            Gynecological &amp; Menstrual Cycle Monitoring
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            This module tracks menstrual phases, ovulation telemetry, cervical mucus, and symptoms for female patients. {patient.name} is listed as {patient.gender}.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setForcePreview(true)}
            className="px-4 py-2 bg-purple-50 text-[#5C24FF] hover:bg-purple-100 text-xs font-semibold rounded-xl transition-colors"
          >
            Preview Sample Cycle Telemetry
          </button>
        </div>
      </div>
    );
  }

  const handleAddSymptomLog = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogModalOpen(false);
    onToast(`Logged ${flowInput} flow and ${symptomInput || 'symptoms'} for today.`);
    setSymptomInput('');
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Row 1: Top 6 Overview Metric Cards Matching Reference Image Exactly */}
      <PeriodMetricsHeader
        onInfoClick={() => onToast('Menstruation phase started on Jun 01, 2026. Expected duration: 5 days.')}
      />

      {/* Row 2: Middle Section (Cycle Calendar + Trend Analysis + Cycle Insights) - Uniform Height & Aligned */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Cycle Calendar Card */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <CycleCalendarCard
            onSelectDate={(d) => onToast(`Selected cycle date: ${d}`)}
          />
        </div>

        {/* Trend Analysis Card (Scrollable with all logged period & phase trends) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <TrendAnalysisCard />
        </div>

        {/* Cycle Insights Card */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <CycleInsightsCard />
        </div>
      </div>

      {/* Row 3: Bottom Section (Period Logs Table + Ovulation Tracking + Patient Notes & Sharing) - Uniform Height & Aligned */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Period Logs Table */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <PeriodLogsTable
            onViewAll={() => onToast('Viewing all 30-day historical cycle logs...')}
          />
        </div>

        {/* Ovulation & Fertility Tracking */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <OvulationTrackingCard />
        </div>

        {/* Patient Notes & Sharing */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <PatientNotesSharingCard onToast={onToast} />
        </div>
      </div>

      {/* Log Cycle Data Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Flower2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-slate-900 text-sm">
                    Log Daily Cycle Data
                  </h4>
                  <span className="text-[11px] text-slate-400">June 02, 2026 (Today)</span>
                </div>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSymptomLog} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Flow Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Light', 'Medium', 'Heavy'] as const).map((flow) => (
                    <button
                      type="button"
                      key={flow}
                      onClick={() => setFlowInput(flow)}
                      className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                        flowInput === flow
                          ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {flow}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Reported Symptoms
                </label>
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="e.g. Cramps, Headache, Fatigue"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Mood
                  </label>
                  <select
                    value={moodInput}
                    onChange={(e) => setMoodInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400"
                  >
                    <option value="Happy">Happy</option>
                    <option value="Okay">Okay</option>
                    <option value="Tired">Tired</option>
                    <option value="Irritable">Irritable</option>
                    <option value="Better">Better</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Pain Level (1 - 10): <span className="font-bold text-rose-600">{painInput}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={painInput}
                    onChange={(e) => setPainInput(parseInt(e.target.value))}
                    className="w-full accent-rose-500 mt-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-95 shadow-sm"
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
