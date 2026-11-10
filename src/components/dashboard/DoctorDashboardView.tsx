import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { GreetingSection } from './GreetingSection';
import { MetricCards } from './MetricCards';
import { PatientStatisticsChart } from './PatientStatisticsChart';
import { ConsultationFocusChart } from './ConsultationFocusChart';
import { QuickActions } from './QuickActions';
import { NextAppointmentCard } from './NextAppointmentCard';
import { ClinicalAlertsCard } from './ClinicalAlertsCard';
import { PendingReviewsCards } from './PendingReviewsCards';
import { AIPatientQueueCard } from './AIPatientQueueCard';
import { TodayScheduleCard } from './TodayScheduleCard';
import { MessagesCard } from './MessagesCard';
import { INITIAL_ALERTS } from '../../mockData';
import { ClinicalAlert, TabType } from '../../types';

interface DoctorDashboardViewProps {
  onNavigateToCalendar: () => void;
  onNavigateToAppointments: () => void;
  onNavigateToPatients: () => void;
  onNavigateToBilling: () => void;
  onOpenVirtualVisit: (patientName?: string) => void;
  onOpenSearchPatient: () => void;
  onOpenNewPrescription: (patientName?: string) => void;
  onOpenReferPatient: (patientName?: string) => void;
  onOpenAIScribe: (patientName?: string) => void;
  onOpenAdjustSchedule: () => void;
  onOpenSettings?: () => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenFullBriefing: () => void;
  onOpenTasks: () => void;
  onOpenExport: () => void;
  onOpenAskAva: () => void;
  onNavigateToChats?: () => void;
  onNavigateToReports?: () => void;
}

export const DoctorDashboardView: React.FC<DoctorDashboardViewProps> = ({
  onNavigateToCalendar,
  onNavigateToAppointments,
  onNavigateToPatients,
  onNavigateToBilling,
  onOpenVirtualVisit,
  onOpenSearchPatient,
  onOpenNewPrescription,
  onOpenReferPatient,
  onOpenAIScribe,
  onOpenAdjustSchedule,
  onOpenSettings,
  onOpenPatientChart,
  onOpenFullBriefing,
  onOpenTasks,
  onOpenExport,
  onOpenAskAva,
  onNavigateToChats,
  onNavigateToReports,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Dashboard');
  const [alerts, setAlerts] = useState<ClinicalAlert[]>(INITIAL_ALERTS);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'Appointment') {
      onNavigateToAppointments();
    } else if (tab === 'Patient') {
      onNavigateToPatients();
    } else if (tab === 'Reports') {
      if (onNavigateToReports) {
        onNavigateToReports();
      } else {
        onOpenFullBriefing();
      }
    } else if (tab === 'Chats') {
      if (onNavigateToChats) {
        onNavigateToChats();
      } else {
        onOpenAskAva();
      }
    } else if (tab === 'Billing') {
      onNavigateToBilling();
    }
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-4 sm:space-y-5">
      {/* 1. Header Navigation */}
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchClick={onOpenSearchPatient}
        onOpenNotifications={onOpenTasks}
        onOpenSettings={onOpenSettings || onOpenAdjustSchedule}
      />

      {/* 2. Doctor Greeting & Top Level Actions */}
      <GreetingSection
        onOpenCalendar={onNavigateToCalendar}
        onExport={onOpenExport}
        onOpenTasks={onOpenTasks}
      />

      {/* 3. Middle Section: Metrics + Charts (Left ~68%) & Quick Actions (Right ~32%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Left Column (8 cols): 4 Stat Cards + 2 Dual Charts */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
          {/* 4 Stat Cards */}
          <MetricCards onCardClick={(m) => m === 'appointments' && onNavigateToCalendar()} />

          {/* Dual Charts: Patient Statistics & Consultation Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <PatientStatisticsChart />
            <ConsultationFocusChart />
          </div>
        </div>

        {/* Right Column (4 cols): Quick Actions */}
        <div className="lg:col-span-4">
          <QuickActions
            onNewVirtualVisit={() => onOpenVirtualVisit('Sarah Johnson')}
            onSearchPatient={onOpenSearchPatient}
            onNewPrescription={() => onOpenNewPrescription('Sarah Johnson')}
            onReferPatient={() => onOpenReferPatient('Sarah Johnson')}
            onOpenAIScribe={() => onOpenAIScribe('Sarah Johnson')}
            onAdjustSchedule={onOpenAdjustSchedule}
          />
        </div>
      </div>

      {/* 4. Lower-Middle Section: Next Appointment (4 cols), Clinical Alerts (4 cols), Pending Reviews & Tasks (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Next Appointment Card */}
        <div className="lg:col-span-4">
          <NextAppointmentCard
            onJoinCall={() => onOpenVirtualVisit('Sarah Johnson')}
            onReview={() => onOpenAIScribe('Sarah Johnson')}
            onOpenChat={() => onOpenAskAva()}
          />
        </div>

        {/* Clinical Alerts Card */}
        <div className="lg:col-span-4">
          <ClinicalAlertsCard
            alerts={alerts}
            onOpenChart={(patientName) => onOpenPatientChart(patientName)}
            onDismissAlert={handleDismissAlert}
            onSeeAll={onOpenFullBriefing}
          />
        </div>

        {/* Pending Reviews & Tasks */}
        <div className="md:col-span-2 lg:col-span-4">
          <PendingReviewsCards
            onOpenLabReviews={() => onOpenPatientChart('Mike Lee')}
            onOpenTasks={onOpenTasks}
          />
        </div>
      </div>

      {/* 5. Bottom Section: AI Patient Queue (4 cols), Today's Schedule (4 cols), Messages (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* AI Patient Queue */}
        <div className="lg:col-span-4">
          <AIPatientQueueCard
            onJoinPatient={(name) => onOpenVirtualVisit(name)}
            onViewSummary={(name) => onOpenPatientChart(name)}
            onViewAll={onOpenSearchPatient}
          />
        </div>

        {/* Today's Schedule */}
        <div className="lg:col-span-4">
          <TodayScheduleCard
            onOpenCalendar={onNavigateToCalendar}
            onResumeVisit={(name) => onOpenVirtualVisit(name)}
            onJoinVisit={(name) => onOpenVirtualVisit(name)}
            onViewSummary={(name) => onOpenPatientChart(name)}
          />
        </div>

        {/* Messages */}
        <div className="md:col-span-2 lg:col-span-4">
          <MessagesCard
            onOpenInbox={onOpenAskAva}
            onSelectMessage={(name) => onOpenPatientChart(name)}
          />
        </div>
      </div>

    </div>
  );
};
