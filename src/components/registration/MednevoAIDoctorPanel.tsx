import React from 'react';
import { Stethoscope } from 'lucide-react';

interface DoctorPoseMeta {
  pose: string;
  actionTitle: string;
}

const STEP_POSES: Record<number, DoctorPoseMeta> = {
  1: { pose: 'welcome', actionTitle: 'Welcome & Introduction' },
  2: { pose: 'secure', actionTitle: 'Account & Credential Security' },
  3: { pose: 'profile', actionTitle: 'Professional Identity & Credentials' },
  4: { pose: 'location', actionTitle: 'Healthcare Practice Location' },
  5: { pose: 'services', actionTitle: 'Medical Specialties & Services' },
  6: { pose: 'payment', actionTitle: 'Consultation & Payout Preferences' },
  7: { pose: 'contact', actionTitle: 'Patient Communication Channels' },
  8: { pose: 'complete', actionTitle: 'Clinician Launch Ready' },
};

interface MednevoAIDoctorPanelProps {
  currentStep: number;
  doctorGender: 'female' | 'male';
  onToggleGender: (gender: 'female' | 'male') => void;
  _doctorName?: string;
}

export const MednevoAIDoctorPanel: React.FC<MednevoAIDoctorPanelProps> = ({
  currentStep,
  doctorGender,
  onToggleGender,
}) => {
  const meta = STEP_POSES[currentStep] || STEP_POSES[1];
  const characterSrc = `/doctors/character/${doctorGender}_${meta.pose}.png`;
  const isFemale = doctorGender === 'female';
  const doctorName = isFemale ? 'Dr. Elena Vance' : 'Dr. Marcus Reed';

  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden select-none py-2">
      {/* Soft Ambient Studio Lighting Shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#9A6AFB]/20 via-purple-200/15 to-[#5C24FF]/15 rounded-full blur-3xl pointer-events-none animate-halo-glow" />

      {/* Top Bar: Minimal Branding & Gender Selector */}
      <div className="w-full flex items-center justify-between gap-2 px-2 pb-3 border-b border-purple-100/70 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-xs">
            <Stethoscope className="w-3.5 h-3.5" />
          </div>
          <span className="font-sora font-extrabold text-xs text-slate-800 tracking-tight">
            Mednevo AI Doctor
          </span>
        </div>

        {/* Minimal Gender Toggle Pill */}
        <div className="flex items-center bg-white/90 p-0.5 rounded-xl border border-purple-200 shadow-2xs">
          <button
            type="button"
            onClick={() => onToggleGender('female')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-sora font-bold transition-all ${
              isFemale
                ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-2xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            👩 Female
          </button>
          <button
            type="button"
            onClick={() => onToggleGender('male')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-sora font-bold transition-all ${
              !isFemale
                ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-2xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            👨 Male
          </button>
        </div>
      </div>

      {/* Center Stage: Large, Full-Height AI Doctor Image in Action */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-4 my-auto min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px]">
        {/* Soft Studio Floor Reflection & Shadow */}
        <div className="absolute bottom-4 w-48 sm:w-60 h-8 bg-gradient-to-r from-purple-300/30 via-[#9A6AFB]/20 to-purple-300/30 rounded-full blur-md pointer-events-none" />

        {/* Large AI Doctor Character Pose with Smooth Float */}
        <div className="relative animate-doctor-float flex items-center justify-center w-full h-full">
          <img
            key={`${doctorGender}_${meta.pose}`}
            src={characterSrc}
            alt={`${doctorName} - ${meta.actionTitle}`}
            className="w-auto h-auto max-h-[420px] sm:max-h-[500px] lg:max-h-[560px] xl:max-h-[600px] object-contain filter drop-shadow-[0_16px_30px_rgba(154,106,251,0.22)] transition-all duration-300 transform hover:scale-102"
          />
        </div>
      </div>

      {/* Bottom Minimalist Status Pill */}
      <div className="w-full text-center z-10 pt-2 border-t border-purple-100/70">
        <div className="inline-flex items-center gap-2 bg-white/95 px-3.5 py-1 rounded-full border border-purple-100 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-sora font-bold text-xs text-slate-800">
            {doctorName}
          </span>
          <span className="text-[11px] text-slate-400">·</span>
          <span className="text-[11px] font-sora font-semibold text-[#5C24FF]">
            {meta.actionTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
