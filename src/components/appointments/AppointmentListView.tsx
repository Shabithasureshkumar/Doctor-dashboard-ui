import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Video,
  MapPin,
  Play,
  X,
  MoreVertical,
  Wind,
  Flame,
  HeartPulse,
  Sparkles,
  Accessibility,
  Eye,
  Activity,
  Grid3X3,
  List,
} from 'lucide-react';
import {
  AppointmentCategory,
  DetailedAppointment,
  INITIAL_DETAILED_APPOINTMENTS,
  INITIAL_TIMELINE_ITEMS,
  TimelineAppointmentItem,
} from '../../mockData/appointmentListData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { CancelAppointmentModal } from './CancelAppointmentModal';
import { RescheduleAppointmentModal } from './RescheduleAppointmentModal';
import { TabType } from '../../types';

interface AppointmentListViewProps {
  onBackToDashboard: () => void;
  onOpenVirtualVisit: (patientName: string) => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenNewAppointment: () => void;
  onNavigateToBilling: () => void;
  onNavigateToPatients?: () => void;
  onNavigateToCalendarGrid: () => void;
  onOpenSearchPatient: () => void;
  onOpenFullBriefing: () => void;
  onOpenAskAva: () => void;
  onOpenTasks: () => void;
  onOpenAdjustSchedule: () => void;
  onOpenSettings?: () => void;
  onNavigateToChats?: () => void;
}

