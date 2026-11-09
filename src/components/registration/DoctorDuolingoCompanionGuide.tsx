import React, { useState } from 'react';
import {
  Stethoscope,
  Sparkles,
  HeartPulse,
  Volume2,
  Lightbulb,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

export interface EmpathyDoctor {
  step: number;
  name: string;
  role: string;
  specialty: string;
  badge: string;
  mood: string;
  image: string;
  speech: string;
  quote: string;
  proTip: string;
  whyAsk: string;
  pillars: string[];
}

const empathyDoctors: EmpathyDoctor[] = [
  {
    step: 1,
    name: 'Dr. Ava & Elena Vance, MD',
    role: 'Chief Medical Officer',
    specialty: 'Family Medicine & Physician Advocacy',
    badge: 'Physician Welcoming Council',
    mood: 'Excited to meet you! 👋',
    image: '/doctors/doctor-screen1-journey.jpg',
    speech:
      'Hey Doctor! I am Ava, your AI Clinical Companion. Just like how Duo guides language learners, I am here to guide your entire journey on Mednevo! Choose your practice type—no corporate quotas here, just pure patient care.',
    quote:
      'We know what 15-minute rushed visits and endless pajama charting feel like—it drains the sacred joy out of medicine. Mednevo was founded by physicians who refused to let clerical busywork compromise patient care. Choose your clinical journey today, and reclaim your time to truly heal.',
    proTip: 'Solo practitioners get automated 1-click SOAP scribing and HIPAA-secure video suites included.',
    whyAsk: 'We customize your credentialing pipeline and patient referral queue based on your practice scope.',
    pillars: ['Zero administrative busywork', 'Protected clinical autonomy', 'Respect for your time'],
  },
  {
    step: 2,
    name: 'Dr. Ava & Marcus Reed, MD',
    role: 'Clinical Safety Lead',
    specialty: 'Interventional Cardiology',
    badge: 'Credentialing & Trust',
    mood: 'Security Fortress Armed 🛡️',
    image: '/doctors/doctor-screen2-security.jpg',
    speech:
      'Security first, Doctor! Your medical license and clinical reputation took decades of grueling residency to build. We protect you with military-grade AES-256 encryption and automatic HIPAA BAA execution.',
    quote:
      'Your medical license and clinical reputation took decades of sacrifice to build. We treat your security with sacred diligence—military-grade AES-256 encryption, zero-knowledge patient chart isolation, and an impenetrable HIPAA liability shield so you never lose sleep over compliance.',
    proTip: 'Use a strong password with 8+ chars and symbols. We never share or sell clinician credentials.',
    whyAsk: 'Required for HIPAA audit trails and ensuring legal liability protection under Federal BAA mandates.',
    pillars: ['Bank-grade AES-256 encryption', '100% HIPAA & HITECH verified', 'Zero clinician data resale'],
  },
  {
    step: 3,
    name: 'Dr. Ava & Priya Patel, MD',
    role: 'Fellowship Director',
    specialty: 'Internal Medicine',
    badge: 'Clinical Identity Mentor',
    mood: 'Honoring your credentials 🩺',
    image: '/doctors/doctor-screen3-profile.jpg',
    speech:
      'I love this part! Every late-night call and board certification exam matters. Let us craft your verified clinician card so patients can see the compassionate human behind the stethoscope!',
    quote:
      'Every grueling residency call, board certification exam, and quiet breakthrough with a patient is part of your clinical legacy. Patients aren’t just looking for an appointment slot; they are placing their lives into your hands. Let your true passion and qualifications shine.',
    proTip: 'Doctors with high-res headshots and detailed bios receive 4.2x higher patient booking confidence.',
    whyAsk: 'Your medical board license number is verified against the state registry for instant credentialing.',
    pillars: ['Honoring residency & board credentials', 'Direct patient trust builder', 'Authentic clinical storytelling'],
  },
  {
    step: 4,
    name: 'Dr. Ava & Julian Hayes, MD',
    role: 'Ambulatory Care Director',
    specialty: 'Preventive Health Systems',
    badge: 'Practice Facility Lead',
    mood: 'Expanding your reach 🗺️',
    image: '/doctors/doctor-screen4-location.jpg',
    speech:
      'Where will you be healing patients? Whether you run a private clinic or do virtual visits from your home office, Mednevo removes all geographic boundaries so care flows effortlessly.',
    quote:
      'Whether you practice in a hospital clinic, private office, or care for patients from your home study, healing shouldn’t be confined by geographic borders. Mednevo eliminates regional friction so your expertise reaches patients wherever they need you most.',
    proTip: 'Select Hybrid if you plan to split your schedule between in-clinic visits and virtual video visits.',
    whyAsk: 'Helps local patients discover your physical practice while routing telehealth visits nationwide.',
    pillars: ['Seamless telehealth & clinic blend', 'Zero double-booking', 'Multi-facility schedule coordination'],
  },
  {
    step: 5,
    name: 'Dr. Ava & Sophia Chen, MD',
    role: 'Surgery & Telehealth Chair',
    specialty: 'General & Minimally Invasive Surgery',
    badge: 'Clinical Autonomy Advocate',
    mood: 'Clinical Freedom Guaranteed ✨',
    image: '/doctors/doctor-screen5-services.jpg',
    speech:
      'Showcase your medical mastery! You spent over 12 years training; no insurance algorithm should rush your patient consults. Select your procedures and consult durations with 100% freedom.',
    quote:
      'You spent over a decade mastering diagnostics and care. An insurance claims algorithm should never dictate how long you spend listening to a patient’s heart or explaining a treatment plan. Choose your exact services and visit lengths with complete clinical freedom.',
    proTip: 'Set a 30-minute default duration for comprehensive initial intakes to build deep patient rapport.',
    whyAsk: 'Enables our smart intake engine to match patients seeking your exact sub-specialty expertise.',
    pillars: ['No insurance algorithm interference', 'Custom appointment durations', 'Procedure autonomy'],
  },
  {
    step: 6,
    name: 'Dr. Robert Taylor, MD, MBA',
    role: 'Physician Advocacy Chair',
    specialty: 'Health Economics & Pediatrics',
    badge: 'Fair Compensation Council',
    mood: '100% Fair Payouts 💎',
    image: '/doctors/doctor-screen6-payments.jpg',
    speech:
      'Fair physician compensation is sacred to us. Set your rates with confidence. Mednevo places patient payments in secure escrow and disburses straight to your bank via next-day direct deposit.',
    quote:
      'Doctors dedicate their lives to keeping families healthy, yet delayed insurance runarounds and surprise clawbacks are a constant indignity. With Mednevo, your consultation fees are safeguarded in an automated escrow and disbursed straight to your account with zero hidden fees.',
    proTip: 'Direct ACH deposits clear within 24 hours of clinical note completion without any processing delays.',
    whyAsk: 'Required to wire consultation disbursements directly into your registered banking institution.',
    pillars: ['Direct next-day ACH escrow payouts', '100% transparent fee calculation', 'Zero predatory chargebacks'],
  },
  {
    step: 7,
    name: 'Dr. Ava & Maya Lin, MD',
    role: 'Clinician Wellness Lead',
    specialty: 'Emergency Medicine',
    badge: 'Burnout Prevention Chair',
    mood: 'Guarding your family time 🌿',
    image: '/doctors/doctor-screen7-connect.jpg',
    speech:
      'Protecting your work-life balance is my #1 mission! I will triage patient chats 24/7, answering routine non-urgent questions so your dinner table and sleep are completely protected.',
    quote:
      'Being accessible to your patients should never mean sacrificing dinner with your family or waking up to non-urgent 2 AM texts. Our AI copilot Ava answers routine inquiries 24/7 and only escalates true medical urgencies to your personal line.',
    proTip: 'Enable Ava AI Triage so emergency lab flags are escalated while non-urgent refills wait for clinic hours.',
    whyAsk: 'Ensures patients have a verified channel to reach your office without compromising your personal line.',
    pillars: ['Guarded personal phone numbers', '24/7 Ava AI triage safety net', 'Protected family & rest time'],
  },
  {
    step: 8,
    name: 'Dr. Alexander Ross, MD',
    role: 'Mednevo Founder',
    specialty: 'Cardiothoracic Surgery',
    badge: 'Chief Executive Mentor',
    mood: 'Super proud of you, Doctor! 🎉',
    image: '/doctors/doctor-screen8-celebrate.jpg',
    speech:
      'Take a deep breath and smile, Doctor! 🎉 You have completed your onboarding. Your daily schedule is pre-loaded, Ava is armed to scribe your visits, and 14,000+ physicians welcome you!',
    quote:
      'Take a deep, grateful breath, Doctor. You have officially stepped into a modern healthcare ecosystem built around empathy, respect, and technological excellence. Your schedule is loaded, Ava has organized your lab charts, and 14,000+ physician colleagues stand with you. Welcome home.',
    proTip: 'Click "Go to Doctor Dashboard" below to view Sarah Jenkins at 9:00 AM and Mike Lee critical lab briefing.',
    whyAsk: 'Your clinical practice workspace is initialized and ready for day-one patient consultations.',
    pillars: ['Ready for day-one consultations', 'Ava AI chart summaries armed', '14,000+ physician community backing you'],
  },
];

export const DoctorDuolingoCompanionGuide: React.FC<{
  step: number;
  doctorName?: string;
}> = ({ step }) => {
  const [activeTab, setActiveTab] = useState<'speech' | 'protip' | 'why'>('speech');
  const mentor = empathyDoctors[step - 1] || empathyDoctors[0];

  return (
    <aside className="w-full xl:w-[350px] 2xl:w-[390px] flex-shrink-0 transition-all select-none">
      {/* 3D Realistic AI Doctor Mascot Guide Card (Duolingo Style) */}
      <div className="relative group bg-gradient-to-b from-white via-purple-50/30 to-purple-50/70 rounded-3xl border-2 border-purple-200/90 shadow-[0_16px_45px_rgba(154,106,251,0.16)] p-5 sm:p-6 overflow-hidden">
        {/* Glow ambient background aura */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-[#9A6AFB]/25 to-[#5C24FF]/25 rounded-full blur-2xl pointer-events-none animate-halo-glow" />

        {/* Mascot Header: Duo-style Streak & Live Doctor Presence */}
        <div className="flex items-center justify-between pb-3.5 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-sora font-extrabold text-xs text-slate-800 tracking-tight flex items-center gap-1">
              <span>Dr. Ava AI Guide</span>
              <Sparkles className="w-3 h-3 text-[#5C24FF]" />
            </span>
          </div>

          {/* Gamified Streak Badge */}
          <span className="text-[11px] font-sora font-bold text-[#5C24FF] bg-purple-100/90 px-3 py-1 rounded-full border border-purple-200 shadow-2xs flex items-center gap-1.5">
            <span>🔥</span>
            <span>Step {step} of 8</span>
          </span>
        </div>

        {/* 3D Realistic Doctor Face & Animated Speaking Avatar */}
        <div className="flex flex-col items-center text-center my-4 relative">
          <div className="relative animate-doctor-float group-hover:scale-105 transition-transform duration-500">
            {/* 3D Circular Purple Aura Ring */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#9A6AFB] via-purple-300 to-[#5C24FF] shadow-[0_10px_30px_rgba(154,106,251,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white relative shadow-inner">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                />
                {/* 3D studio light reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5C24FF]/20 via-transparent to-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Verified Stethoscope Badge */}
            <div className="absolute -bottom-1 right-1 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white p-1.5 rounded-full border-2 border-white shadow-md">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>

          {/* Mentor Title & Dynamic Mood */}
          <div className="mt-3 space-y-0.5">
            <h4 className="font-sora font-extrabold text-sm sm:text-base text-slate-900">
              {mentor.name}
            </h4>
            <p className="text-[11px] text-[#5C24FF] font-semibold">{mentor.role}</p>
            <div className="inline-flex items-center gap-1 text-[10px] font-sora font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-purple-100 shadow-2xs mt-1">
              <span>{mentor.mood}</span>
            </div>
          </div>

          {/* Duolingo Voice Wave Animation Bars (Simulated Speaking) */}
          <div className="flex items-center gap-1 mt-2.5 h-4">
            <span className="w-1 bg-[#9A6AFB] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-1 bg-[#5C24FF] rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
            <span className="w-1 bg-[#9A6AFB] rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }} />
            <span className="w-1 bg-[#5C24FF] rounded-full animate-bounce h-4" style={{ animationDelay: '100ms' }} />
            <span className="w-1 bg-[#9A6AFB] rounded-full animate-bounce h-2" style={{ animationDelay: '250ms' }} />
            <span className="text-[10px] text-slate-400 font-medium ml-1.5 flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#5C24FF]" />
              <span>Voice Guide Active</span>
            </span>
          </div>
        </div>

        {/* Duolingo-style Speech Bubble with Pointer */}
        <div className="relative mt-2 bg-white rounded-2xl p-4 border border-purple-200/90 shadow-md">
          {/* Triangular Speech Pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-purple-200/90 rotate-45" />

          {/* Interactive Navigation Tabs inside speech bubble */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5 text-[11px] font-sora font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('speech')}
              className={`flex items-center gap-1 pb-1 transition-all ${
                activeTab === 'speech'
                  ? 'text-[#5C24FF] border-b-2 border-[#5C24FF]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <MessageCircle className="w-3 h-3" />
              <span>Ava Guide</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('protip')}
              className={`flex items-center gap-1 pb-1 transition-all ${
                activeTab === 'protip'
                  ? 'text-[#5C24FF] border-b-2 border-[#5C24FF]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Pro-Tip</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('why')}
              className={`flex items-center gap-1 pb-1 transition-all ${
                activeTab === 'why'
                  ? 'text-[#5C24FF] border-b-2 border-[#5C24FF]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <HelpCircle className="w-3 h-3 text-purple-500" />
              <span>Why Ask?</span>
            </button>
          </div>

          {/* Dynamic Content View */}
          {activeTab === 'speech' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                "{mentor.speech}"
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic leading-snug">
                "{mentor.quote}"
              </div>
            </div>
          )}

          {activeTab === 'protip' && (
            <div className="space-y-2">
              <span className="text-[10px] font-sora font-bold text-[#5C24FF] uppercase tracking-wider block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Doctor Best Practice:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {mentor.proTip}
              </p>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="space-y-2">
              <span className="text-[10px] font-sora font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Clinical Compliance Note:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {mentor.whyAsk}
              </p>
            </div>
          )}

          {/* Empathy Pillars Tags */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
            {mentor.pillars.map((pil, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-purple-50 text-purple-700 font-medium px-2 py-0.5 rounded-md border border-purple-100 flex items-center gap-1"
              >
                <HeartPulse className="w-2.5 h-2.5 text-[#5C24FF]" />
                <span>{pil}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Duolingo XP Progress Bar */}
        <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-[11px]">
          <span className="font-sora font-semibold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#9A6AFB]" />
            <span>Mednevo Mastery</span>
          </span>
          <span className="font-sora font-bold bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] bg-clip-text text-transparent">
            {Math.round((step / 8) * 100)}% Complete
          </span>
        </div>
      </div>
    </aside>
  );
};
