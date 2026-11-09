import React from 'react';
import {
  Dna,
  ShieldAlert,
  HeartPulse,
  Activity,
  Pill,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { GeneticsAndRiskData } from '../../../types/clinical';
import { MOCK_GENETICS_AND_RISK } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab11GeneticsRiskProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab11GeneticsRisk: React.FC<Tab11GeneticsRiskProps> = ({ patient, onToast }) => {
  const genetics: GeneticsAndRiskData = MOCK_GENETICS_AND_RISK;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Clinical Risk Distinction Disclaimer */}
      <div className="p-3.5 bg-purple-50/90 border border-purple-200 rounded-2xl flex items-start gap-3 text-xs text-purple-900 shadow-sm">
        <ShieldAlert className="w-4 h-4 text-[#5C24FF] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Genomic Risk Model Protocol:</span> Estimated polygenic and multivariable risk scores are statistical epidemiological probabilities based on cohort models. They do not represent deterministic clinical diagnoses. Pharmacogenomic interactions should be verified with clinical context prior to regimen modifications.
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Genetics, Pharmacogenomics & Lifetime Risk Stratification
              </h3>
              <p className="text-xs text-slate-500">
                Molecular diagnostics & lifetime risk stratification profile for {patient.name}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToast('Downloading Complete Genomic & Risk Stratification Dossier...')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Genetic Report</span>
        </button>
      </div>

      {/* 3 Core Estimated Risk Stratification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cardiovascular Risk */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cardiovascular 10-Yr Risk</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-sora font-extrabold text-2xl text-emerald-600">
              {genetics.cardiovascularRisk.scorePercentage}%
              <span className="text-xs font-normal text-slate-400 ml-1">({genetics.cardiovascularRisk.category} Risk)</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {genetics.cardiovascularRisk.interpretation}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            Model: {genetics.cardiovascularRisk.modelUsed}
          </div>
        </div>

        {/* Type 2 Diabetes Risk */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Type 2 Diabetes Risk Index</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-sora font-extrabold text-2xl text-amber-600">
              {genetics.diabetesRisk.category}
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {genetics.diabetesRisk.interpretation}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            Risk Factors: {genetics.diabetesRisk.factors.join(', ')}
          </div>
        </div>

        {/* Hereditary Cancer Risk */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Hereditary Cancer Panel</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-sora font-extrabold text-xl text-slate-900">
              {genetics.hereditaryCancerRisk.status}
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {genetics.hereditaryCancerRisk.interpretation}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            Genes Tested: {genetics.hereditaryCancerRisk.genesTested}
          </div>
        </div>
      </div>

      {/* Pharmacogenomics (PGx) Medication Response Panel */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-[#5C24FF]" />
            <h4 className="font-sora font-bold text-base text-slate-900">
              Pharmacogenomic (PGx) Medication Response Insights
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
            2 Actionable Enzymes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {genetics.pharmacogenomics.map((pgx, i) => (
            <div
              key={i}
              className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 hover:border-purple-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-sora font-bold text-sm text-slate-900">{pgx.gene}</span>
                <span className="text-[10px] bg-purple-100 text-[#5C24FF] font-bold px-2 py-0.5 rounded-full">
                  {pgx.phenotype}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Affected Drug Classes:</span>
                <span className="font-semibold text-slate-800">{pgx.affectedDrugs}</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                <strong>Clinical Recommendation:</strong> {pgx.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Known Genetic Variants & Genetic Counselling Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        {/* Identified Variants */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <h4 className="font-sora font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Identified Genetic Variants & Significance
          </h4>
          <div className="space-y-2.5">
            {genetics.knownVariants.map((v, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{v.gene} • {v.variant}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-purple-50 text-[#5C24FF] rounded-md">
                    {v.significance}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{v.clinicalImplication}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Genetic Counselling Notes */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-3">
          <h4 className="font-sora font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Genetic Counselling Summary
          </h4>
          <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 text-slate-800 space-y-2 leading-relaxed">
            <span className="font-bold text-[#5C24FF] block">Session Documentation:</span>
            <p>{genetics.counsellingNotes}</p>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-purple-200/50">
              Genetic Counsellor: Dr. Maya Ramanathan, MS, CGC • Verified on Aug 20, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
