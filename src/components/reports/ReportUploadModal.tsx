import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Upload, ShieldCheck } from 'lucide-react';
import { MedicalReport, ReportType, ReportPriority } from '../../types/reports';
import { INITIAL_PATIENTS_LIST } from '../../mockData/patientsData';
import { FileDropzone, DroppedFileInfo } from '../common/FileDropzone';

interface ReportUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newReport: MedicalReport) => void;
  onToast: (msg: string) => void;
}

export const ReportUploadModal: React.FC<ReportUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onToast,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(INITIAL_PATIENTS_LIST[0].patientId);
  const [reportType, setReportType] = useState<ReportType>('Lab');
  const [testName, setTestName] = useState('');
  const [priority, setPriority] = useState<ReportPriority>('Normal');
  const [orderingPhysician, setOrderingPhysician] = useState('Dr. David Brock, MD');
  const [labFacility, setLabFacility] = useState('Mednevo Central Diagnostics');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<DroppedFileInfo | null>(null);
  const [reportSeq, setReportSeq] = useState(3412);

  const selectedPatient = INITIAL_PATIENTS_LIST.find((p) => p.patientId === selectedPatientId) || INITIAL_PATIENTS_LIST[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalTestName = testName.trim() || (uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Diagnostic Study');
    const newReportId = `REP-${reportSeq}`;
    setReportSeq((s) => s + 1);

    const newReport: MedicalReport = {
      id: newReportId,
      patientId: selectedPatient.patientId,
      patientName: selectedPatient.name,
      patientAge: selectedPatient.age,
      patientGender: selectedPatient.gender,
      patientBloodGroup: selectedPatient.bloodGroup,
      patientAvatar: selectedPatient.avatarUrl,
      type: reportType,
      testName: finalTestName,
      categoryLabel: reportType === 'Lab' ? 'Lab Report' : reportType === 'Imaging' ? 'Imaging Study' : `${reportType} Report`,
      requestedDate: 'Today',
      receivedDate: 'Today',
      priority,
      status: 'Pending Review',
      orderingPhysician,
      diagnosticCenter: uploadedFile
        ? `${labFacility} • Attached: ${uploadedFile.name}`
        : labFacility,
      doctorNotes: notes.trim() || (uploadedFile ? `Attached file: ${uploadedFile.name} (${uploadedFile.sizeFormatted}). Awaiting physician sign-off.` : undefined),
      pdfDownloadName: uploadedFile?.name || `${finalTestName.replace(/\s+/g, '_')}_Report.pdf`,
      labDetails: reportType === 'Lab' ? {
        specimenType: 'Venous Whole Blood',
        collectionDate: 'Today, 08:30 AM',
        reportingDate: 'Today, 10:45 AM',
        methodology: 'Automated Diagnostic Analyzer',
        testItems: [
          {
            name: finalTestName,
            value: 'Diagnostic Value Verified',
            unit: 'Index / Std',
            referenceRange: 'Clinical Reference Range Intact',
            interpretation: 'Normal',
            clinicalSignificance: 'Specimen verified without hemolytic or lipemic interference.',
          },
        ],
      } : undefined,
    };

    onUpload(newReport);
    onToast(`Report ${newReportId} for ${selectedPatient.name} uploaded successfully.`);
    handleClose();
  };

  const handleClose = () => {
    setTestName('');
    setNotes('');
    setUploadedFile(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Patient Medical Report"
      subtitle="Direct diagnostic clearinghouse & PACS document ingest"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-inter text-xs">
        {/* Patient Selection Card */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Patient</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
          >
            {INITIAL_PATIENTS_LIST.map((p) => (
              <option key={p.patientId} value={p.patientId}>
                {p.name} ({p.patientId}) • {p.age}y, {p.gender} • Blood: {p.bloodGroup}
              </option>
            ))}
          </select>
        </div>

        {/* File Dropzone */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">
            Diagnostic Report / Scan File
          </label>
          <FileDropzone
            selectedFile={uploadedFile}
            onFileSelect={(f) => {
              setUploadedFile(f);
              if (f && !testName) {
                setTestName(f.name.replace(/\.[^/.]+$/, ''));
              }
            }}
            label="Drop a file or browse files"
            helperText="Supports PDF, DICOM (.dcm), JPG, PNG up to 25 MB"
          />
        </div>

        {/* Report Type & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Report Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
            >
              <option value="Lab">Lab Report</option>
              <option value="Imaging">Imaging (X-Ray / MRI / CT)</option>
              <option value="Diagnostic">Diagnostic Report (ECG / ECHO)</option>
              <option value="Clinical">Clinical Report</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Triage Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as ReportPriority)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
            >
              <option value="Normal">Normal Priority</option>
              <option value="High">High Priority</option>
              <option value="Urgent">Urgent / STAT Review</option>
            </select>
          </div>
        </div>

        {/* Test Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Test / Investigation Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Complete Blood Count (CBC) or Chest X-Ray (PA)"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
          />
        </div>

        {/* Ordering Physician & Diagnostic Center */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ordering Physician</label>
            <input
              type="text"
              value={orderingPhysician}
              onChange={(e) => setOrderingPhysician(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Laboratory / Imaging Center</label>
            <input
              type="text"
              value={labFacility}
              onChange={(e) => setLabFacility(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
            />
          </div>
        </div>

        {/* Clinical Notes */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Preliminary Clinical Notes (Optional)</label>
          <textarea
            rows={2}
            placeholder="Initial clinical observations or reason for investigation..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted HIPAA Diagnostic Clearinghouse</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-md hover:opacity-95 transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload &amp; Add Report</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
