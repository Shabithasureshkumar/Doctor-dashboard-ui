export type Shape = 'sphere' | 'lock' | 'id' | 'pin' | 'clock' | 'wallet' | 'check' | 'hourglass' | 'logo';

export interface HeroContent {
  name: string;
  kicker: string;
  title: string;
  text: string;
  shape: Shape;
}

/** Left panel content for each screen (index = step). */
export const HERO: HeroContent[] = [
  { name: 'Role', kicker: 'For providers', title: 'Care, reimagined for doctors.', text: 'Join Mednevo and run your whole practice from one intelligent portal.', shape: 'sphere' },
  { name: 'Account', kicker: 'Step 1 of 5 · Secure', title: 'Your access, locked down.', text: 'Two-step sign-in and encrypted data from day one.', shape: 'lock' },
  { name: 'Identity', kicker: 'Step 2 of 5 · Verify', title: 'Credentials patients trust.', text: 'We verify your license so patients can book you with confidence.', shape: 'id' },
  { name: 'Practice', kicker: 'Step 3 of 5 · Locate', title: 'Meet patients anywhere.', text: 'In your clinic, online, or both — your choice.', shape: 'pin' },
  { name: 'Availability', kicker: 'Step 4 of 5 · Schedule', title: 'Your time, your rules.', text: 'Patients only book when you say you are available.', shape: 'clock' },
  { name: 'Payment', kicker: 'Step 5 of 5 · Payouts', title: 'Paid every week.', text: 'Transparent payouts straight to your account.', shape: 'wallet' },
  { name: 'Under review', kicker: 'Application submitted', title: 'Almost there, Doctor.', text: "Our team is reviewing your application. Full access unlocks once you're approved.", shape: 'hourglass' },
  { name: 'Approved', kicker: 'Account approved', title: "You're in, Doctor.", text: 'Your license is verified — welcome to Mednevo.', shape: 'logo' },
];

/** SVG paths (24×24 viewBox) sampled into particle shapes. */
export const SHAPE_PATHS: Partial<Record<Shape, string[]>> = {
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4', 'M12 15v2'],
  id: ['M3 5h18v14H3z', 'M6.5 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0', 'M5.5 16c.7-1.6 1.8-2.2 3-2.2s2.3.6 3 2.2', 'M14 9.5h4.5M14 13h4.5'],
  pin: ['M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z', 'M9.5 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0'],
  clock: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', 'M12 7v5l3.5 2'],
  wallet: ['M3 7h18v13H3z', 'M3 7l3-3h12l3 3', 'M16 13.5h2.5'],
  check: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', 'M7.5 12.5l3 3 6-7'],
  hourglass: ['M6 3h12', 'M6 21h12', 'M7 3c0 6 10 6 10 9s-10 3-10 9', 'M17 3c0 6-10 6-10 9s10 3 10 9'],
};

/** What the doctors say when each screen opens. */
export const GREETINGS = [
  "Hi Doctor! Let's get you set up.",
  'First, a secure login.',
  'Tell patients who you are.',
  'Where will you see patients?',
  'Pick hours that suit you.',
  "Last step — let's get you paid.",
  "We're on it. Hang tight!",
  'Welcome aboard, Doctor!',
];

export const PRAISE = ['Great choice!', 'Looks good!', 'Perfect.', 'Nice one!', "You're doing great.", 'Almost there!'];

export const SPECIALTIES = ['General Physician', 'Cardiology', 'Dermatology', 'Pediatrics', 'Psychiatry', 'Gynecology'];
export const CREDENTIALS = ['MBBS', 'MD', 'DO', 'MS', 'NP', 'PA'];
export const LANGUAGES = ['English', 'Tamil', 'Hindi', 'Spanish', 'Arabic'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SCHEDULES = [
  { id: 'weekdays', title: 'Weekdays', desc: 'Mon–Fri · 9 AM – 5 PM' },
  { id: 'mornings', title: 'Mornings', desc: 'Mon–Sat · 8 AM – 1 PM' },
  { id: 'evenings', title: 'Evenings', desc: 'Mon–Fri · 4 PM – 9 PM' },
  { id: 'custom', title: 'Custom schedule', desc: 'Set your own days and hours' },
] as const;

export const VISIT_TYPES = [
  { id: 'new', label: 'New patient', duration: '45 min' },
  { id: 'follow', label: 'Follow-up', duration: '20 min' },
  { id: 'urgent', label: 'Urgent', duration: '15 min' },
  { id: 'procedure', label: 'Procedure', duration: '60 min' },
] as const;
