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

  // Find corresponding patient record by name or fallback to Sarah Johnson
  const patient: PatientRecord = useMemo(() => {
    if (!patientName) return INITIAL_PATIENTS_LIST[0];
    const found = INITIAL_PATIENTS_LIST.find(
      (p) => p.name.toLowerCase() === patientName.toLowerCase()
    );
    return found || INITIAL_PATIENTS_LIST[0];
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
    >
      <div className="space-y-4 font-inter">
        {/* ========================================================
            1. PATIENT TOP IDENTITY & DEMOGRAPHICS BANNER (REFERENCE SCREEN)
           ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 shadow-sm flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="font-sora font-extrabold text-xl text-slate-900">
                    {patient.name}
                  </h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    ✓ {patient.status}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#5C24FF] border border-purple-100">
                    Blood: {patient.bloodGroup}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    ID: {patient.patientId}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Age: {patient.age} • {patient.gender} • DOB: {patient.dob}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
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
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
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
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm rounded-2xl transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Chat</span>
              </button>

              <button
                onClick={() => showToast(`Options menu opened for ${patient.name}`)}
                className="w-10 h-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                title="More actions"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Badges: Allergy Warning, Last Visit, Next Appointment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Allergy Warning</span>
                <span className="font-semibold text-emerald-800">No Known Drug Allergies (NKDA)</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Last Visit Date</span>
                <span className="font-semibold text-slate-800">
                  {patient.recentVisit.date} ({patient.recentVisit.type})
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
              <div>
                <span className="text-[10px] text-[#5C24FF] font-bold uppercase block">Next Appointment</span>
                <span className="font-semibold text-slate-900">
                  {patient.nextAppointment?.date} at {patient.nextAppointment?.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. 13 SUB-TABS NAVIGATION RIBBON
           ======================================================== */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs pt-1 pb-1">
          <div className="bg-slate-50/80 rounded-2xl p-1 sm:p-1.5 border border-slate-200/90 shadow-2xs overflow-x-auto scrollbar-none w-full scroll-smooth">
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
        </div>

        {/* ========================================================
            3. TAB CONTENT (AI SUMMARY OVERVIEW BY DEFAULT)
           ======================================================== */}
        <div className="pt-1">
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
