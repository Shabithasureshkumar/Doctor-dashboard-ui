import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  BarChart3,
  Eye,
  Share2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FlaskConical,
  Scan,
  Activity,
} from 'lucide-react';
import { TabType } from '../../types';
import {
  MedicalReport,
  ReportsFilterOptions,
  ReportsFilterTab,
} from '../../types/reports';
import { INITIAL_REPORTS } from '../../mockData/reportsData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { ReportSummaryCards } from './ReportSummaryCards';
import { ReportPendingStrip } from './ReportPendingStrip';
import { ReportAnalyticsSection } from './ReportAnalyticsSection';
import { ReportFilterModal } from './ReportFilterModal';
import { ReportExportModal } from './ReportExportModal';
import { ReportDetailsDrawer } from './ReportDetailsDrawer';

interface ReportsViewProps {
  onBackToDashboard: () => void;
  onNavigateToAppointments?: () => void;
  onNavigateToPatients?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToChats?: () => void;
  onOpenSettings?: () => void;
  onOpenSearchPatient?: () => void;
  onOpenTasks?: () => void;
  onOpenPatientChart: (patientName: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  onBackToDashboard,
  onNavigateToAppointments,
  onNavigateToPatients,
  onNavigateToBilling,
  onNavigateToChats,
  onOpenSettings,
  onOpenSearchPatient,
  onOpenTasks,
  onOpenPatientChart,
}) => {
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [activeTab, setActiveTab] = useState<ReportsFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(true);

  // Modals / Drawers
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter state
  const [filters, setFilters] = useState<ReportsFilterOptions>({
    searchQuery: '',
    type: 'all',
    status: 'all',
    priority: 'all',
    dateRange: 'all',
    orderingPhysician: 'all',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 3500);
  };

  // Actions
  const handleMarkAsReviewed = (id: string, notes?: string) => {
    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setReports((prev) =>
      prev.map((rep) =>
        rep.id === id
          ? {
              ...rep,
              status: 'Reviewed',
              reviewedAt: `${nowStr} • Dr. David Brock`,
              reviewedBy: 'Dr. David Brock, MD',
              doctorNotes: notes || rep.doctorNotes,
            }
          : rep
      )
    );
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: 'Reviewed',
              reviewedAt: `${nowStr} • Dr. David Brock`,
              doctorNotes: notes || prev.doctorNotes,
            }
          : null
      );
    }
    showToast('Report marked as reviewed and signed off.');
  };

  const handleSaveNotes = (id: string, newNotes: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, doctorNotes: newNotes } : r))
    );
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport((prev) => (prev ? { ...prev, doctorNotes: newNotes } : null));
    }
  };

  const handleShareWithPatient = (id: string) => {
    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, sharedWithPatient: true, sharedAt: nowStr } : r
      )
    );
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport((prev) =>
        prev ? { ...prev, sharedWithPatient: true, sharedAt: nowStr } : null
      );
    }
    showToast('Diagnostic report securely shared to patient portal.');
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      type: 'all',
      status: 'all',
      priority: 'all',
      dateRange: 'all',
      orderingPhysician: 'all',
    });
    setSearchQuery('');
    setActiveTab('all');
    setCurrentPage(1);
    setIsFilterModalOpen(false);
    showToast('Filters reset to default.');
  };

  // Filter calculations
  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      // Tab filter
      if (activeTab === 'lab' && rep.type !== 'Lab') return false;
      if (activeTab === 'imaging' && rep.type !== 'Imaging') return false;
      if (activeTab === 'diagnostic' && rep.type !== 'Diagnostic') return false;
      if (activeTab === 'clinical' && rep.type !== 'Clinical') return false;

      // Type filter
      if (filters.type !== 'all' && rep.type !== filters.type) return false;

      // Status filter
      if (filters.status !== 'all' && rep.status !== filters.status) return false;

      // Priority filter
      if (filters.priority !== 'all' && rep.priority !== filters.priority) return false;

      // Search query across patient name, report id, test name
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchName = rep.patientName.toLowerCase().includes(q);
        const matchId = rep.id.toLowerCase().includes(q);
        const matchPatientId = rep.patientId.toLowerCase().includes(q);
        const matchTest = rep.testName.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchPatientId && !matchTest) return false;
      }

      return true;
    });
  }, [reports, activeTab, filters, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1;
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(start, start + itemsPerPage);
  }, [filteredReports, currentPage]);

  // Counts for summary cards
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'Pending Review').length;
  const reviewedCount = reports.filter((r) => r.status === 'Reviewed').length;
  const abnormalCount = reports.filter(
    (r) => r.status === 'Abnormal' || r.status === 'Critical'
  ).length;

  const urgentPending = reports.filter(
    (r) => r.status === 'Pending Review' || r.status === 'Critical'
  );

  // Navigation handlers
  const handleTabChange = (tab: TabType) => {
    if (tab === 'Dashboard') onBackToDashboard();
    else if (tab === 'Appointment') onNavigateToAppointments?.();
    else if (tab === 'Patient') onNavigateToPatients?.();
    else if (tab === 'Billing') onNavigateToBilling?.();
    else if (tab === 'Chats') onNavigateToChats?.();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.type !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.priority !== 'all') count++;
    if (filters.dateRange !== 'all') count++;
    return count;
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-5 font-inter">
      {/* 1. Global Mednevo Header */}
      <DashboardHeader
        activeTab="Reports"
        onTabChange={handleTabChange}
        onSearchClick={onOpenSearchPatient}
        onOpenNotifications={onOpenTasks}
        onOpenSettings={onOpenSettings}
      />

      {/* 2. Top Title Bar & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Reports</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Diagnostic Clearinghouse
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review patient medical reports, diagnostic results, and clinical insights
          </p>
        </div>

        {/* Action Controls: Search, Filter, Export, Analytics toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search patient, report ID, test..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-xs font-sora font-semibold transition-all shadow-2xs ${
              getActiveFilterCount() > 0
                ? 'bg-purple-50 text-[#5C24FF] border-purple-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4 text-[#5C24FF]" />
            <span>Filter</span>
            {getActiveFilterCount() > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#5C24FF] text-white text-[10px] flex items-center justify-center font-bold">
                {getActiveFilterCount()}
              </span>
            )}
          </button>

          {/* Analytics Toggle */}
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-xs font-sora font-semibold transition-all shadow-2xs ${
              showAnalytics
                ? 'bg-purple-100 text-[#5C24FF] border-purple-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle clinical analytics charts"
          >
            <BarChart3 className="w-4 h-4 text-[#5C24FF]" />
            <span className="hidden sm:inline">Analytics</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* 3. Four Overview Summary Cards */}
      <ReportSummaryCards
        totalCount={totalCount}
        pendingCount={pendingCount}
        reviewedCount={reviewedCount}
        abnormalCount={abnormalCount}
        onFilterByStatus={(status) => {
          setFilters((prev) => ({ ...prev, status: status as any }));
          setCurrentPage(1);
          showToast(`Filtered by ${status}`);
        }}
      />

      {/* 4. Urgent / Pending Reports Highlight Strip */}
      {urgentPending.length > 0 && (
        <ReportPendingStrip
          pendingReports={urgentPending}
          onSelectReport={(rep) => setSelectedReport(rep)}
        />
      )}

      {/* 5. Clinical Insights & Analytics Section (Collapsible) */}
      {showAnalytics && <ReportAnalyticsSection />}

      {/* 6. Navigation Tabs Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          {/* 5 Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {(
              [
                { id: 'all', label: 'All Reports', count: reports.length },
                {
                  id: 'lab',
                  label: 'Lab Results',
                  count: reports.filter((r) => r.type === 'Lab').length,
                },
                {
                  id: 'imaging',
                  label: 'Imaging',
                  count: reports.filter((r) => r.type === 'Imaging').length,
                },
                {
                  id: 'diagnostic',
                  label: 'Diagnostic Reports',
                  count: reports.filter((r) => r.type === 'Diagnostic').length,
                },
                {
                  id: 'clinical',
                  label: 'Clinical Reports',
                  count: reports.filter((r) => r.type === 'Clinical').length,
                },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-sora font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#5C24FF] hover:bg-purple-50/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
            Showing <strong className="text-slate-800">{filteredReports.length}</strong> investigations
          </div>
        </div>

        {/* 7. Reports Table (Desktop) / Cards (Mobile) */}
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7" />
            </div>
            <h4 className="font-sora font-bold text-base text-slate-800">
              No matching clinical reports found
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No reports matched "${searchQuery}". Try searching by patient name or test title.`
                : 'No reports found under this category filter.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-sora font-bold text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pl-2">Report ID</th>
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Report Type</th>
                  <th className="pb-3">Investigation / Test</th>
                  <th className="pb-3">Received Date</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Review Status</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {paginatedReports.map((rep) => {
                  const isCritical = rep.status === 'Critical';
                  const isAbnormal = rep.status === 'Abnormal';
                  const isReviewed = rep.status === 'Reviewed';

                  return (
                    <tr
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Report ID */}
                      <td className="py-4 pl-2 font-mono font-bold text-[#5C24FF]">
                        {rep.id}
                      </td>

                      {/* Patient */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={rep.patientAvatar}
                            alt={rep.patientName}
                            className="w-9 h-9 rounded-xl object-cover border border-purple-100 shadow-2xs"
                          />
                          <div className="min-w-0">
                            <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 block truncate group-hover:text-[#5C24FF] transition-colors">
                              {rep.patientName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {rep.patientId} • {rep.patientAge}y • {rep.patientGender}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Report Type Badge */}
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold text-[11px] ${
                            rep.type === 'Lab'
                              ? 'bg-purple-50 text-[#5C24FF]'
                              : rep.type === 'Imaging'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {rep.type === 'Lab' && <FlaskConical className="w-3 h-3" />}
                          {rep.type === 'Imaging' && <Scan className="w-3 h-3" />}
                          {rep.type === 'Diagnostic' && <Activity className="w-3 h-3" />}
                          <span>{rep.type}</span>
                        </span>
                      </td>

                      {/* Test / Investigation */}
                      <td className="py-4 max-w-xs">
                        <span className="font-semibold text-slate-800 block truncate text-xs sm:text-sm">
                          {rep.testName}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {rep.categoryLabel}
                        </span>
                      </td>

                      {/* Received Date */}
                      <td className="py-4 text-slate-500 text-xs font-medium">
                        {rep.receivedDate}
                      </td>

                      {/* Priority */}
                      <td className="py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : rep.priority === 'High'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {rep.priority}
                        </span>
                      </td>

                      {/* Review Status */}
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isCritical
                              ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                              : isAbnormal
                              ? 'bg-purple-50 text-[#5C24FF] border border-purple-200'
                              : isReviewed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isCritical && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                          {isReviewed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{rep.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-2 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedReport(rep)}
                            className="w-8 h-8 rounded-xl hover:bg-purple-100 text-slate-500 hover:text-[#5C24FF] flex items-center justify-center transition-colors"
                            title="View Report Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              showToast(`Downloading PDF for ${rep.patientName}...`)
                            }
                            className="w-8 h-8 rounded-xl hover:bg-purple-100 text-slate-500 hover:text-[#5C24FF] flex items-center justify-center transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleShareWithPatient(rep.id)}
                            className="w-8 h-8 rounded-xl hover:bg-purple-100 text-slate-500 hover:text-[#5C24FF] flex items-center justify-center transition-colors"
                            title="Share with Patient"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 8. Pagination Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{paginatedReports.length}</strong> of{' '}
            <strong className="text-slate-800">{filteredReports.length}</strong> reports
          </div>

          <div className="flex items-center gap-1 font-sora font-semibold">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  currentPage === page
                    ? 'bg-[#5C24FF] text-white shadow-xs'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Details Slide-over Drawer */}
      <ReportDetailsDrawer
        report={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        onMarkAsReviewed={handleMarkAsReviewed}
        onSaveNotes={handleSaveNotes}
        onShareWithPatient={handleShareWithPatient}
        onOpenPatientChart={(name) => {
          setSelectedReport(null);
          onOpenPatientChart(name);
        }}
        onToast={showToast}
      />

      {/* Filter Modal */}
      <ReportFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onChangeFilters={(f) => {
          setFilters(f);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
      />

      {/* Export Modal */}
      <ReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reports={filteredReports}
        onToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
