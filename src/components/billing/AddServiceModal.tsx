import React, { useState } from 'react';
import { X, Stethoscope, Clock } from 'lucide-react';
import { MedicalService } from '../../types/billing';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveService: (service: Omit<MedicalService, 'id'>, editId?: string) => void;
  serviceToEdit?: MedicalService | null;
}

interface ServiceFormInnerProps {
  onClose: () => void;
  onSaveService: (service: Omit<MedicalService, 'id'>, editId?: string) => void;
  serviceToEdit?: MedicalService | null;
}

const ServiceFormInner: React.FC<ServiceFormInnerProps> = ({
  onClose,
  onSaveService,
  serviceToEdit,
}) => {
  const [title, setTitle] = useState(serviceToEdit?.title || '');
  const [category, setCategory] = useState<MedicalService['category']>(
    serviceToEdit?.category || 'Telehealth'
  );
  const [cptCode, setCptCode] = useState(serviceToEdit?.cptCode || 'CPT 99213');
  const [durationMinutes, setDurationMinutes] = useState(serviceToEdit?.durationMinutes || 20);
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [selfPayFee, setSelfPayFee] = useState(serviceToEdit?.selfPayFee.toString() || '120.00');
  const [copayEstimate, setCopayEstimate] = useState(
    serviceToEdit?.copayEstimate.toString() || '25.00'
  );
  const [isActive, setIsActive] = useState(serviceToEdit ? serviceToEdit.isActive : true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveService(
      {
        title,
        category,
        cptCode,
        durationMinutes: Number(durationMinutes) || 15,
        description,
        selfPayFee: parseFloat(selfPayFee) || 100.0,
        copayEstimate: parseFloat(copayEstimate) || 20.0,
        isActive,
        insuranceCovered: true,
      },
      serviceToEdit?.id
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Service Title
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Telehealth Follow-up Consultation"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MedicalService['category'])}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
          >
            <option value="Telehealth">Telehealth</option>
            <option value="In-Clinic">In-Clinic</option>
            <option value="Diagnostics">Diagnostics</option>
            <option value="Procedures">Procedures</option>
            <option value="Specialist">Specialist</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Billing CPT Code
          </label>
          <input
            type="text"
            required
            placeholder="CPT 99214"
            value={cptCode}
            onChange={(e) => setCptCode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Duration (mins)
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min="5"
              step="5"
              required
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 15)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Self-Pay Fee ($)
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={selfPayFee}
            onChange={(e) => setSelfPayFee(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-sora font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Copay ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={copayEstimate}
            onChange={(e) => setCopayEstimate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all font-sora font-semibold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Service Description
        </label>
        <textarea
          rows={2}
          required
          placeholder="Clinical scope, requirements, or instructions..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all resize-none"
        />
      </div>

      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div>
          <span className="text-xs font-semibold text-slate-800 block">Service Availability</span>
          <span className="text-[11px] text-slate-500">Allow patients to book and be billed for this service</span>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isActive ? 'bg-[#5C24FF]' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs sm:text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-all active:scale-95"
        >
          {serviceToEdit ? 'Update Service' : 'Save Service'}
        </button>
      </div>
    </form>
  );
};

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSaveService,
  serviceToEdit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center shadow-md">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-lg text-slate-900">
                {serviceToEdit ? 'Edit Medical Service' : 'Add Billable Service'}
              </h3>
              <p className="text-xs text-slate-500">Configure consultation duration, fees and billing codes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body with fresh key whenever serviceToEdit changes */}
        <ServiceFormInner
          key={serviceToEdit?.id || 'new-service'}
          onClose={onClose}
          onSaveService={onSaveService}
          serviceToEdit={serviceToEdit}
        />
      </div>
    </div>
  );
};
