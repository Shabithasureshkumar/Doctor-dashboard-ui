import React, { useState, useMemo } from 'react';
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
  Edit2,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import { VitalMeasurement } from '../../../types/clinical';
import { MOCK_VITALS_HISTORY } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';
import { CustomDateRangeModal } from './CustomDateRangeModal';
import { AddVitalModal } from './AddVitalModal';
import { EditVitalModal } from './EditVitalModal';

interface Tab02VitalsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab02Vitals: React.FC<Tab02VitalsProps> = ({ patient, onToast }) => {
  const [vitalsList, setVitalsList] = useState<VitalMeasurement[]>(MOCK_VITALS_HISTORY);
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '6M' | '1Y' | 'Custom'>('30D');

  // Custom Calendar Range Picker State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState('2026-10-01');
  const [customTo, setCustomTo] = useState('2026-11-10');
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(10); // 10 = Nov (0-indexed)

  // Date parsing helper
  const parseVitalDate = (dateStr: string): number => {
    if (dateStr === 'Today') return new Date('2026-11-10T23:59:59').getTime();
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date('2026-11-10T23:59:59').getTime() : d.getTime();
  };

  // Filtered vitals based on selected date range
  const filteredVitals = useMemo(() => {
    const baseDate = new Date('2026-11-10T23:59:59').getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    if (activeRange === '7D') {
      const minDate = baseDate - 7 * dayMs;
      return vitalsList.filter((v) => {
        const t = parseVitalDate(v.date);
        return t >= minDate && t <= baseDate;
      });
    }

    if (activeRange === '30D') {
      const minDate = baseDate - 30 * dayMs;
      return vitalsList.filter((v) => {
        const t = parseVitalDate(v.date);
        return t >= minDate && t <= baseDate;
      });
    }

    if (activeRange === '6M') {
      const minDate = baseDate - 180 * dayMs;
      return vitalsList.filter((v) => {
        const t = parseVitalDate(v.date);
        return t >= minDate && t <= baseDate;
      });
    }

    if (activeRange === '1Y') {
      const minDate = baseDate - 365 * dayMs;
      return vitalsList.filter((v) => {
        const t = parseVitalDate(v.date);
        return t >= minDate && t <= baseDate;
      });
    }

    if (activeRange === 'Custom') {
      const fromTime = customFrom ? new Date(`${customFrom}T00:00:00`).getTime() : 0;
      const toTime = customTo ? new Date(`${customTo}T23:59:59`).getTime() : baseDate;
      return vitalsList.filter((v) => {
        const t = parseVitalDate(v.date);
        return t >= fromTime && t <= toTime;
      });
    }

    return vitalsList;
  }, [vitalsList, activeRange, customFrom, customTo]);

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

  // Latest reading from filtered set (or fallback to latest)
  const current = filteredVitals[0] || vitalsList[0];

