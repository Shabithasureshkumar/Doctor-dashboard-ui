import React from 'react';
import {
  Search,
  Plus,
  Pin,
  Archive,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  Pill,
  Activity,
  MessageSquare,
} from 'lucide-react';
import { ChatConversation, ChatFilterTab } from '../../types/chat';

interface ConversationListProps {
  conversations: ChatConversation[];
  selectedId: string;
  onSelectConversation: (id: string) => void;
  filterTab: ChatFilterTab;
  onFilterChange: (tab: ChatFilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNewMessage: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onToggleArchive: (id: string, e: React.MouseEvent) => void;
  onMarkAsRead: (id: string, e: React.MouseEvent) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelectConversation,
  filterTab,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onOpenNewMessage,
  onTogglePin,
  onToggleArchive,
  onMarkAsRead,
}) => {
  // Compute counts
  const unreadTotal = conversations.filter((c) => !c.isArchived && c.unreadCount > 0).length;
  const archivedTotal = conversations.filter((c) => c.isArchived).length;
  const activeTotal = conversations.filter((c) => !c.isArchived).length;

  // Filter conversations
  const filtered = conversations.filter((conv) => {
    // Tab filter
    if (filterTab === 'archived') {
      if (!conv.isArchived) return false;
    } else {
      if (conv.isArchived) return false;
      if (filterTab === 'unread' && conv.unreadCount === 0) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = conv.patientName.toLowerCase().includes(q);
      const matchId = conv.patientId.toLowerCase().includes(q);
      const matchMsg = conv.lastMessage.text.toLowerCase().includes(q);
      return matchName || matchId || matchMsg;
    }

    return true;
  });

  // Sort: Pinned first, then by latest message
  const sorted = [...filtered].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const getMessageTypeIcon = (type: ChatConversation['lastMessage']['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />;
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
      case 'prescription':
        return <Pill className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />;
      case 'lab':
        return <Activity className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
      {/* 1. List Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex-shrink-0 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-sora font-extrabold text-lg text-slate-900 tracking-tight">
              Messages
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Communicate with your patients
            </p>
          </div>

          <button
            onClick={onOpenNewMessage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs shadow-sm hover:opacity-95 transition-all active:scale-95"
            title="Start new conversation"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Message</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients or messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]/40 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl text-xs font-semibold text-slate-600">
          {(
            [
              { id: 'all', label: 'All', count: activeTotal },
              { id: 'unread', label: 'Unread', count: unreadTotal },
              { id: 'patients', label: 'Patients', count: activeTotal },
              { id: 'archived', label: 'Archived', count: archivedTotal },
            ] as const
          ).map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-white text-[#5C24FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-purple-100 text-[#5C24FF]'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Conversations Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80 scrollbar-thin scrollbar-thumb-slate-200">
        {sorted.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="font-sora font-bold text-sm text-slate-800">No conversations found</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {searchQuery
                ? `No messages match "${searchQuery}". Try a different name or keyword.`
                : 'No conversations in this filter folder.'}
            </p>
          </div>
        ) : (
          sorted.map((conv) => {
            const isSelected = conv.id === selectedId;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`p-3.5 sm:p-4 transition-all cursor-pointer relative group flex items-start gap-3 ${
                  isSelected
                    ? 'bg-purple-50/70 border-l-4 border-l-[#5C24FF]'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Avatar with Online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.patientAvatar}
                    alt={conv.patientName}
                    className="w-11 h-11 rounded-2xl object-cover border border-purple-100 shadow-xs"
                  />
                  {conv.online ? (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-200"
                      title="Online now"
                    />
                  ) : (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"
                      title="Offline"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`font-sora font-bold text-xs sm:text-sm truncate ${
                        conv.unreadCount > 0 ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                      }`}
                    >
                      {conv.patientName}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0 font-medium">
                      {conv.lastMessage.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    {getMessageTypeIcon(conv.lastMessage.type)}
                    <span
                      className={`truncate text-xs ${
                        conv.unreadCount > 0
                          ? 'text-slate-900 font-semibold'
                          : 'text-slate-500'
                      }`}
                    >
                      {conv.lastMessage.sender === 'doctor' && 'You: '}
                      {conv.lastMessage.text}
                    </span>
                  </div>

                  {/* Badges / Quick Actions Row */}
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        {conv.patientId}
                      </span>
                      {conv.isPinned && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#5C24FF] bg-purple-100/70 px-1.5 py-0.5 rounded-md">
                          <Pin className="w-2.5 h-2.5 fill-[#5C24FF]" />
                          Pinned
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Hover action buttons */}
                      <button
                        onClick={(e) => onTogglePin(conv.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md text-slate-400 hover:text-[#5C24FF] transition-opacity"
                        title={conv.isPinned ? 'Unpin' : 'Pin conversation'}
                      >
                        <Pin className="w-3 h-3" />
                      </button>

                      <button
                        onClick={(e) => onToggleArchive(conv.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md text-slate-400 hover:text-amber-600 transition-opacity"
                        title={conv.isArchived ? 'Unarchive' : 'Archive conversation'}
                      >
                        <Archive className="w-3 h-3" />
                      </button>

                      {conv.unreadCount > 0 ? (
                        <>
                          <button
                            onClick={(e) => onMarkAsRead(conv.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md text-slate-400 hover:text-emerald-600 transition-opacity"
                            title="Mark as read"
                          >
                            <CheckCheck className="w-3 h-3" />
                          </button>
                          <span className="w-5 h-5 rounded-full bg-[#5C24FF] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                            {conv.unreadCount}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
