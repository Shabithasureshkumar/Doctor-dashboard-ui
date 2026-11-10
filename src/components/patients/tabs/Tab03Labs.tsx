import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Search,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Eye,
  X,
  FileText,
  Clock,
} from 'lucide-react';
import { LabResultItem, ClinicalStatus } from '../../../types/clinical';
import { MOCK_LAB_RESULTS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';
import { FileDropzone, DroppedFileInfo } from '../../common/FileDropzone';

interface Tab03LabsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab03Labs: React.FC<Tab03LabsProps> = ({ patient, onToast }) => {
  const [labResults, setLabResults] = useState<LabResultItem[]>(MOCK_LAB_RESULTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedReport, setSelectedReport] = useState<LabResultItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<DroppedFileInfo | null>(null);
  const [uploadTestName, setUploadTestName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<LabResultItem['category']>('CBC');
  const [uploadResult, setUploadResult] = useState('');
  const [uploadUnit, setUploadUnit] = useState('mg/dL');
  const [uploadRange, setUploadRange] = useState('70 - 100');

  const categories = [
    'All',
    'CBC',
    'Blood Glucose',
    'HbA1c',
    'Lipid Profile',
    'Thyroid Profile',
    'Liver Function',
    'Kidney Function',
    'Urine Analysis',
    'Vitamin D / B12',
    'Hormonal Tests',
  ];

  const filteredLabs = useMemo(() => {
    return labResults.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.testName.toLowerCase().includes(q) ||
          item.laboratoryName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [labResults, selectedCategory, searchQuery]);

  const flaggedCount = useMemo(() => {
    return labResults.filter((l) => l.status === 'High' || l.status === 'Low' || l.status === 'Critical')
      .length;
  }, [labResults]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = uploadTestName.trim() || (uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Diagnostic Lab Panel');
    const newLab: LabResultItem = {
      id: `lab-${Date.now()}`,
      testName: displayName,
      category: uploadCategory,
      result: uploadResult || 'Attached',
      unit: uploadUnit,
      referenceRange: uploadRange,
      status: 'Normal',
      collectionDate: 'Today',
      reportDate: 'Today',
      orderingDoctor: 'Dr. Elena Vance, MD',
      laboratoryName: uploadedFile ? `Attached: ${uploadedFile.name} (${uploadedFile.sizeFormatted})` : 'Mednevo Central Diagnostics',
    };
    setLabResults([newLab, ...labResults]);
    setIsUploadOpen(false);
    setUploadTestName('');
    setUploadResult('');
    setUploadedFile(null);
    onToast(`Lab report "${displayName}" uploaded and integrated successfully.`);
  };

  const getStatusBadge = (status: ClinicalStatus) => {
    switch (status) {
      case 'Normal':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Normal
          </span>
        );
      case 'High':
      case 'Low':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> {status}
          </span>
        );
      case 'Critical':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Critical
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Top Banner with Actions */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Laboratory Diagnostic Results
              </h3>
              <p className="text-xs text-slate-500">
                Verified laboratory panels, chemistry, reference limits & abnormal alerts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onToast('Downloading Complete Laboratory Diagnostic Dossier (PDF)...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All PDF</span>
          </button>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Lab Report</span>
          </button>
        </div>
      </div>

      {/* Critical / Abnormal Notification if any */}
      {flaggedCount > 0 && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Attention Required:</strong> {flaggedCount} test result flagged outside normal reference limits (LDL Cholesterol 112 mg/dL - High/Borderline).
            </span>
          </div>
          <button
            onClick={() => setSelectedCategory('Lipid Profile')}
            className="text-[11px] font-bold text-[#5C24FF] hover:underline whitespace-nowrap"
          >
            View Lipid Profile →
          </button>
        </div>
      )}

      {/* Search & Category Filter Pills */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search test name or laboratory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>1 Pending Result: <strong>Urine Culture & Sensitivity</strong> (Expected within 24h)</span>
          </div>
        </div>

        {/* Categories scroll ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5C24FF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Laboratory Results Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="font-sora font-bold text-sm sm:text-base text-slate-900">
            Diagnostic Test Records ({filteredLabs.length})
          </h4>
          <span className="text-xs text-slate-400 font-medium">Ordering MD: Dr. Elena Vance</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                <th className="pb-3 font-semibold">Test Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Result</th>
                <th className="pb-3 font-semibold">Reference Range</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Collection & Report Date</th>
                <th className="pb-3 font-semibold">Laboratory</th>
                <th className="pb-3 font-semibold text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLabs.map((lab) => (
                <tr
                  key={lab.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    lab.flagged ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <td className="py-3 font-bold text-slate-900">
                    <div>{lab.testName}</div>
                    {lab.notes && (
                      <span className="text-[10px] text-amber-700 font-normal block mt-0.5">
                        {lab.notes}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-purple-50 text-[#5C24FF] rounded-md text-[11px] font-medium">
                      {lab.category}
                    </span>
                  </td>
                  <td className="py-3 font-extrabold text-slate-900">
                    {lab.result}{' '}
                    <span className="text-slate-400 font-normal text-[11px]">{lab.unit}</span>
                  </td>
                  <td className="py-3 text-slate-500 font-mono text-[11px]">
                    {lab.referenceRange}
                  </td>
                  <td className="py-3">{getStatusBadge(lab.status)}</td>
                  <td className="py-3 text-slate-600">
                    <div>{lab.reportDate}</div>
                    <span className="text-[10px] text-slate-400">Collected: {lab.collectionDate}</span>
                  </td>
                  <td className="py-3 text-slate-600 truncate max-w-[140px]">
                    {lab.laboratoryName}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedReport(lab)}
                      className="p-1.5 rounded-lg text-[#5C24FF] hover:bg-purple-50 font-semibold transition-colors inline-flex items-center gap-1"
                      title="View Lab Report"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Lab Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">
                    {selectedReport.testName}
                  </h4>
                  <p className="text-xs text-slate-500">Official Laboratory Diagnostic Report</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient</span>
                  <span className="font-bold text-slate-900">{patient.name} ({patient.patientId})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Ordering MD</span>
                  <span className="font-bold text-slate-900">{selectedReport.orderingDoctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Laboratory</span>
                  <span className="text-slate-800">{selectedReport.laboratoryName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Report Date</span>
                  <span className="text-slate-800">{selectedReport.reportDate}</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{selectedReport.testName}</span>
                  {getStatusBadge(selectedReport.status)}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-sora font-extrabold text-2xl text-slate-900">
                    {selectedReport.result}
                  </span>
                  <span className="text-slate-500 text-xs">{selectedReport.unit}</span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Established Reference Limits: <strong>{selectedReport.referenceRange}</strong>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onToast(`Downloading official PDF for ${selectedReport.testName}...`)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold hover:opacity-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Lab Report Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">Upload New Lab Result</h4>
                  <p className="text-xs text-slate-500">Direct laboratory document integration</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5 text-xs max-h-[80vh] overflow-y-auto">
              {/* File Dropzone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Lab Document / Report File
                </label>
                <FileDropzone
                  selectedFile={uploadedFile}
                  onFileSelect={(f) => {
                    setUploadedFile(f);
                    if (f && !uploadTestName) {
                      setUploadTestName(f.name.replace(/\.[^/.]+$/, ''));
                    }
                  }}
                  label="Drop a file or browse files"
                  helperText="Supports PDF, DICOM, JPG, PNG up to 25 MB"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Test Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Blood Count (CBC) or Lipid Profile"
                  value={uploadTestName}
                  onChange={(e) => setUploadTestName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
                >
                  <option value="CBC">Complete Blood Count (CBC)</option>
                  <option value="Blood Glucose">Blood Glucose</option>
                  <option value="HbA1c">HbA1c</option>
                  <option value="Lipid Profile">Lipid Profile</option>
                  <option value="Thyroid Profile">Thyroid Profile</option>
                  <option value="Liver Function">Liver Function</option>
                  <option value="Kidney Function">Kidney Function</option>
                  <option value="Vitamin D / B12">Vitamin D / B12</option>
                  <option value="Hormonal Tests">Hormonal Tests</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Result Value</label>
                  <input
                    type="text"
                    placeholder="e.g. 14.2 (or see attached)"
                    value={uploadResult}
                    onChange={(e) => setUploadResult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={uploadUnit}
                    onChange={(e) => setUploadUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reference Range</label>
                <input
                  type="text"
                  value={uploadRange}
                  onChange={(e) => setUploadRange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadOpen(false);
                    setUploadedFile(null);
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md hover:bg-[#501fe0] transition-colors"
                >
                  Save &amp; Verify Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
