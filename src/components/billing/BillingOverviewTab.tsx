import React from 'react';
import {
  TrendingUp,
  Clock,
  ShieldCheck,
  Wallet,
  ArrowRight,
  AlertTriangle,
  FileText,
  CreditCard,
  Building2,
  ExternalLink,
  Send,
} from 'lucide-react';
import { BillingKPIs, InvoiceItem } from '../../types/billing';

interface BillingOverviewTabProps {
  kpis: BillingKPIs;
  invoices: InvoiceItem[];
  onNavigateTab: (tab: 'invoices' | 'payouts' | 'claims' | 'services') => void;
  onOpenCreateInvoice: () => void;
  onOpenInstantPayout: () => void;
  onSelectInvoice: (invoice: InvoiceItem) => void;
  onSendReminder: (invoice: InvoiceItem) => void;
}

export const BillingOverviewTab: React.FC<BillingOverviewTabProps> = ({
  kpis,
  invoices,
  onNavigateTab,
  onOpenCreateInvoice,
  onOpenInstantPayout,
  onSelectInvoice,
  onSendReminder,
}) => {
  const recentInvoices = invoices.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Action Required Banner (matches top warning banner in reference Screen 1) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-sora font-semibold text-sm sm:text-base text-amber-950">
              Tax Verification & Payout Information Required
            </h4>
            <p className="text-xs sm:text-sm text-amber-800/90 mt-0.5">
              Confirm your 2026 NPI provider credentials and IRS Form W-9 to avoid interruptions in your bi-weekly automated bank deposits.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTab('payouts')}
            className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-sora font-medium text-xs sm:text-sm rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            Verify Payout Bank →
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards (matches the 4 top metrics in reference Screen 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-inter">
              Total Gross Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-sora font-bold text-2xl sm:text-3xl text-slate-900">
              ${kpis.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +{kpis.revenueGrowthPercent}%
            </span>
            <span className="text-xs text-slate-400">vs last 30 days</span>
          </div>
        </div>

        {/* Card 2: Pending Invoices */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-inter">
              Pending Collections
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-sora font-bold text-2xl sm:text-3xl text-slate-900">
              ${kpis.pendingInvoicesAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              {kpis.pendingInvoicesCount} invoices pending
            </span>
            <button
              onClick={() => onNavigateTab('invoices')}
              className="text-xs text-[#5C24FF] hover:underline font-medium"
            >
              Review →
            </button>
          </div>
        </div>

        {/* Card 3: Insurance Claims */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-inter">
              Insurance Claims
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-sora font-bold text-2xl sm:text-3xl text-slate-900">
              ${kpis.insuranceClaimsAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {kpis.claimsApprovalRate}% accepted
            </span>
            <span className="text-xs text-slate-400">clean rate</span>
          </div>
        </div>

        {/* Card 4: Available for Payout */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-inter">
              Available Balance
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-sora font-bold text-2xl sm:text-3xl text-slate-900">
              ${kpis.availablePayoutBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">Auto: {kpis.nextPayoutDate}</span>
            <button
              onClick={onOpenInstantPayout}
              className="text-xs bg-[#5C24FF] hover:bg-[#4b1bd4] text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              Payout
            </button>
          </div>
        </div>
      </div>

      {/* 3. Recent Invoices Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Recent Billing Invoices
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest patient claims, self-pay consultations, and remote procedure billings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateInvoice}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora text-xs font-semibold rounded-xl shadow-sm hover:opacity-95 transition-all"
            >
              + Create Invoice
            </button>
            <button
              onClick={() => onNavigateTab('invoices')}
              className="flex items-center gap-1 text-xs font-semibold text-[#5C24FF] hover:text-[#4b1bd4] transition-colors"
            >
              <span>View All ({invoices.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Invoices List Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-slate-400 font-inter text-xs border-b border-slate-100 uppercase tracking-wider">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Patient</th>
                <th className="py-3 px-3 hidden md:table-cell">Service Rendered</th>
                <th className="py-3 px-3 hidden lg:table-cell">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-purple-50/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectInvoice(inv)}
                >
                  <td className="py-3.5 px-3 font-semibold text-slate-800 font-mono text-xs">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={inv.patientAvatar}
                        alt={inv.patientName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                          {inv.patientName}
                        </div>
                        <div className="text-[11px] text-slate-400 hidden sm:block">
                          {inv.patientEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 hidden md:table-cell">
                    <span className="text-slate-700 text-xs font-medium">{inv.serviceTitle}</span>
                    <span className="ml-1.5 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      CPT {inv.cptCode}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-500 hidden lg:table-cell">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 px-3 font-sora font-bold text-slate-900 text-xs sm:text-sm">
                    ${inv.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : inv.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : inv.status === 'Overdue'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {inv.status === 'Overdue' && (
                        <button
                          onClick={() => onSendReminder(inv)}
                          className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                          title="Send Payment Reminder"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onSelectInvoice(inv)}
                        className="p-1.5 hover:bg-purple-100 text-[#5C24FF] rounded-lg transition-colors"
                        title="View Full Invoice"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bottom Analytics & Payout Destination Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Revenue by Payment Channel */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
              Revenue Breakdown by Channel
            </h4>
            <span className="text-xs text-slate-400">Current Month</span>
          </div>

          <div className="mt-4 space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Insurance Clearinghouse Reimbursements</span>
                <span className="font-bold text-slate-900">$31,050.00 (64%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Telehealth & Card Self-Pay (Stripe)</span>
                <span className="font-bold text-slate-900">$12,615.00 (26%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Patient Copays & Direct ACH</span>
                <span className="font-bold text-slate-900">$4,855.00 (10%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Connected Payout Bank Details */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
                Primary Payout Account
              </h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ● Verified ACH
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sora font-bold text-sm text-slate-900">
                  JPMorgan Chase Bank, N.A.
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Checking account •••• 4821
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Routing: 021000021 • Automated bi-weekly payout
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('payouts')}
                className="text-xs text-[#5C24FF] hover:underline font-semibold flex items-center gap-1"
              >
                Manage <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Next automatic transfer: <span className="font-semibold text-slate-800">{kpis.nextPayoutDate}</span>
            </div>
            <button
              onClick={onOpenInstantPayout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#5C24FF] text-xs font-semibold transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Instant Payout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
