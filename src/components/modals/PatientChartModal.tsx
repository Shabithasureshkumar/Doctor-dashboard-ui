import React, { useState, useMemo } from 'react';
import { Modal } from '../common/Modal';
import {
  BrainCircuit,
  Activity,
  FlaskConical,
  Scan,
  Pill,
  Stethoscope,
  ClipboardCheck,
  Building2,
  FileText,
  Users,
  Dna,
  FileSignature,
  Flower2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  MoreVertical,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_PATIENTS_LIST, PatientRecord } from '../../mockData/patientsData';
import { Tab01AISummary } from '../patients/tabs/Tab01AISummary';
import { Tab02Vitals } from '../patients/tabs/Tab02Vitals';
import { Tab03Labs } from '../patients/tabs/Tab03Labs';
import { Tab04Imaging } from '../patients/tabs/Tab04Imaging';
import { Tab05Medications } from '../patients/tabs/Tab05Medications';
import { Tab06Visits } from '../patients/tabs/Tab06Visits';
import { Tab07CarePlans } from '../patients/tabs/Tab07CarePlans';
import { Tab08Hospitalisations } from '../patients/tabs/Tab08Hospitalisations';
import { Tab09Documents } from '../patients/tabs/Tab09Documents';
import { Tab10FamilySocial } from '../patients/tabs/Tab10FamilySocial';
import { Tab11GeneticsRisk } from '../patients/tabs/Tab11GeneticsRisk';
import { Tab12SoapNote } from '../patients/tabs/Tab12SoapNote';
import { Tab13Periods } from '../patients/tabs/Tab13Periods';
import { PatientSubTab } from '../patients/PatientsView';

interface PatientChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  onNewPrescription?: (name: string) => void;
  onVirtualVisit?: (name: string) => void;
  onNewAppointment?: (name: string) => void;
  onStartChat?: (name: string) => void;
  onOpenAskAva?: () => void;
}

