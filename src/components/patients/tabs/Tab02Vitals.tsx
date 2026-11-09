import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Zap,
  Flag,
  Moon,
  Plus,
  Download,
  X,
  Edit2,
} from 'lucide-react';
import { VitalMeasurement } from '../../../types/clinical';
import { MOCK_VITALS_HISTORY } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab02VitalsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab02Vitals: React.FC<Tab02VitalsProps> = ({ patient, onToast }) => {
  const [vitalsList, setVitalsList] = useState<VitalMeasurement[]>(MOCK_VITALS_HISTORY);
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '6M' | '1Y' | 'Custom'>('30D');

  // Add Vitals Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [hr, setHr] = useState('72');
  const [spo2, setSpo2] = useState('98');
  const [temp, setTemp] = useState('37.0');
  const [weight, setWeight] = useState('58.0');
  const [height, setHeight] = useState('162');
  const [rr, setRr] = useState('16');
  const [source, setSource] = useState<VitalMeasurement['source']>('Bluetooth Clinic Cuff');

  // Edit Reading Modal
  const [editingReading, setEditingReading] = useState<VitalMeasurement | null>(null);

  // Latest reading
  const current = vitalsList[0];

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault();
    const sysNum = parseInt(systolic) || 120;
    const diaNum = parseInt(diastolic) || 80;
    const wtNum = parseFloat(weight) || 58;
    const htNum = parseFloat(height) || 162;
    const bmiVal = parseFloat((wtNum / ((htNum / 100) * (htNum / 100))).toFixed(1));
    const tempCNum = parseFloat(temp) || 37.0;
    const tempFNum = parseFloat(((tempCNum * 9) / 5 + 32).toFixed(1));

    const newReading: VitalMeasurement = {
      id: `v-${Date.now()}`,
      date: 'Today',
      time: 'Just now',
      systolic: sysNum,
      diastolic: diaNum,
      heartRate: parseInt(hr) || 72,
      spo2: parseInt(spo2) || 98,
      temperatureC: tempCNum,
      temperatureF: tempFNum,
      weightKg: wtNum,
      heightCm: htNum,
      bmi: bmiVal,
      respiratoryRate: parseInt(rr) || 16,
      source,
      status: sysNum >= 140 || diaNum >= 90 ? 'Critical' : sysNum >= 130 ? 'Elevated' : 'Normal',
    };

    setVitalsList([newReading, ...vitalsList]);
    setIsAddOpen(false);
    onToast(`Vitals recorded: BP ${sysNum}/${diaNum} mmHg, HR ${hr} bpm`);
  };

  const handleUpdateVital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReading) return;
    setVitalsList((prev) =>
      prev.map((v) => (v.id === editingReading.id ? editingReading : v))
    );
    setEditingReading(null);
    onToast('Vital reading updated successfully.');
  };

  const handleExportCSV = () => {
    onToast(`Exporting ${vitalsList.length} vital records to CSV format...`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Patient Vitals Monitoring
              </h3>
              <p className="text-xs text-slate-500">
                Continuous physiological telemetry, comparisons & clinical thresholds
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Range filters */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            {(['7D', '30D', '6M', '1Y', 'Custom'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeRange === r ? 'bg-white text-[#5C24FF] shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                {r === '7D' ? '7 Days' : r === '30D' ? '30 Days' : r === '6M' ? '6 Months' : r === '1Y' ? '1 Year' : 'Custom'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vitals</span>
          </button>
        </div>
      </div>

      {/* 8 Primary Vitals Metric Cards (Matching Screen 2 Visual Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: Heart Rate */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Heart Rate</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Autonomic rhythm calm &amp; balanced</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Norm 60–100
              </span>
            </div>

            {/* ECG Waveform Line */}
            <div className="w-full h-4 my-1 flex items-center">
              <svg className="w-full h-3.5" viewBox="0 0 200 14" fill="none">
                <path
                  d="M0 7 H80 L84 3 L88 11 L92 1 L96 13 L100 7 H200"
                  stroke="#F43F5E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  {current.heartRate || 72}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5 uppercase">BPM</span>
              </div>
              <div className="text-[11px] font-semibold text-[#D97706] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>+4% from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_heart_rate.png"
                alt="Heart Rate"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Blood Pressure */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Blood Pressure</h4>
              </div>
              <span className="bg-[#FEF6E7] text-[#D97706] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Borderline
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Vascular tone steady • Peripheral flow smoo...</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Target &lt;120/80
              </span>
            </div>

            {/* Amber Wave Line */}
            <div className="w-full h-4 my-1 flex items-center">
              <svg className="w-full h-3.5" viewBox="0 0 200 14" fill="none">
                <path
                  d="M0 7 Q25 2, 50 7 T100 7 T150 7 T200 7"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  {current.systolic || 132}/{current.diastolic || 86}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">mmHg</span>
              </div>
              <div className="text-[11px] font-semibold text-[#D97706] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>+2% from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_blood_pressure.png"
                alt="Blood Pressure"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Blood Oxygen */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-500 fill-sky-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Blood Oxygen</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Optimal cellular oxygen perfusion</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Optimal 95–100%
              </span>
            </div>

            {/* Blue Gradient Progress Bar */}
            <div className="w-full h-1.5 my-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"
                style={{ width: `${current.spo2 || 98}%` }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  {current.spo2 || 98}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">%</span>
              </div>
              <div className="text-[11px] font-semibold text-[#059669] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>+1% from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_blood_oxygen.png"
                alt="Blood Oxygen"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Temperature */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Temperature</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Thermal homeostasis in equilibrium</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Norm 97.8–99.1°
              </span>
            </div>

            {/* Pink/Purple Gradient Bar */}
            <div className="w-full h-1.5 my-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-600"
                style={{ width: '68%' }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  {current.temperatureF || 98.6}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">°F</span>
              </div>
              <div className="text-[11px] font-semibold text-[#059669] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>Stable</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_temperature.png"
                alt="Temperature"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 5: Blood Weight */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500 fill-blue-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Blood Weight</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Lean mass stable • Hydration tone on target</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Target 180 lbs
              </span>
            </div>

            {/* Blue Wave Line */}
            <div className="w-full h-4 my-1 flex items-center">
              <svg className="w-full h-3.5" viewBox="0 0 200 14" fill="none">
                <path
                  d="M0 7 Q25 3, 50 7 T100 7 T150 7 T200 7"
                  stroke="#3B82F6"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  185
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">mg/dL</span>
              </div>
              <div className="text-[11px] font-semibold text-[#059669] flex items-center gap-1 mt-0.5">
                <span>▼</span>
                <span>-3% from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_blood_weight.png"
                alt="Blood Weight"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 6: Blood Glucose */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Blood Glucose</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Gentle post-meal glycemic variance</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Norm 70–110
              </span>
            </div>

            {/* Magenta Wave Line */}
            <div className="w-full h-4 my-1 flex items-center">
              <svg className="w-full h-3.5" viewBox="0 0 200 14" fill="none">
                <path
                  d="M0 7 Q25 2, 50 7 T100 7 T150 7 T200 7"
                  stroke="#EC4899"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  110
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">mg/dL</span>
              </div>
              <div className="text-[11px] font-semibold text-[#059669] flex items-center gap-1 mt-0.5">
                <span>▼</span>
                <span>-5% from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_blood_glucose.png"
                alt="Blood Glucose"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 7: Activity */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-500 fill-amber-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Activity</h4>
              </div>
              <span className="bg-[#FEF6E7] text-[#D97706] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Moderate
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">84% of daily goal • Joint cadence energiz...</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Goal 10,000 steps
              </span>
            </div>

            {/* Orange Progress Bar */}
            <div className="w-full h-1.5 my-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ width: '84%' }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  8,420
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">steps</span>
              </div>
              <div className="text-[11px] font-semibold text-[#D97706] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>84% of daily goal</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_activity.png"
                alt="Activity"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Card 8: Sleep */}
        <div className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-500 fill-purple-50 flex-shrink-0" />
                <h4 className="font-sora font-bold text-slate-900 text-sm">Sleep</h4>
              </div>
              <span className="bg-[#EBFDF5] text-[#059669] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Good
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[130px] sm:max-w-[140px]">Slow-wave REM restorative delta +30m</span>
              <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Target 7–9 hrs
              </span>
            </div>

            {/* Purple Gradient Progress Bar */}
            <div className="w-full h-1.5 my-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                style={{ width: '80%' }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline">
                <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                  7.15
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1.5">hrs</span>
              </div>
              <div className="text-[11px] font-semibold text-[#7C3AED] flex items-center gap-1 mt-0.5">
                <span>▲</span>
                <span>+30 min from last week</span>
              </div>
            </div>

            <div className="flex-shrink-0 -mb-1 -mr-1">
              <img
                src="/vitals/device_sleep.png"
                alt="Sleep"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date-wise Historical Vital Table & Telemetry Sources */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-sora font-bold text-base text-slate-900">
              Historical Readings & Device Sources
            </h4>
            <p className="text-xs text-slate-500">
              Audited physiological measurements with timestamps and verified device sources
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {vitalsList.length} Readings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                <th className="pb-3 font-semibold">Date & Time</th>
                <th className="pb-3 font-semibold">Blood Pressure</th>
                <th className="pb-3 font-semibold">Heart Rate</th>
                <th className="pb-3 font-semibold">SpO₂</th>
                <th className="pb-3 font-semibold">Temp</th>
                <th className="pb-3 font-semibold">Weight & BMI</th>
                <th className="pb-3 font-semibold">Device Source</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vitalsList.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-medium text-slate-900">
                    <div>{v.date}</div>
                    <span className="text-[11px] text-slate-400">{v.time}</span>
                  </td>
                  <td className="py-3 font-bold text-slate-900">
                    {v.systolic} / {v.diastolic} mmHg
                  </td>
                  <td className="py-3 text-slate-700">{v.heartRate} bpm</td>
                  <td className="py-3 text-slate-700">{v.spo2}%</td>
                  <td className="py-3 text-slate-700">{v.temperatureF}°F ({v.temperatureC}°C)</td>
                  <td className="py-3 text-slate-700">
                    {v.weightKg} kg <span className="text-slate-400">({v.bmi} BMI)</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px]">
                      {v.source}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        v.status === 'Normal'
                          ? 'bg-emerald-50 text-emerald-700'
                          : v.status === 'Elevated'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setEditingReading(v)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#5C24FF] hover:bg-purple-50 transition-colors"
                      title="Edit reading"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vitals Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">Record New Patient Vitals</h4>
                  <p className="text-xs text-slate-500">{patient.name} • {patient.patientId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVital} className="p-5 space-y-4 text-xs">
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

              <div className="grid grid-cols-3 gap-3">
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
                  <label className="block font-semibold text-slate-700 mb-1">SpO₂ (%)</label>
                  <input
                    type="number"
                    required
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                  onChange={(e) => setSource(e.target.value as any)}
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
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Reading Modal */}
      {editingReading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Edit Vital Reading</h4>
                <p className="text-xs text-slate-500">{editingReading.date} • {editingReading.time}</p>
              </div>
              <button
                onClick={() => setEditingReading(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateVital} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Systolic</label>
                  <input
                    type="number"
                    value={editingReading.systolic}
                    onChange={(e) =>
                      setEditingReading({
                        ...editingReading,
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
                    value={editingReading.diastolic}
                    onChange={(e) =>
                      setEditingReading({
                        ...editingReading,
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
                  value={editingReading.heartRate}
                  onChange={(e) =>
                    setEditingReading({
                      ...editingReading,
                      heartRate: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingReading(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Update Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
