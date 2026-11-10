import React, { useState } from 'react';
import {
  User,
  Calendar,
  Sliders,
  Bell,
  Stethoscope,
  ShieldCheck,
  Workflow,
  Palette,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Save,
  RotateCcw,
} from 'lucide-react';
import {
  DoctorSettingsState,
  SettingsSectionId,
} from '../../types/settings';
import { INITIAL_SETTINGS_STATE } from '../../mockData/settingsData';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { TabType } from '../../types';

// Section Components
import { ProfileSection } from './sections/ProfileSection';
import { AvailabilitySection } from './sections/AvailabilitySection';
import { ConsultationSection } from './sections/ConsultationSection';
import { NotificationsSection } from './sections/NotificationsSection';
import { ClinicalPreferencesSection } from './sections/ClinicalPreferencesSection';
import { SecuritySection } from './sections/SecuritySection';
import { IntegrationsSection } from './sections/IntegrationsSection';
import { AppearanceSection } from './sections/AppearanceSection';
import { HelpSupportSection } from './sections/HelpSupportSection';

// Modals
import { ChangePasswordModal } from './modals/ChangePasswordModal';
import { Configure2FAModal } from './modals/Configure2FAModal';
import { DeactivateAccountModal } from './modals/DeactivateAccountModal';
import { UnsavedChangesModal } from './modals/UnsavedChangesModal';

interface SettingsViewProps {
  onBackToDashboard: () => void;
  onNavigateToAppointments?: () => void;
  onNavigateToPatients?: () => void;
  onNavigateToBilling?: () => void;
  onOpenSearchPatient?: () => void;
  onOpenTasks?: () => void;
}

