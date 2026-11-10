import React from 'react';
import {
  Video,
  Pill,
  Activity,
  Calendar,
  FlaskConical,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { IntegrationItem } from '../../../types/settings';

interface IntegrationsSectionProps {
  integrations: IntegrationItem[];
  onChange: (updated: IntegrationItem[]) => void;
  onSave: () => void;
  onToast: (msg: string) => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations,
  onChange,
  onSave,
  onToast,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5 text-[#5C24FF]" />;
      case 'Pill':
        return <Pill className="w-5 h-5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-emerald-600" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-amber-500" />;
      default:
        return <Zap className="w-5 h-5 text-[#5C24FF]" />;
    }
  };

  const handleToggleConnection = (id: string) => {
    const updated = integrations.map((item) => {
      if (item.id === id) {
        const isConn = item.status === 'Connected';
        const newStatus: IntegrationItem['status'] = isConn ? 'Ready to Connect' : 'Connected';
        onToast(`${item.name} ${isConn ? 'disconnected' : 'connected successfully'}.`);
        return {
          ...item,
          status: newStatus,
          lastSync: isConn ? 'Disconnected' : 'Sync active • Just now',
        };
      }
      return item;
    });
    onChange(updated);
  };

  const handleTestSync = (name: string) => {
    onToast(`Testing sync webhook for ${name}... 200 OK Response.`);
  };

  return (
    <div className="space-y-5">
      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Third-Party Clinical &amp; Telehealth Integrations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure FHIR APIs, Surescripts e-Rx, HL7 diagnostic labs, and enterprise telehealth gateways
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            HIPAA BAA Compliant
          </span>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((item) => {
          const isConnected = item.status === 'Connected';
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-purple-200 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <h4 className="font-sora font-bold text-sm text-slate-900">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`}
                    />
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[190px]">
                  {item.lastSync}
                </span>

                <div className="flex items-center gap-2">
                  {isConnected && (
                    <button
                      type="button"
                      onClick={() => handleTestSync(item.name)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-[#5C24FF] hover:bg-purple-50 transition-colors"
                      title="Test Health Check"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggleConnection(item.id)}
                    className={`px-3 py-1.5 rounded-xl font-sora font-semibold text-xs transition-all ${
                      isConnected
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100'
                        : 'bg-[#5C24FF] text-white hover:opacity-95 shadow-xs'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(154,106,251,0.35)] hover:opacity-95 transition-all active:scale-95"
        >
          Save Integration State
        </button>
      </div>
    </div>
  );
};
