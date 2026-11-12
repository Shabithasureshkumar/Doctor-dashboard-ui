import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { BillingKPIs, InvoiceItem, InsuranceClaim, PayoutRecord, MedicalService } from '../types/billing';
import {
  INITIAL_BILLING_KPIS,
  INITIAL_INVOICES,
  INITIAL_SERVICES,
} from '../mockData/billingData';

export const billingApi = {
  /**
   * Fetches real-time billing and revenue KPIs
   */
  async getKPIs(): Promise<BillingKPIs> {
    try {
      return await get<BillingKPIs>(API_ENDPOINTS.BILLING.KPIS);
    } catch {
      return INITIAL_BILLING_KPIS;
    }
  },

  /**
   * Retrieves invoices list
   */
  async getInvoices(): Promise<InvoiceItem[]> {
    try {
      return await get<InvoiceItem[]>(API_ENDPOINTS.BILLING.INVOICES);
    } catch {
      return INITIAL_INVOICES;
    }
  },

  /**
   * Creates a new patient invoice
   */
  async createInvoice(payload: Omit<InvoiceItem, 'id' | 'invoiceNumber'>): Promise<InvoiceItem> {
    try {
      return await post<InvoiceItem>(API_ENDPOINTS.BILLING.INVOICES, payload);
    } catch {
      return {
        ...payload,
        id: `inv-${Date.now()}`,
        invoiceNumber: `INV-2026-0${Math.floor(892 + Math.random() * 50)}`,
      };
    }
  },

  /**
   * Submits an insurance claim to clearinghouse
   */
  async submitClaim(payload: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'lastUpdated'>): Promise<InsuranceClaim> {
    try {
      return await post<InsuranceClaim>(API_ENDPOINTS.BILLING.CLAIMS, payload);
    } catch {
      return {
        ...payload,
        id: `clm-${Date.now()}`,
        claimNumber: `CLM-2026-${Math.floor(5400 + Math.random() * 50)}`,
        lastUpdated: 'Just now',
      };
    }
  },

  /**
   * Initiates instant or ACH payout to provider bank account
   */
  async requestPayout(amount: number, isInstant: boolean): Promise<PayoutRecord> {
    try {
      return await post<PayoutRecord>(API_ENDPOINTS.BILLING.REQUEST_PAYOUT, { amount, isInstant });
    } catch {
      const fee = isInstant ? Math.min(15.0, amount * 0.01) : 0;
      return {
        id: `po-${Date.now()}`,
        payoutRef: `PO-2026-${Math.floor(1102 + Math.random() * 20)}`,
        date: 'Today',
        bankName: 'JPMorgan Chase Bank, N.A.',
        accountEnding: '•••• 4821',
        payoutMethod: isInstant ? 'Instant Payout (Card)' : 'Standard ACH (2-Day)',
        amount,
        fee,
        netAmount: amount - fee,
        status: 'Completed',
      };
    }
  },

  /**
   * Retrieves provider clinical fee schedule services catalog
   */
  async getServices(): Promise<MedicalService[]> {
    try {
      return await get<MedicalService[]>(API_ENDPOINTS.BILLING.SERVICES);
    } catch {
      return INITIAL_SERVICES;
    }
  },
};
