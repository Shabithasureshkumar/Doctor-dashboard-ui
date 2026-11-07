import React, { useState } from 'react';
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
  const [confirmPassword, setConfirmPassword] = useState('SecurePass@2026');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State initialized with sensible clinician defaults
  const [formData, setFormData] = useState<DoctorRegistrationData>({
    providerType: 'individual_physician',
    fullName: 'Dr. Brock Rivers',
    email: 'b.rivers@mednevo-health.com',
    password: 'SecurePass@2026',
    agreeTerms: true,
    firstName: 'Brock',
    lastName: 'Rivers',
    title: 'MD',
    gender: 'Male',
    dob: '1982-06-15',
    phone: '+1 (555) 234-5678',
    licenseNumber: 'MED-CA-948201',
    credentials: 'MD, FACC, Board Certified Cardiologist',
    bio: 'Cardiologist with 14+ years of clinical experience specializing in preventive cardiology, hypertension titration, and remote patient monitoring.',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    clinicName: 'Metro Cardiovascular Institute',
    practiceType: 'Private Specialty Clinic',
    address: '742 Evergreen Terrace, Suite 400',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    postalCode: '94107',
    consultMode: 'Hybrid',
    additionalLocations: [],
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
    ],
    encounterTypes: ['Video Telehealth Visits', 'Office Consultations'],
    duration: '30 Minutes',
    consultFee: '150',
    followUpFee: '90',
    currency: 'USD ($)',
    payoutMethod: 'ach_direct',
    bankName: 'Silicon Valley Health Bank',
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

  const stepTitles = [
    'Provider Type',
    'Account Credentials',
    'Profile & License',
    'Practice Location',
    'Clinical Services',
    'Payment & Payout',
    'Patient Contact',
    'Registration Complete',
  ];

  // Validation rules per screen
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.providerType) {
        newErrors.providerType = 'Please select your provider registration type.';
      }
    } else if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid professional email is required.';
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      }
      if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the Terms of Service & HIPAA agreement.';
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
      if (!formData.clinicName.trim()) newErrors.clinicName = 'Clinic / Practice name is required.';
      if (!formData.address.trim()) newErrors.address = 'Practice street address is required.';
      if (!formData.city.trim()) newErrors.city = 'City is required.';
      if (!formData.state.trim()) newErrors.state = 'State / Province is required.';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    } else if (step === 5) {
      if (!formData.primarySpecialty) {
        newErrors.primarySpecialty = 'Please select your primary specialty.';
      }
      if (formData.servicesOffered.length === 0) {
        newErrors.servicesOffered = 'Select at least one clinical service offered.';
      }
    } else if (step === 6) {
      if (!formData.consultFee || parseFloat(formData.consultFee) <= 0) {
        newErrors.consultFee = 'Valid consultation fee is required.';
      }
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Bank account number is required for payouts.';
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

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 antialiased py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Branding */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white shadow-md">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-sora font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>Mednevo</span>
              <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Provider Onboarding
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Clinician Registration & Credentialing Intake
            </p>
          </div>
        </div>

        {onSkip && currentStep < 8 && (
          <button
            onClick={onSkip}
            className="text-xs font-sora font-semibold text-slate-500 hover:text-[#5C24FF] bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors"
          >
            Skip to Dashboard →
          </button>
        )}
      </div>

      {/* Main Container Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
        {/* Step Progress Tracker */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sora text-xs font-bold text-slate-900">
              Screen {currentStep} of 8:{' '}
              <span className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] bg-clip-text text-transparent">
                {stepTitles[currentStep - 1]}
              </span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {Math.round((currentStep / 8) * 100)}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>

          {/* Step Dots (Desktop) */}
          <div className="hidden sm:flex items-center justify-between mt-3 px-1">
            {stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isPast = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div
                  key={title}
                  onClick={() => stepNum <= currentStep && setCurrentStep(stepNum)}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    stepNum <= currentStep ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : stepNum}
                  </div>
                  <span className="text-[9px] font-medium text-slate-500 hidden md:block">
                    {title.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Screen Body */}
        <div className="p-6 sm:p-8">
          {/* SCREEN 1: Join Mednevo as a Provider */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Join Mednevo as a Provider
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Select your provider registration classification to customize your credentialing,
                  clinical workspace, and patient booking channels.
                </p>
              </div>

              {errors.providerType && (
                <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-xl border border-rose-100">
                  {errors.providerType}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'individual_physician',
                    title: 'Individual Physician / Specialist',
                    desc: 'Licensed medical doctors (MD, DO, MBBS) providing direct outpatient, specialty consults, or virtual visits.',
                    icon: Stethoscope,
                    badge: 'Most Popular',
                  },
                  {
                    id: 'group_practice',
                    title: 'Medical Clinic / Group Practice',
                    desc: 'Multi-provider healthcare centers, outpatient clinics, and group practices managing collective queues.',
                    icon: Building2,
                  },
                  {
                    id: 'allied_health',
                    title: 'Allied Healthcare Professional',
                    desc: 'Nurse practitioners, clinical psychologists, physical therapists, and certified specialist clinicians.',
                    icon: HeartPulse,
                  },
                  {
                    id: 'diagnostic_partner',
                    title: 'Diagnostic & Laboratory Partner',
                    desc: 'Accredited imaging facilities, pathology labs, and diagnostic centers receiving digital test orders.',
                    icon: FlaskConical,
                  },
                ].map((card) => {
                  const isSelected = formData.providerType === card.id;
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.id}
                      onClick={() => setFormData({ ...formData, providerType: card.id })}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#5C24FF] bg-gradient-to-br from-[#9A6AFB]/10 to-[#5C24FF]/10 shadow-[0_4px_16px_rgba(154,106,251,0.18)]'
                          : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white shadow-xs'
                              : 'bg-purple-50 text-[#5C24FF]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-2">
                          {card.badge && (
                            <span className="text-[10px] font-bold bg-[#9A6AFB]/20 text-[#5C24FF] px-2 py-0.5 rounded-full">
                              {card.badge}
                            </span>
                          )}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'border-[#5C24FF] bg-[#5C24FF]'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      <h4 className="font-sora font-bold text-sm text-slate-900 leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCREEN 2: Create Your Mednevo Account */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Create Your Mednevo Account
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your administrative login credentials to protect clinician encounter
                  records.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Brock Rivers"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Professional Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="doctor@clinic.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/20 focus:border-[#5C24FF]"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    {errors.password && (
                      <span className="text-[11px] text-rose-500 mt-1 block">{errors.password}</span>
                    )}
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
                    {errors.confirmPassword && (
                      <span className="text-[11px] text-rose-500 mt-1 block">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password strength helper */}
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-2 text-xs text-slate-600">
                  <Lock className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
                  <span>
                    Must contain at least 8 characters, including 1 uppercase, 1 number, and 1
                    symbol.
                  </span>
                </div>

                {/* Terms checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded accent-[#5C24FF] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree to the Mednevo Provider Terms of Service, Business Associate Agreement
                      (BAA), and HIPAA Privacy Protocols.
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
          )}

          {/* SCREEN 3: Tell Us About Yourself */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Tell Us About Yourself
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Provide your verified credentials and medical board license details for provider
                  intake.
                </p>
              </div>

              {/* Photo Upload Box */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-purple-200 bg-purple-50/40">
                <img
                  src={formData.photoUrl}
                  alt="Doctor Preview"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-xs"
                />
                <div className="flex-1">
                  <h4 className="font-sora font-semibold text-xs text-slate-900">
                    Doctor Profile Photo
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Clear clinician headshot recommended (.jpg, .png, max 5MB).
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Title / Honorific *
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-Binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Medical License / Board Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="e.g. MED-CA-948201"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
                {errors.licenseNumber && (
                  <span className="text-[11px] text-rose-500 mt-1 block">
                    {errors.licenseNumber}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Professional Degrees & Fellowships *
                </label>
                <input
                  type="text"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="e.g. MD, FACC (Harvard Medical School, 2012)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Professional Bio / Care Philosophy (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                />
              </div>
            </div>
          )}

          {/* SCREEN 4: Where Do You Practice? */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Where Do You Practice?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Add your primary clinic location, hospital affiliation, or telehealth base.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                      Hospital / Clinic / Organization Name *
                    </label>
                    <input
                      type="text"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                      placeholder="e.g. Metro Cardiovascular Center"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                    />
                    {errors.clinicName && (
                      <span className="text-[10px] text-rose-500 mt-0.5 block">
                        {errors.clinicName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                      Practice Type *
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
                      <option>Virtual Telehealth Only</option>
                    </select>
                  </div>
                </div>

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
                  {errors.address && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">{errors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

                  <div>
                    <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                      State / Province *
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
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                    />
                  </div>
                </div>

                {/* Consultation Mode */}
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-2">
                    Consultation Fulfillment Mode *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Hybrid', 'In-Person Only', 'Telehealth Only'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFormData({ ...formData, consultMode: mode })}
                        className={`p-3 rounded-xl border text-xs font-sora font-semibold text-center transition-all ${
                          formData.consultMode === mode
                            ? 'bg-gradient-to-r from-[#9A6AFB]/15 to-[#5C24FF]/15 border-[#5C24FF] text-[#5C24FF] shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: Services You Provide */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Services You Provide
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Define your clinical specialty, sub-specialties, and consultation durations.
                </p>
              </div>

              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                  Primary Medical Specialty *
                </label>
                <select
                  value={formData.primarySpecialty}
                  onChange={(e) => setFormData({ ...formData, primarySpecialty: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                >
                  <option>Cardiology</option>
                  <option>Internal Medicine</option>
                  <option>Family Medicine</option>
                  <option>Endocrinology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Dermatology</option>
                  <option>Psychiatry</option>
                </select>
              </div>

              {/* Sub-Specialties Multi-Select Chips */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                  Sub-Specialties & Focus Areas (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Hypertension Management',
                    'Lipidology & Preventive Cardiology',
                    'Heart Failure Care',
                    'Electrophysiology',
                    'Interventional Cardiology',
                    'Diabetic Vascular Risk',
                    'Cardio-Oncology',
                  ].map((sub) => {
                    const active = formData.subSpecialties.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubSpecialty(sub)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
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

              {/* Services Offered */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                  Clinical Services Offered *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Comprehensive Clinical Intake',
                    'Chronic Disease Management',
                    '12-Lead ECG Interpretation',
                    'Remote Patient Monitoring (RPM)',
                    'Prescription Refill & Titration',
                    'Pre-Operative Clearance',
                  ].map((svc) => (
                    <label
                      key={svc}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(svc)}
                        onChange={() => toggleServiceOffered(svc)}
                        className="w-4 h-4 rounded accent-[#5C24FF]"
                      />
                      <span className="text-xs text-slate-800 font-medium">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Default Consultation Duration */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-1.5">
                  Standard Consultation Slot Duration
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['15 mins', '20 mins', '30 Minutes', '45 mins', '60 mins'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: dur })}
                      className={`py-2 rounded-xl text-xs font-sora font-semibold text-center border transition-all ${
                        formData.duration === dur
                          ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white border-transparent shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 6: How Would You Like to Get Paid? */}
          {currentStep === 6 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  How Would You Like to Get Paid?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Configure consultation fees, currency, and verified payout bank accounts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Currency *
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>CAD ($)</option>
                    <option>INR (₹)</option>
                    <option>AUD ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Initial Consultation Fee *
                  </label>
                  <input
                    type="number"
                    value={formData.consultFee}
                    onChange={(e) => setFormData({ ...formData, consultFee: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                  {errors.consultFee && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.consultFee}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Follow-Up Visit Fee
                  </label>
                  <input
                    type="number"
                    value={formData.followUpFee}
                    onChange={(e) => setFormData({ ...formData, followUpFee: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5C24FF]"
                  />
                </div>
              </div>

              {/* Payment Method Option Cards */}
              <div>
                <label className="block text-xs font-sora font-semibold text-slate-700 mb-2">
                  Payout Method Selection
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'ach_direct',
                      title: 'Direct Bank ACH',
                      desc: '0% fee, daily settlement',
                      icon: Building,
                    },
                    {
                      id: 'stripe_connect',
                      title: 'Stripe Healthcare',
                      desc: 'Instant card deposits',
                      icon: CreditCard,
                    },
                    {
                      id: 'wire',
                      title: 'Corporate Wire',
                      desc: 'Monthly batch payout',
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
              </div>

              {/* Bank details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-sora font-bold text-slate-400 uppercase tracking-wider block">
                  Encrypted Bank Account Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Routing / Sort Code
                    </label>
                    <input
                      type="text"
                      value={formData.routingNumber}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 7: How Can Patients Reach You? */}
          {currentStep === 7 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                  How Can Patients Reach You?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Configure clinical communication preferences and public directory visibility.
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
                  {errors.officePhone && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.officePhone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
                    Patient Communication Email *
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
                  {errors.officeEmail && (
                    <span className="text-[10px] text-rose-500 mt-0.5 block">
                      {errors.officeEmail}
                    </span>
                  )}
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

              {/* Available Contact Methods */}
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

              {/* Patient Communication Preferences */}
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
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
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
          )}

          {/* SCREEN 8: Welcome to Mednevo, Dr. Doctor! */}
          {currentStep === 8 && (
            <div className="space-y-6 text-center py-4">
              {/* Success Badge */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white mx-auto shadow-[0_8px_25px_rgba(154,106,251,0.4)] animate-in zoom-in-75 duration-300">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C24FF] bg-purple-100/80 px-3 py-1 rounded-full mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Credentials Intake Verified
                </span>
                <h2 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  Welcome to Mednevo, Dr. {formData.lastName || 'Rivers'}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
                  Your provider profile has been registered and verified. Your clinical dashboard,
                  AI copilot Ava, and patient schedule are now ready.
                </p>
              </div>

              {/* Registration Summary Card */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-3.5 max-w-xl mx-auto shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.photoUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-sora font-bold text-sm text-slate-900">
                        {formData.title} {formData.firstName} {formData.lastName}
                      </h4>
                      <p className="text-xs text-[#5C24FF] font-medium">
                        {formData.primarySpecialty} · {formData.credentials}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {formData.licenseNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      Practice Location
                    </span>
                    <span className="font-medium text-slate-800">
                      {formData.clinicName}, {formData.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      Consultation Mode
                    </span>
                    <span className="font-medium text-slate-800">{formData.consultMode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      Initial Consult Fee
                    </span>
                    <span className="font-bold text-[#5C24FF]">
                      ${formData.consultFee} {formData.currency.split(' ')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                      AI Triage Copilot
                    </span>
                    <span className="font-medium text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Ava AI Enabled</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps List */}
              <div className="max-w-xl mx-auto text-left p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                <span className="text-xs font-sora font-bold text-slate-800 block">
                  Next recommended clinical actions:
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Review today's 8 patient visits in your daily schedule</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Inspect Ava's morning briefing for critical chemistry lab alerts</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Access ambient SOAP AI Scribe during telehealth consultations</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentStep > 1 && currentStep < 8 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-sora font-semibold text-slate-600 hover:bg-slate-200/80 transition-colors"
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-6 py-2.5 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(154,106,251,0.35)] transition-all active:scale-95 ml-auto"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onComplete(formData)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white py-3.5 px-6 rounded-2xl font-sora font-bold text-sm sm:text-base shadow-[0_6px_22px_rgba(154,106,251,0.4)] transition-all active:scale-98"
            >
              <span>Go to Doctor Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
