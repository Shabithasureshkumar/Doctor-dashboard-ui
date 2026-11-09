import React, { useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  CheckCircle2,
  Calendar,
  Users,
  Target,
  Sparkles,
  X,
} from 'lucide-react';
import { CarePlanItem } from '../../../types/clinical';
import { MOCK_CARE_PLANS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab07CarePlansProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab07CarePlans: React.FC<Tab07CarePlansProps> = ({ patient, onToast }) => {
  const [carePlans, setCarePlans] = useState<CarePlanItem[]>(MOCK_CARE_PLANS);
  const [activeTab, setActiveTab] = useState<'Active' | 'Completed'>('Active');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [progressPlan, setProgressPlan] = useState<CarePlanItem | null>(null);
  const [newProgressVal, setNewProgressVal] = useState(50);

  // New Plan form state
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('2027-01-01');

  const filteredPlans = carePlans.filter((p) =>
    activeTab === 'Active' ? p.status === 'Active' : p.status === 'Completed'
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: CarePlanItem = {
      id: `cp-${Date.now()}`,
      planName,
      description,
      assignedDoctor: 'Dr. Elena Vance, MD',
      startDate: 'Today',
      targetDate,
      progress: 10,
      status: 'Active',
      goals: ['Primary diagnostic milestone tracking', 'Routine adherence monitoring'],
      lifestyleRecommendations: ['Balanced nutrition and regular activity'],
      reviewDate: 'In 30 days',
      careTeam: ['Dr. Elena Vance (Lead MD)', 'Nurse Priya (Care Coordinator)'],
    };
    setCarePlans([newPlan, ...carePlans]);
    setIsCreateOpen(false);
    setPlanName('');
    setDescription('');
    onToast(`Care Plan "${newPlan.planName}" created and active.`);
  };

  const handleUpdateProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progressPlan) return;
    setCarePlans((prev) =>
      prev.map((p) =>
        p.id === progressPlan.id
          ? {
              ...p,
              progress: newProgressVal,
              status: newProgressVal >= 100 ? 'Completed' : 'Active',
            }
          : p
      )
    );
    onToast(`Progress for "${progressPlan.planName}" updated to ${newProgressVal}%.`);
    setProgressPlan(null);
  };

  const handleMarkComplete = (plan: CarePlanItem) => {
    setCarePlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, status: 'Completed', progress: 100 } : p))
    );
    onToast(`Care plan "${plan.planName}" marked as Completed.`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Personalized Care Plans & Recovery Pathways
              </h3>
              <p className="text-xs text-slate-500">
                Goal-oriented chronic disease management & recovery protocols for {patient.name}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Care Plan</span>
        </button>
      </div>

      {/* Sub-tabs: Active vs Completed */}
      <div className="flex items-center p-1 bg-slate-100 rounded-2xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('Active')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'Active'
              ? 'bg-white text-[#5C24FF] shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Plans ({carePlans.filter((p) => p.status === 'Active').length})
        </button>
        <button
          onClick={() => setActiveTab('Completed')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'Completed'
              ? 'bg-white text-[#5C24FF] shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Completed Plans ({carePlans.filter((p) => p.status === 'Completed').length})
        </button>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 hover:border-purple-200 transition-all text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-sora font-bold text-base text-slate-900">
                    {plan.planName}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      plan.status === 'Active'
                        ? 'bg-purple-100 text-[#5C24FF]'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {plan.progress}% Complete
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <button
                  onClick={() => {
                    setProgressPlan(plan);
                    setNewProgressVal(plan.progress);
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Update Progress
                </button>
                {plan.status === 'Active' && (
                  <button
                    onClick={() => handleMarkComplete(plan)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Complete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-500">Progress Towards Clinical Milestones</span>
                <span className="text-[#5C24FF] font-bold">{plan.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${plan.progress}%` }}
                />
              </div>
            </div>

            {/* Goals & Lifestyle Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block flex items-center gap-1">
                  <Target className="w-3 h-3 text-[#5C24FF]" /> Clinical Treatment Goals
                </span>
                <ul className="space-y-1 text-slate-700">
                  {plan.goals.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#5C24FF] font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-purple-50/40 rounded-2xl border border-purple-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#5C24FF] block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#5C24FF]" /> Lifestyle & Nutrition Directives
                </span>
                <ul className="space-y-1 text-slate-700">
                  {plan.lifestyleRecommendations.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#5C24FF] font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Next Review: <strong>{plan.reviewDate}</strong> • Target: <strong>{plan.targetDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Team: {plan.careTeam.join(' • ')}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredPlans.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
            No care plans found in the {activeTab} list.
          </div>
        )}
      </div>

      {/* Create Care Plan Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Create Care Plan</h4>
                <p className="text-slate-500">Formulate structured treatment pathway</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Type 2 Diabetes Glycemic Control Plan"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Clinical goals and management methodology..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Completion Date</label>
                <input
                  type="date"
                  required
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Authorize Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Progress Modal */}
      {progressPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Update Progress</h4>
                <p className="text-slate-500">{progressPlan.planName}</p>
              </div>
              <button
                onClick={() => setProgressPlan(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateProgressSubmit} className="p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-slate-700">Completion Level:</span>
                  <span className="text-[#5C24FF]">{newProgressVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProgressVal}
                  onChange={(e) => setNewProgressVal(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProgressPlan(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-semibold rounded-xl shadow-md"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
