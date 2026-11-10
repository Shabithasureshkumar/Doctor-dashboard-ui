import React, { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  CreditCard,
  ShieldCheck,
  Wallet,
  Settings2,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import {
  BillingKPIs,
  BillingTabType,
  InsuranceClaim,
  InvoiceItem,
  MedicalService,
  PaymentTransaction,
  PayoutRecord,
} from '../../types/billing';
import {
  INITIAL_BILLING_KPIS,
  INITIAL_INSURANCE_CLAIMS,
  INITIAL_INVOICES,
  INITIAL_PAYMENT_TRANSACTIONS,
  INITIAL_PAYOUT_RECORDS,
  INITIAL_SERVICES,
} from '../../mockData/billingData';
import { BillingOverviewTab } from './BillingOverviewTab';
import { BillingInvoicesTab } from './BillingInvoicesTab';
import { BillingPaymentsTab } from './BillingPaymentsTab';
import { BillingClaimsTab } from './BillingClaimsTab';
import { BillingPayoutsTab } from './BillingPayoutsTab';
import { BillingServicesTab } from './BillingServicesTab';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { SubmitClaimModal } from './SubmitClaimModal';
import { AddServiceModal } from './AddServiceModal';
import { InstantPayoutModal } from './InstantPayoutModal';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { CURRENT_DOCTOR } from '../../mockData';

interface BillingViewProps {
  onBackToDashboard: () => void;
  onNavigateToCalendar?: () => void;
  onOpenSettings?: () => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  onBackToDashboard,
  onNavigateToCalendar: _onNavigateToCalendar,
  onOpenSettings,
}) => {
  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<BillingTabType>('overview');

  // Core Data States
  const [kpis, setKpis] = useState<BillingKPIs>(INITIAL_BILLING_KPIS);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [transactions, _setTransactions] = useState<PaymentTransaction[]>(INITIAL_PAYMENT_TRANSACTIONS);
  const [claims, setClaims] = useState<InsuranceClaim[]>(INITIAL_INSURANCE_CLAIMS);
  const [payouts, setPayouts] = useState<PayoutRecord[]>(INITIAL_PAYOUT_RECORDS);
  const [services, setServices] = useState<MedicalService[]>(INITIAL_SERVICES);

  // Modals
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isSubmitClaimOpen, setIsSubmitClaimOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<MedicalService | null>(null);
  const [isInstantPayoutOpen, setIsInstantPayoutOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4000);
  };

  // Handlers
  const handleAddInvoice = (newInv: Omit<InvoiceItem, 'id' | 'invoiceNumber'>) => {
    const inv: InvoiceItem = {
      ...newInv,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-0${Math.floor(892 + Math.random() * 50)}`,
    };
    setInvoices((prev) => [inv, ...prev]);
    setKpis((prev) => ({
      ...prev,
      pendingInvoicesCount: prev.pendingInvoicesCount + 1,
      pendingInvoicesAmount: prev.pendingInvoicesAmount + inv.amount,
    }));
    showToast(`Invoice ${inv.invoiceNumber} created and sent to ${inv.patientName}`);
  };

  const handleSubmitClaim = (newClaim: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'lastUpdated'>) => {
    const claim: InsuranceClaim = {
      ...newClaim,
      id: `clm-${Date.now()}`,
      claimNumber: `CLM-2026-4${Math.floor(413 + Math.random() * 50)}`,
      lastUpdated: 'Today',
    };
    setClaims((prev) => [claim, ...prev]);
    setKpis((prev) => ({
      ...prev,
      insuranceClaimsAmount: prev.insuranceClaimsAmount + claim.billedAmount,
    }));
    showToast(`Insurance claim ${claim.claimNumber} submitted to ${claim.insurancePayer}`);
  };

  const handleResubmitClaim = (claim: InsuranceClaim) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claim.id
          ? { ...c, status: 'Clearinghouse Review', lastUpdated: 'Today', denialReason: undefined }
          : c
      )
    );
    showToast(`Claim ${claim.claimNumber} re-submitted with clinical appeal notes`);
  };

  const handleSaveService = (serviceData: Omit<MedicalService, 'id'>, editId?: string) => {
    if (editId) {
      setServices((prev) =>
        prev.map((s) => (s.id === editId ? { ...serviceData, id: editId } : s))
      );
      showToast(`Service "${serviceData.title}" updated successfully`);
    } else {
      const newSrv: MedicalService = {
        ...serviceData,
        id: `srv-${Date.now()}`,
      };
      setServices((prev) => [newSrv, ...prev]);
      showToast(`New service "${newSrv.title}" added to billing catalog`);
    }
  };

  const handleToggleServiceActive = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleConfirmPayout = (amount: number, isInstant: boolean) => {
    const fee = isInstant ? Math.min(15.0, amount * 0.01) : 0;
    const net = amount - fee;
    const newRecord: PayoutRecord = {
      id: `po-${Date.now()}`,
      payoutRef: `PO-2026-${Math.floor(1102 + Math.random() * 20)}`,
      date: 'Today',
      bankName: 'JPMorgan Chase Bank, N.A.',
      accountEnding: '•••• 4821',
      payoutMethod: isInstant ? 'Instant Payout (Card)' : 'Standard ACH (2-Day)',
      amount,
      fee,
      netAmount: net,
      status: 'Completed',
    };
    setPayouts((prev) => [newRecord, ...prev]);
    setKpis((prev) => ({
      ...prev,
      availablePayoutBalance: Math.max(0, prev.availablePayoutBalance - amount),
    }));
    showToast(`$${net.toFixed(2)} payout initiated to Chase •••• 4821`);
  };

  const handleSendReminder = (inv: InvoiceItem) => {
    showToast(`Payment reminder SMS & Email sent to ${inv.patientName}`);
  };

  const handleDownloadInvoice = (inv: InvoiceItem) => {
    showToast(`Downloading PDF for ${inv.invoiceNumber}...`);
  };

  const subTabs: { id: BillingTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'claims', label: 'Insurance Claims', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'payouts', label: 'Payouts', icon: <Wallet className="w-4 h-4" /> },
    { id: 'services', label: 'Pricing & Services', icon: <Settings2 className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FE] text-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-5 space-y-4 sm:space-y-5 flex flex-col font-inter">
      {/* Top Navigation Header */}
      <header className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        {/* Left: Brand + Back Button + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 flex items-center justify-center transition-colors flex-shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(154,106,251,0.3)]">
            <CreditCard className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sora font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                Billing & Financial Management
              </h1>
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#5C24FF] px-2 py-0.5 rounded-full">
                Doctor Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Claims clearinghouse, direct patient invoices, instant payouts & clinical fee schedule
            </p>
          </div>
        </div>

        {/* Right: Settings & Doctor profile */}
        <div className="flex items-center gap-3 justify-end">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-600 flex items-center justify-center transition-colors"
              title="Doctor Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <img
              src={CURRENT_DOCTOR.avatarUrl}
              alt={CURRENT_DOCTOR.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800">{CURRENT_DOCTOR.name}</div>
              <div className="text-[11px] text-slate-400">{CURRENT_DOCTOR.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Tabs Bar (The 6 Screens in the user's reference) */}
      <div className="w-full bg-white rounded-2xl p-2 border border-slate-100 shadow-sm overflow-x-auto scrollbar-none flex-shrink-0">
        <nav className="flex items-center gap-1 sm:gap-2 min-w-max">
          {subTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sora text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white shadow-[0_4px_12px_rgba(154,106,251,0.3)]'
                    : 'text-slate-600 hover:text-[#5C24FF] hover:bg-purple-50/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Subview Content - Expands Full Width & Height */}
      <main className="w-full flex-1 flex flex-col">
        {activeTab === 'overview' && (
          <BillingOverviewTab
            kpis={kpis}
            invoices={invoices}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
            onOpenInstantPayout={() => setIsInstantPayoutOpen(true)}
            onSelectInvoice={(inv) => setSelectedInvoice(inv)}
            onSendReminder={handleSendReminder}
          />
        )}

        {activeTab === 'invoices' && (
          <BillingInvoicesTab
            invoices={invoices}
            onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
            onSelectInvoice={(inv) => setSelectedInvoice(inv)}
            onSendReminder={handleSendReminder}
            onDownloadInvoice={handleDownloadInvoice}
          />
        )}

        {activeTab === 'payments' && (
          <BillingPaymentsTab
            transactions={transactions}
            onViewReceipt={(txn) => showToast(`Receipt for ${txn.transactionRef} downloaded`)}
            onExportLedger={() => showToast('Exporting transaction ledger CSV...')}
          />
        )}

        {activeTab === 'claims' && (
          <BillingClaimsTab
            claims={claims}
            onOpenSubmitClaim={() => setIsSubmitClaimOpen(true)}
            onResubmitClaim={handleResubmitClaim}
            onViewClaimDetails={(c) =>
              showToast(`Viewing CMS-1500 form for claim ${c.claimNumber}`)
            }
          />
        )}

        {activeTab === 'payouts' && (
          <BillingPayoutsTab
            kpis={kpis}
            payouts={payouts}
            onOpenInstantPayout={() => setIsInstantPayoutOpen(true)}
            onDownloadTaxStatement={() => showToast('Generating 1099-K tax statement PDF...')}
          />
        )}

        {activeTab === 'services' && (
          <BillingServicesTab
            services={services}
            onOpenAddService={() => {
              setServiceToEdit(null);
              setIsAddServiceOpen(true);
            }}
            onEditService={(srv) => {
              setServiceToEdit(srv);
              setIsAddServiceOpen(true);
            }}
            onToggleActive={handleToggleServiceActive}
          />
        )}
      </main>

      {/* Interactive Modals */}
      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        onAddInvoice={handleAddInvoice}
      />

      <SubmitClaimModal
        isOpen={isSubmitClaimOpen}
        onClose={() => setIsSubmitClaimOpen(false)}
        onSubmitClaim={handleSubmitClaim}
      />

      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => {
          setIsAddServiceOpen(false);
          setServiceToEdit(null);
        }}
        onSaveService={handleSaveService}
        serviceToEdit={serviceToEdit}
      />

      <InstantPayoutModal
        isOpen={isInstantPayoutOpen}
        onClose={() => setIsInstantPayoutOpen(false)}
        availableBalance={kpis.availablePayoutBalance}
        onConfirmPayout={handleConfirmPayout}
      />

      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
        onDownload={handleDownloadInvoice}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200 border border-slate-800">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
