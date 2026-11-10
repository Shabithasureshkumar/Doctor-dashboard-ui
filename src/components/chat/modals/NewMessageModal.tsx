import React, { useState } from 'react';
import { X, Search, MessageSquare } from 'lucide-react';
import { INITIAL_PATIENTS_LIST } from '../../../mockData/patientsData';

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConversation: (patient: (typeof INITIAL_PATIENTS_LIST)[0], initialMessage?: string) => void;
}

export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  onStartConversation,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [initialMsg, setInitialMsg] = useState('');

  if (!isOpen) return null;

  const filteredPatients = INITIAL_PATIENTS_LIST.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.medicalConditions.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedPatient = INITIAL_PATIENTS_LIST.find((p) => p.id === selectedPatientId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    onStartConversation(selectedPatient, initialMsg.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">
                New Patient Message
              </h3>
              <p className="text-xs text-slate-500">
                Initiate a secure clinical conversation with an enrolled patient
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto text-xs">
          {/* Patient Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Select Patient Record
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient name, MRN, or condition..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
              />
            </div>
          </div>

          {/* Patients List Picker */}
          <div className="max-h-48 overflow-y-auto space-y-1.5 border border-slate-100 rounded-2xl p-1.5 bg-slate-50/50">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatientId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-purple-100 text-[#5C24FF] font-bold shadow-xs'
                      : 'hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-8 h-8 rounded-xl object-cover border border-purple-200"
                    />
                    <div className="min-w-0">
                      <span className="font-sora font-semibold text-xs text-slate-900 block truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {p.patientId} • {p.age} yrs • {p.gender}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {p.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Initial Message Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Initial Clinical Note / Message (Optional)
            </label>
            <textarea
              rows={3}
              value={initialMsg}
              onChange={(e) => setInitialMsg(e.target.value)}
              placeholder="e.g. Hello, reviewing your latest test results..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] resize-none font-normal"
            />
          </div>

          {/* Footer Controls */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedPatientId}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold shadow-sm hover:opacity-95 transition-all disabled:opacity-40"
            >
              Start Conversation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
