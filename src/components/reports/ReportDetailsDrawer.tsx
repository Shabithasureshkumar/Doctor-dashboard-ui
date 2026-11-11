import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  ExternalLink,
  Save,
  Activity,
  Scan,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import { MedicalReport } from '../../types/reports';

interface ReportDetailsDrawerProps {
  report: MedicalReport | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsReviewed: (id: string, notes?: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onShareWithPatient: (id: string) => void;
  onOpenPatientChart: (name: string) => void;
  onToast: (msg: string) => void;
}

export const ReportDetailsDrawer: React.FC<ReportDetailsDrawerProps> = ({
  report,
  isOpen,
  onClose,
  onMarkAsReviewed,
  onSaveNotes,
  onShareWithPatient,
  onOpenPatientChart,
  onToast,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 !m-0 !p-0">
      <div className="fixed inset-0 top-0 left-0 right-0 bottom-0" onClick={onClose} aria-hidden="true" />
      <ReportDetailsContent
        key={report.id}
        report={report}
        onClose={onClose}
        onMarkAsReviewed={onMarkAsReviewed}
        onSaveNotes={onSaveNotes}
        onShareWithPatient={onShareWithPatient}
        onOpenPatientChart={onOpenPatientChart}
        onToast={onToast}
      />
    </div>
  );
};

interface ReportDetailsContentProps {
  report: MedicalReport;
  onClose: () => void;
  onMarkAsReviewed: (id: string, notes?: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onShareWithPatient: (id: string) => void;
  onOpenPatientChart: (name: string) => void;
  onToast: (msg: string) => void;
}

const ReportDetailsContent: React.FC<ReportDetailsContentProps> = ({
  report,
  onClose,
  onMarkAsReviewed,
  onSaveNotes,
  onShareWithPatient,
  onOpenPatientChart,
  onToast,
}) => {
  const [notes, setNotes] = useState(report.doctorNotes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    setTimeout(() => {
      onSaveNotes(report.id, notes);
      setIsSavingNotes(false);
      onToast('Clinical evaluation notes saved successfully.');
    }, 400);
  };

  const handleDownloadPdf = () => {
    onToast(`Downloading signed report ${report.pdfDownloadName || report.id + '.pdf'}...`);
  };

  const isReviewed = report.status === 'Reviewed';

  return (
    <div className="relative w-full max-w-2xl bg-white h-screen max-h-screen shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-250 !m-0 !p-0">
      {/* Drawer Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/70 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 shadow-md">
            {report.type === 'Lab' ? (
              <FlaskConical className="w-6 h-6" />
            ) : report.type === 'Imaging' ? (
              <Scan className="w-6 h-6" />
            ) : (
              <Activity className="w-6 h-6" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#5C24FF] bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                {report.id}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  report.status === 'Critical'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : report.status === 'Abnormal'
                    ? 'bg-purple-100 text-[#5C24FF] border border-purple-200'
                    : report.status === 'Reviewed'
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {report.status}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {report.type} Investigation
              </span>
            </div>
            <h2 className="font-sora font-extrabold text-base sm:text-lg text-slate-900 truncate mt-1">
              {report.testName}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        {/* SECTION 1: Patient Information Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 via-white to-slate-50 border border-purple-100/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={report.patientAvatar}
                alt={report.patientName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-200 shadow-xs flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-sora font-bold text-sm text-slate-900 truncate">
                  {report.patientName}
                </h3>
                <p className="text-xs text-slate-500">
                  ID: <span className="font-mono font-semibold text-[#5C24FF]">{report.patientId}</span> • {report.patientAge} yrs • {report.patientGender}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenPatientChart(report.patientName)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 hover:bg-purple-50 text-[#5C24FF] font-sora font-semibold text-xs transition-colors shadow-2xs flex-shrink-0"
            >
              <span>Full Chart</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-100/60 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Blood Group</span>
              <span className="font-semibold text-slate-800">{report.patientBloodGroup}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Ordering Doctor</span>
              <span className="font-semibold text-slate-800 truncate block">{report.orderingPhysician}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Facility</span>
              <span className="font-semibold text-slate-800 truncate block">{report.diagnosticCenter}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Report Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Requested</span>
            <span className="font-semibold text-slate-800">{report.requestedDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Received</span>
            <span className="font-semibold text-slate-800">{report.receivedDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Priority</span>
            <span
              className={`font-bold ${
                report.priority === 'Urgent'
                  ? 'text-rose-600'
                  : report.priority === 'High'
                  ? 'text-amber-600'
                  : 'text-slate-700'
              }`}
            >
              {report.priority}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Patient Sharing</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              {report.sharedWithPatient ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shared</span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">Not shared</span>
              )}
            </span>
          </div>
        </div>

        {/* SECTION 3: TEST RESULTS SPECIFIC TO REPORT TYPE */}

        {/* 3A. Lab Report Details Table */}
        {report.type === 'Lab' && report.labDetails && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-sora font-bold text-sm text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#5C24FF]" />
                <span>Observed Laboratory Test Values</span>
              </h4>
              <span className="text-[10px] text-slate-400">
                Specimen: {report.labDetails.specimenType}
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-sora font-bold text-[11px]">
                      <th className="p-3">Test Parameter</th>
                      <th className="p-3 text-right">Observed Value</th>
                      <th className="p-3">Reference Range</th>
                      <th className="p-3 text-center">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.labDetails.testItems.map((item, idx) => {
                      const isAbnormal =
                        item.interpretation === 'High' ||
                        item.interpretation === 'Low' ||
                        item.interpretation === 'Critical';
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50/60 transition-colors ${
                            item.interpretation === 'Critical'
                              ? 'bg-rose-50/40'
                              : isAbnormal
                              ? 'bg-amber-50/30'
                              : ''
                          }`}
                        >
                          <td className="p-3 font-semibold text-slate-800">
                            <div>{item.name}</div>
                            {item.clinicalSignificance && (
                              <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                                {item.clinicalSignificance}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right font-sora font-bold text-slate-900">
                            <span
                              className={
                                item.interpretation === 'Critical'
                                    ? 'text-rose-600'
                                    : isAbnormal
                                    ? 'text-amber-600'
                                    : 'text-slate-800'
                              }
                            >
                              {item.value} {item.unit}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-slate-500 text-[11px]">
                            {item.referenceRange} {item.unit}
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                                item.interpretation === 'Critical'
                                  ? 'bg-rose-100 text-rose-700'
                                  : item.interpretation === 'High' || item.interpretation === 'Low'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {item.interpretation}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3B. Imaging Report Details */}
        {report.type === 'Imaging' && report.imagingDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-sora font-bold text-sm text-slate-900 flex items-center gap-2">
                <Scan className="w-4 h-4 text-[#5C24FF]" />
                <span>Radiological Findings &amp; Scan Preview</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {report.imagingDetails.imagingType} • {report.imagingDetails.bodyRegion}
              </span>
            </div>

            {/* Scan image preview */}
            {report.imagingDetails.imageUrl && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 relative group">
                <img
                  src={report.imagingDetails.imageUrl}
                  alt={report.testName}
                  className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <span>
                    {report.imagingDetails.technique}
                  </span>
                  <span className="font-bold text-purple-300">DICOM Diagnostic Slice</span>
                </div>
              </div>
            )}

            {/* Radiologist Observations */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-sora font-bold text-xs text-slate-800 block">
                Radiologist Observations:
              </span>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {report.imagingDetails.radiologistFindings.map((finding, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Impression */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
              <span className="font-sora font-bold text-xs text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5C24FF]" />
                Radiologist Clinical Impression:
              </span>
              <p className="text-xs text-purple-900 leading-relaxed font-medium">
                {report.imagingDetails.impression}
              </p>
              <div className="pt-2 text-[11px] text-purple-700">
                Signed: <strong>{report.imagingDetails.radiologistName}</strong> ({report.imagingDetails.radiologistCredentials})
              </div>
            </div>
          </div>
        )}

        {/* 3C. Diagnostic Report Details (ECG / Holter / Spirometry) */}
        {report.type === 'Diagnostic' && report.diagnosticDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-sora font-bold text-sm text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#5C24FF]" />
                <span>Cardiorespiratory Diagnostic Findings</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {report.diagnosticDetails.diagnosticType} Diagnostic
              </span>
            </div>

            {/* Tracing preview */}
            {report.diagnosticDetails.tracingUrl && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 relative">
                <img
                  src={report.diagnosticDetails.tracingUrl}
                  alt={report.testName}
                  className="w-full h-44 object-cover opacity-85"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[10px] font-mono">
                  25 mm/s • 10 mm/mV Calibration
                </div>
              </div>
            )}

            {/* Indication & Findings */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-sora font-bold text-xs text-slate-800 block">
                Electrophysiological Findings:
              </span>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {report.diagnosticDetails.findings.map((f, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <span className="font-sora font-bold text-xs text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Interpretation &amp; Recommendations:
              </span>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {report.diagnosticDetails.interpretation}
              </p>
              {report.diagnosticDetails.cardiologistName && (
                <div className="pt-2 text-[11px] text-amber-800">
                  Interpreting Specialist: <strong>{report.diagnosticDetails.cardiologistName}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 4: Doctor Clinical Notes & Sign-off */}
        <div className="space-y-2.5 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="font-sora font-bold text-xs text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5C24FF]" />
              <span>Physician Clinical Notes &amp; Action Plan</span>
            </label>
            {report.reviewedAt && (
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Signed: {report.reviewedAt}
              </span>
            )}
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your clinical interpretation, therapeutic adjustments, or patient follow-up instructions..."
            rows={3}
            className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF] bg-slate-50/40 text-slate-800 placeholder-slate-400 leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNotes}
              disabled={isSavingNotes}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-sora font-semibold text-xs transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 flex-wrap flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-sora font-semibold text-xs transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => onShareWithPatient(report.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-sora font-semibold transition-colors shadow-2xs ${
              report.sharedWithPatient
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white border-slate-200 hover:bg-purple-50 hover:text-[#5C24FF] text-slate-700'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{report.sharedWithPatient ? 'Shared with Patient' : 'Share with Patient'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isReviewed ? (
            <button
              onClick={() => onMarkAsReviewed(report.id, notes)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs shadow-md hover:opacity-95 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Reviewed</span>
            </button>
          ) : (
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-sora font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Signed Off</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
