import React from 'react';
import { Sparkles, BarChart2, Droplet, Calendar, Lightbulb } from 'lucide-react';

export const CycleInsightsCard: React.FC = () => {
  const insights = [
    {
      id: 'pattern',
      title: 'Cycle Pattern',
      subtitle: 'Regular cycles detected',
      description: 'Consistent for the last 6 cycles.',
      icon: BarChart2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderColor: 'border-slate-100 hover:border-emerald-200',
    },
    {
      id: 'duration',
      title: 'Period Duration',
      subtitle: 'Average 5 days',
      description: 'No significant changes detected.',
      icon: Droplet,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      borderColor: 'border-slate-100 hover:border-rose-200',
    },
    {
      id: 'prediction',
      title: 'Next Prediction',
      subtitle: 'Expected on Jun 29, 2026',
      description: 'Based on recent cycle history.',
      icon: Calendar,
      iconColor: 'text-[#7C3AED]',
      iconBg: 'bg-purple-50',
      borderColor: 'border-slate-100 hover:border-purple-200',
    },
    {
      id: 'ai',
      title: 'AI Insight',
      subtitle: 'No unusual patterns',
      description: 'Tracking improves prediction accuracy.',
      icon: Lightbulb,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      borderColor: 'border-slate-100 hover:border-amber-200',
    },
  ];

  return (
    <div className="bg-white rounded-[22px] p-3.5 sm:p-4 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] h-[272px] flex flex-col justify-between">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-50 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3 h-3" />
        </div>
        <div>
          <h4 className="font-sora font-bold text-slate-900 text-xs sm:text-sm">Cycle Insights</h4>
          <span className="text-[9px] text-slate-400">Clinical AI pattern detection</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-1.5 space-y-1.5 min-h-0">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`p-2 rounded-xl border ${item.borderColor} bg-white transition-all flex items-center gap-2 flex-1 min-h-0`}
          >
            <div
              className={`w-6 h-6 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
            >
              <item.icon className="w-3 h-3" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-semibold text-slate-400">{item.title}</span>
                <span className="text-[10px] font-bold text-slate-800 truncate">{item.subtitle}</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-tight truncate">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
