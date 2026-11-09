import React from 'react';
import {
  Stethoscope,
  Volume2,
  ShieldCheck,
  CheckCircle2,
  Activity,
} from 'lucide-react';

interface DoctorStepConfig {
  message: string;
  subtext: string;
  pose: string;
  badge: string;
}

const STEP_DOCTOR_CONFIGS: Record<number, DoctorStepConfig> = {
  1: {
    message: "Welcome to Mednevo! Let's begin your professional journey.",
    subtext: 'Select your provider classification to tailor your credentialing and intake workflow.',
    pose: 'welcome',
    badge: 'Welcoming You',
  },
  2: {
    message: 'Your professional journey starts with a secure account.',
    subtext: 'We protect your clinical identity with AES-256 encryption and automated HIPAA BAA execution.',
    pose: 'secure',
    badge: 'Security Protected',
  },
  3: {
    message: "Let's build your professional identity.",
    subtext: 'Showcase your degrees, state medical license, and bio so patients can trust their doctor.',
    pose: 'profile',
    badge: 'Clinical Credentials',
  },
  4: {
    message: 'Tell us where you care for your patients.',
    subtext: 'Configure your primary facility, hospital ward, or hybrid telehealth consulting room.',
    pose: 'location',
    badge: 'Practice Facility',
  },
  5: {
    message: 'Showcase your medical expertise and specialties.',
    subtext: 'Select your clinical disciplines, surgical procedures, and custom consultation durations.',
    pose: 'services',
    badge: 'Clinical Mastery',
  },
  6: {
    message: 'Set up your consultation and payment preferences.',
    subtext: 'Establish transparent visit fees with automated next-day direct deposit escrow payouts.',
    pose: 'payment',
    badge: 'Fair Compensation',
  },
  7: {
    message: 'Make it easier for patients to connect with you.',
    subtext: 'Our 24/7 AI triage protects your personal phone line and guards your family rest time.',
    pose: 'contact',
    badge: 'Work-Life Balance',
  },
  8: {
    message: "You're all set! Welcome to Mednevo.",
    subtext: 'Your clinic workspace, daily schedule, and AI copilot Ava are initialized and ready for patients.',
    pose: 'complete',
    badge: 'Launch Ready 🎉',
  },
};

interface MednevoAIDoctorPanelProps {
  currentStep: number;
  doctorGender: 'female' | 'male';
  onToggleGender: (gender: 'female' | 'male') => void;
  doctorName?: string;
}

export const MednevoAIDoctorPanel: React.FC<MednevoAIDoctorPanelProps> = ({
  currentStep,
  doctorGender,
  onToggleGender,
  doctorName = 'Doctor',
}) => {
  const config = STEP_DOCTOR_CONFIGS[currentStep] || STEP_DOCTOR_CONFIGS[1];
  const characterSrc = `/doctors/character/${doctorGender}_${config.pose}.png`;
  const isFemale = doctorGender === 'female';

  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden select-none">
      {/* Decorative Background Glows & Organic Healthcare Shapes */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-[#9A6AFB]/25 via-purple-300/15 to-[#5C24FF]/20 rounded-full blur-3xl pointer-events-none animate-halo-glow" />
      <div className="absolute bottom-10 right-0 w-60 h-60 bg-gradient-to-tl from-[#5C24FF]/20 via-purple-200/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Header: Branding & Gender Selector */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-4 border-b border-purple-100/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(154,106,251,0.35)]">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sora font-extrabold text-sm text-slate-900 tracking-tight">
                Mednevo
              </span>
              <span className="text-[9px] font-sora font-bold text-white bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                AI Doctor
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Interactive Clinical Guide</p>
          </div>
        </div>

        {/* Gender Toggle Pill (Female / Male Doctor selection) */}
        <div className="flex items-center bg-white/90 backdrop-blur-xs p-1 rounded-2xl border border-purple-200/80 shadow-2xs">
          <button
            type="button"
            onClick={() => onToggleGender('female')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-sora font-bold transition-all ${
              isFemale
                ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Switch to Female AI Doctor"
          >
            <span>👩</span>
            <span className="hidden sm:inline">Dr. Elena</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleGender('male')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-sora font-bold transition-all ${
              !isFemale
                ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Switch to Male AI Doctor"
          >
            <span>👨</span>
            <span className="hidden sm:inline">Dr. Marcus</span>
          </button>
        </div>
      </div>

      {/* Middle Stage: Large Full-Body AI Doctor Character Asset */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 min-h-[340px] sm:min-h-[420px] lg:min-h-[460px]">
        {/* Decorative Circular Stage Podium */}
        <div className="absolute bottom-6 w-56 h-12 bg-gradient-to-r from-purple-200/50 via-[#9A6AFB]/20 to-purple-200/50 rounded-full blur-md pointer-events-none transform -rotate-1" />

        {/* Floating AI Doctor Character Image */}
        <div className="relative animate-doctor-float flex items-center justify-center">
          <img
            key={`${doctorGender}_${config.pose}`}
            src={characterSrc}
            alt={`Mednevo ${isFemale ? 'Female' : 'Male'} AI Doctor - ${config.badge}`}
            className="max-h-[300px] sm:max-h-[380px] lg:max-h-[430px] w-auto object-contain filter drop-shadow-[0_18px_25px_rgba(154,106,251,0.25)] transition-all duration-300"
          />

          {/* Floating Contextual Gesture Badge */}
          <div className="absolute top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200 shadow-md flex items-center gap-1.5 animate-bounce-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-sora font-bold text-slate-800">
              {config.badge}
            </span>
          </div>

          {/* Active Audio Wave Indicator */}
          <div className="absolute bottom-2 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-purple-200 shadow-md flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-[#9A6AFB] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 bg-[#5C24FF] rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 bg-[#9A6AFB] rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
              <span className="w-0.5 bg-[#5C24FF] rounded-full animate-bounce h-3" style={{ animationDelay: '100ms' }} />
            </div>
            <span className="text-[10px] font-sora font-semibold text-[#5C24FF] flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#5C24FF]" />
              <span>Voice Guide</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Speech & Guidance Box (Contextual Message) */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-purple-200 shadow-[0_10px_30px_rgba(154,106,251,0.12)] space-y-2.5">
        <div className="flex items-center justify-between gap-2 border-b border-purple-50 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🩺</span>
            <span className="font-sora font-bold text-xs text-slate-900">
              {isFemale ? 'Dr. Elena Vance' : 'Dr. Marcus Reed'}
            </span>
            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-semibold">
              Step {currentStep} of 8
            </span>
          </div>

          <span className="text-[10px] font-sora font-bold bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] bg-clip-text text-transparent">
            {Math.round((currentStep / 8) * 100)}% Complete
          </span>
        </div>

        {/* Primary Contextual Message */}
        <h4 className="font-sora font-bold text-xs sm:text-sm text-slate-900 leading-snug">
          "{currentStep === 1 ? `Welcome to Mednevo, Dr. ${doctorName}! Let's begin your professional journey.` : currentStep === 8 ? `You're all set, Dr. ${doctorName}! Welcome to Mednevo.` : config.message}"
        </h4>

        {/* Empathy Subtext */}
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
          {config.subtext}
        </p>

        {/* Healthcare Quality Pillars */}
        <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-semibold border border-purple-100">
            <ShieldCheck className="w-3 h-3 text-[#5C24FF]" />
            <span>HIPAA Compliant</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>NPI Verified</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
            <Activity className="w-3 h-3 text-blue-500" />
            <span>Physician First</span>
          </span>
        </div>
      </div>
    </div>
  );
};
