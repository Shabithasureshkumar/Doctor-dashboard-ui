export type ClinicalStatus = 'Normal' | 'High' | 'Low' | 'Critical' | 'Borderline';

export interface VitalMeasurement {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  spo2: number;
  temperatureC: number;
  temperatureF: number;
  weightKg: number;
  heightCm: number;
  bmi: number;
  respiratoryRate: number;
  source: 'Hospital Ward' | 'Bluetooth Clinic Cuff' | 'Patient App Sync' | 'Telehealth Kit';
  status: 'Normal' | 'Elevated' | 'Critical';
}

export interface LabResultItem {
  id: string;
  testName: string;
  category:
    | 'CBC'
    | 'Blood Glucose'
    | 'HbA1c'
    | 'Lipid Profile'
    | 'Thyroid Profile'
    | 'Liver Function'
    | 'Kidney Function'
    | 'Urine Analysis'
    | 'Vitamin D / B12'
    | 'Hormonal Tests';
  result: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: ClinicalStatus;
  collectionDate: string;
  reportDate: string;
  orderingDoctor: string;
  laboratoryName: string;
  flagged?: boolean;
  notes?: string;
}

export interface ImagingStudy {
  id: string;
  imagingType: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound' | 'Mammogram' | 'ECG / Echo';
  bodyPart: string;
  scanDate: string;
  referringDoctor: string;
  radiologist: string;
  imagingCenter: string;
  clinicalFindings: string;
  impression: string;
  reportStatus: 'Verified' | 'Preliminary' | 'Pending Review';
  dicomAvailable: boolean;
  thumbnailUrl?: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  route: 'Oral' | 'Subcutaneous' | 'Inhalation' | 'Topical' | 'Intravenous';
  duration: string;
  startDate: string;
  endDate?: string;
  prescribingDoctor: string;
  status: 'Active' | 'Past' | 'Discontinued';
  refillsRemaining: number;
  indications: string;
  discontinueReason?: string;
}

export interface ClinicalVisit {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  mode: 'In-Person' | 'Video Call';
  chiefComplaint: string;
  diagnosis: string;
  clinicalNotes: string;
  prescriptions: string[];
  testsOrdered: string[];
  followUpDate: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled' | 'Missed';
}

export interface CarePlanItem {
  id: string;
  planName: string;
  description: string;
  assignedDoctor: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Pending';
  goals: string[];
  lifestyleRecommendations: string[];
  reviewDate: string;
  careTeam: string[];
}

export interface HospitalisationRecord {
  id: string;
  hospitalName: string;
  admissionDate: string;
  dischargeDate: string;
  reasonForAdmission: string;
  primaryDiagnosis: string;
  attendingPhysician: string;
  wardDepartment: string;
  proceduresPerformed: string[];
  dischargeDiagnosis: string;
  dischargeMedications: string[];
  dischargeInstructions: string;
  followUpRecommendations: string;
  status: 'Currently Admitted' | 'Discharged' | 'Transferred';
}

export interface ClinicalDocument {
  id: string;
  documentName: string;
  category:
    | 'Medical Reports'
    | 'Lab Reports'
    | 'Imaging Reports'
    | 'Prescriptions'
    | 'Discharge Summaries'
    | 'Insurance Documents'
    | 'Consent Forms'
    | 'Referral Letters'
    | 'Previous Medical Records';
  uploadedBy: string;
  uploadedDate: string;
  fileType: 'PDF' | 'DICOM' | 'JPG' | 'PNG';
  fileSize: string;
  verificationStatus: 'Verified' | 'Pending Verification';
  aiSummaryNotes?: string;
}

export interface FamilyHistoryMember {
  relation: string;
  ageOrDOD: string;
  conditions: string[];
  status: 'Living' | 'Deceased';
}

export interface SocialHistoryData {
  smokingStatus: string;
  alcoholConsumption: string;
  physicalActivity: string;
  dietHabits: string;
  sleepPattern: string;
  occupation: string;
  livingSituation: string;
  supportSystem: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    caregiverDetails: string;
  };
}

export interface GeneticsAndRiskData {
  testHistory: {
    panelName: string;
    date: string;
    laboratory: string;
    summary: string;
  }[];
  knownVariants: {
    gene: string;
    variant: string;
    significance: 'Benign' | 'Likely Benign' | 'Uncertain' | 'Pathogenic' | 'Pharmacogenomic';
    clinicalImplication: string;
  }[];
  pharmacogenomics: {
    gene: string;
    phenotype: string;
    affectedDrugs: string;
    recommendation: string;
  }[];
  cardiovascularRisk: {
    scorePercentage: number;
    category: 'Low' | 'Borderline' | 'Intermediate' | 'High';
    modelUsed: string;
    interpretation: string;
  };
  diabetesRisk: {
    category: 'Low' | 'Moderate' | 'High';
    factors: string[];
    interpretation: string;
  };
  hereditaryCancerRisk: {
    status: 'Average Population Risk' | 'Elevated' | 'Genetic Variant Present';
    genesTested: string;
    interpretation: string;
  };
  counsellingNotes: string;
}

export interface SoapNoteRecord {
  id: string;
  date: string;
  time: string;
  authorDoctor: string;
  status: 'Draft' | 'Finalized & Signed';
  signature?: string;
  version: number;
  subjective: {
    chiefComplaint: string;
    historyOfPresentIllness: string;
    symptoms: string[];
    medicalHistory: string;
    patientStatements: string;
  };
  objective: {
    vitalSigns: string;
    physicalExamination: string;
    laboratoryFindings: string;
    diagnosticFindings: string;
  };
  assessment: {
    clinicalAssessment: string;
    primaryDiagnosis: string;
    secondaryDiagnosis: string;
    clinicalObservations: string;
  };
  plan: {
    treatmentPlan: string;
    medications: string[];
    testsOrdered: string[];
    referrals: string;
    followUpInstructions: string;
  };
}

export interface MenstrualCycleData {
  lastMenstrualPeriod: string;
  averageCycleLengthDays: number;
  averagePeriodDurationDays: number;
  cycleRegularity: 'Regular' | 'Irregular' | 'Polycystic Variation';
  predictedNextPeriod: string;
  currentCyclePhase: 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';
  cycleDay: number;
  cycleHistory: {
    month: string;
    startDate: string;
    durationDays: number;
    cycleLengthDays: number;
    flowIntensity: 'Light' | 'Medium' | 'Heavy';
  }[];
  symptomsLog: {
    symptom: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    phase: string;
  }[];
  bbtTrend: {
    day: number;
    temperatureF: number;
    phase: string;
  }[];
  ovulationTracking: {
    lhSurgeDetected: boolean;
    predictedOvulationWindow: string;
    cervicalMucusType: string;
  };
  cycleMedications: string[];
  clinicalGynecologicalNotes: string;
}
