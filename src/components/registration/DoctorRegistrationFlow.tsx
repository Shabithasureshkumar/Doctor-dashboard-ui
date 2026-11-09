import React, { useState } from 'react';
import { DoctorDuolingoCompanionGuide } from './DoctorDuolingoCompanionGuide';
import {
  Stethoscope,
  Building2,
  HeartPulse,
  FlaskConical,
  Check,
  Eye,
  EyeOff,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building,
  Phone,
  Mail,
  Globe,
  Lock,
  MapPin,
  Clock,
  Activity,
  Sliders,
  BadgeCheck,
  Hospital,
  BrainCircuit,
  CheckCircle2,
  LockKeyhole,
} from 'lucide-react';

export interface DoctorRegistrationData {
  // Screen 1
  providerType: string;
  // Screen 2
  fullName: string;
  email: string;
  password?: string;
  agreeTerms: boolean;
  // Screen 3
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  dob: string;
  phone: string;
  licenseNumber: string;
  credentials: string;
  bio: string;
  photoUrl: string;
  // Screen 4
  clinicName: string;
  practiceType: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  consultMode: string;
  additionalLocations: string[];
  // Screen 5
  primarySpecialty: string;
  subSpecialties: string[];
  servicesOffered: string[];
  encounterTypes: string[];
  duration: string;
  // Screen 6
  consultFee: string;
  followUpFee: string;
  currency: string;
  payoutMethod: string;
  bankName: string;
  accountHolder: string;
  routingNumber: string;
  accountNumber: string;
  // Screen 7
  officePhone: string;
  officeEmail: string;
  website: string;
  contactMethods: string[];
  triageMode: string;
  visibility: string;
}

interface DoctorRegistrationFlowProps {
  onComplete: (data: DoctorRegistrationData) => void;
  onSkip?: () => void;
}

