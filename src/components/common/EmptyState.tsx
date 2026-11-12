import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`py-12 px-6 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#5C24FF] flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>

      <h4 className="font-sora font-bold text-sm text-slate-800 dark:text-slate-200">{title}</h4>
      {description && (
        <p className="text-xs text-slate-400 max-w-sm mt-1">{description}</p>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs shadow-sm hover:opacity-95 active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