  const renderCardVisual = (type: string, progress = 75) => {
    if (type === 'ecg') {
      return (
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-5 text-rose-500" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 0 10 L 45 10 L 52 10 L 56 4 L 62 16 L 68 2 L 73 18 L 78 10 L 85 10 L 160 10" />
          </svg>
        </div>
      );
    }
    if (type === 'bp-wave') {
      return (
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-5 text-amber-500" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M 0 10 Q 20 5, 40 10 T 80 10 T 120 10 T 160 10" />
          </svg>
        </div>
      );
    }
    if (type === 'weight-wave') {
      return (
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-5 text-blue-500" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M 0 10 Q 25 15, 50 10 T 100 10 T 150 10" />
          </svg>
        </div>
      );
    }
    if (type === 'glucose-wave') {
      return (
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-5 text-rose-400" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M 0 10 Q 30 6, 60 10 T 120 10 T 160 10" />
          </svg>
        </div>
      );
    }
    const barColor =
      type === 'blue-bar'
        ? 'bg-gradient-to-r from-sky-400 to-blue-500'
        : type === 'purple-bar'
        ? 'bg-gradient-to-r from-purple-400 to-indigo-500'
        : type === 'orange-bar'
        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
        : 'bg-gradient-to-r from-indigo-400 to-purple-600';

    return (
      <div className="h-6 flex items-center">
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  };

  const vitalCards = [
    {
      id: 'hr',
      title: 'Heart Rate',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconFill: 'fill-rose-50',
      status: 'Normal',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Autonomic rhythm calm & balanced',
      target: 'Norm 60-100',
      value: String(current?.heartRate || 72),
      unit: 'BPM',
      trendIcon: '▲',
      trendText: '+4% from last week',
      trendColor: 'text-amber-500',
      deviceImage: '/vitals/device_heart_rate.png',
      waveType: 'ecg' as const,
    },
    {
      id: 'bp',
      title: 'Blood Pressure',
      icon: Zap,
      iconColor: 'text-amber-500',
      iconFill: '',
      status: current && current.systolic >= 130 ? 'Borderline' : 'Normal',
      statusBg: 'bg-amber-50',
      statusColor: 'text-amber-700',
      subtitle: 'Vascular tone steady • Peripheral flow smooth',
      target: 'Target <120/80',
      value: `${current?.systolic || 132}/${current?.diastolic || 86}`,
      unit: 'mmHg',
      trendIcon: '▲',
      trendText: '+2% from last week',
      trendColor: 'text-rose-500',
      deviceImage: '/vitals/device_blood_pressure.png',
      waveType: 'bp-wave' as const,
    },
    {
      id: 'spo2',
      title: 'Blood Oxygen',
      icon: Droplets,
      iconColor: 'text-sky-500',
      iconFill: 'fill-sky-50',
      status: 'Normal',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Optimal cellular oxygen perfusion',
      target: 'Optimal 95-100%',
      value: String(current?.spo2 || 98),
      unit: '%',
      trendIcon: '▲',
      trendText: '+1% from last week',
      trendColor: 'text-emerald-500',
      deviceImage: '/vitals/device_blood_oxygen.png',
      waveType: 'blue-bar' as const,
      barProgress: 98,
    },
    {
      id: 'temp',
      title: 'Temperature',
      icon: Thermometer,
      iconColor: 'text-purple-500',
      iconFill: '',
      status: 'Normal',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Thermal homeostasis in equilibrium',
      target: 'Norm 97.8-99.1°',
      value: String(current?.temperatureF || 98.6),
      unit: '°F',
      trendIcon: '▲',
      trendText: 'Stable',
      trendColor: 'text-emerald-500',
      deviceImage: '/vitals/device_temperature.png',
      waveType: 'purple-bar' as const,
      barProgress: 88,
    },
    {
      id: 'weight',
      title: 'Blood Weight',
      icon: Droplets,
      iconColor: 'text-blue-500',
      iconFill: '',
      status: 'Normal',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Lean mass stable • Hydration tone on target',
      target: 'Target 180 lbs',
      value: '185',
      unit: 'mg/dL',
      trendIcon: '▼',
      trendText: '-3% from last week',
      trendColor: 'text-emerald-500',
      deviceImage: '/vitals/device_blood_weight.png',
      waveType: 'weight-wave' as const,
    },
    {
      id: 'glucose',
      title: 'Blood Glucose',
      icon: Droplets,
      iconColor: 'text-rose-400',
      iconFill: '',
      status: 'Normal',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Gentle post-meal glycemic variance',
      target: 'Norm 70-110',
      value: '110',
      unit: 'mg/dL',
      trendIcon: '▼',
      trendText: '-5% from last week',
      trendColor: 'text-emerald-500',
      deviceImage: '/vitals/device_blood_glucose.png',
      waveType: 'glucose-wave' as const,
    },
    {
      id: 'activity',
      title: 'Activity',
      icon: Flag,
      iconColor: 'text-amber-500',
      iconFill: '',
      status: 'Moderate',
      statusBg: 'bg-amber-50',
      statusColor: 'text-amber-700',
      subtitle: '84% of daily goal • Joint cadence energized',
      target: 'Goal 10,000 steps',
      value: '8,420',
      unit: 'steps',
      trendIcon: '▲',
      trendText: '84% of daily goal',
      trendColor: 'text-amber-500',
      deviceImage: '/vitals/device_activity.png',
      waveType: 'orange-bar' as const,
      barProgress: 84,
    },
    {
      id: 'sleep',
      title: 'Sleep',
      icon: Moon,
      iconColor: 'text-indigo-500',
      iconFill: 'fill-indigo-50',
      status: 'Good',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-700',
      subtitle: 'Slow-wave REM restorative delta +30m',
      target: 'Target 7-9 hrs',
      value: '7.15',
      unit: 'hrs',
      trendIcon: '▲',
      trendText: '+30 min from last week',
      trendColor: 'text-purple-500',
      deviceImage: '/vitals/device_sleep.png',
      waveType: 'sleep-bar' as const,
      barProgress: 80,
    },
  ];

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
    onToast(`Exporting ${filteredVitals.length} vital records to CSV format...`);
  };

