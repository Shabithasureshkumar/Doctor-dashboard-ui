import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Plus,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { TabType } from '../../types';
import {
  ChatConversation,
  ChatFilterTab,
  ChatAttachment,
  ChatMessage,
} from '../../types/chat';
import { INITIAL_CONVERSATIONS } from '../../mockData/chatData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { ConversationList } from './ConversationList';
import { ActiveChatPanel } from './ActiveChatPanel';
import { PatientContextPanel } from './PatientContextPanel';
import { NewMessageModal } from './modals/NewMessageModal';
import { INITIAL_PATIENTS_LIST } from '../../mockData/patientsData';

interface ChatViewProps {
  onBackToDashboard: () => void;
  onNavigateToAppointments?: () => void;
  onNavigateToPatients?: () => void;
  onNavigateToBilling?: () => void;
  onOpenSettings?: () => void;
  onOpenSearchPatient?: () => void;
  onOpenTasks?: () => void;
  onOpenPatientChart: (name: string) => void;
  onOpenVirtualVisit: (name: string) => void;
  onOpenSchedule: (name: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  onBackToDashboard,
  onNavigateToAppointments,
  onNavigateToPatients,
  onNavigateToBilling,
  onOpenSettings,
  onOpenSearchPatient,
  onOpenTasks,
  onOpenPatientChart,
  onOpenVirtualVisit,
  onOpenSchedule,
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>('conv-1');
  const [filterTab, setFilterTab] = useState<ChatFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mobile navigation state: if true, user is looking at the active chat; if false, looking at conversation list
  const [mobileViewingChat, setMobileViewingChat] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 4000);
  };

  const activeConversation =
    conversations.find((c) => c.id === selectedId) || conversations[0];

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileViewingChat(true);

    // Auto mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (text: string, attachments?: ChatAttachment[]) => {
    if (!activeConversation) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'doctor',
      content: text,
      timestamp: timeStr,
      status: 'delivered',
      type: attachments && attachments.length > 0 ? 'attachment' : 'text',
      attachments,
      clinicalTag: attachments ? 'Physician Document Shared' : undefined,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            lastMessage: {
              text: text || (attachments ? attachments[0].fileName : 'Sent attachment'),
              timestamp: timeStr,
              sender: 'doctor',
              type: attachments ? 'document' : 'text',
            },
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );

    showToast('Message sent securely.');
  };

  const handleTogglePin = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isPinned;
          showToast(next ? `Pinned ${c.patientName}` : `Unpinned ${c.patientName}`);
          return { ...c, isPinned: next };
        }
        return c;
      })
    );
  };

  const handleToggleArchive = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isArchived;
          showToast(next ? `Archived conversation with ${c.patientName}` : `Restored conversation with ${c.patientName}`);
          return { ...c, isArchived: next };
        }
        return c;
      })
    );
  };

  const handleMarkAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
    showToast('Conversation marked as read.');
  };

  const handleStartNewConversation = (
    patient: (typeof INITIAL_PATIENTS_LIST)[0],
    initialMsg?: string
  ) => {
    // Check if conversation already exists
    const existing = conversations.find((c) => c.patientName === patient.name);
    if (existing) {
      setSelectedId(existing.id);
      setMobileViewingChat(true);
      if (initialMsg) {
        handleSendMessage(initialMsg);
      }
      return;
    }

    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      patientId: patient.patientId,
      patientName: patient.name,
      patientAvatar: patient.avatarUrl,
      online: true,
      lastActive: 'Active now',
      isPinned: false,
      isArchived: false,
      unreadCount: 0,
      lastMessage: {
        text: initialMsg || 'Started new clinical conversation',
        timestamp: 'Just now',
        sender: 'doctor',
        type: 'text',
      },
      patientContext: {
        patientId: patient.patientId,
        name: patient.name,
        avatarUrl: patient.avatarUrl,
        age: patient.age,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        phone: patient.phone,
        email: patient.email,
        allergies: patient.allergies,
        conditions: patient.medicalConditions,
        currentMedications: patient.medications.map((m) => `${m.name} ${m.dosage}`),
        medicalAlerts: [`BP Status: ${patient.vitals.bpStatus}`, `Heart Rate: ${patient.vitals.heartRate} bpm`],
        lastAppointment: `${patient.recentVisit.date} • ${patient.recentVisit.type}`,
        lastConsultation: 'Initial Intake',
        recentLabReports: ['Initial Comprehensive Telehealth Panel'],
        recentPrescriptions: patient.medications.map((m) => `${m.name} ${m.dosage}`),
      },
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'doctor',
          content: initialMsg || `Hello ${patient.name}, I am Dr. David Brock. How can I assist you today?`,
          timestamp: 'Just now',
          status: 'delivered',
          type: 'text',
        },
      ],
    };

    setConversations([newConv, ...conversations]);
    setSelectedId(newConv.id);
    setMobileViewingChat(true);
    showToast(`New conversation initiated with ${patient.name}`);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'Dashboard') onBackToDashboard();
    else if (tab === 'Appointment') onNavigateToAppointments?.();
    else if (tab === 'Patient') onNavigateToPatients?.();
    else if (tab === 'Billing') onNavigateToBilling?.();
    else if (tab === 'Reports') showToast('Clinical Analytics & Performance Reports');
  };

  return (
    <div className="w-full h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-4 flex flex-col font-inter overflow-hidden">
      {/* 1. Global Mednevo Header */}
      <div className="flex-shrink-0">
        <DashboardHeader
          activeTab="Chats"
          onTabChange={handleTabChange}
          onSearchClick={onOpenSearchPatient}
          onOpenNotifications={onOpenTasks}
          onOpenSettings={onOpenSettings}
        />
      </div>

      {/* 2. Top Title Bar & Breadcrumbs */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 py-2">
        <div className="space-y-0.5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={onBackToDashboard}
              className="hover:text-[#5C24FF] transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-[#5C24FF] font-semibold">Chat</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#5C24FF] hover:border-purple-200 flex items-center justify-center transition-colors shadow-xs"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-2.5">
                <span>Chat</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  HIPAA End-to-End Encrypted
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Direct physician communication, document exchange, and asynchronous patient triage
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => setIsNewMessageModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* 3. Three-Column Main Chat Layout */}
      <div className="w-full flex-1 min-h-0 pb-3 overflow-hidden">
        {/* Desktop & Tablet Layout (>= lg) */}
        <div className="hidden lg:grid grid-cols-12 gap-5 h-full w-full">
          {/* Left Column: Conversation List (3.5 cols if right panel open, else 4 cols) */}
          <div
            className={`h-full overflow-hidden transition-all duration-300 ${
              isContextPanelOpen ? 'col-span-4 xl:col-span-3' : 'col-span-4'
            }`}
          >
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelectConversation={handleSelectConversation}
              filterTab={filterTab}
              onFilterChange={setFilterTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenNewMessage={() => setIsNewMessageModalOpen(true)}
              onTogglePin={handleTogglePin}
              onToggleArchive={handleToggleArchive}
              onMarkAsRead={handleMarkAsRead}
            />
          </div>

          {/* Middle Column: Active Chat Area */}
          <div
            className={`h-full overflow-hidden transition-all duration-300 ${
              isContextPanelOpen ? 'col-span-8 xl:col-span-6' : 'col-span-8'
            }`}
          >
            {activeConversation ? (
              <ActiveChatPanel
                conversation={activeConversation}
                onSendMessage={handleSendMessage}
                onOpenPatientChart={onOpenPatientChart}
                onOpenVirtualVisit={onOpenVirtualVisit}
                onToggleContextPanel={() => setIsContextPanelOpen(!isContextPanelOpen)}
                isContextPanelOpen={isContextPanelOpen}
                onToast={showToast}
                onTogglePin={(id) => handleTogglePin(id)}
              />
            ) : (
              <div className="h-full bg-white rounded-3xl border border-slate-100 flex items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-sora font-bold text-base text-slate-800">No Chat Selected</h3>
                  <p className="text-xs text-slate-400">Select a conversation from the left to start messaging.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Patient Context Panel (collapsible, 3 cols) */}
          {isContextPanelOpen && activeConversation && (
            <div className="hidden xl:block xl:col-span-3 h-full overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
              <PatientContextPanel
                patient={activeConversation.patientContext}
                onOpenPatientChart={onOpenPatientChart}
                onOpenVirtualVisit={onOpenVirtualVisit}
                onOpenSchedule={onOpenSchedule}
                onToast={showToast}
              />
            </div>
          )}
        </div>

        {/* Mobile View (< lg) */}
        <div className="lg:hidden h-full w-full overflow-hidden">
          {!mobileViewingChat ? (
            <div className="h-full overflow-hidden">
              <ConversationList
                conversations={conversations}
                selectedId={selectedId}
                onSelectConversation={handleSelectConversation}
                filterTab={filterTab}
                onFilterChange={setFilterTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenNewMessage={() => setIsNewMessageModalOpen(true)}
                onTogglePin={handleTogglePin}
                onToggleArchive={handleToggleArchive}
                onMarkAsRead={handleMarkAsRead}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col relative overflow-hidden">
              {/* Back to list bar on mobile */}
              <div className="pb-2 flex-shrink-0 flex items-center justify-between">
                <button
                  onClick={() => setMobileViewingChat(false)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#5C24FF] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Messages</span>
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                {activeConversation && (
                  <ActiveChatPanel
                    conversation={activeConversation}
                    onSendMessage={handleSendMessage}
                    onOpenPatientChart={onOpenPatientChart}
                    onOpenVirtualVisit={onOpenVirtualVisit}
                    onToggleContextPanel={() => setIsContextPanelOpen(!isContextPanelOpen)}
                    isContextPanelOpen={isContextPanelOpen}
                    onToast={showToast}
                    onTogglePin={(id) => handleTogglePin(id)}
                  />
                )}
              </div>

              {/* Mobile Slide-Over Patient Context Drawer */}
              {isContextPanelOpen && activeConversation && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in">
                  <div className="w-5/6 max-w-sm h-full bg-white shadow-2xl animate-in slide-in-from-right duration-200 flex flex-col">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                      <span className="font-sora font-bold text-xs text-slate-800">
                        Patient Health Context
                      </span>
                      <button
                        onClick={() => setIsContextPanelOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <PatientContextPanel
                        patient={activeConversation.patientContext}
                        onOpenPatientChart={onOpenPatientChart}
                        onOpenVirtualVisit={onOpenVirtualVisit}
                        onOpenSchedule={onOpenSchedule}
                        onToast={showToast}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* New Message Modal */}
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
        onStartConversation={handleStartNewConversation}
      />
    </div>
  );
};