export const DoctorRegistrationFlow: React.FC<DoctorRegistrationFlowProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('SecureDoc#2026');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newLocationInput, setNewLocationInput] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);

  // Form State initialized with realistic clinician defaults
  const [formData, setFormData] = useState<DoctorRegistrationData>({
    providerType: 'individual_physician',
    fullName: 'Dr. Brock Rivers',
    email: 'b.rivers@mednevo-health.com',
    password: 'SecureDoc#2026',
    agreeTerms: true,
    firstName: 'Brock',
    lastName: 'Rivers',
    title: 'MD',
    gender: 'Male',
    dob: '1982-06-15',
    phone: '+1 (555) 234-5678',
    licenseNumber: 'MED-CA-948201',
    credentials: 'MD, FACC, Board Certified Cardiologist',
    bio: 'Cardiologist with 14+ years of clinical practice specializing in preventive cardiology, refractory hypertension titration, and AI-assisted remote patient monitoring.',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    clinicName: 'Metro Cardiovascular Institute',
    practiceType: 'Private Specialty Clinic',
    address: '742 Evergreen Terrace, Suite 400',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    postalCode: '94107',
    consultMode: 'Hybrid',
    additionalLocations: ['St. Jude Outpatient Center (Bay Area)'],
    primarySpecialty: 'Cardiology',
    subSpecialties: [
      'Hypertension Management',
      'Lipidology & Preventive Cardiology',
      'Heart Failure Care',
    ],
    servicesOffered: [
      'Comprehensive Clinical Intake',
      'Chronic Disease Management',
      '12-Lead ECG Interpretation',
      'Remote Patient Monitoring (RPM)',
      'Prescription Refill & Titration',
      'Pre-Operative Clearance',
    ],
    encounterTypes: ['Video Telehealth Visits', 'Office Consultations'],
    duration: '30 Minutes',
    consultFee: '150',
    followUpFee: '90',
    currency: 'USD ($)',
    payoutMethod: 'ach_direct',
    bankName: 'Silicon Valley Healthcare Federal',
    accountHolder: 'Dr. Brock Rivers, MD',
    routingNumber: '121000358',
    accountNumber: '••••••••4829',
    officePhone: '+1 (555) 987-6543',
    officeEmail: 'appointments@riverscardio.com',
    website: 'https://www.riverscardio.com',
    contactMethods: ['Mednevo Secure Chat', 'In-App Video Call', 'Office Telephone'],
    triageMode: 'ava_ai',
    visibility: 'Public in Mednevo Directory',
  });

  const stepMeta = [
    { num: 1, title: 'Provider Type', subtitle: 'Classification' },
    { num: 2, title: 'Credentials', subtitle: 'Account Security' },
    { num: 3, title: 'Profile & License', subtitle: 'Identity Verification' },
    { num: 4, title: 'Practice Location', subtitle: 'Clinics & Facilities' },
    { num: 5, title: 'Clinical Services', subtitle: 'Specialties & Duration' },
    { num: 6, title: 'Payout & Fees', subtitle: 'Financial Settlement' },
    { num: 7, title: 'Patient Contact', subtitle: 'Channels & Triage' },
    { num: 8, title: 'Welcome Doctor', subtitle: 'Workspace Ready' },
  ];

  // Validation rules per screen
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.providerType) {
        newErrors.providerType = 'Please select your provider registration type.';
      }
    } else if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full legal name is required.';
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid professional email address is required.';
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      }
      if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must accept the Provider Terms and HIPAA agreement.';
      }
    } else if (step === 3) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = 'Medical registration/license number is required.';
      }
      if (!formData.credentials.trim()) {
        newErrors.credentials = 'Professional credentials are required.';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Contact phone number is required.';
    } else if (step === 4) {
      if (!formData.clinicName.trim()) newErrors.clinicName = 'Practice/Clinic name is required.';
      if (!formData.address.trim()) newErrors.address = 'Practice street address is required.';
      if (!formData.city.trim()) newErrors.city = 'City is required.';
      if (!formData.state.trim()) newErrors.state = 'State / Province is required.';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    } else if (step === 5) {
      if (!formData.primarySpecialty) {
        newErrors.primarySpecialty = 'Please select your primary specialty.';
      }
      if (formData.servicesOffered.length === 0) {
        newErrors.servicesOffered = 'Select at least one clinical service.';
      }
    } else if (step === 6) {
      if (!formData.consultFee || parseFloat(formData.consultFee) <= 0) {
        newErrors.consultFee = 'Valid consultation fee is required.';
      }
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Bank account number is required.';
      }
    } else if (step === 7) {
      if (!formData.officePhone.trim()) newErrors.officePhone = 'Clinic phone number is required.';
      if (!formData.officeEmail.trim()) {
        newErrors.officeEmail = 'Patient communication email is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onComplete(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSubSpecialty = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      subSpecialties: prev.subSpecialties.includes(item)
        ? prev.subSpecialties.filter((s) => s !== item)
        : [...prev.subSpecialties, item],
    }));
  };

  const toggleServiceOffered = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(item)
        ? prev.servicesOffered.filter((s) => s !== item)
        : [...prev.servicesOffered, item],
    }));
  };

  const toggleContactMethod = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(item)
        ? prev.contactMethods.filter((m) => m !== item)
        : [...prev.contactMethods, item],
    }));
  };

  const addLocation = () => {
    if (newLocationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalLocations: [...prev.additionalLocations, newLocationInput.trim()],
      }));
      setNewLocationInput('');
      setShowAddLocation(false);
    }
  };

  // Password strength helper
  const getPasswordStrength = (pwd: string = '') => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;
    return score;
  };

  const pwdScore = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FE] text-slate-800 antialiased flex flex-col justify-between selection:bg-purple-200 selection:text-purple-900">
      {/* ──────────────── Top Global Navigation Bar ──────────────── */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5 transition-all">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(154,106,251,0.35)]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sora font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  Mednevo
                </span>
                <span className="text-[10px] font-sora font-bold text-white bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Doctor Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Verified Clinician Onboarding Experience
              </p>
            </div>
          </div>

          {/* Quick Actions & Skip Option */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#5C24FF] rounded-xl text-xs font-sora font-semibold border border-purple-100">
              <ShieldCheck className="w-4 h-4 text-[#5C24FF]" />
              <span>HIPAA Compliant Credentialing</span>
            </div>

            {onSkip && (
              <button
                onClick={onSkip}
                className="text-xs font-sora font-semibold text-slate-500 hover:text-[#5C24FF] bg-slate-100/80 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-xl transition-all"
                title="Jump directly to Doctor Dashboard"
              >
                Skip to Dashboard →
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar (Full Width) */}
        <div className="w-full mt-3">
          <div className="flex items-center justify-between text-xs font-sora mb-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center text-[10px] font-bold">
                {currentStep}
              </span>
              <span>
                Step {currentStep} of 8:{' '}
                <strong className="text-slate-900">{stepMeta[currentStep - 1].title}</strong>
              </span>
            </span>
            <span className="font-bold bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] bg-clip-text text-transparent">
              {Math.round((currentStep / 8) * 100)}% Complete
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(154,106,251,0.5)]"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* ──────────────── Main Content Canvas (Full Viewport Width with Duolingo AI Doctor Guide on the Side) ──────────────── */}
      <main className="w-full flex-1 px-4 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-8 flex flex-col justify-center">
        <div className="w-full flex flex-col xl:flex-row items-start gap-8">
          {/* Main Registration Steps Canvas */}
          <div className="flex-1 w-full min-w-0">
            {/* SCREEN 01: Choose Your Professional Journey */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-sora font-bold text-[#5C24FF] bg-gradient-to-r from-[#9A6AFB]/15 to-[#5C24FF]/15 border border-[#9A6AFB]/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#5C24FF]" />
                    Step 1 of 8 · Welcome to Mednevo
                  </span>
                  <h2 className="font-sora font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                    Join Mednevo as a Healthcare Provider
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    Select your clinical classification to customize your credentialing pipeline,
                    AI-assisted consultations, and patient referral routing.
                  </p>
                </div>

                {/* Provider Type Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  id: 'individual_physician',
                  title: 'Individual Physician',
                  role: 'Doctor of Medicine / Specialist',
                  desc: 'Licensed MD, DO, or MBBS practitioners providing outpatient primary care, specialty consults, or virtual visits.',
                  icon: Stethoscope,
                  badge: 'Recommended',
                  features: ['Personal Telehealth Room', 'E-Prescribe & SOAP Scribe', 'Automated Payouts'],
                },
                {
                  id: 'group_practice',
                  title: 'Medical Clinic / Group',
                  role: 'Multi-Provider Facility',
                  desc: 'Healthcare centers, group clinics, and outpatient departments managing shared clinical appointment queues.',
                  icon: Building2,
                  features: ['Multi-Doctor Scheduling', 'Centralized Intake Desk', 'Facility Billing'],
                },
                {
                  id: 'allied_health',
                  title: 'Allied Health Expert',
                  role: 'Therapist / Nurse Practitioner',
                  desc: 'Nurse practitioners, clinical psychologists, physical therapists, and certified specialist therapists.',
                  icon: HeartPulse,
                  features: ['Patient Chat Intake', 'Custom Care Plans', 'Asynchronous Vitals'],
                },
                {
                  id: 'diagnostic_partner',
                  title: 'Diagnostic Partner',
                  role: 'Imaging & Laboratory Center',
                  desc: 'Certified pathology labs, diagnostic testing centers, and imaging facilities receiving digital test orders.',
                  icon: FlaskConical,
                  features: ['Digital Lab Orders', 'Automated HL7 Delivery', 'Direct Physician Chat'],
                },
              ].map((card) => {
                const isSelected = formData.providerType === card.id;
                const Icon = card.icon;

                return (
                  <div
                    key={card.id}
                    onClick={() => setFormData({ ...formData, providerType: card.id })}
                    className={`relative p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#5C24FF] bg-gradient-to-br from-[#9A6AFB]/10 to-[#5C24FF]/10 shadow-[0_8px_30px_rgba(154,106,251,0.22)] scale-[1.02]'
                        : 'border-slate-200/80 bg-white hover:border-purple-200 hover:shadow-card hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      {/* Card Header & Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white shadow-md'
                              : 'bg-purple-50 text-[#5C24FF]'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          {card.badge && (
                            <span className="text-[10px] font-sora font-bold bg-[#9A6AFB]/20 text-[#5C24FF] px-2 py-0.5 rounded-full">
                              {card.badge}
                            </span>
                          )}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#5C24FF] bg-[#5C24FF]'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-sora font-bold text-base text-slate-900 leading-snug">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-medium text-[#5C24FF] block mt-0.5">
                        {card.role}
                      </span>
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{card.desc}</p>
                    </div>

                    {/* Features list */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {card.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-1.5 text-[11px] text-slate-600"
                        >
                          <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clinician Trust Banner */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex flex-wrap items-center justify-around gap-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-500" />
                <span>State Board Registry Sync</span>
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#5C24FF]" />
                <span>256-Bit Encrypted EHR</span>
              </span>
              <span className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#9A6AFB]" />
                <span>Ava AI Ambient Scribe Included</span>
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>Zero-Fee Daily ACH Deposits</span>
              </span>
            </div>
          </div>
        )}

        {/* SCREEN 02: Your Professional Identity Starts Here (Split Layout) */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-in fade-in duration-200">
            {/* Left Column: Security & Privacy Showcase */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#9A6AFB]/10 via-purple-50 to-[#5C24FF]/10 rounded-3xl p-6 sm:p-8 border border-purple-100/80 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-sora font-bold text-[#5C24FF] uppercase tracking-wider block">
                  Security & Identity
                </span>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 mt-1 leading-snug">
                  Your Professional Identity Starts Here
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Mednevo secures clinician credentials with enterprise-grade safeguards. All health
                  encounters comply with HIPAA and HITECH privacy mandates.
                </p>
              </div>

              {/* Security Pill Highlights */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-purple-100">
                  <LockKeyhole className="w-5 h-5 text-[#5C24FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sora font-bold text-xs text-slate-900">
                      End-to-End Encryption
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Patient medical charts and prescriptions are encrypted in transit and at rest.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-purple-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sora font-bold text-xs text-slate-900">
                      Business Associate Agreement (BAA)
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Automatic BAA execution protecting your practice from regulatory liabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Account Creation Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-5">
              <div>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                  Create Provider Account
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your primary credentials to establish your master clinician login.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Brock Rivers"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Professional Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="doctor@riversclinic.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Password Strength:</span>
                    <span
                      className={
                        pwdScore >= 3
                          ? 'text-emerald-600'
                          : pwdScore === 2
                          ? 'text-amber-600'
                          : 'text-rose-500'
                      }
                    >
                      {pwdScore >= 4 ? 'Strong' : pwdScore === 3 ? 'Good' : 'Fair'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`rounded-full transition-all duration-300 ${
                          pwdScore >= bar
                            ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF]'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded accent-[#5C24FF] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I accept the Mednevo Provider Agreement, Business Associate Agreement (BAA),
                      and verify that I hold active licensure in my practice jurisdiction.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 03: Let Your Professional Story Shine (Live Clinician ID Card) */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-in fade-in duration-200">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
              <div>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                  Tell Us About Yourself
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Build your verified clinician identity card visible to booked patients.
                </p>
              </div>

              {/* Photo Upload Area */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <img
                  src={formData.photoUrl}
                  alt="Doctor"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                />
                <div className="flex-1">
                  <span className="font-sora font-bold text-xs text-slate-900 block">
                    Clinician Headshot Photo
                  </span>
                  <p className="text-[11px] text-slate-500">
                    High-resolution portrait recommended for patient trust.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Change</span>
                </button>
              </div>

              {/* Names & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Title *
                  </label>
                  <select
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>MD</option>
                    <option>DO</option>
                    <option>MBBS</option>
                    <option>MS</option>
                    <option>NP</option>
                    <option>PA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                  {errors.firstName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                  {errors.lastName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              {/* License & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Medical Board License / Reg Number *
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="e.g. MED-CA-948201"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Direct Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
              </div>

              {/* Degrees */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Credentials, Fellowships & Degrees *
                </label>
                <input
                  type="text"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="e.g. MD, FACC, Board Certified Cardiologist"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Professional Bio & Philosophy of Care
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
              </div>
            </div>

            {/* Right Column: Live Clinician ID Badge Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#9A6AFB] to-[#5C24FF] rounded-3xl p-6 sm:p-7 text-white shadow-[0_12px_36px_rgba(154,106,251,0.35)] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sora font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
                  Live Provider Preview
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Credential
                </span>
              </div>

              {/* Badge Main Body */}
              <div className="flex items-center gap-4">
                <img
                  src={formData.photoUrl}
                  alt="Doctor"
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md"
                />
                <div>
                  <h4 className="font-sora font-bold text-lg text-white leading-tight">
                    Dr. {formData.firstName} {formData.lastName}, {formData.title}
                  </h4>
                  <span className="text-xs text-purple-200 font-medium block mt-0.5">
                    {formData.primarySpecialty}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-mono px-2 py-0.5 rounded mt-1.5">
                    <BadgeCheck className="w-3 h-3 text-emerald-300" />
                    <span>{formData.licenseNumber}</span>
                  </span>
                </div>
              </div>

              {/* Bio & Highlights */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2">
                <p className="text-xs text-purple-100 italic leading-relaxed line-clamp-3">
                  "{formData.bio}"
                </p>
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-purple-200">
                  <span>{formData.credentials}</span>
                  <span>14+ Yrs Practice</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 04: Your Healthcare Location (Facility & Map Preview) */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-in fade-in duration-200">
            {/* Left: Location Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
              <div>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                  Where Do You Practice?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Configure your primary clinical practice facility and consultation modes.
                </p>
              </div>

              {/* Facility Name & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Hospital / Clinic / Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                  {errors.clinicName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.clinicName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Facility Classification *
                  </label>
                  <select
                    value={formData.practiceType}
                    onChange={(e) => setFormData({ ...formData, practiceType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>Private Specialty Clinic</option>
                    <option>Hospital Affiliated Department</option>
                    <option>Multi-Specialty Center</option>
                    <option>Solo Practice</option>
                    <option>Virtual Telehealth Headquarters</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 742 Evergreen Terrace, Suite 400"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
              </div>

              {/* City, State, Country, Postal */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>India</option>
                  </select>
                </div>
              </div>

              {/* Consultation Modes */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-2">
                  Consultation Fulfillment Mode *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Hybrid', title: 'Hybrid Care', desc: 'In-Clinic + Video Telehealth' },
                    { id: 'In-Person Only', title: 'In-Clinic Only', desc: 'Physical Visits Only' },
                    { id: 'Telehealth Only', title: 'Virtual Only', desc: '100% Video Telemedicine' },
                  ].map((mode) => {
                    const isSelected = formData.consultMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, consultMode: mode.id })}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#5C24FF] bg-gradient-to-r from-[#9A6AFB]/10 to-[#5C24FF]/10 text-[#5C24FF]'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="font-sora font-bold text-xs block">{mode.title}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{mode.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Locations */}
              <div className="pt-2">
                {formData.additionalLocations.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Additional Practice Centers:
                    </span>
                    {formData.additionalLocations.map((loc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-800"
                      >
                        <span className="flex items-center gap-1.5">
                          <Hospital className="w-3.5 h-3.5 text-[#5C24FF]" />
                          <span>{loc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {showAddLocation ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Enter second clinic address..."
                      value={newLocationInput}
                      onChange={(e) => setNewLocationInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={addLocation}
                      className="px-3 py-1.5 bg-[#5C24FF] text-white text-xs font-semibold rounded-xl"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddLocation(true)}
                    className="text-xs font-sora font-semibold text-[#5C24FF] hover:underline"
                  >
                    + Add Additional Practice Center
                  </button>
                )}
              </div>
            </div>

            {/* Right: Facility & Map Location Showcase Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-sora font-bold text-xs text-slate-900">
                  Location Routing Pin
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  GPS Mapped
                </span>
              </div>

              {/* Simulated Map Canvas */}
              <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
                {/* Stylized Grid Lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9A6AFB_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Animated Pulsing Location Pin */}
                <div className="relative flex flex-col items-center">
                  <span className="w-12 h-12 rounded-full bg-[#9A6AFB]/30 animate-ping absolute -top-3" />
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-xs font-sora font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/20">
                    {formData.city}, {formData.state}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Practice Name</span>
                  <span className="font-semibold text-slate-900">{formData.clinicName}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Fulfillment Mode</span>
                  <span className="font-bold text-[#5C24FF]">{formData.consultMode}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 05: Showcase Your Medical Expertise (Specialty Grid & Services) */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-sora font-bold text-[#5C24FF] uppercase tracking-wider block">
                Clinical Offerings
              </span>
              <h2 className="font-sora font-extrabold text-xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                Services You Provide to Patients
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Define your primary medical department, sub-specialty tags, and outpatient visit
                offerings.
              </p>
            </div>

            {/* Primary Specialty Cards Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-sora font-semibold text-slate-700">
                Primary Medical Specialty *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Cardiology', icon: Activity, desc: 'Heart & Vascular' },
                  { name: 'Internal Medicine', icon: Stethoscope, desc: 'Comprehensive Adult Care' },
                  { name: 'Neurology', icon: BrainCircuit, desc: 'Brain & Nervous System' },
                  { name: 'Orthopedics', icon: Hospital, desc: 'Bones & Joints' },
                  { name: 'Pediatrics', icon: HeartPulse, desc: 'Infant & Child Health' },
                  { name: 'Endocrinology', icon: FlaskConical, desc: 'Metabolic & Hormonal' },
                  { name: 'Dermatology', icon: Sparkles, desc: 'Skin & Aesthetics' },
                  { name: 'Psychiatry', icon: Sliders, desc: 'Mental Health' },
                ].map((spec) => {
                  const isSelected = formData.primarySpecialty === spec.name;
                  const Icon = spec.icon;

                  return (
                    <div
                      key={spec.name}
                      onClick={() => setFormData({ ...formData, primarySpecialty: spec.name })}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#5C24FF] bg-gradient-to-br from-[#9A6AFB]/10 to-[#5C24FF]/10 shadow-[0_4px_16px_rgba(154,106,251,0.18)]'
                          : 'border-slate-200 bg-white hover:border-purple-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white'
                              : 'bg-purple-50 text-[#5C24FF]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#5C24FF] stroke-[3]" />}
                      </div>
                      <h4 className="font-sora font-bold text-xs text-slate-900 leading-snug">
                        {spec.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{spec.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-Specialties Multi-Select Chips */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-2.5">
              <span className="font-sora font-bold text-xs text-slate-800 block">
                Sub-Specialty Focus Areas (Click to Toggle)
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Hypertension Management',
                  'Lipidology & Preventive Cardiology',
                  'Heart Failure Care',
                  'Electrophysiology',
                  'Interventional Cardiology',
                  'Diabetic Vascular Risk',
                  'Cardio-Oncology',
                  'Echocardiography & Stress Testing',
                ].map((sub) => {
                  const active = formData.subSpecialties.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubSpecialty(sub)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {active ? `✓ ${sub}` : `+ ${sub}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clinical Services Offered */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3">
              <span className="font-sora font-bold text-xs text-slate-800 block">
                Clinical Services Offered *
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  'Comprehensive Clinical Intake',
                  'Chronic Disease Management',
                  '12-Lead ECG Interpretation',
                  'Remote Patient Monitoring (RPM)',
                  'Prescription Refill & Titration',
                  'Pre-Operative Clearance',
                ].map((svc) => {
                  const isChecked = formData.servicesOffered.includes(svc);
                  return (
                    <label
                      key={svc}
                      onClick={() => toggleServiceOffered(svc)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#5C24FF] bg-gradient-to-r from-[#9A6AFB]/10 to-[#5C24FF]/10 text-slate-900'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded accent-[#5C24FF]"
                      />
                      <span className="text-xs font-medium">{svc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Standard Duration Selection */}
            <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#5C24FF]" />
                <div>
                  <span className="font-sora font-bold text-xs text-slate-900 block">
                    Default Consultation Duration
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Standard schedule calendar booking slot
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['15 mins', '20 mins', '30 Minutes', '45 mins', '60 mins'].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: dur })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sora font-semibold transition-all ${
                      formData.duration === dur
                        ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 06: Simple and Transparent Payments (Fee Calculator & Payouts) */}
        {currentStep === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-in fade-in duration-200">
            {/* Left: Fee Calculation Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#9A6AFB]/10 via-purple-50 to-[#5C24FF]/10 rounded-3xl p-6 sm:p-8 border border-purple-100/90 space-y-5">
              <div>
                <span className="text-xs font-sora font-bold text-[#5C24FF] uppercase tracking-wider block">
                  Transparency
                </span>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 mt-1 leading-snug">
                  Consultation Rates
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Set transparent pricing for patient visits. You receive 100% of your listed fee.
                </p>
              </div>

              {/* Fee Inputs */}
              <div className="space-y-3.5 bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Currency *
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>USD ($ - US Dollar)</option>
                    <option>EUR (€ - Euro)</option>
                    <option>GBP (£ - British Pound)</option>
                    <option>CAD ($ - Canadian Dollar)</option>
                    <option>INR (₹ - Indian Rupee)</option>
                    <option>AUD ($ - Australian Dollar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Initial Consultation Fee *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.consultFee}
                      onChange={(e) => setFormData({ ...formData, consultFee: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 font-sora font-bold text-sm focus:outline-none focus:border-[#5C24FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Follow-Up Visit Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.followUpFee}
                      onChange={(e) => setFormData({ ...formData, followUpFee: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 font-sora font-semibold text-xs focus:outline-none focus:border-[#5C24FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Estimation Pill */}
              <div className="p-3.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] rounded-2xl text-white space-y-1 shadow-md">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-100">
                  Estimated Monthly Payout
                </span>
                <div className="text-xl font-sora font-extrabold">
                  ${parseInt(formData.consultFee || '150', 10) * 8 * 22} / mo
                </div>
                <p className="text-[10px] text-purple-200">
                  Based on 8 consultations/day · Direct next-day ACH deposit
                </p>
              </div>
            </div>

            {/* Right: Bank Payout Configuration */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-5">
              <div>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                  Payout Method & Banking
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect your verified bank account for automated clinician earnings distribution.
                </p>
              </div>

              {/* Payout Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'ach_direct',
                    title: 'Direct Bank ACH',
                    desc: '0% fee · Daily payout',
                    icon: Building,
                  },
                  {
                    id: 'stripe_connect',
                    title: 'Stripe Healthcare',
                    desc: 'Instant settlement',
                    icon: CreditCard,
                  },
                  {
                    id: 'wire',
                    title: 'Corporate Wire',
                    desc: 'Monthly batch transfer',
                    icon: ShieldCheck,
                  },
                ].map((pm) => {
                  const isSelected = formData.payoutMethod === pm.id;
                  const Icon = pm.icon;

                  return (
                    <div
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, payoutMethod: pm.id })}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#5C24FF] bg-gradient-to-br from-[#9A6AFB]/10 to-[#5C24FF]/10'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#5C24FF] mb-1.5" />
                      <h4 className="font-sora font-bold text-xs text-slate-900">{pm.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{pm.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bank Details */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      value={formData.accountHolder}
                      onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Routing / Sort Code *
                    </label>
                    <input
                      type="text"
                      value={formData.routingNumber}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 07: Stay Connected With Your Patients (Patient Communication & Live Preview) */}
        {currentStep === 7 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-in fade-in duration-200">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
              <div>
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                  How Can Patients Reach You?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Specify professional communication channels and public directory visibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Clinic Direct Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.officePhone}
                      onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Patient Inquiry Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.officeEmail}
                      onChange={(e) => setFormData({ ...formData, officeEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Practice Website (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
              </div>

              {/* Contact Channels Multi-Select Chips */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                  Available Patient Contact Channels
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Mednevo Secure Chat', 'In-App Video Call', 'Office Telephone', 'Direct SMS'].map(
                    (cm) => {
                      const active = formData.contactMethods.includes(cm);
                      return (
                        <button
                          key={cm}
                          type="button"
                          onClick={() => toggleContactMethod(cm)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            active
                              ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {active ? `✓ ${cm}` : `+ ${cm}`}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Triage Mode Cards */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-2">
                  Patient Intake & Communication Mode
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'ava_ai',
                      title: 'Mednevo Ava AI Smart Triage (Recommended)',
                      desc: 'Ava handles pre-visit SOAP intake, flags abnormal lab vitals, and manages asynchronous patient questions.',
                    },
                    {
                      id: 'standard',
                      title: 'Standard Direct Inquiries',
                      desc: 'Direct patient messaging routed to clinical nursing inbox.',
                    },
                  ].map((opt) => {
                    const isSelected = formData.triageMode === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, triageMode: opt.id })}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-[#5C24FF] bg-gradient-to-r from-[#9A6AFB]/10 to-[#5C24FF]/10'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="triageMode"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-0.5 accent-[#5C24FF]"
                        />
                        <div>
                          <span className="font-sora font-semibold text-xs text-slate-900 block">
                            {opt.title}
                          </span>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">{opt.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Directory Visibility Settings
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                >
                  <option>Public in Mednevo Directory</option>
                  <option>Visible to Confirmed Booked Patients Only</option>
                  <option>Private / Unlisted</option>
                </select>
              </div>
            </div>

            {/* Right: Patient-Facing Mobile Card Preview */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-card space-y-4">
              <span className="font-sora font-bold text-xs text-slate-900 block">
                Patient Booking Card Preview
              </span>

              {/* Mobile Phone Mockup */}
              <div className="max-w-[280px] mx-auto rounded-3xl border-4 border-slate-800 bg-slate-50 p-3 shadow-xl space-y-3">
                <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-2xl shadow-2xs">
                  <img
                    src={formData.photoUrl}
                    alt="Doctor"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="font-sora font-bold text-xs text-slate-900 leading-tight">
                      Dr. {formData.firstName} {formData.lastName}
                    </h5>
                    <span className="text-[10px] text-[#5C24FF] font-medium block">
                      {formData.primarySpecialty}
                    </span>
                    <span className="text-[9px] text-slate-400 block">{formData.clinicName}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-2xl space-y-2 text-[10px] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Consultation Fee</span>
                    <span className="font-bold text-[#5C24FF]">${formData.consultFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Care Mode</span>
                    <span className="font-medium text-slate-800">{formData.consultMode}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-xs"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 08: Welcome to Mednevo, Doctor! (Full-Width Executive Launchpad) */}
        {currentStep === 8 && (
          <div className="w-full space-y-8 py-2 animate-in fade-in duration-300">
            {/* Top Celebration Banner - Full Width */}
            <div className="w-full bg-gradient-to-r from-purple-50 via-white to-purple-50/80 rounded-3xl border border-purple-100 p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-[0_10px_35px_rgba(154,106,251,0.45)] flex-shrink-0">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    ✓
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-sora font-bold text-[#5C24FF] bg-white px-3.5 py-1 rounded-full border border-purple-200/60 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Clinician Onboarding Complete · HIPAA Credentialed
                  </div>
                  <h2 className="font-sora font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                    Welcome to Mednevo, Dr. {formData.firstName} {formData.lastName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Your digital medical practice workspace, patient scheduling queue, direct payout escrow,
                    and AI clinical copilot Ava have been successfully configured and activated.
                  </p>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-purple-100 shadow-2xs text-center flex-shrink-0 min-w-[220px]">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-500" />
                  <span className="font-sora font-bold text-xs text-slate-800">License Status: Active</span>
                </div>
                <span className="text-[11px] font-mono text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-lg">
                  {formData.licenseNumber}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">NPI Registry Verified</span>
              </div>
            </div>

            {/* 4-Column Executive Profile Overview Across Entire Width */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* Card 1: Clinician Profile & Credentials */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-sora font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-[#5C24FF]" />
                    Clinician Profile
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={formData.photoUrl}
                    alt="Doctor Profile"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-100 shadow-2xs"
                  />
                  <div>
                    <h4 className="font-sora font-bold text-sm text-slate-900">
                      {formData.title} {formData.firstName} {formData.lastName}
                    </h4>
                    <p className="text-xs font-semibold text-[#5C24FF]">
                      {formData.primarySpecialty}
                    </p>
                    <p className="text-[11px] text-slate-500">{formData.credentials}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Gender & DOB</span>
                    <span className="font-medium">{formData.gender} · {formData.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Primary Specialty</span>
                    <span className="font-medium text-slate-800">{formData.primarySpecialty}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Facility & Practice Location */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-sora font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#5C24FF]" />
                    Practice Facility
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    {formData.practiceType}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sora font-bold text-sm text-slate-900">
                    {formData.clinicName}
                  </h4>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5C24FF] flex-shrink-0 mt-0.5" />
                    <span>{formData.address}, {formData.city}, {formData.state} {formData.postalCode}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Care Delivery</span>
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {formData.consultMode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Additional Sites</span>
                    <span className="font-medium text-slate-800">
                      {formData.additionalLocations.length > 0
                        ? `${formData.additionalLocations.length} registered`
                        : 'Single practice'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Fee Schedule & Payout Escrow */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-sora font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#5C24FF]" />
                    Financial Escrow
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-purple-50/50 p-2.5 rounded-2xl border border-purple-100">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Initial Visit</span>
                    <span className="font-sora font-extrabold text-base text-[#5C24FF]">
                      ${formData.consultFee}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Follow-up</span>
                    <span className="font-sora font-extrabold text-base text-slate-800">
                      ${formData.followUpFee}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Payout Method</span>
                    <span className="font-semibold text-slate-800">
                      {formData.payoutMethod === 'direct_deposit' ? 'Direct ACH' : 'Stripe Connect'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Bank / Escrow</span>
                    <span className="font-mono text-[11px] text-slate-700">{formData.bankName}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Patient Gateway & Ava AI Copilot */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-sora font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#5C24FF]" />
                    Patient Gateway & AI
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono">{formData.officePhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{formData.officeEmail}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Ava AI Copilot</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      Active 24/7
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Directory Listing</span>
                    <span className="font-semibold text-[#5C24FF]">Publicly Searchable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Readiness Roadmap - Full Width Across Entire Screen */}
            <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
                    Your Clinical Practice Launch Readiness
                  </h3>
                  <p className="text-xs text-slate-500">
                    All core systems have been initialized and are ready for your clinical shift.
                  </p>
                </div>
                <span className="text-xs font-sora font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  ✓ 100% Operational
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-sora font-bold text-slate-900">Daily Schedule Loaded</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    8 scheduled patient consultations waiting in today's timeline, starting with Sarah Jenkins.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-sora font-bold text-slate-900">Ava Intelligence Armed</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Critical potassium lab flag for Mike Lee (3.1 mEq/L) queued in your morning briefing panel.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-sora font-bold text-slate-900">HIPAA Video & Scribe</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    1-click HD telehealth room ready with live ambient transcription and auto SOAP drafting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="font-sora font-bold text-slate-900">E-Rx & Escrow Linked</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    SureScripts pharmacy e-prescribing and automated direct-deposit payouts active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>

          {/* Sticky Side AI Doctor Companion Guide (Duolingo-style) */}
          <div className="w-full xl:w-[350px] 2xl:w-[390px] xl:sticky xl:top-24 flex-shrink-0 self-start">
            <DoctorDuolingoCompanionGuide step={currentStep} doctorName={formData.lastName} />
          </div>
        </div>
      </main>

      {/* ──────────────── Bottom Navigation Toolbar (Full Width) ──────────────── */}
      <footer className="w-full bg-white/90 backdrop-blur-md border-t border-slate-100 px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sticky bottom-0 z-40">
        <div className="w-full flex items-center justify-between gap-4">
          {currentStep > 1 && currentStep < 8 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-sora font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 8 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-7 py-3 rounded-2xl font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(154,106,251,0.35)] transition-all active:scale-95 ml-auto"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onComplete(formData)}
              className="w-full sm:w-auto min-w-[280px] max-w-xl mx-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white py-4 px-10 rounded-2xl font-sora font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(154,106,251,0.45)] transition-all active:scale-98"
            >
              <span>Go to Doctor Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
