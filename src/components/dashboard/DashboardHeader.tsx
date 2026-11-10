import React, { useState } from 'react';
import {
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
  isSettingsActive = false,
}) => {
  const [hasUnreadNotification] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  return (
    <header className="w-full pt-3 pb-2 transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
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

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3">
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
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs text-slate-400 font-normal leading-tight block mt-0.5">
                {CURRENT_DOCTOR.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
