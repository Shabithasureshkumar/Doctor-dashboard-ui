import React, { useState } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  UsersRound,
  ChartNoAxesCombined,
  MessagesSquare,
  Wallet,
  Search,
  Settings,
  Bell,
  ChevronDown,
  UserPlus,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { CURRENT_DOCTOR } from '../../mockData';
import { TabType } from '../../types';
import { Avatar } from '../common/Avatar';

interface DashboardHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenNotifications?: () => void;
  onOpenSettings?: () => void;
  onSearchClick?: () => void;
  onNavigateToRegistration?: () => void;
  isSettingsActive?: boolean;
}

interface NavItemConfig {
  tab: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { tab: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { tab: 'Appointment', label: 'Appointment', icon: CalendarDays },
  { tab: 'Patient', label: 'Patient', icon: UsersRound },
  { tab: 'Reports', label: 'Reports', icon: ChartNoAxesCombined },
  { tab: 'Chats', label: 'Chats', icon: MessagesSquare },
  { tab: 'Billing', label: 'Billing', icon: Wallet },
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenNotifications,
  onOpenSettings,
  onSearchClick,
  onNavigateToRegistration,
  isSettingsActive = false,
}) => {
  const [hasUnreadNotification] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="w-full pt-3 pb-2 transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Section: Sidebar Drawer Menu Button + Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* Sidebar Menu Icon Button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:text-[#5C24FF] hover:border-purple-200 hover:bg-purple-50/60 flex items-center justify-center transition-all shadow-xs flex-shrink-0 cursor-pointer active:scale-95"
            title="Open Navigation Menu"
            aria-label="Open Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none flex-1 min-w-0">
            {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`group flex items-center gap-2 sm:gap-2.5 rounded-[14px] font-sora transition-all duration-200 whitespace-nowrap text-sm sm:text-[15px] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7542FF] to-[#5425F5] text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold shadow-[0_4px_16px_rgba(117,66,255,0.38)]'
                      : 'text-[#1E293B] hover:text-[#5425F5] hover:bg-purple-50/70 px-3.5 sm:px-4 py-2.5 sm:py-3 font-medium'
                  }`}
                >
                  <Icon
                    className={`w-[19px] h-[19px] flex-shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#334155] group-hover:text-[#5425F5] group-hover:scale-110'
                    }`}
                    strokeWidth={1.9}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-end">
          {/* Search Toggle / Bar */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 animate-in fade-in slide-in-from-right-3 duration-200">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-40 sm:w-52"
                  autoFocus
                  onBlur={() => {
                    if (!headerSearchQuery) setShowSearchInput(false);
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSearchInput(true);
                  onSearchClick?.();
                }}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-600 flex items-center justify-center transition-colors"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-slate-500" />
              </button>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isSettingsActive
                ? 'bg-purple-100 text-[#5C24FF] ring-2 ring-[#9A6AFB]/40 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200/90 text-slate-600'
            }`}
            title="Settings"
            aria-label="Settings"
          >
            <Settings className={`w-5 h-5 ${isSettingsActive ? 'text-[#5C24FF]' : 'text-slate-500'}`} />
          </button>

          {/* Notifications Button with unread indicator */}
          <button
            onClick={onOpenNotifications}
            className="relative w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-600 flex items-center justify-center transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-500" />
            {hasUnreadNotification && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#5C24FF] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* User Profile with interactive dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 pl-2 sm:pl-3 p-1.5 rounded-2xl hover:bg-slate-100/80 transition-colors text-left cursor-pointer"
              title="Doctor profile and account"
            >
              <Avatar
                src={CURRENT_DOCTOR.avatarUrl}
                alt={CURRENT_DOCTOR.name}
                initials="DB"
                size="lg"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-sora font-bold text-sm text-slate-900 leading-tight">
                    {CURRENT_DOCTOR.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                <span className="text-xs text-slate-400 font-normal leading-tight block mt-0.5">
                  {CURRENT_DOCTOR.role}
                </span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-purple-950/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="text-sm font-sora font-bold text-slate-800">{CURRENT_DOCTOR.name}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Provider
                    </span>
                  </div>

                  <div className="py-1">
                    {onNavigateToRegistration && (
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigateToRegistration();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#5C24FF] hover:bg-purple-50 rounded-xl transition-colors text-left"
                      >
                        <UserPlus className="w-4 h-4 text-[#5C24FF]" />
                        <span>Provider Registration Flow</span>
                        <Sparkles className="w-3.5 h-3.5 ml-auto text-amber-500" />
                      </button>
                    )}

                    {onOpenSettings && (
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onOpenSettings();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-left"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span>Settings &amp; Preferences</span>
                      </button>
                    )}
                  </div>

                  {onNavigateToRegistration && (
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigateToRegistration();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Switch Provider / Restart Flow</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE-OVER NAVIGATION SIDEBAR DRAWER (Full Screen & Responsive)
          ───────────────────────────────────────────────────────────── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-[85vw] max-w-[340px] sm:max-w-sm bg-white shadow-2xl border-r border-slate-100 flex flex-col h-full animate-in slide-in-from-left duration-250 ease-out z-10">
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md shadow-purple-500/25">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-sora font-extrabold text-base text-slate-900 leading-tight">
                      Mednevo Care
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">Doctor Portal Navigation</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                  aria-label="Close navigation sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Doctor Profile Banner */}
              <div className="p-3.5 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-100/70 flex items-center gap-3">
                <Avatar
                  src={CURRENT_DOCTOR.avatarUrl}
                  alt={CURRENT_DOCTOR.name}
                  initials="DB"
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-sora font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {CURRENT_DOCTOR.name}
                  </h4>
                  <p className="text-[11px] text-[#5C24FF] font-medium truncate">
                    {CURRENT_DOCTOR.role}
                  </p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              </div>

              {/* Navigation Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Main Navigation
                </div>

                {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
                  const isActive = activeTab === tab;
                  const badges: Partial<Record<TabType, string>> = {
                    Dashboard: 'Home',
                    Appointment: '16 Today',
                    Patient: '35 Patients',
                    Reports: '22 Ready',
                    Chats: '2 New',
                    Billing: 'Finance',
                  };
                  const badge = badges[tab];

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        onTabChange(tab);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl font-sora text-xs sm:text-sm font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-[#7542FF] to-[#5425F5] text-white shadow-[0_4px_16px_rgba(117,66,255,0.3)]'
                          : 'text-slate-700 hover:bg-purple-50/70 hover:text-[#5C24FF]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{label}</span>
                      </div>

                      {badge && (
                        <span
                          className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-purple-50 text-[#5C24FF] border border-purple-100'
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="pt-3 px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Access &amp; Tools
                </div>

                {onOpenSettings && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenSettings();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium transition-colors text-left ${
                      isSettingsActive
                        ? 'bg-purple-50 text-[#5C24FF] font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span>Settings &amp; Preferences</span>
                  </button>
                )}

                {onSearchClick && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchClick();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                    <span>Search Patient / MRN</span>
                  </button>
                )}

                {onOpenNotifications && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenNotifications();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center relative">
                      <Bell className="w-4 h-4" />
                      {hasUnreadNotification && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5C24FF] rounded-full" />
                      )}
                    </div>
                    <span>Clinical Tasks &amp; Alerts</span>
                  </button>
                )}

                {onNavigateToRegistration && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToRegistration();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium text-[#5C24FF] bg-purple-50/50 hover:bg-purple-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span>Provider Onboarding Flow</span>
                  </button>
                )}
              </div>

              {/* Drawer Bottom Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Mednevo EHR v2.4.0</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    HIPAA Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