export const AppointmentListView: React.FC<AppointmentListViewProps> = ({
  onBackToDashboard,
  onOpenVirtualVisit,
  onOpenPatientChart,
  onOpenNewAppointment,
  onNavigateToBilling,
  onNavigateToPatients,
  onNavigateToCalendarGrid,
  onOpenSearchPatient,
  onOpenFullBriefing,
  onOpenAskAva,
  onOpenTasks,
  onOpenAdjustSchedule,
  onOpenSettings,
  onNavigateToChats,
}) => {
  const [appointments, setAppointments] = useState<DetailedAppointment[]>(
    INITIAL_DETAILED_APPOINTMENTS
  );
  const [timelineItems, _setTimelineItems] = useState<TimelineAppointmentItem[]>(
    INITIAL_TIMELINE_ITEMS
  );
  const [activeCategory, setActiveCategory] = useState<AppointmentCategory>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Wed, Nov 10, 2026');
  const [dateIndex, setDateIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States for Cancel & Reschedule
  const [selectedAppointmentForCancel, setSelectedAppointmentForCancel] =
    useState<DetailedAppointment | null>(null);
  const [selectedAppointmentForReschedule, setSelectedAppointmentForReschedule] =
    useState<DetailedAppointment | null>(null);

  const dates = ['Wed, Nov 10, 2026', 'Thu, Nov 11, 2026', 'Fri, Nov 12, 2026', 'Mon, Nov 15, 2026'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 4000);
  };

  // Live countdown timer for upcoming appointments
  useEffect(() => {
    const timer = setInterval(() => {
      setAppointments((prev) =>
        prev.map((apt) => {
          if (apt.category !== 'upcoming' || apt.countdownSeconds <= 0) return apt;
          const nextSec = apt.countdownSeconds - 1;
          const hrs = Math.floor(nextSec / 3600);
          const mins = Math.floor((nextSec % 3600) / 60);
          const secs = nextSec % 60;
          const pad = (n: number) => n.toString().padStart(2, '0');
          return {
            ...apt,
            countdownSeconds: nextSec,
            countdown: `Starts in ${pad(hrs)}:${pad(mins)}:${pad(secs)}`,
          };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevDate = () => {
    const nextIdx = (dateIndex - 1 + dates.length) % dates.length;
    setDateIndex(nextIdx);
    setSelectedDate(dates[nextIdx]);
  };

  const handleNextDate = () => {
    const nextIdx = (dateIndex + 1) % dates.length;
    setDateIndex(nextIdx);
    setSelectedDate(dates[nextIdx]);
  };

  // Filtered appointments by active tab (Upcoming, Past, Cancelled) & Search query
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      if (apt.category !== activeCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        apt.patientName.toLowerCase().includes(q) ||
        apt.patientId.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q) ||
        apt.mode.toLowerCase().includes(q)
      );
    });
  }, [appointments, activeCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      upcoming: appointments.filter((a) => a.category === 'upcoming').length,
      past: appointments.filter((a) => a.category === 'past').length,
      cancelled: appointments.filter((a) => a.category === 'cancelled').length,
    };
  }, [appointments]);

  // Actions
  const handleStartAppointment = (apt: DetailedAppointment) => {
    if (apt.mode === 'Video Call') {
      onOpenVirtualVisit(apt.patientName);
    } else {
      onOpenPatientChart(apt.patientName);
      showToast(`Starting in-person visit with ${apt.patientName}`);
    }
  };

  const handleOpenReschedule = (apt: DetailedAppointment) => {
    setSelectedAppointmentForReschedule(apt);
  };

  const handleOpenCancel = (apt: DetailedAppointment) => {
    setSelectedAppointmentForCancel(apt);
  };

  const handleConfirmCancel = (aptId: string, reason: string) => {
    const apt = appointments.find((a) => a.id === aptId);
    const name = apt?.patientName || 'Patient';
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? {
              ...a,
              category: 'cancelled' as const,
              countdown: `Cancelled: ${reason}`,
              statusBadge: 'Cancelled',
            }
          : a
      )
    );
    showToast(`Appointment for ${name} cancelled (${reason})`);
  };

  const handleConfirmReschedule = (
    aptId: string,
    newDate: string,
    newTime: string,
    reason?: string
  ) => {
    const apt = appointments.find((a) => a.id === aptId);
    const name = apt?.patientName || 'Patient';
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? {
              ...a,
              time: newTime,
              countdown: `Rescheduled to ${newTime}`,
              statusBadge: 'Rescheduled',
            }
          : a
      )
    );
    const noteText = reason ? ` • Reason: ${reason}` : '';
    showToast(`Appointment for ${name} rescheduled to ${newDate} at ${newTime}${noteText}`);
  };

  // Helper for Clinical Reason Icons
  const renderReasonIcon = (iconType: DetailedAppointment['iconType']) => {
    switch (iconType) {
      case 'lungs':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
            <Wind className="w-4 h-4" />
          </div>
        );
      case 'stomach':
        return (
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-4 h-4" />
          </div>
        );
      case 'heart':
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
        );
      case 'skin':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
      case 'bone':
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Accessibility className="w-4 h-4" />
          </div>
        );
      case 'eye':
        return (
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
            <Eye className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4" />
          </div>
        );
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'Dashboard') onBackToDashboard();
    else if (tab === 'Billing') onNavigateToBilling();
    else if (tab === 'Patient') {
      if (onNavigateToPatients) onNavigateToPatients();
      else onOpenSearchPatient();
    }
    else if (tab === 'Reports') onOpenFullBriefing();
    else if (tab === 'Chats') {
      if (onNavigateToChats) onNavigateToChats();
      else onOpenAskAva();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-4 sm:space-y-5 flex flex-col font-inter">
      {/* 1. Global Mednevo Header */}
      <DashboardHeader
        activeTab="Appointment"
        onTabChange={handleTabChange}
        onSearchClick={onOpenSearchPatient}
        onOpenNotifications={onOpenTasks}
        onOpenSettings={onOpenSettings || onOpenAdjustSchedule}
      />

      {/* 2. Top Bar: Heading + Date Selector + View Switcher + Add Button */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Appointment List
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage, view and start your patient appointments
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-start md:justify-end">
          {/* Date Selector Pill */}
          <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-sm text-xs sm:text-sm font-semibold text-slate-800">
            <CalendarIcon className="w-4 h-4 text-[#5C24FF] ml-2 mr-2" />
            <span className="font-sora font-medium px-1 min-w-[130px] text-center">
              {selectedDate}
            </span>
            <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1.5 ml-1.5">
              <button
                onClick={handlePrevDate}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextDate}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View Toggle: List View (current) vs Calendar Grid */}
          <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl p-1 shadow-sm">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 text-[#5C24FF] text-xs font-semibold"
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={onNavigateToCalendarGrid}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-[#5C24FF] hover:bg-purple-50 text-xs font-medium transition-colors"
              title="Switch to Calendar Grid View"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Calendar Grid</span>
            </button>
          </div>

          {/* Add Appointment Button */}
          <button
            onClick={onOpenNewAppointment}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white px-4 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* 3. Five Top Metric Cards (Matches Screenshot Exactly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full flex-shrink-0">
        {/* Card 1: Today's Appointments (Purple Gradient) */}
        <div className="bg-gradient-to-br from-[#9A6AFB] via-[#7F47FA] to-[#5C24FF] text-white rounded-3xl p-5 shadow-[0_8px_24px_rgba(154,106,251,0.35)] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-100">Today's Appointments</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-sora font-bold text-3xl">16</span>
            <span className="text-[11px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              ↑ +12%
            </span>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-sora font-bold text-3xl text-slate-900">10</span>
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
              ↑ +8%
            </span>
          </div>
        </div>

        {/* Card 3: Upcoming */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Upcoming</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="font-sora font-bold text-3xl text-slate-900">5</span>
          </div>
        </div>

        {/* Card 4: Cancelled */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cancelled</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline">
            <span className="font-sora font-bold text-3xl text-slate-900">1</span>
          </div>
        </div>

        {/* Card 5: Today's Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          {/* Circular Donut Indicator */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-purple-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#5C24FF]"
                strokeDasharray="62, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-sora font-bold text-xs text-slate-900">62%</span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-slate-800 block">Today's Progress</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">10 of 16 Completed</span>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] rounded-full"
                style={{ width: '62%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Filter Pills: Upcoming (5) | Past (10) | Cancelled (1) */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {(
          [
            { id: 'upcoming', label: `Upcoming (${counts.upcoming})` },
            { id: 'past', label: `Past (${counts.past})` },
            { id: 'cancelled', label: `Cancelled (${counts.cancelled})` },
          ] as const
        ).map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-2xl font-sora text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-[0_4px_12px_rgba(154,106,251,0.3)]'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 5. Main Split Layout: Left Timeline (30%) & Right Appointment List (70%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full flex-1 items-start">
        {/* Left Column: Today's Timeline (approx 4 cols / 30%) */}
        <div className="lg:col-span-4 2xl:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                  Today's Timeline
                </h3>
                <span className="text-[11px] text-slate-400 block">{selectedDate}</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold bg-purple-100 text-[#5C24FF] px-2.5 py-1 rounded-full">
              5 Appointments
            </span>
          </div>

          {/* Vertical Timeline Items with Connecting Line */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {timelineItems.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                    item.isCompleted
                      ? 'border-[#5C24FF] bg-[#5C24FF] text-white'
                      : item.isCurrent
                      ? 'border-[#5C24FF] ring-4 ring-purple-100'
                      : 'border-slate-300'
                  }`}
                >
                  {item.isCompleted && <div className="w-2 h-2 rounded-full bg-white" />}
                  {item.isCurrent && <div className="w-2 h-2 rounded-full bg-[#5C24FF]" />}
                </div>

                {/* Timeline Item Box */}
                <div
                  onClick={() => onOpenPatientChart(item.patientName)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    item.isCurrent
                      ? 'bg-purple-50/60 border-purple-200 shadow-sm'
                      : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sora font-bold text-xs text-slate-800">
                      {item.time}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isCompleted
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.isCurrent
                          ? 'bg-[#5C24FF] text-white shadow-xs'
                          : 'bg-purple-100 text-[#5C24FF]'
                      }`}
                    >
                      {item.statusBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatarUrl}
                      alt={item.patientName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                        {item.patientName}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        {item.mode === 'Video Call' ? (
                          <>
                            <Video className="w-3 h-3 text-[#5C24FF]" />
                            <span>Video Call</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>In-Person</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Appointment List Table (approx 8 cols / 70%) */}
        <div className="lg:col-span-8 2xl:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex-1 flex flex-col">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-sora font-bold text-lg text-slate-900">Appointment List</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All your scheduled appointments for {selectedDate}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by patient name, ID, or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
                />
              </div>
              <button
                className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                title="Filter Appointments"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-slate-400 font-inter text-xs border-b border-slate-100 uppercase tracking-wider">
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Patient Details</th>
                  <th className="py-3 px-3">Reason for Visit</th>
                  <th className="py-3 px-3">Mode</th>
                  <th className="py-3 px-3">Status / Countdown</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <Clock className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                      <p className="font-semibold text-sm text-slate-700">No appointments found</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        No {activeCategory} appointments match your search.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-purple-50/40 transition-colors group cursor-pointer"
                      onClick={() => onOpenPatientChart(apt.patientName)}
                    >
                      {/* Time */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="font-sora font-bold text-xs sm:text-sm text-slate-900">
                          {apt.time}
                        </div>
                        <div className="text-[11px] text-slate-400">({apt.duration})</div>
                      </td>

                      {/* Patient Details */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={apt.avatarUrl}
                            alt={apt.patientName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                              {apt.patientName}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              ID: {apt.patientId} • Age: {apt.patientAge} • {apt.patientGender}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Reason for Visit */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          {renderReasonIcon(apt.iconType)}
                          <span className="text-xs font-medium text-slate-800 max-w-[200px] leading-snug">
                            {apt.reason}
                          </span>
                        </div>
                      </td>

                      {/* Mode */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        {apt.mode === 'Video Call' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-purple-100 text-[#5C24FF]">
                            <Video className="w-3.5 h-3.5" />
                            <span>Video Call</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-100 text-emerald-700">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>In-Person</span>
                          </span>
                        )}
                      </td>

                      {/* Status / Countdown */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5C24FF]">
                          <Clock className="w-3.5 h-3.5 text-[#5C24FF]" />
                          <span>{apt.countdown}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-3 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {apt.isCurrent ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenVirtualVisit(apt.patientName)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-md hover:opacity-95 transition-all active:scale-95"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Now</span>
                            </button>
                            <button
                              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        ) : apt.category === 'upcoming' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleStartAppointment(apt)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] rounded-xl text-xs font-semibold transition-colors"
                              title="Start Session"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Start</span>
                            </button>
                            <button
                              onClick={() => handleOpenReschedule(apt)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                              title="Reschedule Visit"
                            >
                              <CalendarIcon className="w-3 h-3" />
                              <span>Reschedule</span>
                            </button>
                            <button
                              onClick={() => handleOpenCancel(apt)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-medium transition-colors"
                              title="Cancel Appointment"
                            >
                              <X className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-slate-400 font-medium">
                              {apt.category === 'past' ? 'Completed' : 'Cancelled'}
                            </span>
                            <button
                              onClick={() => onOpenPatientChart(apt.patientName)}
                              className="text-xs text-[#5C24FF] hover:underline font-semibold"
                            >
                              View Chart →
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive Cancel Modal */}
      <CancelAppointmentModal
        isOpen={!!selectedAppointmentForCancel}
        onClose={() => setSelectedAppointmentForCancel(null)}
        appointment={selectedAppointmentForCancel}
        onConfirmCancel={handleConfirmCancel}
        onRescheduleInstead={(apt) => {
          setSelectedAppointmentForCancel(null);
          setSelectedAppointmentForReschedule(apt);
        }}
      />

      {/* Interactive Reschedule Modal with Manual Time & Reason Entry */}
      <RescheduleAppointmentModal
        isOpen={!!selectedAppointmentForReschedule}
        onClose={() => setSelectedAppointmentForReschedule(null)}
        appointment={selectedAppointmentForReschedule}
        onConfirmReschedule={handleConfirmReschedule}
      />

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
