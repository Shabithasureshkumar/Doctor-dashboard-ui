import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Search, ArrowRight } from 'lucide-react';
import { QUEUE_PATIENTS } from '../../mockData';
import { Avatar } from '../common/Avatar';

interface SearchPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patientName: string) => void;
}

export const SearchPatientModal: React.FC<SearchPatientModalProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = QUEUE_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Patient Directory"
      subtitle="Find records by patient name, MRN, or condition"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type patient name, MRN-XXXX, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] transition-all"
            autoFocus
          />
        </div>

        {/* Results List */}
        <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
          {filteredPatients.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching patient records found.
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-purple-50/30 px-2.5 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={patient.avatarUrl}
                    alt={patient.name}
                    initials={patient.name.split(' ').map((n) => n[0]).join('')}
                    size="md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
                        {patient.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {patient.mrn}
                      </span>
                    </div>
                    <span className="text-xs text-[#5C24FF] font-medium block">
                      {patient.condition} · {patient.age} y/o ({patient.gender})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectPatient(patient.name);
                      onClose();
                    }}
                    className="flex items-center gap-1 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95"
                  >
                    <span>Open Chart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