const SETTINGS_STORAGE_KEY = 'mednevo_doctor_settings_v1';

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBackToDashboard,
  onNavigateToAppointments,
  onNavigateToPatients,
  onNavigateToBilling,
  onOpenSearchPatient,
  onOpenTasks,
}) => {
  // Load saved state or default
  const [settings, setSettings] = useState<DoctorSettingsState>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_SETTINGS_STATE;
  });

  const [activeSection, setActiveSection] = useState<SettingsSectionId>('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
  const [pendingNavAction, setPendingNavAction] = useState<(() => void) | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 4000);
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
    setHasUnsavedChanges(false);
    showToast('All settings changes saved and synchronized successfully.');
  };

  const handleDiscardChanges = () => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        setSettings(JSON.parse(saved));
      } else {
        setSettings(INITIAL_SETTINGS_STATE);
      }
    } catch {
      setSettings(INITIAL_SETTINGS_STATE);
    }
    setHasUnsavedChanges(false);
    showToast('Changes discarded. Restored previous configuration.');
  };

  const handleSafeNavigation = (action: () => void) => {
    if (hasUnsavedChanges) {
      setPendingNavAction(() => action);
      setIsUnsavedModalOpen(true);
    } else {
      action();
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'Dashboard') handleSafeNavigation(onBackToDashboard);
    else if (tab === 'Appointment') handleSafeNavigation(() => onNavigateToAppointments?.());
    else if (tab === 'Patient') handleSafeNavigation(() => onNavigateToPatients?.());
    else if (tab === 'Billing') handleSafeNavigation(() => onNavigateToBilling?.());
  };

  // Sidebar Menu Items
  const navItems = [
    {
      id: 'profile' as const,
      label: 'Profile & Credentials',
      subtitle: 'Name, photo, NPI, biography',
      icon: User,
      badge: 'Verified',
    },
    {
      id: 'availability' as const,
      label: 'Availability & Schedule',
      subtitle: 'Working days, hours, leaves',
      icon: Calendar,
      badge: '6 Days',
    },
    {
      id: 'consultation' as const,
      label: 'Consultation Preferences',
      subtitle: 'Modes, triage, waiting room',
      icon: Sliders,
      badge: null,
    },
    {
      id: 'notifications' as const,
      label: 'Notifications Matrix',
      subtitle: 'Email, SMS, push, in-app',
      icon: Bell,
      badge: 'Active',
    },
    {
      id: 'clinical' as const,
      label: 'Clinical Preferences',
      subtitle: 'SOAP, e-Rx, ICD-10, units',
      icon: Stethoscope,
      badge: null,
    },
    {
      id: 'security' as const,
      label: 'Security & Privacy',
      subtitle: 'Password, 2FA, sessions',
      icon: ShieldCheck,
      badge: `${settings.security.securityScore}%`,
    },
    {
      id: 'integrations' as const,
      label: 'Integrations & FHIR',
      subtitle: 'Zoom, Surescripts, Epic',
      icon: Workflow,
      badge: `${settings.integrations.filter((i) => i.status === 'Connected').length} Conn`,
    },
    {
      id: 'appearance' as const,
      label: 'Appearance & Access',
      subtitle: 'Theme, typography, WCAG',
      icon: Palette,
      badge: null,
    },
    {
      id: 'help' as const,
      label: 'Help & Clinical Support',
      subtitle: 'FAQs, ticket, 24/7 hotline',
      icon: HelpCircle,
      badge: '24/7',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-4 sm:space-y-5 flex flex-col font-inter">
      {/* 1. Global Mednevo Header */}
      <DashboardHeader
        activeTab="Dashboard"
        onTabChange={handleTabChange}
        onSearchClick={onOpenSearchPatient}
        onOpenNotifications={onOpenTasks}
        onOpenSettings={() => {}}
      />

      {/* 2. Settings Breadcrumb & Top Bar */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 pt-1">
        <div className="space-y-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={() => handleSafeNavigation(onBackToDashboard)}
              className="hover:text-[#5C24FF] transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-[#5C24FF] font-semibold">Settings</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSafeNavigation(onBackToDashboard)}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#5C24FF] hover:border-purple-200 flex items-center justify-center transition-colors shadow-xs"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Settings
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage your professional profile, preferences and account security.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Unsaved badge + Discard + Save All */}
        <div className="flex items-center gap-2.5 self-start sm:self-center flex-wrap">
          {hasUnsavedChanges && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Unsaved Changes
            </span>
          )}

          {hasUnsavedChanges && (
            <button
              onClick={handleDiscardChanges}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-sora font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95 whitespace-nowrap"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* 3. Mobile Category Selector (Dropdown / Horizontal Scroll) */}
      <div className="lg:hidden w-full bg-white rounded-2xl p-2 border border-slate-100 shadow-sm overflow-x-auto scrollbar-none flex-shrink-0">
        <div className="flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#5C24FF] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-[#5C24FF]'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
        {/* Left Sidebar: Vertical Navigation */}
        <div className="hidden lg:block lg:col-span-4 2xl:col-span-3 lg:sticky lg:top-4 lg:self-start bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-2">
          <div className="pb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Settings Navigation
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full p-3.5 rounded-2xl transition-all text-left flex items-center justify-between gap-3 group ${
                    isActive
                      ? 'bg-purple-50/80 border border-[#9A6AFB]/40 text-[#5C24FF] shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#5C24FF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100 group-hover:text-[#5C24FF]'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`font-sora font-semibold text-xs sm:text-sm block truncate ${
                          isActive ? 'text-[#5C24FF]' : 'text-slate-800'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        isActive
                          ? 'bg-purple-200/80 text-[#5C24FF]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Doctor Profile Card at bottom of sidebar */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <img
              src={settings.profile.avatarUrl}
              alt={settings.profile.fullName}
              className="w-10 h-10 rounded-2xl object-cover border border-purple-200"
            />
            <div className="min-w-0">
              <span className="font-sora font-bold text-xs text-slate-900 block truncate">
                {settings.profile.fullName}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {settings.profile.email}
              </span>
            </div>
          </div>
        </div>

        {/* Right Content Panel: Dynamic Active Section */}
        <div className="lg:col-span-8 2xl:col-span-9 space-y-5 min-w-0">
          {activeSection === 'profile' && (
            <ProfileSection
              profile={settings.profile}
              onChange={(updated) => {
                setSettings({ ...settings, profile: { ...settings.profile, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'availability' && (
            <AvailabilitySection
              availability={settings.availability}
              onChange={(updated) => {
                setSettings({ ...settings, availability: { ...settings.availability, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'consultation' && (
            <ConsultationSection
              preferences={settings.consultation}
              onChange={(updated) => {
                setSettings({ ...settings, consultation: { ...settings.consultation, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'notifications' && (
            <NotificationsSection
              notifications={settings.notifications}
              onChange={(updated) => {
                setSettings({ ...settings, notifications: { ...settings.notifications, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'clinical' && (
            <ClinicalPreferencesSection
              clinical={settings.clinical}
              onChange={(updated) => {
                setSettings({ ...settings, clinical: { ...settings.clinical, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'security' && (
            <SecuritySection
              security={settings.security}
              onChange={(updated) => {
                setSettings({ ...settings, security: { ...settings.security, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onOpenChangePassword={() => setIsPasswordModalOpen(true)}
              onOpenConfigure2FA={() => setIs2FAModalOpen(true)}
              onOpenDeactivateModal={() => setIsDeactivateModalOpen(true)}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'integrations' && (
            <IntegrationsSection
              integrations={settings.integrations}
              onChange={(updated) => {
                setSettings({ ...settings, integrations: updated });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'appearance' && (
            <AppearanceSection
              appearance={settings.appearance}
              onChange={(updated) => {
                setSettings({ ...settings, appearance: { ...settings.appearance, ...updated } });
                setHasUnsavedChanges(true);
              }}
              onSave={handleSaveAll}
              onToast={showToast}
            />
          )}

          {activeSection === 'help' && (
            <HelpSupportSection
              onOpenLiveChat={() => showToast('Opening Live Concierge Chat...')}
              onToast={showToast}
            />
          )}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          showToast('Password updated successfully. Timestamp logged.');
          setSettings({
            ...settings,
            security: {
              ...settings.security,
              lastPasswordChange: 'Just now',
            },
          });
        }}
      />

      <Configure2FAModal
        isOpen={is2FAModalOpen}
        enabled={settings.security.twoFactorEnabled}
        onClose={() => setIs2FAModalOpen(false)}
        onToggle={(newVal) => {
          setSettings({
            ...settings,
            security: {
              ...settings.security,
              twoFactorEnabled: newVal,
              securityScore: newVal ? 92 : 75,
            },
          });
          setHasUnsavedChanges(true);
        }}
        onToast={showToast}
      />

      <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={() => {
          showToast('Account deactivation request submitted to Compliance. Status pending.');
        }}
      />

      <UnsavedChangesModal
        isOpen={isUnsavedModalOpen}
        onClose={() => setIsUnsavedModalOpen(false)}
        onDiscard={() => {
          setIsUnsavedModalOpen(false);
          setHasUnsavedChanges(false);
          if (pendingNavAction) pendingNavAction();
        }}
        onSave={() => {
          handleSaveAll();
          setIsUnsavedModalOpen(false);
          if (pendingNavAction) pendingNavAction();
        }}
      />
    </div>
  );
};
