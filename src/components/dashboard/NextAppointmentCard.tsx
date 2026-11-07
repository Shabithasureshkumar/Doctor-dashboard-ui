import React from 'react';
import { Clock, Video, Sparkles, FileText, MessageSquare } from 'lucide-react';
import { NEXT_APPOINTMENT } from '../../mockData';

interface NextAppointmentCardProps {
  onJoinCall: () => void;
  onReview: () => void;
  onOpenChat: () => void;
}

export const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({
  onJoinCall,
  onReview,
  onOpenChat,
}) => {
  const patient = NEXT_APPOINTMENT;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 text-slate-800 flex-shrink-0">
          <Clock className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <h3 className="font-sora font-bold text-base sm:text-lg whitespace-nowrap">Next Appointment</h3>
        </div>
        <span className="inline-flex items-center gap-1 bg-purple-50 text-[#5C24FF] px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap flex-shrink-0">
          <Video className="w-3 h-3 flex-shrink-0" />
          <span>10:30 AM · Video Call</span>
        </span>
      </div>

      {/* Patient Bio: large photo left, details right */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <img
          src={patient.avatarUrl}
          alt={patient.name}
          className="w-[88px] h-[104px] rounded-2xl object-cover flex-shrink-0 ring-1 ring-purple-100 bg-purple-50"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-sora font-bold text-slate-900 text-base">
              {patient.name}
            </h4>
            <span className="bg-purple-100 text-[#5C24FF] text-[11px] font-sora font-bold px-2 py-0.5 rounded-md">
              {patient.age} {patient.gender}
            </span>
          </div>
          <p className="text-xs text-[#5C24FF] font-medium mt-0.5 mb-2">
            {patient.condition}
          </p>

          {/* AI Pre-visit Summary Box */}
          <div className="bg-[#FAF8FF] border border-purple-100/90 rounded-2xl p-2.5">
            <div className="flex items-center gap-1.5 text-[#5C24FF] font-sora font-semibold text-[11px] mb-1.5">
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              <span>AI Pre-visit: Summary Ready</span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-center divide-x divide-purple-100/80">
              <div>
                <span className="text-[10px] text-slate-400 block font-normal mb-0.5">BP Avg</span>
                <span className="font-sora font-bold text-slate-900 text-sm">
                  {patient.vitals?.bpAvg}
                </span>
              </div>
              <div className="pl-1">
                <span className="text-[10px] text-slate-400 block font-normal mb-0.5">LDL</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-sora font-bold text-slate-900 text-sm">
                    {patient.vitals?.ldl}
                  </span>
                  <span className="text-[9px] text-emerald-500 font-bold">Improving</span>
                </div>
              </div>
              <div className="pl-1">
                <span className="text-[10px] text-slate-400 block font-normal mb-0.5">Adherence</span>
                <span className="font-sora font-bold text-slate-900 text-sm">
                  {patient.vitals?.adherence}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mb-2.5">
        <button
          onClick={onJoinCall}
          className="flex-1 flex items-center justify-center gap-2 bg-[#5C24FF] hover:bg-[#4A15E8] text-white py-2.5 px-4 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-98"
        >
          <Video className="w-4 h-4" />
          <span>Join Call</span>
        </button>

        <button
          onClick={onReview}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 py-2.5 px-3.5 rounded-xl font-sora font-semibold text-xs sm:text-sm transition-all active:scale-98"
        >
          <FileText className="w-4 h-4 text-slate-500" />
          <span>Review</span>
        </button>

        <button
          onClick={onOpenChat}
          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-xl transition-all active:scale-98 flex-shrink-0"
          title="Message Patient"
          aria-label="Message Patient"
        >
          <MessageSquare className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        <span>Patient has been waiting {patient.waitTime}</span>
      </div>
    </div>
  );
};
