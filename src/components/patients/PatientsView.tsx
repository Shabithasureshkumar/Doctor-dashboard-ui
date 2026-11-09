import React, { useState, useMemo } from 'react';
import {
  Users,
  Heart,
  UserPlus,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Plus,
  MoreVertical,
  X,
  BrainCircuit,
  Activity,
  FlaskConical,
  Scan,
  Pill,
  Stethoscope,
  ClipboardCheck,
  Building2,
  FileText,
  Dna,
  FileSignature,
  Flower2,
  Clock,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_PATIENTS_LIST, PatientRecord } from '../../mockData/patientsData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { TabType } from '../../types';

// Import All 13 Dedicated Production-Ready Clinical Tabs
import { Tab01AISummary } from './tabs/Tab01AISummary';
import { Tab02Vitals } from './tabs/Tab02Vitals';
import { Tab03Labs } from './tabs/Tab03Labs';
import { Tab04Imaging } from './tabs/Tab04Imaging';
import { Tab05Medications } from './tabs/Tab05Medications';
import { Tab06Visits } from './tabs/Tab06Visits';
import { Tab07CarePlans } from './tabs/Tab07CarePlans';
import { Tab08Hospitalisations } from './tabs/Tab08Hospitalisations';
import { Tab09Documents } from './tabs/Tab09Documents';
import { Tab10FamilySocial } from './tabs/Tab10FamilySocial';
import { Tab11GeneticsRisk } from './tabs/Tab11GeneticsRisk';
import { Tab12SoapNote } from './tabs/Tab12SoapNote';
import { Tab13Periods } from './tabs/Tab13Periods';

export type PatientSubTab =
  | 'AI Summary'
  | 'Vitals'
  | 'Labs'
  | 'Imaging'
  | 'Medications'
  | 'Visits'
  | 'Care Plans'
  | 'Hospitalisations'
  | 'Documents'
  | 'Family & Social'
  | 'Genetics & Risk'
  | 'Soap Note'
  | 'Periods';

