import React from 'react';
import { MessageSquare } from 'lucide-react';
import { MESSAGES_DATA } from '../../mockData';
import { Avatar } from '../common/Avatar';

interface MessagesCardProps {
  onOpenInbox: () => void;
  onSelectMessage: (senderName: string, content: string) => void;
}

export const MessagesCard: React.FC<MessagesCardProps> = ({
  onOpenInbox,
  onSelectMessage,
}) => {
  const roleBadgeStyles = {
    PATIENT: 'bg-purple-100 text-[#6E56CF]',
    STAFF: 'bg-blue-100 text-blue-600',
    CARDIO: 'bg-pink-100 text-pink-600',
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-slate-400" />
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Messages
          </h3>
          <span className="bg-purple-100 text-[#6E56CF] text-[11px] font-sora font-bold px-2 py-0.5 rounded-full">
            2 Unread
          </span>
        </div>
        <button
          onClick={onOpenInbox}
          className="font-sora text-xs sm:text-sm font-semibold text-[#6E56CF] hover:text-[#5E45BE] transition-colors inline-flex items-center px-1 -mr-1 min-h-[36px] sm:min-h-0 sm:px-0 sm:mr-0"
        >
          Open inbox
        </button>
      </div>

      {/* Message List */}
      <div className="flex flex-col justify-around gap-2.5 flex-1">
        {MESSAGES_DATA.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onSelectMessage(msg.senderName, msg.content)}
            className="flex items-center justify-between gap-2.5 p-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors cursor-pointer group"
          >
            {/* Avatar & Message Content */}
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={msg.avatarUrl}
                alt={msg.senderName}
                initials={msg.senderName.split(' ').map((n) => n[0]).join('')}
                size="md"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-sora font-bold text-xs sm:text-sm text-slate-900 whitespace-nowrap">
                    {msg.senderName}
                  </span>
                  <span
                    className={`text-[9px] font-sora font-bold px-1.5 py-0.5 rounded-md ${
                      roleBadgeStyles[msg.role]
                    }`}
                  >
                    {msg.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {msg.content}
                </p>
              </div>
            </div>

            {/* Time & Unread Indicator */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] text-slate-400">{msg.timeAgo}</span>
              {msg.isUnread && (
                <span className="w-2 h-2 rounded-full bg-[#6E56CF]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
