import React from 'react';
import { Sparkles, BarChart2, Droplet, Calendar, Lightbulb } from 'lucide-react';

export const CycleInsightsCard: React.FC = () => {
  const insights = [
    {
      id: 'pattern',
      title: 'Cycle Pattern',
      subtitle: 'Regular cycles detected',
      description: 'Cycle length has been consistent for the last 6 cycles.',
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
      title: 'Next Period Prediction',
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
      description: 'Continued tracking will improve prediction accuracy.',
      icon: Lightbulb,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      borderColor: 'border-slate-100 hover:border-amber-200',
    },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
          <div className="w-7 h-7 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-sora font-bold text-slate-900 text-sm">Cycle Insights</h4>
            <span className="text-[11px] text-slate-400">Clinical AI pattern detection</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border ${item.borderColor} bg-white transition-all flex items-start gap-3`}
            >
              <div
                className={`w-8 h-8 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <item.icon className="w-4 h-4" />
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">{item.title}</span>
                  <span className="text-xs font-bold text-slate-900 truncate">{item.subtitle}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
