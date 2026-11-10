import React from 'react';
import {
  Key,
  Smartphone,
  Laptop,
  AlertTriangle,
  History,
  LogOut,
} from 'lucide-react';
import { SecuritySettings } from '../../../types/settings';

interface SecuritySectionProps {
  security: SecuritySettings;
  onChange: (updated: Partial<SecuritySettings>) => void;
  onOpenChangePassword: () => void;
  onOpenConfigure2FA: () => void;
  onOpenDeactivateModal: () => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  security,
  onChange,
  onOpenChangePassword,
  onOpenConfigure2FA,
  onOpenDeactivateModal,
  onSave,
  onToast,
}) => {
  const handleRevokeSessions = () => {
    const currentOnly = security.activeSessions.filter((s) => s.isCurrent);
    onChange({ activeSessions: currentOnly });
    onToast('All other remote device sessions revoked successfully.');
  };

  return (
    <div className="space-y-5">
      {/* 1. Security Health Score Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-[#5C24FF] to-[#7F47FA] text-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_24px_rgba(92,36,255,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              HIPAA Security Protocol
            </span>
          </div>

          <h3 className="font-sora font-extrabold text-xl sm:text-2xl">
            Account Security Score: {security.securityScore}%
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Your clinical account is protected with Two-Factor Authentication, active session monitoring, and encrypted audit trails.
          </p>
        </div>

        <div className="flex items-center gap-4 z-10 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-sora font-black text-2xl">92%</span>
            <span className="text-[10px] text-purple-200 uppercase font-bold">Optimal</span>
          </div>

          <button
            onClick={onOpenConfigure2FA}
            className="px-4 py-2.5 rounded-2xl bg-white text-[#5C24FF] font-sora font-bold text-xs sm:text-sm hover:bg-purple-50 transition-all shadow-md active:scale-95"
          >
            Review 2FA
          </button>
        </div>
      </div>

      {/* 2. Authentication & Credential Management Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Authentication &amp; Credentials
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your account password, multi-factor authentication, and biometric verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password Card */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <span className="font-sora font-bold text-sm text-slate-900">Account Password</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">••••••••••••</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Last changed {security.lastPasswordChange}. Regular 90-day updates recommended.
              </p>
            </div>

            <button
              onClick={onOpenChangePassword}
              className="w-full py-2 bg-white hover:bg-purple-50 text-[#5C24FF] border border-purple-200 rounded-xl text-xs font-semibold font-sora transition-colors"
            >
              Change Password
            </button>
          </div>

          {/* 2FA Card */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="font-sora font-bold text-sm text-slate-900">Two-Factor Authentication</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {security.twoFactorEnabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {security.twoFactorEnabled
                  ? 'Authenticator App (TOTP) verification required on all unverified logins.'
                  : 'Add a secondary verification code via Google Authenticator or SMS.'}
              </p>
            </div>

            <button
              onClick={onOpenConfigure2FA}
              className="w-full py-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold font-sora transition-colors"
            >
              Configure 2FA Settings
            </button>
          </div>
        </div>
      </div>

      {/* 3. Active Devices & Sessions */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Active Devices &amp; Browser Sessions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Workstations and mobile devices currently signed into your physician profile
            </p>
          </div>

          <button
            onClick={handleRevokeSessions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Revoke Other Sessions</span>
          </button>
        </div>

        <div className="space-y-3">
          {security.activeSessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs transition-all ${
                session.isCurrent ? 'bg-purple-50/50 border-purple-200/80' : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  session.isCurrent ? 'bg-[#5C24FF] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{session.device}</span>
                    {session.isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Current Session
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {session.browser} • {session.location} (IP: {session.ip})
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-500">{session.lastActive}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Privacy & Session Auto-Lock Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Privacy &amp; Screen Shield Controls
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            HIPAA workstation compliance features and telemetry masking
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {/* Masking */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Patient PHI Masking in Screen Share Mode</span>
              <span className="text-[11px] text-slate-500">Automatically hide full names and MRN when presenting screens</span>
            </div>
            <button
              type="button"
              onClick={() =>
                onChange({
                  privacy: {
                    ...security.privacy,
                    patientDataMaskingOnScreenShare: !security.privacy.patientDataMaskingOnScreenShare,
                  },
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 flex-shrink-0 ${
                security.privacy.patientDataMaskingOnScreenShare ? 'bg-[#5C24FF]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  security.privacy.patientDataMaskingOnScreenShare ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Auto Lock */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Workstation Session Auto-Lock</span>
              <span className="text-[11px] text-slate-500">Require PIN or password re-entry after idle period</span>
            </div>
            <select
              value={security.privacy.sessionAutoLockMinutes}
              onChange={(e) =>
                onChange({
                  privacy: {
                    ...security.privacy,
                    sessionAutoLockMinutes: parseInt(e.target.value) || 15,
                  },
                })
              }
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
            >
              <option value={5}>After 5 minutes</option>
              <option value={15}>After 15 minutes (Standard)</option>
              <option value={30}>After 30 minutes</option>
              <option value={60}>After 1 hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Login Audit Trail & Account Danger Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Login History */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <History className="w-4 h-4 text-[#5C24FF]" />
              <h4 className="font-sora font-bold text-sm text-slate-900">Recent Login History Audit</h4>
            </div>

            <div className="space-y-2 text-xs pt-2">
              {security.loginHistory.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-50/70 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.device}</span>
                    <span className="text-[11px] text-slate-400">
                      {item.location} • {item.timestamp} • IP: {item.ip}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-rose-100 text-rose-600 font-sora font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Danger Zone</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Account deactivation archives active patients, unlinks NPI billing clearinghouse, and disables telemedicine endpoints.
            </p>
          </div>

          <button
            onClick={onOpenDeactivateModal}
            className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
          >
            Request Account Deactivation
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Security Settings
        </button>
      </div>
    </div>
  );
};
