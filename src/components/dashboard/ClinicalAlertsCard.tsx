import React from 'react';
import { AlertCircle, Activity, FlaskConical, PillBottle, ShieldAlert } from 'lucide-react';
import { ClinicalAlert } from '../../types';

interface ClinicalAlertsCardProps {
  alerts: ClinicalAlert[];
  onOpenChart: (patientName: string) => void;
  onDismissAlert: (alertId: string) => void;
  onSeeAll: () => void;
}

const alertStyles = {
  danger: {
    bg: 'bg-[#FFF4F4]',
    border: 'border-rose-100',
    tagColor: 'text-rose-500',
    icon: FlaskConical,
  },
  warning: {
    bg: 'bg-[#FFF9EE]',
    border: 'border-amber-100',
    tagColor: 'text-amber-600',
    icon: Activity,
  },
  caution: {
    bg: 'bg-[#FFFCF0]',
    border: 'border-yellow-100',
    tagColor: 'text-yellow-600',
    icon: PillBottle,
  },
  info: {
    bg: 'bg-[#F8F5FF]',
    border: 'border-purple-100',
    tagColor: 'text-[#5C24FF]',
    icon: ShieldAlert,
  },
};

export const ClinicalAlertsCard: React.FC<ClinicalAlertsCardProps> = ({
  alerts,
  onOpenChart,
  onDismissAlert,
  onSeeAll,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5 text-slate-800">
          <AlertCircle className="w-5 h-5 text-slate-400" />
          <h3 className="font-sora font-bold text-base sm:text-lg">Clinical Alerts</h3>
        </div>
        <button
          onClick={onSeeAll}
          className="font-sora text-xs sm:text-sm font-semibold text-[#5C24FF] hover:text-[#4A15E8] transition-colors inline-flex items-center px-1 -mr-1 min-h-[36px] sm:min-h-0 sm:px-0 sm:mr-0"
        >
          See all
        </button>
      </div>

      {/* Alerts Grid — 2 columns */}
      {alerts.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-sm">No active alerts</div>
      ) : (
        <div className="grid grid-cols-2 auto-rows-fr gap-2.5 flex-1">
          {alerts.map((alert) => {
            const style = alertStyles[alert.type] || alertStyles.info;
            const Icon = style.icon;
            return (
              <div
                key={alert.id}
                className={`${style.bg} border ${style.border} rounded-2xl p-3 flex flex-col transition-all hover:shadow-xs`}
              >
                {/* Patient tag + corner icon */}
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <span
                    className={`font-sora font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider leading-tight ${style.tagColor}`}
                  >
                    {alert.patientName}
                  </span>
                  <Icon className={`w-3 h-3 flex-shrink-0 mt-px opacity-70 ${style.tagColor}`} />
                </div>

                <h5 className="font-sora font-bold text-[12px] sm:text-[13px] text-slate-900 leading-snug mb-1">
                  {alert.category}
                </h5>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mb-2.5 flex-1">
                  {alert.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenChart(alert.patientName)}
                    className="bg-[#5C24FF] hover:bg-[#4A15E8] text-white text-[10px] sm:text-[11px] font-sora font-semibold px-2.5 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg transition-all active:scale-95 shadow-xs whitespace-nowrap"
                  >
                    Open Chart
                  </button>
                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="text-[10px] sm:text-[11px] text-slate-400 hover:text-slate-600 font-medium px-1 py-1.5 min-h-[36px] sm:min-h-0 rounded transition-colors whitespace-nowrap"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
