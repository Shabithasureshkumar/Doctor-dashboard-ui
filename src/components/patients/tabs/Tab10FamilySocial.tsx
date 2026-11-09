import React, { useState } from 'react';
import {
  Users,
  Edit2,
  Heart,
  Activity,
  Phone,
  UserCheck,
  Moon,
  Briefcase,
  Home,
  X,
} from 'lucide-react';
import { FamilyHistoryMember, SocialHistoryData } from '../../../types/clinical';
import {
  MOCK_FAMILY_HISTORY,
  MOCK_SOCIAL_HISTORY,
} from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab10FamilySocialProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab10FamilySocial: React.FC<Tab10FamilySocialProps> = ({
  patient,
  onToast,
}) => {
  const [family] = useState<FamilyHistoryMember[]>(MOCK_FAMILY_HISTORY);
  const [social, setSocial] = useState<SocialHistoryData>(MOCK_SOCIAL_HISTORY);

  // Edit Modals
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [smoking, setSmoking] = useState(social.smokingStatus);
  const [alcohol, setAlcohol] = useState(social.alcoholConsumption);
  const [exercise, setExercise] = useState(social.physicalActivity);
  const [diet, setDiet] = useState(social.dietHabits);
  const [sleep, setSleep] = useState(social.sleepPattern);
  const [occupation, setOccupation] = useState(social.occupation);

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setSocial({
      ...social,
      smokingStatus: smoking,
      alcoholConsumption: alcohol,
      physicalActivity: exercise,
      dietHabits: diet,
      sleepPattern: sleep,
      occupation,
    });
    setIsEditOpen(false);
    onToast('Social determinants of health updated.');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Family Pedigree & Social Determinants (SDOH)
              </h3>
              <p className="text-xs text-slate-500">
                Multigenerational familial disease patterns & lifestyle factors for {patient.name}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 self-start md:self-auto"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Social History</span>
        </button>
      </div>

      {/* Two Columns: Family History Pedigree vs Social Determinants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Multigenerational Family Medical History */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#5C24FF]" />
              <h4 className="font-sora font-bold text-base text-slate-900">
                Familial Inheritance & Conditions
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              4 Pedigree Nodes Logged
            </span>
          </div>

          <div className="space-y-3">
            {family.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-sora font-bold text-sm text-slate-900">{item.relation}</span>
                    <span className="text-slate-400">({item.ageOrDOD})</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Living' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-slate-700 space-y-0.5">
                  {item.conditions.map((cond, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#5C24FF] font-bold">•</span>
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 text-slate-700 leading-relaxed text-[11px]">
            <strong>Clinical Genetic Note:</strong> First-degree maternal Type 2 diabetes confers moderate metabolic predisposition; monitored via fasting CMP and annual HbA1c. No hereditary early-onset breast/ovarian cancer or Lynch syndrome reported.
          </div>
        </div>

        {/* Right Column: Social Determinants of Health & Emergency Contacts */}
        <div className="space-y-4 text-xs">
          {/* Social History Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#5C24FF]" />
                <h4 className="font-sora font-bold text-base text-slate-900">
                  Lifestyle & Social Determinants (SDOH)
                </h4>
              </div>
              <button
                onClick={() => setIsEditOpen(true)}
                className="text-xs text-[#5C24FF] font-semibold hover:underline"
              >
                Edit →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Smoking Status</span>
                <span className="font-semibold text-emerald-700 block">{social.smokingStatus}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Alcohol Intake</span>
                <span className="font-semibold text-slate-800 block">{social.alcoholConsumption}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Physical Activity</span>
                <span className="font-semibold text-slate-800 block">{social.physicalActivity}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Dietary Habits</span>
                <span className="font-semibold text-slate-800 block">{social.dietHabits}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#5C24FF]" /> Sleep Pattern:
                </span>
                <span className="font-semibold text-slate-800">{social.sleepPattern}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#5C24FF]" /> Occupation:
                </span>
                <span className="font-semibold text-slate-800">{social.occupation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#5C24FF]" /> Living Situation:
                </span>
                <span className="font-semibold text-slate-800">{social.livingSituation}</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact & Caregiver Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#5C24FF]" />
                <h4 className="font-sora font-bold text-sm text-slate-900">
                  Designated Emergency Contact & Caregiver
                </h4>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                Primary Authorized
              </span>
            </div>

            <div className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{social.emergencyContact.name}</span>
                <span className="text-purple-700 font-semibold">{social.emergencyContact.relationship}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-[#5C24FF]" />
                <span className="font-mono">{social.emergencyContact.phone}</span>
              </div>
              <p className="text-slate-500 text-[11px] pt-1 border-t border-purple-100/60">
                {social.emergencyContact.caregiverDetails}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Social History Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Edit Social Determinants</h4>
                <p className="text-slate-500">Update lifestyle and habits data</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSocial} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Smoking History</label>
                <input
                  type="text"
                  value={smoking}
                  onChange={(e) => setSmoking(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alcohol Consumption</label>
                <input
                  type="text"
                  value={alcohol}
                  onChange={(e) => setAlcohol(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Physical Activity</label>
                <input
                  type="text"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Diet Habits</label>
                <input
                  type="text"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sleep Pattern</label>
                <input
                  type="text"
                  value={sleep}
                  onChange={(e) => setSleep(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-semibold rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
