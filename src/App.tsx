import { useState } from 'react';
import { DoctorDashboardView } from './components/dashboard/DoctorDashboardView';
import { AppointmentListView } from './components/appointments/AppointmentListView';
import { PatientsView } from './components/patients/PatientsView';
import { CalendarView } from './components/calendar/CalendarView';
import { BillingView } from './components/billing/BillingView';
import { SettingsView } from './components/settings/SettingsView';
import { VirtualVisitModal } from './components/modals/VirtualVisitModal';
import { SearchPatientModal } from './components/modals/SearchPatientModal';
import { NewPrescriptionModal } from './components/modals/NewPrescriptionModal';
import { AIScribeModal } from './components/modals/AIScribeModal';
import { PatientChartModal } from './components/modals/PatientChartModal';
import { NewAppointmentModal } from './components/modals/NewAppointmentModal';
import { FullBriefingModal } from './components/modals/FullBriefingModal';
import { AskAvaChatDrawer } from './components/modals/AskAvaChatDrawer';
import { RequestRefillModal } from './components/modals/RequestRefillModal';
import {
  ReferPatientModal,
  AdjustScheduleModal,
  ExportModal,
  TasksModal,
} from './components/modals/AuxiliaryModals';
import { Appointment } from './types';
import { CALENDAR_APPOINTMENTS } from './mockData';

