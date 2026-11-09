import React, { useState, useMemo } from 'react';
import {
  Search,
  CreditCard,
  Building,
  Smartphone,
  CheckCircle2,
  Clock,
  RotateCcw,
  Download,
  Receipt,
} from 'lucide-react';
import { PaymentMethodType, PaymentTransaction } from '../../types/billing';

interface BillingPaymentsTabProps {
  transactions: PaymentTransaction[];
  onViewReceipt: (txn: PaymentTransaction) => void;
  onExportLedger: () => void;
}

export const BillingPaymentsTab: React.FC<BillingPaymentsTabProps> = ({
  transactions,
  onViewReceipt,
  onExportLedger,
}) => {
  const [methodFilter, setMethodFilter] = useState<'All' | PaymentMethodType | 'Refunded'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      if (methodFilter === 'Refunded' && txn.status !== 'Refunded') return false;
      if (
        methodFilter !== 'All' &&
        methodFilter !== 'Refunded' &&
        txn.methodType !== methodFilter
      ) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        txn.transactionRef.toLowerCase().includes(q) ||
        txn.patientName.toLowerCase().includes(q) ||
        txn.paymentMethod.toLowerCase().includes(q) ||
        txn.authorizationCode.toLowerCase().includes(q)
      );
    });
  }, [transactions, methodFilter, searchQuery]);

  const totalGross = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => acc + (t.status !== 'Refunded' ? t.grossAmount : 0), 0);
  }, [filteredTransactions]);

  const totalFees = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => acc + (t.status !== 'Refunded' ? t.feeAmount : 0), 0);
  }, [filteredTransactions]);

  const totalNet = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => acc + (t.status !== 'Refunded' ? t.netAmount : 0), 0);
  }, [filteredTransactions]);

  return (
    <div className="w-full flex-1 flex flex-col space-y-5 animate-in fade-in duration-200">
      {/* 1. Header with Filters & Search */}
      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex-shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Method Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(
              [
                { id: 'All', label: 'All Transactions' },
                { id: 'credit_card', label: 'Credit Cards' },
                { id: 'insurance', label: 'Insurance ERA' },
                { id: 'apple_pay', label: 'Digital Wallets' },
                { id: 'ach', label: 'Direct ACH' },
                { id: 'Refunded', label: 'Refunds' },
              ] as const
            ).map((f) => {
              const isActive = methodFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setMethodFilter(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search & Export */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transaction ID, auth code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={onExportLedger}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Financial Summary Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Gross Filtered</span>
            <div className="font-sora font-bold text-lg text-slate-900 mt-0.5">
              ${totalGross.toFixed(2)}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Processing Fees</span>
            <div className="font-sora font-bold text-lg text-slate-500 mt-0.5">
              -${totalFees.toFixed(2)}
            </div>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase">Net Credited</span>
            <div className="font-sora font-bold text-lg text-emerald-700 mt-0.5">
              +${totalNet.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Transactions Table */}
      <div className="w-full flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="w-full flex-1 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[11px] font-inter">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-3">Payer / Source</th>
                <th className="py-3 px-3">Method</th>
                <th className="py-3 px-3 hidden lg:table-cell">Date & Time</th>
                <th className="py-3 px-3">Gross</th>
                <th className="py-3 px-3 hidden md:table-cell">Fee</th>
                <th className="py-3 px-3">Net Received</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((txn) => {
                const isRefund = txn.status === 'Refunded';
                return (
                  <tr key={txn.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-slate-900 text-xs">
                      {txn.transactionRef}
                      <div className="text-[10px] text-slate-400 font-normal">
                        {txn.authorizationCode}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {txn.patientName}
                      </div>
                      <div className="text-[11px] text-slate-400">{txn.payerType}</div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        {txn.methodType === 'credit_card' && (
                          <div className="w-6 h-6 rounded-md bg-purple-100 text-[#5C24FF] flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {txn.methodType === 'insurance' && (
                          <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <Building className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {txn.methodType === 'apple_pay' && (
                          <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {txn.methodType === 'ach' && (
                          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                            <Building className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="text-xs text-slate-700 truncate max-w-[140px] sm:max-w-none">
                          {txn.paymentMethod}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-3 text-xs text-slate-500 hidden lg:table-cell">
                      {txn.timestamp}
                    </td>

                    <td className="py-4 px-3 font-semibold text-slate-900">
                      ${txn.grossAmount.toFixed(2)}
                    </td>

                    <td className="py-4 px-3 text-slate-400 text-xs hidden md:table-cell">
                      -${txn.feeAmount.toFixed(2)}
                    </td>

                    <td className="py-4 px-3">
                      <span
                        className={`font-sora font-bold text-xs sm:text-sm ${
                          isRefund ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {isRefund ? '-' : '+'}${Math.abs(txn.netAmount).toFixed(2)}
                      </span>
                    </td>

                    <td className="py-4 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          txn.status === 'Settled'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : txn.status === 'Processing'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {txn.status === 'Settled' && <CheckCircle2 className="w-3 h-3" />}
                        {txn.status === 'Processing' && <Clock className="w-3 h-3" />}
                        {txn.status === 'Refunded' && <RotateCcw className="w-3 h-3" />}
                        <span>{txn.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onViewReceipt(txn)}
                        className="p-1.5 hover:bg-purple-100 text-[#5C24FF] rounded-lg transition-colors"
                        title="View Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
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