export const PatientChartModal: React.FC<PatientChartModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Sarah Johnson',
  onNewPrescription,
  onVirtualVisit,
  onNewAppointment,
  onStartChat,
  onOpenAskAva,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PatientSubTab>('AI Summary');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 3500);
  };

  // Find corresponding patient record by name or synthesize a dynamic record matching the clicked patient
  const patient: PatientRecord = useMemo(() => {
    if (!patientName) return INITIAL_PATIENTS_LIST[0];
    const cleanName = patientName.trim().toLowerCase();
    const found = INITIAL_PATIENTS_LIST.find(
      (p) => p.name.toLowerCase() === cleanName || cleanName.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(cleanName)
    );
    if (found) return found;

    // Fallback: create dynamic patient record matching the clicked patient so they are never misidentified
    const hash = Math.abs(cleanName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 10200));
    return {
      id: `p-${cleanName.replace(/\s+/g, '-')}`,
      patientId: `PT${hash.toString().slice(0, 5)}`,
      name: patientName,
      age: 42,
      gender: 'Female',
      status: 'Active',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=160',
      phone: '+1 (555) 345-6789',
      email: `${cleanName.replace(/\s+/g, '.')}@example.com`,
      location: 'New York, NY',
      dob: 'May 14, 1984 (42 years)',
      bloodGroup: 'O+',
      height: '168 cm',
      weight: '66 kg',
      bmi: '23.4 (Normal)',
      bmiStatus: 'Normal',
      medicalConditions: ['General Consultation', 'Routine Follow-up'],
      allergies: ['No Known Drug Allergies (NKDA)'],
      medications: [{ name: 'Multivitamin Formula', dosage: '1 Tab (OD)' }],
      recentVisit: {
        date: 'Nov 08, 2026',
        type: 'General Consultation',
        reason: 'Periodic clinical evaluation and vitals review',
      },
      nextAppointment: {
        date: 'Nov 14, 2026',
        time: '10:30 AM',
        mode: 'Video Consultation',
      },
      vitals: {
        bp: '120 / 78 mmHg',
        bpStatus: 'Normal',
        heartRate: 72,
        heartRateStatus: 'Normal',
        spo2: 99,
        spo2Status: 'Normal',
        weight: '66 kg',
        weightTrend: 'Stable',
      },
    };
  }, [patientName]);

  // 13 Navigation Tabs identical to the reference design
  const subTabs = [
    { id: 'AI Summary', label: 'AI Summary', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'Vitals', label: 'Vitals', icon: <Activity className="w-4 h-4" /> },
    { id: 'Labs', label: 'Labs', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'Imaging', label: 'Imaging', icon: <Scan className="w-4 h-4" /> },
    { id: 'Medications', label: 'Medications', icon: <Pill className="w-4 h-4" /> },
    { id: 'Visits', label: 'Visits', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'Care Plans', label: 'Care Plans', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'Hospitalisations', label: 'Hospitalisations', icon: <Building2 className="w-4 h-4" /> },
    { id: 'Documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'Family & Social', label: 'Family & Social', icon: <Users className="w-4 h-4" /> },
    { id: 'Genetics & Risk', label: 'Genetics & Risk', icon: <Dna className="w-4 h-4" /> },
    { id: 'Soap Note', label: 'Soap Note', icon: <FileSignature className="w-4 h-4" /> },
    { id: 'Periods', label: 'Periods', icon: <Flower2 className="w-4 h-4" /> },
  ] as const;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Patient Chart — ${patient.name}`}
      subtitle={`Electronic Health Record (EHR) • MRN: ${patient.patientId}`}
      maxWidth="7xl"
      fixedHeight={true}
    >
      <div className="h-full flex flex-col space-y-3 font-inter overflow-hidden">
        {/* ========================================================
            1. PATIENT TOP IDENTITY & DEMOGRAPHICS BANNER (STATIC)
           ======================================================== */}
        <div className="flex-shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm flex-shrink-0"
              />
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-sora font-extrabold text-lg sm:text-xl text-slate-900 truncate">
                    {patient.name}
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    ✓ {patient.status}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-purple-50 text-[#5C24FF] border border-purple-100">
                    Blood: {patient.bloodGroup}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-700">
                    ID: {patient.patientId}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Age: {patient.age} • {patient.gender} • DOB: {patient.dob}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#5C24FF]" />
                    {patient.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#5C24FF]" />
                    {patient.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5C24FF]" />
                    {patient.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 self-start md:self-center flex-wrap">
              <button
                onClick={() => {
                  onNewAppointment?.(patient.name);
                  showToast(`Opening appointment booking for ${patient.name}`);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={() => {
                  if (onStartChat) {
                    onClose();
                    onStartChat(patient.name);
                  } else {
                    showToast(`Starting direct chat with ${patient.name}`);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs rounded-xl transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Chat</span>
              </button>

              <button
                onClick={() => showToast(`Options menu opened for ${patient.name}`)}
                className="w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                title="More actions"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Badges: Allergy Warning, Last Visit, Next Appointment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2.5 border-t border-slate-100 text-xs">
            {patient.allergies &&
            patient.allergies.length > 0 &&
            !patient.allergies.some(
              (a) =>
                a.toLowerCase().includes('no known') ||
                a.toLowerCase().includes('nkda') ||
                a.toLowerCase().includes('none')
            ) ? (
              <div className="p-2 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block leading-tight">
                    ⚠️ Critical Allergy Warning
                  </span>
                  <span className="font-semibold text-amber-900 text-[11px] truncate block">
                    {patient.allergies.join(', ')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">
                    Allergy Warning
                  </span>
                  <span className="font-semibold text-emerald-800 text-[11px] truncate block">
                    No Known Drug Allergies (NKDA)
                  </span>
                </div>
              </div>
            )}

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase block leading-tight">Last Visit Date</span>
                <span className="font-semibold text-slate-800 text-[11px] truncate block">
                  {patient.recentVisit?.date || 'Nov 10, 2026'} ({patient.recentVisit?.type || 'Consultation'})
                </span>
              </div>
            </div>

            <div className="p-2 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#5C24FF] font-bold uppercase block leading-tight">Next Appointment</span>
                <span className="font-semibold text-slate-900 text-[11px] truncate block">
                  {patient.nextAppointment
                    ? `${patient.nextAppointment.date} at ${patient.nextAppointment.time}`
                    : 'Nov 16, 2026 at 10:00 AM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. 13 SUB-TABS NAVIGATION RIBBON (STATIC BELOW PROFILE)
           ======================================================== */}
        <div className="flex-shrink-0 bg-slate-50/80 rounded-2xl p-1 sm:p-1.5 border border-slate-200/90 shadow-2xs overflow-x-auto scrollbar-none w-full scroll-smooth">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-max px-1">
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as PatientSubTab)}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#7F47FA] text-white shadow-[0_2px_10px_rgba(127,71,250,0.35)] font-semibold'
                      : 'text-slate-700 hover:text-[#5C24FF] hover:bg-purple-50/70'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#7F47FA]'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. TAB CONTENT (SCROLLABLE AREA UNDERNEATH)
           ======================================================== */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-2 space-y-4">
          {activeSubTab === 'AI Summary' && (
            <Tab01AISummary
              patient={patient}
              onOpenAskAva={() => {
                if (onOpenAskAva) onOpenAskAva();
                else showToast('Launching Ava Scribe AI Intelligence...');
              }}
              onNavigateTab={(t) => setActiveSubTab(t as PatientSubTab)}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Vitals' && (
            <Tab02Vitals patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Labs' && (
            <Tab03Labs patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Imaging' && (
            <Tab04Imaging patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Medications' && (
            <Tab05Medications
              patient={patient}
              onOpenNewPrescriptionModal={() => onNewPrescription?.(patient.name)}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Visits' && (
            <Tab06Visits
              patient={patient}
              onOpenVirtualVisit={() => onVirtualVisit?.(patient.name)}
              onOpenNewAppointment={() => onNewAppointment?.(patient.name)}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Care Plans' && (
            <Tab07CarePlans patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Hospitalisations' && (
            <Tab08Hospitalisations patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Documents' && (
            <Tab09Documents patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Family & Social' && (
            <Tab10FamilySocial patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Genetics & Risk' && (
            <Tab11GeneticsRisk patient={patient} onToast={showToast} />
          )}

          {activeSubTab === 'Soap Note' && (
            <Tab12SoapNote
              patient={patient}
              onOpenAskAva={() => {
                if (onOpenAskAva) onOpenAskAva();
                else showToast('Launching Ava Scribe for SOAP notes...');
              }}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Periods' && (
            <Tab13Periods patient={patient} onToast={showToast} />
          )}
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </Modal>
  );
};
