import React from 'react';
import { Heart, Calendar, Target, Thermometer, Droplet, FlaskConical, HeartHandshake, Compass } from 'lucide-react';

export const OvulationTrackingCard: React.FC = () => {
  const items = [
    {
      label: 'Predicted Ovulation',
      value: 'Jun 15, 2026',
      icon: Calendar,
      isBadge: false,
    },
    {
      label: 'Fertile Window',
      value: 'Jun 13 – Jun 17, 2026',
      icon: Target,
      isBadge: false,
    },
    {
      label: 'Basal Temp (BBT)',
      value: 'Records available',
      icon: Thermometer,
      isBadge: true,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'Cervical Mucus',
      value: 'Logged',
      icon: Droplet,
      isBadge: true,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'LH Test',
      value: 'Not logged',
      icon: FlaskConical,
      isBadge: true,
      badgeColor: 'bg-slate-100 text-slate-500 border-slate-200',
    },
    {
      label: 'Intercourse',
      value: 'Not logged',
      icon: HeartHandshake,
      isBadge: true,
      badgeColor: 'bg-slate-100 text-slate-500 border-slate-200',
    },
    {
      label: 'Fertility Goal',
      value: '🎯 Trying to conceive',
      icon: Compass,
      isBadge: true,
      badgeColor: 'bg-purple-50 text-[#7C3AED] border-purple-100 font-bold',
    },
  ];

  return (
    <div className="bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] h-[275px] flex flex-col justify-between">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-50 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <Heart className="w-3 h-3 fill-emerald-500 text-emerald-500" />
        </div>
        <h4 className="font-sora font-bold text-slate-900 text-xs sm:text-sm">
          Ovulation &amp; Fertility
        </h4>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-1 min-h-0">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0 text-xs"
          >
            <div className="flex items-center gap-1.5 text-slate-600">
              <item.icon className="w-3 h-3 text-slate-400" />
              <span className="font-medium text-[10px]">{item.label}</span>
            </div>

            {item.isBadge ? (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${item.badgeColor}`}
              >
                {item.value}
              </span>
            ) : (
              <span className="font-semibold text-slate-900 text-[10px]">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
