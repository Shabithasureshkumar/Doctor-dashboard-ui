import React from 'react';
import { X, Download, CheckCircle2, Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import { InvoiceItem } from '../../types/billing';

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceItem | null;
  onDownload: (invoice: InvoiceItem) => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onDownload,
}) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-800">
              {invoice.invoiceNumber}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                invoice.status === 'Paid'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : invoice.status === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {invoice.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
              {invoice.status === 'Pending' && <Clock className="w-3 h-3" />}
              {invoice.status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
              <span>{invoice.status}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload(invoice)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#5C24FF] rounded-xl text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Brand & Clinic Info */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <span className="font-sora font-extrabold text-lg text-slate-900 tracking-tight">
                  Mednevo <span className="text-xs font-semibold text-[#5C24FF]">CLINICAL BILLING</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Dr. Ava Rivers, MD, FACC • Cardiology Specialists<br />
                100 Medical Center Blvd, Suite 400<br />
                NPI: 1982730192 • Tax ID: 94-8821039
              </p>
            </div>

            <div className="text-right">
              <span className="font-sora font-bold text-xl text-slate-900 block">
                INVOICE
              </span>
              <span className="font-mono text-xs text-slate-500 block mt-0.5">
                {invoice.invoiceNumber}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                Date: {invoice.issueDate}
              </span>
              <span className="text-xs text-slate-400 block">
                Due: {invoice.dueDate}
              </span>
            </div>
          </div>

          {/* Billed To */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Billed Patient
              </span>
              <div className="font-semibold text-slate-900 text-sm mt-0.5">
                {invoice.patientName}
              </div>
              <div className="text-xs text-slate-500">{invoice.patientEmail}</div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Payment Channel
              </span>
              <div className="text-xs font-medium text-slate-700 mt-0.5">
                {invoice.paymentMethod || 'Online Credit / Debit'}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-400 font-inter uppercase text-[11px]">
              <tr>
                <th className="py-2.5">Item Description</th>
                <th className="py-2.5 text-center">CPT Code</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5">
                  <div className="font-semibold text-slate-900">{invoice.serviceTitle}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {invoice.notes || 'Full consultation & diagnostic evaluation'}
                  </div>
                </td>
                <td className="py-3.5 text-center font-mono text-xs text-slate-600">
                  {invoice.cptCode}
                </td>
                <td className="py-3.5 text-center text-slate-600">1</td>
                <td className="py-3.5 text-right font-semibold text-slate-900">
                  ${invoice.amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-slate-200 pt-3 flex flex-col items-end space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between w-48 text-slate-500">
              <span>Subtotal:</span>
              <span>${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-48 text-slate-500">
              <span>Tax / Copay Adj:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between w-48 font-sora font-bold text-base text-slate-900 pt-1.5 border-t border-slate-200">
              <span>Total Due:</span>
              <span className="text-[#5C24FF]">${invoice.amount.toFixed(2)}</span>
            </div>
          </div>

          {/* HIPAA & Security Note */}
          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5C24FF] flex-shrink-0" />
            <span>
              This invoice is encrypted in compliance with HIPAA Omnibus standards. Thank you for choosing Mednevo Healthcare.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
