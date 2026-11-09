import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Building2,
  AlertTriangle,
  RotateCw,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { ClaimStatus, InsuranceClaim } from '../../types/billing';

interface BillingClaimsTabProps {
  claims: InsuranceClaim[];
  onOpenSubmitClaim: () => void;
  onResubmitClaim: (claim: InsuranceClaim) => void;
  onViewClaimDetails: (claim: InsuranceClaim) => void;
}

export const BillingClaimsTab: React.FC<BillingClaimsTabProps> = ({
  claims,
  onOpenSubmitClaim,
  onResubmitClaim,
  onViewClaimDetails,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | ClaimStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCounts = useMemo(() => {
    return {
      All: claims.length,
      Submitted: claims.filter((c) => c.status === 'Submitted').length,
      'Clearinghouse Review': claims.filter((c) => c.status === 'Clearinghouse Review').length,
      Approved: claims.filter((c) => c.status === 'Approved').length,
      'Action Required': claims.filter((c) => c.status === 'Action Required').length,
      Denied: claims.filter((c) => c.status === 'Denied').length,
    };
  }, [claims]);

  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.claimNumber.toLowerCase().includes(q) ||
        c.patientName.toLowerCase().includes(q) ||
        c.insurancePayer.toLowerCase().includes(q) ||
        c.policyNumber.toLowerCase().includes(q) ||
        c.icd10Diagnosis.toLowerCase().includes(q)
      );
    });
  }, [claims, statusFilter, searchQuery]);

  return (
    <div className="w-full flex-1 flex flex-col space-y-5 animate-in fade-in duration-200">
      {/* 1. Filter Bar & Actions */}
      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex-shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(
              [
                'All',
                'Submitted',
                'Clearinghouse Review',
                'Approved',
                'Action Required',
              ] as const
            ).map((filter) => {
              const isActive = statusFilter === filter;
              const count = filterCounts[filter];
              return (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  <span>{filter}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Submit Claim */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search claim #, carrier, policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={onOpenSubmitClaim}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Claim</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Claims Cards / Table */}
      <div className="w-full flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="w-full flex-1 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[11px] font-inter">
              <tr>
                <th className="py-3 px-4">Claim # & Date</th>
                <th className="py-3 px-3">Insurance Payer</th>
                <th className="py-3 px-3">Patient & Policy</th>
                <th className="py-3 px-3 hidden md:table-cell">Diagnosis / CPT</th>
                <th className="py-3 px-3">Billed / Allowed</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.map((claim) => {
                const isActionNeeded = claim.status === 'Action Required';
                return (
                  <tr
                    key={claim.id}
                    onClick={() => onViewClaimDetails(claim)}
                    className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                        {claim.claimNumber}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        DOS: {claim.dateOfService}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {claim.insurancePayer}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {claim.payerId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {claim.patientName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {claim.policyNumber}
                      </div>
                    </td>

                    <td className="py-4 px-3 hidden md:table-cell max-w-xs">
                      <div className="text-slate-800 text-xs truncate font-medium">
                        {claim.icd10Diagnosis}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {claim.cptCodes.map((cpt) => (
                          <span
                            key={cpt}
                            className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono font-medium"
                          >
                            {cpt}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="font-sora font-bold text-slate-900 text-xs sm:text-sm">
                        ${claim.billedAmount.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        Allowed: ${claim.allowedAmount.toFixed(2)}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            claim.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : claim.status === 'Clearinghouse Review'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : claim.status === 'Submitted'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {claim.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                          {claim.status === 'Clearinghouse Review' && <Clock className="w-3 h-3" />}
                          {claim.status === 'Action Required' && <AlertTriangle className="w-3 h-3" />}
                          <span>{claim.status}</span>
                        </span>
                        {claim.denialReason && (
                          <p className="text-[10px] text-rose-600 mt-1 max-w-[180px] line-clamp-1">
                            {claim.denialReason}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isActionNeeded && (
                          <button
                            onClick={() => onResubmitClaim(claim)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition-colors"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>Resubmit</span>
                          </button>
                        )}
                        <button
                          onClick={() => onViewClaimDetails(claim)}
                          className="p-1.5 hover:bg-purple-100 text-[#5C24FF] rounded-lg transition-colors"
                          title="View CMS-1500 Details"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