  // Calendar logic
  const handleDayClick = (day: number) => {
    const formatted = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (!customFrom || (customFrom && customTo)) {
      setCustomFrom(formatted);
      setCustomTo('');
    } else {
      if (formatted < customFrom) {
        setCustomTo(customFrom);
        setCustomFrom(formatted);
      } else {
        setCustomTo(formatted);
      }
    }
  };

  const applyPreset = (from: string, to: string, label: string) => {
    setCustomFrom(from);
    setCustomTo(to);
    onToast(`Preset applied: ${label}`);
  };

  const handleApplyCustomRange = () => {
    let finalFrom = customFrom;
    let finalTo = customTo;
    if (!finalFrom && !finalTo) {
      finalFrom = '2026-10-01';
      finalTo = '2026-11-10';
      setCustomFrom(finalFrom);
      setCustomTo(finalTo);
    } else if (finalFrom && !finalTo) {
      finalTo = finalFrom;
      setCustomTo(finalTo);
    }
    setIsCalendarOpen(false);
    setActiveRange('Custom');
    onToast(`Date range applied: ${finalFrom} to ${finalTo}`);
  };

  const formatDateDisplay = (isoStr: string) => {
    if (!isoStr) return 'Select Date';
    const d = new Date(isoStr + 'T00:00:00');
    return isNaN(d.getTime())
      ? isoStr
      : d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
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
                Continuous physiological telemetry & clinical thresholds for {patient.name}
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
                onClick={() => {
                  if (r === 'Custom') {
                    setActiveRange('Custom');
                    setIsCalendarOpen(true);
                  } else {
                    setActiveRange(r);
                    onToast(`Filtered historical vitals for ${r === '7D' ? 'last 7 Days' : r === '30D' ? 'last 30 Days' : r === '6M' ? 'last 6 Months' : 'last 1 Year'}.`);
                  }
                }}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeRange === r ? 'bg-white text-[#5C24FF] shadow-sm font-bold' : 'hover:text-slate-900'
                }`}
              >
                {r === 'Custom' && <Calendar className="w-3.5 h-3.5 text-[#5C24FF]" />}
                <span>
                  {r === '7D'
                    ? '7 Days'
                    : r === '30D'
                    ? '30 Days'
                    : r === '6M'
                    ? '6 Months'
                    : r === '1Y'
                    ? '1 Year'
                    : 'Custom'}
                </span>
              </button>
            ))}
          </div>

          {activeRange === 'Custom' && (
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 text-[#5C24FF] hover:bg-purple-100 text-xs font-semibold transition-all"
              title="Change Custom Date Range"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {formatDateDisplay(customFrom)} – {formatDateDisplay(customTo)}
              </span>
            </button>
          )}

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
        {vitalCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-[24px] p-4 sm:p-4.5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <card.icon className={`w-4 h-4 ${card.iconColor} ${card.iconFill} flex-shrink-0`} />
                  <h4 className="font-sora font-bold text-slate-900 text-sm">{card.title}</h4>
                </div>
                <span className={`${card.statusBg} ${card.statusColor} text-[11px] font-semibold px-2.5 py-0.5 rounded-full`}>
                  {card.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[130px] sm:max-w-[140px]">{card.subtitle}</span>
                <span className="bg-[#F3EEFF] text-[#7C3AED] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {card.target}
                </span>
              </div>

              {/* Waveform / Progress visual */}
              {renderCardVisual(card.waveType, card.barProgress)}
            </div>

            <div className="flex items-end justify-between pt-1">
              <div>
                <div className="flex items-baseline">
                  <span className="font-sora font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-1.5 uppercase">
                    {card.unit}
                  </span>
                </div>
                <div className={`text-[11px] font-semibold ${card.trendColor} flex items-center gap-1 mt-0.5`}>
                  <span>{card.trendIcon}</span>
                  <span>{card.trendText}</span>
                </div>
              </div>

              <div className="flex-shrink-0 -mb-1 -mr-1">
                <img
                  src={card.deviceImage}
                  alt={card.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Date-wise Historical Vital Table & Telemetry Sources */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-sora font-bold text-base text-slate-900">
                Historical Readings &amp; Device Sources
              </h4>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5C24FF]">
                {activeRange === 'Custom'
                  ? `${formatDateDisplay(customFrom)} – ${formatDateDisplay(customTo)}`
                  : activeRange === '7D'
                  ? 'Last 7 Days'
                  : activeRange === '30D'
                  ? 'Last 30 Days'
                  : activeRange === '6M'
                  ? 'Last 6 Months'
                  : 'Last 1 Year'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Audited physiological measurements with timestamps and verified device sources
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="font-bold text-slate-700">{filteredVitals.length}</span> of {vitalsList.length} Readings
            </span>
            {activeRange !== '30D' && (
              <button
                onClick={() => {
                  setActiveRange('30D');
                  onToast('Filter reset to 30 Days.');
                }}
                className="text-xs text-[#5C24FF] hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {filteredVitals.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-sora font-bold text-slate-800 text-sm">
                No vital readings found for this date range
              </h5>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No telemetry recorded between {formatDateDisplay(customFrom)} and {formatDateDisplay(customTo)}. Try adjusting the range.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveRange('30D');
                onToast('Filter reset to 30 Days.');
              }}
              className="px-4 py-2 bg-purple-50 text-[#5C24FF] hover:bg-purple-100 font-semibold text-xs rounded-xl transition-colors"
            >
              Reset to 30 Days
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                  <th className="pb-3 font-semibold">Date &amp; Time</th>
                  <th className="pb-3 font-semibold">Blood Pressure</th>
                  <th className="pb-3 font-semibold">Heart Rate</th>
                  <th className="pb-3 font-semibold">SpO₂</th>
                  <th className="pb-3 font-semibold">Temp</th>
                  <th className="pb-3 font-semibold">Weight &amp; BMI</th>
                  <th className="pb-3 font-semibold">Device Source</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVitals.map((v) => (
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
        )}
      </div>

      {/* Add Vitals Modal */}
      <AddVitalModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddVital}
        systolic={systolic}
        setSystolic={setSystolic}
        diastolic={diastolic}
        setDiastolic={setDiastolic}
        hr={hr}
        setHr={setHr}
        spo2={spo2}
        setSpo2={setSpo2}
        temp={temp}
        setTemp={setTemp}
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        rr={rr}
        setRr={setRr}
        source={source}
        setSource={setSource}
      />

      {/* Edit Reading Modal */}
      <EditVitalModal
        reading={editingReading}
        onClose={() => setEditingReading(null)}
        onSubmit={handleUpdateVital}
        setReading={setEditingReading}
      />
      {/* Custom Date Range Calendar Modal */}
      <CustomDateRangeModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        customFrom={customFrom}
        customTo={customTo}
        setCustomFrom={setCustomFrom}
        setCustomTo={setCustomTo}
        calendarYear={calendarYear}
        calendarMonth={calendarMonth}
        onPrevMonth={() => {
          if (calendarMonth === 0) {
            setCalendarMonth(11);
            setCalendarYear((y) => y - 1);
          } else {
            setCalendarMonth((m) => m - 1);
          }
        }}
        onNextMonth={() => {
          if (calendarMonth === 11) {
            setCalendarMonth(0);
            setCalendarYear((y) => y + 1);
          } else {
            setCalendarMonth((m) => m + 1);
          }
        }}
        onDayClick={handleDayClick}
        onApplyPreset={applyPreset}
        onApplyRange={handleApplyCustomRange}
        formatDateDisplay={formatDateDisplay}
      />
    </div>
  );
};
