import React, { useState } from 'react';
import {
  Sparkles,
  Pill,
  FlaskConical,
  FileText,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { PRESCRIPTION_DATA } from '../../mockData';
import { ProviderStatusType } from '../../types';
import { Avatar } from '../common/Avatar';

interface CalendarSidebarProps {
  onRefillRequest: () => void;
  onJoinQueuePatient: (patientName: string) => void;
  onChatQueuePatient: (patientName: string) => void;
  onViewAllPrescriptions: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  onRefillRequest,
  onJoinQueuePatient,
  onChatQueuePatient,
  onViewAllPrescriptions,
}) => {
  const [providerStatus, setProviderStatus] = useState<ProviderStatusType>('Available');

  const statuses: ProviderStatusType[] = [
    'Available',
    'In Consultation',
    'Running Late',
    'Offline',
  ];

  const statusColors = {
    Available: 'bg-emerald-500',
    'In Consultation': 'bg-amber-500',
    'Running Late': 'bg-rose-500',
    Offline: 'bg-slate-400',
  };

  return (
    <aside className="space-y-4 w-full">
      {/* 1. PROVIDER STATUS */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <h4 className="font-sora font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2.5">
          PROVIDER STATUS
        </h4>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statuses.map((st) => {
            const isSelected = providerStatus === st;
            return (
              <button
                key={st}
                onClick={() => setProviderStatus(st)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 min-h-[36px] sm:min-h-0 rounded-full text-xs font-sora font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-[0_2px_8px_rgba(154,106,251,0.35)]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-white' : statusColors[st]
                  }`}
                />
                <span>{st}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Today's Overview */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
            Today's Overview
          </h4>
          <span className="text-xs text-slate-400">Avg. visit 14m</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C24FF]" />
              <span>Appointments</span>
            </span>
            <span className="font-sora font-semibold text-slate-900">12</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Completed</span>
            </span>
            <span className="font-sora font-semibold text-slate-900">4</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Upcoming</span>
            </span>
            <span className="font-sora font-semibold text-slate-900">8</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Waiting</span>
            </span>
            <span className="font-sora font-semibold text-slate-900">2</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Canceled</span>
            </span>
            <span className="font-sora font-semibold text-slate-900">1</span>
          </div>
        </div>
      </div>

      {/* 3. Active Prescriptions */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-amber-500" />
            <h4 className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
              Active Prescriptions
            </h4>
          </div>
          <button
            onClick={onViewAllPrescriptions}
            className="font-sora text-xs font-semibold text-[#5C24FF] hover:text-[#4A15E8] inline-flex items-center px-1 -mr-1 min-h-[36px] sm:min-h-0 sm:px-0 sm:mr-0"
          >
            View All
          </button>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <Avatar
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Priya Patel"
              initials="PP"
              size="sm"
            />
            <div>
              <span className="font-sora font-semibold text-xs text-slate-900 block leading-tight">
                Dr. Priya Patel{' '}
                <span className="text-[10px] text-slate-400 font-normal">(Cardiologist)</span>
              </span>
              <span className="text-[10px] text-slate-400">Issued: May 10, 2026</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Active</span>
          </span>
        </div>

        {/* Refill numbers */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
          <span>Refills: 2 of 3</span>
          <span>Next Refill: June 28, 2026</span>
        </div>

        {/* Refill Request Button */}
        <button
          onClick={onRefillRequest}
          className="w-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-xs font-sora font-semibold py-2 min-h-[36px] sm:min-h-0 rounded-xl shadow-[0_2px_8px_rgba(154,106,251,0.35)] transition-all active:scale-98 mb-3"
        >
          Refill Request
        </button>

        {/* Medication List */}
        <div className="space-y-2 mb-3">
          {PRESCRIPTION_DATA.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div>
                <span className="font-sora font-semibold text-xs text-slate-900 block">
                  {med.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {med.dosage} | {med.quantity}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  med.statusColor === 'green'
                    ? 'bg-emerald-50 text-emerald-600'
                    : med.statusColor === 'amber'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    med.statusColor === 'green'
                      ? 'bg-emerald-500'
                      : med.statusColor === 'amber'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />
                <span>{med.status}</span>
              </span>
            </div>
          ))}
        </div>

        {/* AI Analysis Box */}
        <div className="bg-[#FAF8FF] border border-purple-100/90 rounded-xl p-2.5">
          <div className="flex items-center gap-1 text-[#5C24FF] font-sora font-semibold text-[11px] mb-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Analysis</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Aspirin refill in 7 days. Patient showing 94% adherence.
          </p>
        </div>
      </div>

      {/* 4. AI Schedule Insights */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-[#5C24FF]" />
          <h4 className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
            AI Schedule Insights
          </h4>
        </div>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#5C24FF] flex-shrink-0 mt-0.5" />
            <span className="leading-tight">Sarah Johnson uploaded new BP readings.</span>
          </div>
          <div className="flex items-start gap-2">
            <FlaskConical className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="leading-tight">Mike Lee has pending lab results.</span>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span className="leading-tight">Emily Chen pre-visit summary is ready.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
            <span className="leading-tight text-rose-600 font-medium">
              Rajesh Gupta requires urgent review.
            </span>
          </div>
        </div>
      </div>

      {/* 5. Patient Queue */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
            Patient Queue
          </h4>
          <span className="text-xs text-slate-400">2 waiting</span>
        </div>

        <div className="space-y-3">
          {/* Patient 1 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Johnson"
                initials="SJ"
                size="sm"
              />
              <div>
                <span className="font-sora font-semibold text-xs text-slate-900 block leading-tight">
                  Sarah Johnson
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Waiting 8m</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onJoinQueuePatient('Sarah Johnson')}
                className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-[11px] font-sora font-semibold px-2.5 py-1 min-h-[36px] sm:min-h-0 rounded-lg shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95"
              >
                Join
              </button>
              <button
                onClick={() => onChatQueuePatient('Sarah Johnson')}
                className="p-1 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Message"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Patient 2 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Mike Lee"
                initials="ML"
                size="sm"
              />
              <div>
                <span className="font-sora font-semibold text-xs text-slate-900 block leading-tight">
                  Mike Lee
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Waiting 3m</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onJoinQueuePatient('Mike Lee')}
                className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white text-[11px] font-sora font-semibold px-2.5 py-1 min-h-[36px] sm:min-h-0 rounded-lg shadow-[0_2px_8px_rgba(154,106,251,0.3)] transition-all active:scale-95"
              >
                Join
              </button>
              <button
                onClick={() => onChatQueuePatient('Mike Lee')}
                className="p-1 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Message"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
