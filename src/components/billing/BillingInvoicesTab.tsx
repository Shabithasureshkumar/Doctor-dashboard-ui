import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  FileText,
  Send,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileEdit,
} from 'lucide-react';
import { InvoiceItem, InvoiceStatus } from '../../types/billing';

interface BillingInvoicesTabProps {
  invoices: InvoiceItem[];
  onOpenCreateInvoice: () => void;
  onSelectInvoice: (invoice: InvoiceItem) => void;
  onSendReminder: (invoice: InvoiceItem) => void;
  onDownloadInvoice: (invoice: InvoiceItem) => void;
}

export const BillingInvoicesTab: React.FC<BillingInvoicesTabProps> = ({
  invoices,
  onOpenCreateInvoice,
  onSelectInvoice,
  onSendReminder,
  onDownloadInvoice,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | InvoiceStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filterCounts = useMemo(() => {
    return {
      All: invoices.length,
      Paid: invoices.filter((i) => i.status === 'Paid').length,
      Pending: invoices.filter((i) => i.status === 'Pending').length,
      Overdue: invoices.filter((i) => i.status === 'Overdue').length,
      Draft: invoices.filter((i) => i.status === 'Draft').length,
    };
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (activeFilter !== 'All' && inv.status !== activeFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.patientName.toLowerCase().includes(q) ||
        inv.serviceTitle.toLowerCase().includes(q) ||
        inv.cptCode.includes(q)
      );
    });
  }, [invoices, activeFilter, searchQuery]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredInvoices.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Header with Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(['All', 'Paid', 'Pending', 'Overdue', 'Draft'] as const).map((filter) => {
              const isActive = activeFilter === filter;
              const count = filterCounts[filter];
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  <span>{filter === 'All' ? 'All Invoices' : filter}</span>
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

          {/* Right: Search + Action Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search invoice #, patient, CPT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={onOpenCreateInvoice}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl font-sora font-semibold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>

        {/* Selected Batch Actions Bar (when items selected) */}
        {selectedIds.length > 0 && (
          <div className="mt-4 p-2.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
            <span className="font-semibold text-[#5C24FF]">
              {selectedIds.length} invoice{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Batch export ${selectedIds.length} invoices`)}
                className="px-3 py-1 bg-white border border-purple-200 text-[#5C24FF] rounded-lg font-medium hover:bg-purple-100 transition-colors"
              >
                Export CSV / PDF
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="text-slate-500 hover:text-slate-800 text-xs px-2"
              >
                Deselect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[11px] font-inter">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredInvoices.length > 0 &&
                      selectedIds.length === filteredInvoices.length
                    }
                    onChange={handleSelectAll}
                    className="rounded text-[#5C24FF] focus:ring-[#9A6AFB] w-4 h-4"
                  />
                </th>
                <th className="py-3 px-3">Invoice Details</th>
                <th className="py-3 px-3">Patient</th>
                <th className="py-3 px-3 hidden md:table-cell">Clinical Service</th>
                <th className="py-3 px-3 hidden lg:table-cell">Due Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-medium text-sm text-slate-600">No invoices found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Try adjusting your search query or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isSelected = selectedIds.includes(inv.id);
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => onSelectInvoice(inv)}
                      className={`hover:bg-purple-50/30 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-purple-50/50' : ''
                      }`}
                    >
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(inv.id)}
                          className="rounded text-[#5C24FF] focus:ring-[#9A6AFB] w-4 h-4"
                        />
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-semibold text-slate-900 font-mono text-xs sm:text-sm">
                          {inv.invoiceNumber}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Issued {inv.issueDate}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={inv.patientAvatar}
                            alt={inv.patientName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
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

                      <td className="py-4 px-3 hidden md:table-cell">
                        <div className="text-slate-800 font-medium text-xs sm:text-sm">
                          {inv.serviceTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Code: CPT {inv.cptCode}
                        </div>
                      </td>

                      <td className="py-4 px-3 hidden lg:table-cell">
                        <span className="text-slate-600 text-xs">{inv.dueDate}</span>
                      </td>

                      <td className="py-4 px-3">
                        <span className="font-sora font-bold text-slate-900 text-xs sm:text-sm">
                          ${inv.amount.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                          {inv.paymentMethod}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inv.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : inv.status === 'Overdue'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {inv.status === 'Paid' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {inv.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                          {inv.status === 'Overdue' && <AlertCircle className="w-3 h-3 text-rose-600" />}
                          {inv.status === 'Draft' && <FileEdit className="w-3 h-3 text-slate-500" />}
                          <span>{inv.status}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {inv.status === 'Overdue' && (
                            <button
                              onClick={() => onSendReminder(inv)}
                              className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                              title="Send Payment Reminder"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onDownloadInvoice(inv)}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onSelectInvoice(inv)}
                            className="p-1.5 hover:bg-purple-100 text-[#5C24FF] rounded-lg transition-colors"
                            title="View Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredInvoices.length}</strong> of{' '}
            {invoices.length} total invoices
          </span>
          <span className="text-slate-400 font-inter">
            256-bit HIPAA Compliant Billing Ledger
          </span>
        </div>
      </div>
    </div>
  );
};
