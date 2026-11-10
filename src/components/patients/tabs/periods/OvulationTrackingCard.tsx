import React from 'react';
import { Heart, Calendar, Target, Thermometer, Droplet, FlaskConical, HeartHandshake, Compass } from 'lucide-react';

export const OvulationTrackingCard: React.FC = () => {
  const items = [
    {
      label: 'Predicted Ovulation Date',
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
      label: 'Basal Body Temperature (BBT)',
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
      label: 'Intercourse Tracking',
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
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
          </div>
          <h4 className="font-sora font-bold text-slate-900 text-sm">
            Ovulation &amp; Fertility Tracking
          </h4>
        </div>

        <div className="space-y-2.5 pt-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0 text-xs"
            >
              <div className="flex items-center gap-2 text-slate-600">
                <item.icon className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">{item.label}</span>
              </div>

              {item.isBadge ? (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${item.badgeColor}`}
                >
                  {item.value}
                </span>
              ) : (
                <span className="font-semibold text-slate-900">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
