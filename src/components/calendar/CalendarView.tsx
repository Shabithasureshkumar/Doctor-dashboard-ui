import React, { useState, useMemo, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarControls } from './CalendarControls';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';
import { FloatingAvaButton } from '../dashboard/FloatingAvaButton';
import { CALENDAR_APPOINTMENTS } from '../../mockData';
import { Appointment, AppointmentType, CalendarViewType } from '../../types';

interface CalendarViewProps {
  onBackToDashboard: () => void;
  onNewAppointment: (day?: string, time?: string) => void;
  onBlockTime: () => void;
  onExport: () => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenVirtualVisit: (patientName: string) => void;
  onRefillRequest: () => void;
  onOpenAskAva: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onBackToDashboard,
  onNewAppointment,
  onBlockTime,
  onExport,
  onOpenPatientChart,
  onOpenVirtualVisit,
  onRefillRequest,
  onOpenAskAva,
}) => {
  const PHONE = '(max-width: 767px)';
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PHONE).matches
  );
  // Until the user picks a view themselves, follow the breakpoint.
  const [pickedView, setPickedView] = useState<CalendarViewType | null>(null);
  const view = pickedView ?? (isPhone ? 'Day' : 'Week');
  const [selectedDay, setSelectedDay] = useState('MON');
  const [typeFilters, setTypeFilters] = useState<AppointmentType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weekOffset, setWeekOffset] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>(CALENDAR_APPOINTMENTS);

  // Seven columns do not fit a phone, so default to the single-day grid there.
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const onChange = (e: MediaQueryListEvent) => setIsPhone(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Dynamic range text
  const dateRangeText = useMemo(() => {
    if (weekOffset === 0) return 'Jun 22 – Jun 28, 2026';
    if (weekOffset === 1) return 'Jun 29 – Jul 05, 2026';
    if (weekOffset === -1) return 'Jun 15 – Jun 21, 2026';
    return `Jun ${22 + weekOffset * 7} – Jun ${28 + weekOffset * 7}, 2026`;
  }, [weekOffset]);

  // Filtered appointments by search term and visit-type filters
  const filteredAppointments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return appointments.filter((a) => {
      if (typeFilters.length && !typeFilters.includes(a.type)) return false;
      if (!q) return true;
      return (
        a.patientName.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.time.toLowerCase().includes(q)
      );
    });
  }, [appointments, searchQuery, typeFilters]);

  const toggleTypeFilter = (t: AppointmentType) =>
    setTypeFilters((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleSelectAppointment = (appointment: Appointment) => {
    onOpenPatientChart(appointment.patientName);
  };

  const handleSelectSlot = (day: string, time: string) => {
    onNewAppointment(day, time);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 2xl:px-10 py-4 sm:py-6 space-y-4 sm:space-y-5">
      {/* 1. Header */}
      <CalendarHeader
        onBackToDashboard={onBackToDashboard}
        onNewAppointment={() => onNewAppointment()}
        onBlockTime={onBlockTime}
        onExport={onExport}
      />

      {/* 2. Controls Bar */}
      <CalendarControls
        view={view}
        onViewChange={setPickedView}
        dateRangeText={dateRangeText}
        onPrev={() => setWeekOffset((w) => w - 1)}
        onNext={() => setWeekOffset((w) => w + 1)}
        onToday={() => setWeekOffset(0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilters={typeFilters}
        onToggleTypeFilter={toggleTypeFilter}
        onClearFilters={() => setTypeFilters([])}
      />

      {/* 3. Main Area: Calendar Grid (Left ~72%) & Sidebar (Right ~28%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Main Grid */}
        <div className="lg:col-span-8 xl:col-span-9">
          <CalendarGrid
            view={view}
            appointments={filteredAppointments}
            onSelectAppointment={handleSelectAppointment}
            onSelectSlot={handleSelectSlot}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <CalendarSidebar
            onRefillRequest={onRefillRequest}
            onJoinQueuePatient={(name) => onOpenVirtualVisit(name)}
            onChatQueuePatient={(name) => onOpenPatientChart(name)}
            onViewAllPrescriptions={onRefillRequest}
          />
        </div>
      </div>

      {/* 4. Floating AI Assistant Button */}
      <FloatingAvaButton onClick={onOpenAskAva} />
    </div>
  );
};