export function App() {
  // Navigation View State: 'dashboard' | 'appointments' | 'patients' | 'calendar' | 'billing' | 'settings'
  const [currentView, setCurrentView] = useState<'dashboard' | 'appointments' | 'patients' | 'calendar' | 'billing' | 'settings'>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>(CALENDAR_APPOINTMENTS);

  // Selected Patient for Contextual Modals
  const [selectedPatient, setSelectedPatient] = useState<string>('Sarah Johnson');

  // Modal States
  const [isVirtualVisitOpen, setIsVirtualVisitOpen] = useState(false);
  const [isSearchPatientOpen, setIsSearchPatientOpen] = useState(false);
  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);
  const [isAIScribeOpen, setIsAIScribeOpen] = useState(false);
  const [isPatientChartOpen, setIsPatientChartOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isFullBriefingOpen, setIsFullBriefingOpen] = useState(false);
  const [isAskAvaOpen, setIsAskAvaOpen] = useState(false);
  const [isReferPatientOpen, setIsReferPatientOpen] = useState(false);
  const [isAdjustScheduleOpen, setIsAdjustScheduleOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isRequestRefillOpen, setIsRequestRefillOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Appointment prefill
  const [slotPrefill, setSlotPrefill] = useState<{ day?: string; time?: string }>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Handlers
  const handleOpenVirtualVisit = (name?: string) => {
    if (name) setSelectedPatient(name);
    setIsVirtualVisitOpen(true);
  };

  const handleOpenPatientChart = (name: string) => {
    setSelectedPatient(name);
    setIsPatientChartOpen(true);
  };

  const handleOpenNewPrescription = (name?: string) => {
    if (name) setSelectedPatient(name);
    setIsNewPrescriptionOpen(true);
  };

  const handleOpenReferPatient = (name?: string) => {
    if (name) setSelectedPatient(name);
    setIsReferPatientOpen(true);
  };

  const handleOpenAIScribe = (name?: string) => {
    if (name) setSelectedPatient(name);
    setIsAIScribeOpen(true);
  };

  const handleOpenNewAppointment = (day?: string, time?: string) => {
    setSlotPrefill({ day, time });
    setIsNewAppointmentOpen(true);
  };

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment scheduled for ${newAppointment.patientName}`);
    setCurrentView('calendar');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 antialiased selection:bg-purple-200 selection:text-purple-900">
      {/* Active Screen View */}
      {currentView === 'dashboard' ? (
        <DoctorDashboardView
          onNavigateToAppointments={() => setCurrentView('appointments')}
          onNavigateToPatients={() => setCurrentView('patients')}
          onNavigateToCalendar={() => setCurrentView('calendar')}
          onNavigateToBilling={() => setCurrentView('billing')}
          onOpenVirtualVisit={handleOpenVirtualVisit}
          onOpenSearchPatient={() => setIsSearchPatientOpen(true)}
          onOpenNewPrescription={handleOpenNewPrescription}
          onOpenReferPatient={handleOpenReferPatient}
          onOpenAIScribe={handleOpenAIScribe}
          onOpenAdjustSchedule={() => setIsAdjustScheduleOpen(true)}
          onOpenSettings={() => setCurrentView('settings')}
          onOpenPatientChart={handleOpenPatientChart}
          onOpenFullBriefing={() => setIsFullBriefingOpen(true)}
          onOpenTasks={() => setIsTasksOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenAskAva={() => setIsAskAvaOpen(true)}
        />
      ) : currentView === 'appointments' ? (
        <AppointmentListView
          onBackToDashboard={() => setCurrentView('dashboard')}
          onOpenVirtualVisit={handleOpenVirtualVisit}
          onOpenPatientChart={handleOpenPatientChart}
          onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          onNavigateToBilling={() => setCurrentView('billing')}
          onNavigateToPatients={() => setCurrentView('patients')}
          onNavigateToCalendarGrid={() => setCurrentView('calendar')}
          onOpenSearchPatient={() => setIsSearchPatientOpen(true)}
          onOpenFullBriefing={() => setIsFullBriefingOpen(true)}
          onOpenAskAva={() => setIsAskAvaOpen(true)}
          onOpenTasks={() => setIsTasksOpen(true)}
          onOpenAdjustSchedule={() => setIsAdjustScheduleOpen(true)}
          onOpenSettings={() => setCurrentView('settings')}
        />
      ) : currentView === 'patients' ? (
        <PatientsView
          onBackToDashboard={() => setCurrentView('dashboard')}
          onNavigateToAppointments={() => setCurrentView('appointments')}
          onNavigateToBilling={() => setCurrentView('billing')}
          onOpenVirtualVisit={handleOpenVirtualVisit}
          onOpenPatientChart={handleOpenPatientChart}
          onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          onOpenNewPrescription={handleOpenNewPrescription}
          onOpenAIScribe={handleOpenAIScribe}
          onOpenSearchPatient={() => setIsSearchPatientOpen(true)}
          onOpenFullBriefing={() => setIsFullBriefingOpen(true)}
          onOpenAskAva={() => setIsAskAvaOpen(true)}
          onOpenTasks={() => setIsTasksOpen(true)}
          onOpenAdjustSchedule={() => setIsAdjustScheduleOpen(true)}
          onOpenSettings={() => setCurrentView('settings')}
        />
      ) : currentView === 'calendar' ? (
        <CalendarView
          onBackToDashboard={() => setCurrentView('dashboard')}
          onNavigateToList={() => setCurrentView('appointments')}
          onNewAppointment={handleOpenNewAppointment}
          onBlockTime={() => setIsAdjustScheduleOpen(true)}
          onExport={() => setIsExportOpen(true)}
          onOpenPatientChart={handleOpenPatientChart}
          onOpenVirtualVisit={handleOpenVirtualVisit}
          onRefillRequest={() => setIsRequestRefillOpen(true)}
          onOpenAskAva={() => setIsAskAvaOpen(true)}
          appointments={appointments}
        />
      ) : currentView === 'settings' ? (
        <SettingsView
          onBackToDashboard={() => setCurrentView('dashboard')}
          onNavigateToAppointments={() => setCurrentView('appointments')}
          onNavigateToPatients={() => setCurrentView('patients')}
          onNavigateToBilling={() => setCurrentView('billing')}
          onOpenSearchPatient={() => setIsSearchPatientOpen(true)}
          onOpenTasks={() => setIsTasksOpen(true)}
        />
      ) : (
        <BillingView
          onBackToDashboard={() => setCurrentView('dashboard')}
          onNavigateToCalendar={() => setCurrentView('appointments')}
          onOpenSettings={() => setCurrentView('settings')}
        />
      )}

      {/* Interactive Modals */}
      <VirtualVisitModal
        isOpen={isVirtualVisitOpen}
        onClose={() => setIsVirtualVisitOpen(false)}
        patientName={selectedPatient}
      />

      <SearchPatientModal
        isOpen={isSearchPatientOpen}
        onClose={() => setIsSearchPatientOpen(false)}
        onSelectPatient={(name) => {
          setSelectedPatient(name);
          setIsPatientChartOpen(true);
        }}
      />

      <NewPrescriptionModal
        isOpen={isNewPrescriptionOpen}
        onClose={() => setIsNewPrescriptionOpen(false)}
        patientName={selectedPatient}
      />

      <AIScribeModal
        isOpen={isAIScribeOpen}
        onClose={() => setIsAIScribeOpen(false)}
        patientName={selectedPatient}
      />

      <PatientChartModal
        isOpen={isPatientChartOpen}
        onClose={() => setIsPatientChartOpen(false)}
        patientName={selectedPatient}
        onNewPrescription={handleOpenNewPrescription}
        onVirtualVisit={handleOpenVirtualVisit}
      />

      <NewAppointmentModal
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
        onAddAppointment={handleAddAppointment}
        initialDay={slotPrefill.day}
        initialTime={slotPrefill.time}
      />

      <FullBriefingModal
        isOpen={isFullBriefingOpen}
        onClose={() => setIsFullBriefingOpen(false)}
        onOpenChart={handleOpenPatientChart}
      />

      <AskAvaChatDrawer
        isOpen={isAskAvaOpen}
        onClose={() => setIsAskAvaOpen(false)}
        onOpenChart={handleOpenPatientChart}
      />

      <RequestRefillModal
        isOpen={isRequestRefillOpen}
        onClose={() => setIsRequestRefillOpen(false)}
        defaultPatient={selectedPatient}
        onSuccess={(patient, med) => showToast(`Refill requested: ${med} for ${patient}`)}
      />

      <ReferPatientModal
        isOpen={isReferPatientOpen}
        onClose={() => setIsReferPatientOpen(false)}
        patientName={selectedPatient}
      />

      <AdjustScheduleModal
        isOpen={isAdjustScheduleOpen}
        onClose={() => setIsAdjustScheduleOpen(false)}
      />

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      <TasksModal isOpen={isTasksOpen} onClose={() => setIsTasksOpen(false)} />

      {/* Floating Success Toast */}
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
}

export default App;
