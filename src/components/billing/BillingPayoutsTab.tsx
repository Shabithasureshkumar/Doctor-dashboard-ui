import React from 'react';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Download,
  Target,
  Sparkles,
} from 'lucide-react';
import { BillingKPIs, PayoutRecord } from '../../types/billing';

interface BillingPayoutsTabProps {
  kpis: BillingKPIs;
  payouts: PayoutRecord[];
  onOpenInstantPayout: () => void;
  onDownloadTaxStatement: () => void;
}

export const BillingPayoutsTab: React.FC<BillingPayoutsTabProps> = ({
  kpis,
  payouts,
  onOpenInstantPayout,
  onDownloadTaxStatement,
}) => {
  const goalPercentage = Math.min(
    100,
    Math.round((kpis.monthlyGoalCurrent / kpis.monthlyGoalAmount) * 100)
  );

  return (
    <div className="w-full flex-1 flex flex-col space-y-5 animate-in fade-in duration-200">
      {/* 1. Top Section: Sleek Mednevo Clinician Card + Payout Analytics (matches Screen 5) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 flex-shrink-0">
        {/* Left: Premium Mednevo Clinician Card */}
        <div className="lg:col-span-5 2xl:col-span-4 bg-gradient-to-br from-[#8C52FF] via-[#6828FA] to-[#4A11D8] text-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_32px_rgba(104,40,250,0.35)] relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          {/* Subtle decorative glowing circles */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-2xl pointer-events-none" />

          {/* Card Top: Brand & Chip */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-base">
                M
              </div>
              <div>
                <span className="font-sora font-bold text-sm tracking-wide">Mednevo Pay</span>
                <span className="block text-[10px] text-purple-200 uppercase tracking-wider">
                  Clinician Direct Wallet
                </span>
              </div>
            </div>

            {/* Metallic Chip */}
            <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-100 border border-amber-400/60 shadow-inner flex items-center justify-center">
              <div className="w-6 h-4 border border-amber-600/30 rounded-sm" />
            </div>
          </div>

          {/* Card Center: Available Balance */}
          <div className="relative z-10 my-4">
            <span className="text-xs text-purple-200 uppercase tracking-wider font-medium">
              Available For Immediate Payout
            </span>
            <div className="font-sora font-extrabold text-3xl sm:text-4xl text-white mt-1">
              ${kpis.availablePayoutBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-purple-200/90 mt-1 flex items-center gap-1.5">
              <span>Next auto-deposit:</span>
              <strong className="text-white">{kpis.nextPayoutDate}</strong>
            </div>
          </div>

          {/* Card Bottom: Routing & Instant Payout Action */}
          <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-purple-200 font-mono">Chase Bank •••• 4821</span>
              <span className="block text-[10px] text-emerald-300 font-semibold">
                ● Auto ACH Active
              </span>
            </div>

            <button
              onClick={onOpenInstantPayout}
              className="px-4 py-2 bg-white text-[#5C24FF] hover:bg-purple-50 font-sora font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Instant Payout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Goals & Financial Progress */}
        <div className="lg:col-span-7 2xl:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#5C24FF]" />
                <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
                  Monthly Earnings Target
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#5C24FF] bg-purple-50 px-2.5 py-1 rounded-full">
                {goalPercentage}% Achieved
              </span>
            </div>

            {/* Progress Bar & Details */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-baseline text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">
                  Current Collected:{' '}
                  <strong className="font-sora text-slate-900 font-bold">
                    ${kpis.monthlyGoalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </strong>
                </span>
                <span className="text-slate-400">
                  Goal: ${kpis.monthlyGoalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${goalPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  ${(kpis.monthlyGoalAmount - kpis.monthlyGoalCurrent).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}{' '}
                  remaining to monthly target
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> On track for bonus
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                Pending Clearing
              </span>
              <div className="font-sora font-bold text-base text-slate-900 mt-0.5">
                $3,240.00
              </div>
              <span className="text-[10px] text-slate-400">Clears in 24-48 hrs</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                Payout Cadence
              </span>
              <div className="font-sora font-bold text-base text-slate-900 mt-0.5">
                Bi-Weekly
              </div>
              <span className="text-[10px] text-slate-400">Every 1st & 15th</span>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-2xl col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-[#5C24FF] uppercase">
                YTD Net Paid
              </span>
              <div className="font-sora font-bold text-base text-[#5C24FF] mt-0.5">
                $184,200.00
              </div>
              <span className="text-[10px] text-purple-700/80">314 transfers</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Payout Transfer History Table */}
      <div className="w-full flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 flex-shrink-0">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Payout & Transfer History
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated ACH direct deposits and instant bank settlements
            </p>
          </div>

          <button
            onClick={onDownloadTaxStatement}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download 1099-K Tax Statement</span>
          </button>
        </div>

        <div className="w-full flex-1 overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="text-slate-400 font-inter text-xs border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Transfer Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Destination Bank</th>
                <th className="py-3 px-3 hidden md:table-cell">Method</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.map((record) => (
                <tr key={record.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-4 px-3 font-mono font-semibold text-slate-900">
                    {record.payoutRef}
                  </td>
                  <td className="py-4 px-3 text-slate-600">{record.date}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                          {record.bankName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Checking {record.accountEnding}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 hidden md:table-cell text-xs text-slate-600">
                    {record.payoutMethod}
                  </td>
                  <td className="py-4 px-3 font-sora font-bold text-slate-900 text-xs sm:text-sm">
                    ${record.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{record.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={onDownloadTaxStatement}
                      className="text-xs text-[#5C24FF] hover:underline font-semibold"
                    >
                      ACH Confirmation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
