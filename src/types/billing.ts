export type BillingTabType =
  | 'overview'
  | 'invoices'
  | 'payments'
  | 'claims'
  | 'payouts'
  | 'services';

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientAvatar: string;
  serviceTitle: string;
  cptCode: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  paymentMethod?: string;
  notes?: string;
}

export type PaymentMethodType = 'credit_card' | 'insurance' | 'ach' | 'apple_pay';
export type PaymentStatus = 'Settled' | 'Processing' | 'Refunded';

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  patientName: string;
  payerType: 'Patient (Self-Pay)' | 'Insurance Clearinghouse' | 'Direct ACH' | 'Digital Wallet';
  paymentMethod: string;
  methodType: PaymentMethodType;
  timestamp: string;
  grossAmount: number;
  feeAmount: number;
  netAmount: number;
  status: PaymentStatus;
  authorizationCode: string;
}

export type ClaimStatus =
  | 'Approved'
  | 'Clearinghouse Review'
  | 'Action Required'
  | 'Denied'
  | 'Submitted';

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  insurancePayer: string;
  payerId: string;
  patientName: string;
  policyNumber: string;
  groupNumber: string;
  cptCodes: string[];
  icd10Diagnosis: string;
  dateOfService: string;
  billedAmount: number;
  allowedAmount: number;
  copayAmount: number;
  status: ClaimStatus;
  denialReason?: string;
  lastUpdated: string;
}

export type PayoutStatus = 'Completed' | 'Processing' | 'Scheduled';

export interface PayoutRecord {
  id: string;
  payoutRef: string;
  date: string;
  bankName: string;
  accountEnding: string;
  payoutMethod: 'Standard ACH (2-Day)' | 'Instant Payout (Card)' | 'Direct Wire';
  amount: number;
  fee: number;
  netAmount: number;
  status: PayoutStatus;
}

export interface MedicalService {
  id: string;
  title: string;
  category: 'Telehealth' | 'In-Clinic' | 'Diagnostics' | 'Procedures' | 'Specialist';
  cptCode: string;
  durationMinutes: number;
  description: string;
  selfPayFee: number;
  copayEstimate: number;
  isActive: boolean;
  insuranceCovered: boolean;
}

export interface BillingKPIs {
  totalRevenue: number;
  revenueGrowthPercent: number;
  pendingInvoicesAmount: number;
  pendingInvoicesCount: number;
  insuranceClaimsAmount: number;
  claimsApprovalRate: number;
  availablePayoutBalance: number;
  nextPayoutDate: string;
  monthlyGoalAmount: number;
  monthlyGoalCurrent: number;
}