interface PatientsViewProps {
  onBackToDashboard: () => void;
  onNavigateToAppointments: () => void;
  onNavigateToBilling: () => void;
  onOpenVirtualVisit: (patientName: string) => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenNewAppointment: () => void;
  onOpenNewPrescription: (patientName?: string) => void;
  onOpenAIScribe?: (patientName?: string) => void;
  onOpenSearchPatient: () => void;
  onOpenFullBriefing: () => void;
  onOpenAskAva: () => void;
  onOpenTasks: () => void;
  onOpenAdjustSchedule: () => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  onBackToDashboard,
  onNavigateToAppointments,
  onNavigateToBilling,
  onOpenVirtualVisit,
  onOpenPatientChart: _onOpenPatientChart,
  onOpenNewAppointment,
  onOpenNewPrescription,
  onOpenAIScribe: _onOpenAIScribe,
  onOpenSearchPatient,
  onOpenFullBriefing: _onOpenFullBriefing,
  onOpenAskAva,
  onOpenTasks,
  onOpenAdjustSchedule,
}) => {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS_LIST);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p-1');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Sub-Tab defaults to 'Labs' as shown in the reference image
  const [activeSubTab, setActiveSubTab] = useState<PatientSubTab>('Labs');

  // Add Patient Modal State
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('30');
  const [newPatientGender, setNewPatientGender] = useState<'Female' | 'Male'>('Female');
  const [newPatientPhone, setNewPatientPhone] = useState('+91 98765 00000');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 4000);
  };

  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    const q = searchQuery.toLowerCase();
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.patientId.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }, [patients, searchQuery]);

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPt: PatientRecord = {
      id: `p-${Date.now()}`,
      patientId: `PT${Math.floor(10257 + Math.random() * 50)}`,
      name: newPatientName,
      age: parseInt(newPatientAge) || 28,
      gender: newPatientGender,
      status: 'Active',
      avatarUrl:
        newPatientGender === 'Female'
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=160'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=160',
      phone: newPatientPhone,
      email: newPatientEmail || `${newPatientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      location: 'Chennai, Tamil Nadu',
      dob: 'Jan 01, 1996 (28 years)',
      bloodGroup: 'O+',
      height: '165 cm',
      weight: '60 kg',
      bmi: '22.0 (Normal)',
      bmiStatus: 'Normal',
      medicalConditions: ['Routine Evaluation'],
      allergies: ['No known allergies'],
      medications: [],
      recentVisit: {
        date: 'Today',
        type: 'Registration Consultation',
        reason: 'Initial onboarding and health profile setup',
      },
      nextAppointment: {
        date: 'Nov 14, 2026',
        time: '11:00 AM',
        mode: 'In-Person Consultation',
      },
      vitals: {
        bp: '120 / 80 mmHg',
        bpStatus: 'Normal',
        heartRate: 72,
        heartRateStatus: 'Normal',
        spo2: 99,
        spo2Status: 'Normal',
        weight: '60 kg',
        weightTrend: 'New',
      },
    };

    setPatients((prev) => [newPt, ...prev]);
    setSelectedPatientId(newPt.id);
    setIsAddPatientOpen(false);
    setNewPatientName('');
    showToast(`Patient ${newPt.name} added successfully.`);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'Dashboard') onBackToDashboard();
    else if (tab === 'Appointment') onNavigateToAppointments();
    else if (tab === 'Billing') onNavigateToBilling();
    else if (tab === 'Reports') onOpenAskAva();
    else if (tab === 'Chats') onOpenAskAva();
  };

  // 13 Sub-tabs matching the reference image exactly
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
    <div className="w-full min-h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-4 sm:space-y-5 flex flex-col font-inter">
      {/* 1. Global Mednevo Header */}
      <DashboardHeader
        activeTab="Patient"
        onTabChange={handleTabChange}
        onSearchClick={onOpenSearchPatient}
        onOpenNotifications={onOpenTasks}
        onOpenSettings={onOpenAdjustSchedule}
      />

      {/* 2. Top Title Bar: Heading + Add Patient Button */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your patients, view their records, and track care
          </p>
        </div>

        <button
          onClick={() => setIsAddPatientOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white px-5 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* 3. Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full flex-shrink-0">
        {/* Card 1: Total Patients */}
        <div className="bg-gradient-to-br from-[#9A6AFB] via-[#7F47FA] to-[#5C24FF] text-white rounded-3xl p-5 shadow-[0_8px_24px_rgba(154,106,251,0.35)] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-100">Total Patients</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-sora font-bold text-3xl">248</span>
            <span className="text-[11px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              ↑ +12%
            </span>
          </div>
        </div>

        {/* Card 2: Active Patients */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Patients</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-sora font-bold text-3xl text-slate-900">196</span>
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
              ↑ +8%
            </span>
          </div>
        </div>

        {/* Card 3: New Patients */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">New Patients (This Month)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="font-sora font-bold text-3xl text-slate-900">24</span>
          </div>
        </div>

        {/* Card 4: Follow-ups Due */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Follow-ups Due</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="font-sora font-bold text-3xl text-slate-900">18</span>
          </div>
        </div>

        {/* Card 5: High Priority */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">High Priority</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="font-sora font-bold text-3xl text-slate-900">6</span>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full flex-1">
        {/* Left Column: Search & Patient List */}
        <div className="lg:col-span-4 2xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sora font-bold text-base text-slate-900">
              Patient List <span className="text-xs text-slate-400 font-normal">({filteredPatients.length})</span>
            </h3>
            <button
              onClick={() => showToast('Filters applied: Active patients, Recent first')}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-500 hover:text-[#5C24FF] hover:border-purple-200 flex items-center justify-center transition-colors"
              title="Filter patients"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, ID, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Patient Cards List */}
          <div className="space-y-2.5 overflow-y-auto max-h-[560px] pr-1">
            {filteredPatients.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-50/70 border-[#9A6AFB] shadow-sm'
                      : 'bg-white border-slate-100 hover:border-purple-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={patient.avatarUrl}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <h4
                        className={`font-sora font-semibold text-xs sm:text-sm truncate ${
                          isSelected ? 'text-[#5C24FF]' : 'text-slate-900'
                        }`}
                      >
                        {patient.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        ID: {patient.patientId} | Age: {patient.age} | {patient.gender}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      patient.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : patient.status === 'Follow-up'
                        ? 'bg-purple-50 text-[#5C24FF]'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {patient.status === 'Active' ? '✓ Active' : patient.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1 font-medium">
              <button className="w-6 h-6 rounded-md bg-[#5C24FF] text-white flex items-center justify-center text-xs">
                1
              </button>
              <button className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                2
              </button>
              <button className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                3
              </button>
              <span className="text-slate-400 px-1">...</span>
              <button className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                25
              </button>
            </div>
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Patient 360 Workspace with Persistent Patient Profile Header */}
        <div className="lg:col-span-8 2xl:col-span-9 space-y-4">
          {/* Patient Top Identity Header (Meets All Section 2 Specifications) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPatient.avatarUrl}
                  alt={selectedPatient.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 shadow-sm flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-sora font-extrabold text-xl text-slate-900">
                      {selectedPatient.name}
                    </h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      ✓ {selectedPatient.status}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#5C24FF] border border-purple-100">
                      Blood: {selectedPatient.bloodGroup}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      ID: {selectedPatient.patientId}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Age: {selectedPatient.age} • {selectedPatient.gender} • DOB: {selectedPatient.dob}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#5C24FF]" />
                      {selectedPatient.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#5C24FF]" />
                      {selectedPatient.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5C24FF]" />
                      {selectedPatient.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons (Book Appointment, Start Chat, More Actions) */}
              <div className="flex items-center gap-2 self-start md:self-center flex-wrap">
                <button
                  onClick={() => onOpenNewAppointment()}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>

                <button
                  onClick={onOpenAskAva}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm rounded-2xl transition-all whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Chat</span>
                </button>

                <button
                  onClick={() => showToast(`Clinical actions menu opened for ${selectedPatient.name}`)}
                  className="w-10 h-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                  title="More actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Persistent Context Badges: Allergy Warning, Last Visit, Next Appointment */}
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
                  <span className="font-semibold text-slate-800">{selectedPatient.recentVisit.date} ({selectedPatient.recentVisit.type})</span>
                </div>
              </div>

              <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#5C24FF] font-bold uppercase block">Next Appointment</span>
                  <span className="font-semibold text-slate-900">{selectedPatient.nextAppointment?.date} at {selectedPatient.nextAppointment?.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 13 Options Navigation Ribbon (Matches Reference Design Exactly) */}
          <div className="bg-white rounded-full p-1.5 sm:p-2 border border-slate-200/80 shadow-sm overflow-x-auto scrollbar-none w-full">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-max px-1">
              {subTabs.map((tab) => {
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id as PatientSubTab)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#7F47FA] text-white shadow-[0_2px_10px_rgba(127,71,250,0.35)]'
                        : 'text-slate-700 hover:text-[#5C24FF] hover:bg-purple-50/60'
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
              ACTIVE CLINICAL TAB VIEW RENDERING (ALL 13 TABS)
             ======================================================== */}
          {activeSubTab === 'AI Summary' && (
            <Tab01AISummary
              patient={selectedPatient}
              onOpenAskAva={onOpenAskAva}
              onNavigateTab={(t) => setActiveSubTab(t as PatientSubTab)}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Vitals' && (
            <Tab02Vitals patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Labs' && (
            <Tab03Labs patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Imaging' && (
            <Tab04Imaging patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Medications' && (
            <Tab05Medications
              patient={selectedPatient}
              onOpenNewPrescriptionModal={onOpenNewPrescription}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Visits' && (
            <Tab06Visits
              patient={selectedPatient}
              onOpenVirtualVisit={onOpenVirtualVisit}
              onOpenNewAppointment={onOpenNewAppointment}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Care Plans' && (
            <Tab07CarePlans patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Hospitalisations' && (
            <Tab08Hospitalisations patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Documents' && (
            <Tab09Documents patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Family & Social' && (
            <Tab10FamilySocial patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Genetics & Risk' && (
            <Tab11GeneticsRisk patient={selectedPatient} onToast={showToast} />
          )}

          {activeSubTab === 'Soap Note' && (
            <Tab12SoapNote
              patient={selectedPatient}
              onOpenAskAva={onOpenAskAva}
              onToast={showToast}
            />
          )}

          {activeSubTab === 'Periods' && (
            <Tab13Periods patient={selectedPatient} onToast={showToast} />
          )}
        </div>
      </div>

      {/* Interactive Add Patient Modal */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-lg text-slate-900">Add New Patient</h3>
                  <p className="text-xs text-slate-500">Register patient into clinical portal</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddPatientOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavya Sundaram"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Gender
                  </label>
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value as 'Female' | 'Male')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={newPatientEmail}
                  onChange={(e) => setNewPatientEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-xl shadow-md"
                >
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200 border border-slate-800">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
