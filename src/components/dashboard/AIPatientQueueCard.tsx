import React from 'react';
import { Users } from 'lucide-react';
import { QUEUE_PATIENTS } from '../../mockData';
import { Avatar } from '../common/Avatar';

interface AIPatientQueueCardProps {
  onJoinPatient: (patientName: string) => void;
  onViewSummary: (patientName: string) => void;
  onViewAll: () => void;
}

const QUEUE_STATUS_STYLES = {
  Ready: { dot: 'bg-emerald-500', text: 'text-emerald-600', avatar: 'online' },
  Processing: { dot: 'bg-amber-500', text: 'text-amber-600', avatar: 'waiting' },
  Urgent: { dot: 'bg-rose-500', text: 'text-rose-500', avatar: 'busy' },
} as const;

export const AIPatientQueueCard: React.FC<AIPatientQueueCardProps> = ({
  onJoinPatient,
  onViewSummary,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Users className="w-5 h-5 text-slate-400" />
          <h3 className="font-sora font-bold text-base sm:text-lg">AI Patient Queue</h3>
        </div>
        <button
          onClick={onViewAll}
          className="font-sora text-xs sm:text-sm font-semibold text-[#5C24FF] hover:text-[#4A15E8] transition-colors inline-flex items-center px-1 -mr-1 min-h-[36px] sm:min-h-0 sm:px-0 sm:mr-0"
        >
          View all
        </button>
      </div>

      {/* Patient List */}
      <div className="flex flex-col justify-around gap-2.5 flex-1">
        {QUEUE_PATIENTS.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center justify-between gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors"
          >
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={patient.avatarUrl}
                alt={patient.name}
                initials={patient.name.split(' ').map((n) => n[0]).join('')}
                size="md"
                statusIndicator={QUEUE_STATUS_STYLES[patient.queueStatus ?? 'Ready'].avatar}
              />
              <div className="min-w-0">
                <h4 className="font-sora font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  {patient.name}
                </h4>
                <p className="text-[11px] text-slate-400 flex items-center flex-wrap gap-x-1">
                  <span>Wait {patient.waitTime} ·</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      QUEUE_STATUS_STYLES[patient.queueStatus ?? 'Ready'].dot
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      QUEUE_STATUS_STYLES[patient.queueStatus ?? 'Ready'].text
                    }`}
                  >
                    {patient.queueStatus ?? 'Ready'}
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => onViewSummary(patient.name)}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs font-sora font-semibold px-2.5 py-1 min-h-[36px] sm:min-h-0 rounded-xl transition-all active:scale-95"
              >
                Summary
              </button>
              <button
                onClick={() => onJoinPatient(patient.name)}
                className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-xs font-sora font-semibold px-3 py-1 min-h-[36px] sm:min-h-0 rounded-xl shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
