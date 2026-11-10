import React, { useState, useRef } from 'react';
import {
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  Award,
  Stethoscope,
  Globe,
  Calendar,
  ShieldCheck,
  FileText,
  User,
  Plus,
  X,
  Edit3,
} from 'lucide-react';
import { DoctorProfile } from '../../../types/settings';

interface ProfileSectionProps {
  profile: DoctorProfile;
  onChange: (updated: Partial<DoctorProfile>) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onChange,
  onSave,
  onToast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLanguageInput, setNewLanguageInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ avatarUrl: reader.result as string });
        onToast('Profile picture preview updated. Click Save to persist.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLanguage = () => {
    if (!newLanguageInput.trim()) return;
    const lang = newLanguageInput.trim();
    if (!profile.languages.includes(lang)) {
      onChange({ languages: [...profile.languages, lang] });
      onToast(`Added "${lang}" to spoken languages.`);
    }
    setNewLanguageInput('');
  };

  const handleRemoveLanguage = (lang: string) => {
    onChange({ languages: profile.languages.filter((l) => l !== lang) });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Doctor Avatar & Medical Registration Badge */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with Interactive Upload Trigger */}
          <div className="relative group flex-shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-purple-100 shadow-md transition-all group-hover:brightness-95"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border-2 border-white"
              title="Change Profile Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-slate-900">
                {profile.fullName}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Practitioner
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {profile.specialization} • {profile.yearsOfExperience} Years Clinical Practice
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-purple-50 text-[#5C24FF] px-2.5 py-1 rounded-xl font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {profile.registrationNumber}
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl font-medium">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {profile.clinicName}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-sora font-semibold text-xs sm:text-sm transition-all whitespace-nowrap self-start md:self-center ${
            isEditing
              ? 'bg-purple-100 text-[#5C24FF]'
              : 'border border-slate-200 hover:border-purple-200 text-slate-700 hover:text-[#5C24FF] hover:bg-purple-50/50'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Editing Mode Active' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* 2. Personal & Professional Information Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-6">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Professional Information &amp; Credentials
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified physician credentials visible on patient telemedicine charts and e-prescriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#5C24FF]" />
              Full Legal &amp; Clinical Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              disabled={!isEditing}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#5C24FF]" />
              Official Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              disabled={!isEditing}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#5C24FF]" />
              Contact Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              disabled={!isEditing}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Gender</label>
            <select
              value={profile.gender}
              disabled={!isEditing}
              onChange={(e) => onChange({ gender: e.target.value as DoctorProfile['gender'] })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other / Non-binary</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5C24FF]" />
              Date of Birth
            </label>
            <input
              type="date"
              value={profile.dateOfBirth}
              disabled={!isEditing}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Medical Registration / License Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C24FF]" />
              Medical Registration / NPI Number
            </label>
            <input
              type="text"
              value={profile.registrationNumber}
              disabled={!isEditing}
              onChange={(e) => onChange({ registrationNumber: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Qualification */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#5C24FF]" />
              Degrees &amp; Qualifications
            </label>
            <input
              type="text"
              value={profile.qualification}
              disabled={!isEditing}
              onChange={(e) => onChange({ qualification: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Specialization */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-[#5C24FF]" />
              Clinical Specialization
            </label>
            <input
              type="text"
              value={profile.specialization}
              disabled={!isEditing}
              onChange={(e) => onChange({ specialization: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Years of Experience */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Years of Clinical Experience</label>
            <input
              type="number"
              min="0"
              max="60"
              value={profile.yearsOfExperience}
              disabled={!isEditing}
              onChange={(e) => onChange({ yearsOfExperience: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>

          {/* Clinic / Hospital Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#5C24FF]" />
              Primary Clinic / Hospital Affiliation
            </label>
            <input
              type="text"
              value={profile.clinicName}
              disabled={!isEditing}
              onChange={(e) => onChange({ clinicName: e.target.value })}
              className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all"
            />
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="space-y-2.5 pt-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#5C24FF]" />
            Languages Spoken (Patient Consultations)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#5C24FF] border border-purple-100 font-semibold text-xs"
              >
                <span>{lang}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveLanguage(lang)}
                    className="hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            ))}

            {isEditing && (
              <div className="inline-flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Add language..."
                  value={newLanguageInput}
                  onChange={(e) => setNewLanguageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] w-28"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="w-7 h-7 rounded-lg bg-[#5C24FF] text-white flex items-center justify-center hover:opacity-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Professional Bio */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#5C24FF]" />
            Professional Biography &amp; Clinical Summary
          </label>
          <textarea
            rows={4}
            value={profile.bio}
            disabled={!isEditing}
            onChange={(e) => onChange({ bio: e.target.value })}
            className="w-full bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-100 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 font-normal leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] transition-all resize-none"
          />
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-wrap">
          <button
            onClick={() => {
              setIsEditing(false);
              onToast('Changes discarded.');
            }}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-sora font-semibold text-xs sm:text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave();
              setIsEditing(false);
            }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
