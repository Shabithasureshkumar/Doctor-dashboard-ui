export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  status: 'Active' | 'Follow-up' | 'High Priority';
  avatarUrl: string;
  phone: string;
  email: string;
  location: string;
  dob: string;
  bloodGroup: string;
  height: string;
  weight: string;
  bmi: string;
  bmiStatus: string;
  medicalConditions: string[];
  allergies: string[];
  medications: { name: string; dosage: string }[];
  recentVisit: {
    date: string;
    type: string;
    reason: string;
  };
  nextAppointment?: {
    date: string;
    time: string;
    mode: 'Video Consultation' | 'In-Person Consultation';
  };
  vitals: {
    bp: string;
    bpStatus: string;
    heartRate: number;
    heartRateStatus: string;
    spo2: number;
    spo2Status: string;
    weight: string;
    weightTrend: string;
  };
}

export const INITIAL_PATIENTS_LIST: PatientRecord[] = [
  {
    id: 'p-1',
    patientId: 'PT10256',
    name: 'Sarah Johnson',
    age: 29,
    gender: 'Female',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=160',
    phone: '+91 98765 43210',
    email: 'sarah.johnson@gmail.com',
    location: 'Chennai, Tamil Nadu',
    dob: 'Mar 15, 1997 (29 years)',
    bloodGroup: 'B+',
    height: '162 cm',
    weight: '58 kg',
    bmi: '22.1 (Normal)',
    bmiStatus: 'Normal',
    medicalConditions: ['Hypertension', 'PCOS'],
    allergies: ['No known allergies'],
    medications: [
      { name: 'Metformin', dosage: '500 mg (BD)' },
      { name: 'Folic Acid', dosage: '5 mg (OD)' },
    ],
    recentVisit: {
      date: 'Nov 10, 2026',
      type: 'General Consultation',
      reason: 'Persistent cough & breathing discomfort',
    },
    nextAppointment: {
      date: 'Nov 13, 2026',
      time: '10:00 AM',
      mode: 'Video Consultation',
    },
    vitals: {
      bp: '118 / 76 mmHg',
      bpStatus: 'Normal',
      heartRate: 72,
      heartRateStatus: 'Normal',
      spo2: 98,
      spo2Status: 'Normal',
      weight: '58 kg',
      weightTrend: '-2 kg',
    },
  },
  {
    id: 'p-2',
    patientId: 'PT10234',
    name: 'Rahul Mehta',
    age: 32,
    gender: 'Male',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=160',
    phone: '+91 98123 45678',
    email: 'rahul.mehta@outlook.com',
    location: 'Mumbai, Maharashtra',
    dob: 'Jun 22, 1994 (32 years)',
    bloodGroup: 'O+',
    height: '175 cm',
    weight: '74 kg',
    bmi: '24.2 (Normal)',
    bmiStatus: 'Normal',
    medicalConditions: ['Allergic Bronchitis', 'Mild GERD'],
    allergies: ['Penicillin'],
    medications: [
      { name: 'Montelukast', dosage: '10 mg (HS)' },
      { name: 'Pantoprazole', dosage: '40 mg (OD)' },
    ],
    recentVisit: {
      date: 'Nov 08, 2026',
      type: 'Video Telehealth',
      reason: 'Persistent wheezing & nighttime coughing',
    },
    nextAppointment: {
      date: 'Nov 10, 2026',
      time: '10:00 AM',
      mode: 'Video Consultation',
    },
    vitals: {
      bp: '122 / 80 mmHg',
      bpStatus: 'Normal',
      heartRate: 76,
      heartRateStatus: 'Normal',
      spo2: 97,
      spo2Status: 'Normal',
      weight: '74 kg',
      weightTrend: 'Stable',
    },
  },
  {
    id: 'p-3',
    patientId: 'PT10235',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
    phone: '+91 97234 56789',
    email: 'priya.sharma@gmail.com',
    location: 'Bengaluru, Karnataka',
    dob: 'Aug 14, 1998 (28 years)',
    bloodGroup: 'A+',
    height: '160 cm',
    weight: '54 kg',
    bmi: '21.1 (Normal)',
    bmiStatus: 'Normal',
    medicalConditions: ['Gastritis', 'Iron Deficiency'],
    allergies: ['Sulfa drugs'],
    medications: [
      { name: 'Omeprazole', dosage: '20 mg (OD)' },
      { name: 'Ferrous Ascorbate', dosage: '100 mg (OD)' },
    ],
    recentVisit: {
      date: 'Nov 05, 2026',
      type: 'In-Clinic Physical',
      reason: 'Epigastric pain and post-prandial fullness',
    },
    nextAppointment: {
      date: 'Nov 10, 2026',
      time: '11:00 AM',
      mode: 'In-Person Consultation',
    },
    vitals: {
      bp: '112 / 72 mmHg',
      bpStatus: 'Normal',
      heartRate: 68,
      heartRateStatus: 'Normal',
      spo2: 99,
      spo2Status: 'Normal',
      weight: '54 kg',
      weightTrend: '+1 kg',
    },
  },
  {
    id: 'p-4',
    patientId: 'PT10236',
    name: 'Karan Verma',
    age: 40,
    gender: 'Male',
    status: 'Follow-up',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=160',
    phone: '+91 99345 67890',
    email: 'karan.verma@techcorp.in',
    location: 'Hyderabad, Telangana',
    dob: 'Jan 10, 1986 (40 years)',
    bloodGroup: 'AB+',
    height: '178 cm',
    weight: '82 kg',
    bmi: '25.9 (Overweight)',
    bmiStatus: 'Borderline',
    medicalConditions: ['Essential Hypertension', 'Dyslipidemia'],
    allergies: ['No known allergies'],
    medications: [
      { name: 'Telmisartan', dosage: '40 mg (OD)' },
      { name: 'Atorvastatin', dosage: '10 mg (HS)' },
    ],
    recentVisit: {
      date: 'Oct 28, 2026',
      type: 'Cardio Follow-up',
      reason: 'Routine ECG & lipid panel titration',
    },
    nextAppointment: {
      date: 'Nov 10, 2026',
      time: '12:00 PM',
      mode: 'Video Consultation',
    },
    vitals: {
      bp: '128 / 84 mmHg',
      bpStatus: 'Borderline',
      heartRate: 74,
      heartRateStatus: 'Normal',
      spo2: 98,
      spo2Status: 'Normal',
      weight: '82 kg',
      weightTrend: '-1.5 kg',
    },
  },
  {
    id: 'p-5',
    patientId: 'PT10237',
    name: 'Ananya Iyer',
    age: 26,
    gender: 'Female',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=160',
    phone: '+91 96456 78901',
    email: 'ananya.iyer@gmail.com',
    location: 'Chennai, Tamil Nadu',
    dob: 'Apr 03, 2000 (26 years)',
    bloodGroup: 'O-',
    height: '165 cm',
    weight: '56 kg',
    bmi: '20.6 (Normal)',
    bmiStatus: 'Normal',
    medicalConditions: ['Contact Dermatitis', 'Seasonal Rhinitis'],
    allergies: ['Nickel', 'Latex'],
    medications: [
      { name: 'Cetirizine', dosage: '10 mg (PRN)' },
      { name: 'Mometasone Cream', dosage: '0.1% (BD)' },
    ],
    recentVisit: {
      date: 'Nov 02, 2026',
      type: 'Dermatology Consultation',
      reason: 'Erythematous rash on bilateral forearms',
    },
    nextAppointment: {
      date: 'Nov 10, 2026',
      time: '02:00 PM',
      mode: 'In-Person Consultation',
    },
    vitals: {
      bp: '115 / 74 mmHg',
      bpStatus: 'Normal',
      heartRate: 70,
      heartRateStatus: 'Normal',
      spo2: 99,
      spo2Status: 'Normal',
      weight: '56 kg',
      weightTrend: 'Stable',
    },
  },
  {
    id: 'p-6',
    patientId: 'PT10238',
    name: 'Vikram Nair',
    age: 48,
    gender: 'Male',
    status: 'Follow-up',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=160',
    phone: '+91 95567 89012',
    email: 'vikram.nair@corp.com',
    location: 'Kochi, Kerala',
    dob: 'Sep 19, 1978 (48 years)',
    bloodGroup: 'B-',
    height: '172 cm',
    weight: '79 kg',
    bmi: '26.7 (Overweight)',
    bmiStatus: 'Borderline',
    medicalConditions: ['Osteoarthritis (Bilateral Knees)', 'Vitamin D Deficiency'],
    allergies: ['NSAIDs (causes gastritis)'],
    medications: [
      { name: 'Glucosamine Chondroitin', dosage: '1500 mg (OD)' },
      { name: 'Cholecalciferol', dosage: '60,000 IU (Weekly)' },
    ],
    recentVisit: {
      date: 'Oct 20, 2026',
      type: 'Orthopedic Review',
      reason: 'Knee crepitus & difficulty with stairs',
    },
    nextAppointment: {
      date: 'Nov 10, 2026',
      time: '03:00 PM',
      mode: 'In-Person Consultation',
    },
    vitals: {
      bp: '124 / 82 mmHg',
      bpStatus: 'Normal',
      heartRate: 72,
      heartRateStatus: 'Normal',
      spo2: 98,
      spo2Status: 'Normal',
      weight: '79 kg',
      weightTrend: '-1 kg',
    },
  },
];
