import React, { useState, useMemo } from 'react';
import {
  Users,
  Heart,
  UserPlus,
  CalendarClock,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit2,
  ChevronRight,
  ChevronLeft,
  Activity,
  HeartPulse,
  Droplets,
  Scale,
  Ruler,
  User,
  Plus,
  Video,
  FileText,
  Pill,
  FlaskConical,
  ClipboardList,
  Check,
  CheckCircle2,
  MoreVertical,
  X,
} from 'lucide-react';
import { INITIAL_PATIENTS_LIST, PatientRecord } from '../../mockData/patientsData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { TabType } from '../../types';

interface PatientsViewProps {
  onBackToDashboard: () => void;
  onNavigateToAppointments: () => void;
  onNavigateToBilling: () => void;
  onOpenVirtualVisit: (patientName: string) => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenNewAppointment: () => void;
  onOpenNewPrescription: (patientName?: string) => void;
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
  onOpenPatientChart,
  onOpenNewAppointment,
  onOpenNewPrescription,
  onOpenSearchPatient,
  onOpenFullBriefing,
  onOpenAskAva,
  onOpenTasks,
  onOpenAdjustSchedule,
}) => {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS_LIST);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<
    'Overview' | 'Medical Records' | 'Appointments' | 'Prescriptions' | 'Lab Tests' | 'Vitals' | 'Plans & Notes'
  >('Overview');
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
    else if (tab === 'Reports') onOpenFullBriefing();
    else if (tab === 'Chats') onOpenAskAva();
  };

  const subTabs = [
    { id: 'Overview', icon: <Users className="w-4 h-4" /> },
    { id: 'Medical Records', icon: <FileText className="w-4 h-4" /> },
    { id: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
    { id: 'Prescriptions', icon: <Pill className="w-4 h-4" /> },
    { id: 'Lab Tests', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'Vitals', icon: <Activity className="w-4 h-4" /> },
    { id: 'Plans & Notes', icon: <ClipboardList className="w-4 h-4" /> },
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

      {/* 3. Top 5 Metric Cards (Matches Screenshot Exactly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full flex-shrink-0">
        {/* Card 1: Total Patients (Purple Gradient Card) */}
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

        {/* Card 3: New Patients (This Month) */}
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
              <CalendarClock className="w-4 h-4" />
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

      {/* 4. Main Split Screen Layout: Left Patient List + Right Patient 360 View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full flex-1 items-start">
        {/* Left Column: Patient List (approx 4 cols / 30%) */}
        <div className="lg:col-span-4 2xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-sora font-bold text-base text-slate-900 mb-3">
              Patient List ({patients.length})
            </h3>

            {/* Search Bar + Filter */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
                />
              </div>
              <button
                className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                title="Filter Patients"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Patient Cards List */}
            <div className="space-y-2">
              {filteredPatients.map((p) => {
                const isSelected = p.id === selectedPatient.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-50/70 border-[#5C24FF] shadow-sm ring-1 ring-purple-200'
                        : 'bg-white border-slate-100 hover:bg-slate-50/80 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.avatarUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-sora font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          ID: {p.patientId} • Age: {p.age} • {p.gender}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        p.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-purple-100 text-[#5C24FF]'
                      }`}
                    >
                      {p.status === 'Active' ? '✓ Active' : 'Follow-up'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600">
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#5C24FF] text-white font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
              2
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
              3
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
              4
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
              5
            </button>
            <span className="text-slate-400 px-0.5">...</span>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
              25
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Patient 360 Profile (approx 8 cols / 70%) */}
        <div className="lg:col-span-8 2xl:col-span-9 space-y-4">
          {/* Patient Top Identity Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedPatient.avatarUrl}
                alt={selectedPatient.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 shadow-sm flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-sora font-extrabold text-xl text-slate-900">
                    {selectedPatient.name}
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                    ✓ Active
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  ID: {selectedPatient.patientId} • Age: {selectedPatient.age} • {selectedPatient.gender}
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

            <div className="flex items-center gap-2 self-start md:self-center">
              <button
                onClick={() => onOpenNewAppointment()}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <button
                className="w-10 h-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
                title="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Tabs Bar: Overview | Medical Records | Appointments | Prescriptions | Lab Tests | Vitals | Plans & Notes */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-100 shadow-sm overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 min-w-max">
              {subTabs.map((tab) => {
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                        : 'text-slate-600 hover:text-[#5C24FF] hover:bg-purple-50/60'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Tab View 1: Overview (Exact Match to Screenshot) */}
          {activeSubTab === 'Overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* 3 Overview Cards in a Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Patient Details */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="font-sora font-bold text-sm text-slate-900">
                      Patient Details
                    </h4>
                    <button
                      onClick={() => showToast(`Edit details opened for ${selectedPatient.name}`)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#5C24FF] hover:underline"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of Birth
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.dob}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Gender
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.gender}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-slate-400" /> Blood Group
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.bloodGroup}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-slate-400" /> Height
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.height}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-slate-400" /> Weight
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.weight}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-slate-400" /> BMI
                      </span>
                      <span className="font-semibold text-slate-800">{selectedPatient.bmi}</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Medical Conditions, Allergies & Current Medications */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
                  {/* Medical Conditions */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                      <Heart className="w-3.5 h-3.5 text-[#5C24FF]" />
                      <span>Medical Conditions</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {selectedPatient.medicalConditions.map((cond) => (
                        <span
                          key={cond}
                          className="text-[11px] font-semibold bg-purple-50 text-[#5C24FF] px-2.5 py-1 rounded-xl border border-purple-100"
                        >
                          ✓ {cond}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Allergies</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {selectedPatient.allergies.map((all) => (
                        <span
                          key={all}
                          className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl border border-emerald-100 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{all}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                      <Pill className="w-3.5 h-3.5 text-[#5C24FF]" />
                      <span>Current Medications</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {selectedPatient.medications.map((med) => (
                        <span
                          key={med.name}
                          className="text-[11px] font-semibold bg-purple-50 text-[#5C24FF] px-2.5 py-1 rounded-xl border border-purple-100"
                        >
                          {med.name} {med.dosage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: Recent Visit & Next Appointment */}
                <div className="space-y-4 flex flex-col justify-between">
                  {/* Recent Visit Box */}
                  <div
                    onClick={() => onOpenPatientChart(selectedPatient.name)}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 hover:border-purple-200 transition-all cursor-pointer group flex-1 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Recent Visit
                          </span>
                          <h5 className="font-sora font-bold text-xs sm:text-sm text-slate-900 mt-0.5">
                            {selectedPatient.recentVisit.date} – {selectedPatient.recentVisit.type}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {selectedPatient.recentVisit.reason}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5C24FF] transition-colors" />
                    </div>
                  </div>

                  {/* Next Appointment Box */}
                  <div
                    onClick={() => onOpenVirtualVisit(selectedPatient.name)}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 hover:border-purple-200 transition-all cursor-pointer group flex-1 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Next Appointment
                          </span>
                          <h5 className="font-sora font-bold text-xs sm:text-sm text-slate-900 mt-0.5">
                            {selectedPatient.nextAppointment?.date} – {selectedPatient.nextAppointment?.time}
                          </h5>
                          <div className="flex items-center gap-1 text-[11px] text-[#5C24FF] mt-0.5 font-medium">
                            <Video className="w-3 h-3" />
                            <span>{selectedPatient.nextAppointment?.mode}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5C24FF] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Health Summary with 4 Vitals */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#5C24FF]" />
                    <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                      Health Summary
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveSubTab('Vitals')}
                    className="text-xs font-semibold text-[#5C24FF] hover:underline"
                  >
                    View All Vitals →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {/* BP */}
                  <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">BP</span>
                      <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
                        {selectedPatient.vitals.bp}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        ● {selectedPatient.vitals.bpStatus}
                      </span>
                    </div>
                  </div>

                  {/* Heart Rate */}
                  <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Heart Rate
                      </span>
                      <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
                        {selectedPatient.vitals.heartRate} bpm
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        ● {selectedPatient.vitals.heartRateStatus}
                      </span>
                    </div>
                  </div>

                  {/* SpO2 */}
                  <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">SpO₂</span>
                      <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
                        {selectedPatient.vitals.spo2} %
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        ● {selectedPatient.vitals.spo2Status}
                      </span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Weight
                      </span>
                      <div className="font-sora font-bold text-sm sm:text-base text-slate-900">
                        {selectedPatient.vitals.weight}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        ↓ {selectedPatient.vitals.weightTrend}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Medical Records */}
          {activeSubTab === 'Medical Records' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-sora font-bold text-base text-slate-900">Medical Records & History</h4>
                <button
                  onClick={() => onOpenPatientChart(selectedPatient.name)}
                  className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
                >
                  Open Full EHR Chart
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">12-Lead Electrocardiogram Report</span>
                    <span className="text-slate-500">Normal sinus rhythm • Rate 72 bpm • PR 150ms</span>
                  </div>
                  <span className="text-xs text-slate-400">Nov 10, 2026</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">Comprehensive Metabolic Panel (CMP)</span>
                    <span className="text-slate-500">Glucose 94 mg/dL • Creatinine 0.8 • eGFR &gt; 90</span>
                  </div>
                  <span className="text-xs text-slate-400">Oct 24, 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Appointments */}
          {activeSubTab === 'Appointments' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-sora font-bold text-base text-slate-900">
                  Appointment History for {selectedPatient.name}
                </h4>
                <button
                  onClick={() => onOpenNewAppointment()}
                  className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
                >
                  + New Appointment
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">Upcoming Video Consultation</span>
                      <span className="text-slate-500">Nov 13, 2026 at 10:00 AM</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenVirtualVisit(selectedPatient.name)}
                    className="px-3 py-1 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
                  >
                    Join Call
                  </button>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">General Physical Consultation</span>
                      <span className="text-slate-500">Nov 10, 2026 at 09:00 AM • Completed</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Dr. Ava Rivers</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Prescriptions */}
          {activeSubTab === 'Prescriptions' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-sora font-bold text-base text-slate-900">Active Prescriptions</h4>
                <button
                  onClick={() => onOpenNewPrescription(selectedPatient.name)}
                  className="px-3.5 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
                >
                  + Write Prescription
                </button>
              </div>
              <div className="space-y-3">
                {selectedPatient.medications.map((m) => (
                  <div
                    key={m.name}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{m.name}</span>
                        <span className="text-slate-500">Dosage: {m.dosage} • 30 Day Supply</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tabs 5, 6, 7 Fallback / Details */}
          {(activeSubTab === 'Lab Tests' || activeSubTab === 'Vitals' || activeSubTab === 'Plans & Notes') && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-sora font-bold text-base text-slate-900">{activeSubTab}</h4>
                <span className="text-xs text-slate-400">Patient ID: {selectedPatient.patientId}</span>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl text-center space-y-2">
                <Activity className="w-8 h-8 text-[#5C24FF] mx-auto" />
                <h5 className="font-sora font-bold text-slate-900">Detailed {activeSubTab} Data</h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Continuous real-time telemetry, lab result synchronizations, and clinical care plan records are up to date for {selectedPatient.name}.
                </p>
              </div>
            </div>
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
