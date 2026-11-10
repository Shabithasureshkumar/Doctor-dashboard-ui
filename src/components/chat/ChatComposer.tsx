import React, { useState, useRef } from 'react';
import {
  Send,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Pill,
  Activity,
  X,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { ChatAttachment } from '../../types/chat';

interface ChatComposerProps {
  onSendMessage: (text: string, attachments?: ChatAttachment[]) => void;
  onToast: (msg: string) => void;
}

const CLINICAL_TEMPLATES = [
  'Please monitor and log your BP twice daily.',
  'I will review your diagnostic telemetry and advise.',
  'Your electronic prescription has been transmitted.',
  'Kindly maintain adequate hydration over the next 48 hours.',
];

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  onToast,
}) => {
  const [text, setText] = useState('');
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [stagedAttachments, setStagedAttachments] = useState<ChatAttachment[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAttachType, setSelectedAttachType] = useState<ChatAttachment['type']>('pdf');

  const handleSend = () => {
    if (!text.trim() && stagedAttachments.length === 0) return;

    onSendMessage(
      text.trim(),
      stagedAttachments.length > 0 ? stagedAttachments : undefined
    );

    setText('');
    setStagedAttachments([]);
    setIsAttachMenuOpen(false);
    setShowTemplates(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTriggerFileSelect = (type: ChatAttachment['type']) => {
    setSelectedAttachType(type);
    setIsAttachMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (< 15MB)
      if (file.size > 15 * 1024 * 1024) {
        onToast('File exceeds maximum allowable size (15 MB).');
        return;
      }

      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const newAtt: ChatAttachment = {
        id: `att-${Date.now()}`,
        type: selectedAttachType,
        fileName: file.name,
        fileSize: sizeStr,
        badge:
          selectedAttachType === 'prescription'
            ? 'e-Rx Verified'
            : selectedAttachType === 'lab_report'
            ? 'Diagnostic Lab Report'
            : 'HIPAA Document',
      };

      setStagedAttachments((prev) => [...prev, newAtt]);
      onToast(`Attached: ${file.name}`);
    }
    // reset input
    e.target.value = '';
  };

  const handleRemoveStaged = (id: string) => {
    setStagedAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSelectTemplate = (tpl: string) => {
    setText((prev) => (prev ? `${prev} ${tpl}` : tpl));
    setShowTemplates(false);
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex-shrink-0 relative">
      {/* 1. Quick Clinical Advisory Templates Drawer */}
      {showTemplates && (
        <div className="mb-3 p-3 bg-purple-50/70 rounded-2xl border border-purple-100/80 animate-in fade-in slide-in-from-bottom-2 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#5C24FF]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Quick Clinical Responses &amp; Advisories
            </span>
            <button
              onClick={() => setShowTemplates(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CLINICAL_TEMPLATES.map((tpl) => (
              <button
                key={tpl}
                onClick={() => handleSelectTemplate(tpl)}
                className="text-left text-xs bg-white hover:bg-purple-100/80 text-slate-700 hover:text-[#5C24FF] px-2.5 py-1.5 rounded-xl border border-purple-100 transition-colors"
              >
                {tpl}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Staged Attachments Preview Strip */}
      {stagedAttachments.length > 0 && (
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1">
          {stagedAttachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-[#5C24FF] animate-in fade-in"
            >
              {att.type === 'prescription' ? (
                <Pill className="w-3.5 h-3.5 text-rose-500" />
              ) : att.type === 'lab_report' ? (
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
              ) : att.type === 'image' ? (
                <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-purple-600" />
              )}
              <span className="font-semibold truncate max-w-[150px]">{att.fileName}</span>
              <span className="text-[10px] text-slate-400">({att.fileSize})</span>
              <button
                onClick={() => handleRemoveStaged(att.id)}
                className="p-0.5 rounded-full hover:bg-purple-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 3. Main Input Row */}
      <div className="flex items-end gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#9A6AFB]/40 focus-within:bg-white focus-within:border-purple-300 transition-all">
        {/* Attachment Trigger Menu */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
            className="w-9 h-9 rounded-xl hover:bg-slate-200/70 text-slate-500 hover:text-[#5C24FF] flex items-center justify-center transition-colors"
            title="Attach clinical files"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {isAttachMenuOpen && (
            <div className="absolute bottom-12 left-0 z-30 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 animate-in fade-in zoom-in-95">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Share Healthcare Record
              </span>

              <button
                type="button"
                onClick={() => handleTriggerFileSelect('lab_report')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold block">Lab Results</span>
                  <span className="text-[10px] text-slate-400">HL7 / Quest / LabCorp</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTriggerFileSelect('prescription')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                  <Pill className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold block">e-Prescription</span>
                  <span className="text-[10px] text-slate-400">Surescripts digital Rx</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTriggerFileSelect('pdf')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-purple-50 hover:text-[#5C24FF] transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold block">Medical Report / PDF</span>
                  <span className="text-[10px] text-slate-400">Discharge / Radiology / Care plan</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTriggerFileSelect('image')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold block">Clinical Photo / ECG</span>
                  <span className="text-[10px] text-slate-400">Dermatology / Telemetry PNG/JPG</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={selectedAttachType === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt'}
          onChange={handleFileChange}
        />

        {/* Text Area */}
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type clinical message to patient (Press Enter to send)..."
          className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 resize-none max-h-32 py-2 px-1 font-medium leading-relaxed"
        />

        {/* Templates Toggle */}
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
            showTemplates
              ? 'bg-purple-100 text-[#5C24FF]'
              : 'hover:bg-slate-200/70 text-slate-400 hover:text-slate-600'
          }`}
          title="Clinical quick templates"
        >
          <Smile className="w-4 h-4" />
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim() && stagedAttachments.length === 0}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-sm hover:opacity-95 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex-shrink-0"
          title="Send message"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
