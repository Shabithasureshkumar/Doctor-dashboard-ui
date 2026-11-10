import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  FileText,
  MoreVertical,
  Check,
  CheckCheck,
  Download,
  Calendar,
  Pill,
  Activity,
  Image as ImageIcon,
  User,
  PanelRightClose,
  PanelRightOpen,
  Pin,
  Trash2,
  FileSpreadsheet,
} from 'lucide-react';
import { ChatConversation, ChatMessage, ChatAttachment } from '../../types/chat';
import { CURRENT_DOCTOR } from '../../mockData';
import { ChatComposer } from './ChatComposer';

interface ActiveChatPanelProps {
  conversation: ChatConversation;
  onSendMessage: (text: string, attachments?: ChatAttachment[]) => void;
  onOpenPatientChart: (patientName: string) => void;
  onOpenVirtualVisit: (patientName: string) => void;
  onToggleContextPanel: () => void;
  isContextPanelOpen: boolean;
  onToast: (msg: string) => void;
  onTogglePin: (id: string) => void;
}

export const ActiveChatPanel: React.FC<ActiveChatPanelProps> = ({
  conversation,
  onSendMessage,
  onOpenPatientChart,
  onOpenVirtualVisit,
  onToggleContextPanel,
  isContextPanelOpen,
  onToast,
  onTogglePin,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const renderStatusTicks = (status: ChatMessage['status']) => {
    switch (status) {
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-sky-300" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-white/70" />;
      case 'sent':
        return <Check className="w-3.5 h-3.5 text-white/60" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />;
    }
  };

  const renderAttachmentCard = (att: ChatAttachment, isDoctorSender: boolean) => {
    return (
      <div
        key={att.id}
        className={`mt-2 p-3 rounded-2xl flex items-center justify-between gap-3 text-xs border transition-all ${
          isDoctorSender
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDoctorSender ? 'bg-white/20 text-white' : 'bg-purple-50 text-[#5C24FF]'
            }`}
          >
            {att.type === 'prescription' ? (
              <Pill className="w-4 h-4 text-rose-400" />
            ) : att.type === 'lab_report' ? (
              <Activity className="w-4 h-4 text-emerald-500" />
            ) : att.type === 'image' ? (
              <ImageIcon className="w-4 h-4 text-blue-500" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0">
            <span className="font-sora font-semibold text-xs block truncate">
              {att.fileName}
            </span>
            <div className="flex items-center gap-2 text-[10px] opacity-75">
              <span>{att.fileSize}</span>
              {att.badge && (
                <>
                  <span>•</span>
                  <span className="font-bold">{att.badge}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onToast(`Downloading ${att.fileName}...`)}
          className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
            isDoctorSender
              ? 'hover:bg-white/20 text-white'
              : 'hover:bg-purple-50 text-[#5C24FF]'
          }`}
          title="Download file"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div className="h-full bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
      {/* 1. Active Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 flex-shrink-0 bg-white">
        {/* Left: Patient Avatar & Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={conversation.patientAvatar}
              alt={conversation.patientName}
              className="w-11 h-11 rounded-2xl object-cover border border-purple-100 shadow-xs"
            />
            {conversation.online ? (
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-200"
                title="Online now"
              />
            ) : (
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"
                title="Offline"
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-sora font-extrabold text-base text-slate-900 truncate">
                {conversation.patientName}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-[#5C24FF] border border-purple-100 font-mono">
                {conversation.patientId}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 truncate">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  conversation.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                }`}
              />
              <span>{conversation.online ? 'Active now' : conversation.lastActive}</span>
              <span>•</span>
              <span>Age {conversation.patientContext.age} • {conversation.patientContext.gender}</span>
            </p>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Start Video Call Action */}
          <button
            onClick={() => onOpenVirtualVisit(conversation.patientName)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs transition-colors"
            title="Launch Telehealth Video Consultation"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Video Call</span>
          </button>

          {/* View Profile / Chart Action */}
          <button
            onClick={() => onOpenPatientChart(conversation.patientName)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50/50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs transition-colors"
            title="Open patient EHR health record"
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient Chart</span>
          </button>

          {/* Toggle Patient Context Panel */}
          <button
            onClick={onToggleContextPanel}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
              isContextPanelOpen
                ? 'bg-purple-100 border-purple-200 text-[#5C24FF]'
                : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
            title={isContextPanelOpen ? 'Hide patient summary' : 'Show patient summary'}
          >
            {isContextPanelOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>

          {/* More Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isOptionsOpen && (
              <div className="absolute right-0 top-11 z-30 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 space-y-0.5 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    onTogglePin(conversation.id);
                    setIsOptionsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-purple-50 hover:text-[#5C24FF] transition-colors text-left"
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span>{conversation.isPinned ? 'Unpin Chat' : 'Pin Conversation'}</span>
                </button>

                <button
                  onClick={() => {
                    onToast('Exporting HIPAA clinical chat transcript (PDF)...');
                    setIsOptionsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-purple-50 hover:text-[#5C24FF] transition-colors text-left"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Transcript</span>
                </button>

                <button
                  onClick={() => {
                    onToast('Conversation notifications muted for 8 hours.');
                    setIsOptionsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-purple-50 hover:text-[#5C24FF] transition-colors text-left"
                >
                  <span>Mute Notifications</span>
                </button>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onToast('Conversation marked for compliance archive.');
                      setIsOptionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Archive Chat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Messages Conversation Thread Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-50/40 via-white to-purple-50/20 scrollbar-thin scrollbar-thumb-slate-200">
        {/* Date Divider */}
        <div className="flex items-center justify-center my-3">
          <span className="text-[11px] font-semibold text-slate-400 bg-white px-3.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
            Today, November 10, 2026
          </span>
        </div>

        {/* Message Bubbles */}
        {conversation.messages.map((msg) => {
          // System Message
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-4 animate-in fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 shadow-xs">
                  <Calendar className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
                  <span className="font-semibold">{msg.content}</span>
                  <span className="text-[10px] text-purple-500 font-mono ml-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          const isDoctor = msg.sender === 'doctor';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 animate-in fade-in ${
                isDoctor ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Patient Avatar (left) */}
              {!isDoctor && (
                <img
                  src={conversation.patientAvatar}
                  alt={conversation.patientName}
                  className="w-8 h-8 rounded-xl object-cover border border-purple-100 flex-shrink-0 shadow-xs mb-1"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl px-4 py-3 shadow-xs space-y-1 ${
                  isDoctor
                    ? 'bg-gradient-to-tr from-[#5C24FF] to-[#7F47FA] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                }`}
              >
                {/* Clinical Tag Header if any */}
                {msg.clinicalTag && (
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider pb-1 flex items-center gap-1 ${
                      isDoctor ? 'text-purple-200' : 'text-[#5C24FF]'
                    }`}
                  >
                    <span>{msg.clinicalTag}</span>
                  </div>
                )}

                {/* Message Content */}
                <p className="text-xs sm:text-sm font-normal leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {/* Attachments if any */}
                {msg.attachments &&
                  msg.attachments.map((att) => renderAttachmentCard(att, isDoctor))}

                {/* Meta info: Timestamp and Read receipts */}
                <div
                  className={`flex items-center justify-end gap-1.5 pt-0.5 text-[10px] ${
                    isDoctor ? 'text-white/70' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isDoctor && renderStatusTicks(msg.status)}
                </div>
              </div>

              {/* Doctor Avatar (right) */}
              {isDoctor && (
                <img
                  src={CURRENT_DOCTOR.avatarUrl}
                  alt={CURRENT_DOCTOR.name}
                  className="w-8 h-8 rounded-xl object-cover border border-purple-200 flex-shrink-0 shadow-xs mb-1"
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Message Composer Fixed Bottom Area */}
      <ChatComposer onSendMessage={onSendMessage} onToast={onToast} />
    </div>
  );
};
