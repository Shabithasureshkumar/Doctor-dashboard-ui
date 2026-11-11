/** Sentinel value used by chip groups for the "Other" option that opens a manual text field. */
export const OTHER = '__other';

export type RoleId = 'independent' | 'clinic' | 'resident' | 'other';
export type AccountMethod = 'google' | 'microsoft' | 'email';
export type PracticeMode = 'clinic' | 'online' | 'both';
export type LocationMethod = 'current' | 'manual';
export type ScheduleId = 'weekdays' | 'mornings' | 'evenings' | 'custom';
export type PayMethod = 'bank' | 'card' | 'later';

export interface FormState {
  // 0 · Role
  role: RoleId;
  roleOther: string;
  // 1 · Account
  accountMethod: AccountMethod | null;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  // 2 · Identity
  fullName: string;
  specialty: string | null;
  specialtyOther: string;
  credentials: string[];
  credentialsOther: string;
  license: string;
  npi: string;
  languages: string[];
  languagesOther: string;
  // 3 · Practice
  practiceMode: PracticeMode;
  locationMethod: LocationMethod | null;
  clinicName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  // 4 · Availability
  schedule: ScheduleId;
  days: string[];
  startTime: string;
  endTime: string;
  visitTypes: string[];
  // 5 · Payment
  payMethod: PayMethod | null;
  accountHolder: string;
  routingNumber: string;
  accountNumber: string;
  cardNumber: string;
  cardExpiry: string;
  cardZip: string;
  tin: string;
}

export type UpdateField = <K extends keyof FormState>(key: K, value: FormState[K]) => void;

export const initialForm: FormState = {
  role: 'independent',
  roleOther: '',
  accountMethod: null,
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: true,
  fullName: '',
  specialty: null,
  specialtyOther: '',
  credentials: [],
  credentialsOther: '',
  license: '',
  npi: '',
  languages: ['English'],
  languagesOther: '',
  practiceMode: 'clinic',
  locationMethod: null,
  clinicName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  schedule: 'weekdays',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  startTime: '09:00',
  endTime: '17:00',
  visitTypes: ['new', 'follow', 'urgent'],
  payMethod: null,
  accountHolder: '',
  routingNumber: '',
  accountNumber: '',
  cardNumber: '',
  cardExpiry: '',
  cardZip: '',
  tin: '',
};

/** Adds the value if missing, removes it if present. */
export function toggleIn(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
