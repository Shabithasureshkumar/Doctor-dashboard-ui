import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Clock,
  Shield,
  Edit2,
  Stethoscope,
  Video,
} from 'lucide-react';
import { MedicalService } from '../../types/billing';

interface BillingServicesTabProps {
  services: MedicalService[];
  onOpenAddService: () => void;
  onEditService: (service: MedicalService) => void;
  onToggleActive: (serviceId: string) => void;
}

export const BillingServicesTab: React.FC<BillingServicesTabProps> = ({
  services,
  onOpenAddService,
  onEditService,
  onToggleActive,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Telehealth', 'In-Clinic', 'Diagnostics', 'Procedures', 'Specialist'];

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      if (selectedCategory !== 'All' && srv.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        srv.title.toLowerCase().includes(q) ||
        srv.cptCode.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q)
      );
    });
  }, [services, selectedCategory, searchQuery]);

  const activeCount = useMemo(() => services.filter((s) => s.isActive).length, [services]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Summary Cards Strip (matches top stat row in Screen 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Billable Services
            </span>
            <div className="font-sora font-bold text-2xl text-slate-900 mt-0.5">
              {activeCount} of {services.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">Available for booking</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Telehealth Fee
            </span>
            <div className="font-sora font-bold text-2xl text-slate-900 mt-0.5">
              $140.00
            </div>
            <span className="text-[11px] text-slate-400">15-30 min consultations</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Insurance Compatibility
            </span>
            <div className="font-sora font-bold text-2xl text-slate-900 mt-0.5">
              14 Payers
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">Direct EHR clearinghouse sync</span>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Add Service Action */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {cat === 'All' ? 'All Services' : cat}
                </button>
              );
            })}
          </div>

          {/* Search + Add Service */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search service title, CPT code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={onOpenAddService}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
              service.isActive ? 'border-slate-100' : 'border-slate-200 bg-slate-50/50 opacity-75'
            }`}
          >
            <div>
              {/* Header: CPT & Category & Active Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold bg-purple-100 text-[#5C24FF] px-2.5 py-1 rounded-lg">
                    {service.cptCode}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {service.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {service.durationMinutes} mins
                  </span>
                </div>

                {/* Active Switch Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-500">
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => onToggleActive(service.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      service.isActive ? 'bg-[#5C24FF]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        service.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="font-sora font-bold text-base text-slate-900 mt-3">
                {service.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Bottom: Pricing & Edit */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Self-Pay Fee
                  </span>
                  <span className="font-sora font-bold text-lg text-slate-900">
                    ${service.selfPayFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Avg Ins. Copay
                  </span>
                  <span className="font-sora font-semibold text-sm text-emerald-600">
                    ${service.copayEstimate.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onEditService(service)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#5C24FF] rounded-xl text-xs font-semibold transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
