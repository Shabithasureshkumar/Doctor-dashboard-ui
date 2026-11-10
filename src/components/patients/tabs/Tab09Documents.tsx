import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Upload,
  Download,
  Trash2,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCheck,
} from 'lucide-react';
import { ClinicalDocument } from '../../../types/clinical';
import { MOCK_DOCUMENTS } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab09DocumentsProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab09Documents: React.FC<Tab09DocumentsProps> = ({ patient, onToast }) => {
  const [documents, setDocuments] = useState<ClinicalDocument[]>(MOCK_DOCUMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [previewDoc, setPreviewDoc] = useState<ClinicalDocument | null>(null);
  const [analyzingDoc, setAnalyzingDoc] = useState<ClinicalDocument | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<ClinicalDocument | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload state
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<ClinicalDocument['category']>('Medical Reports');

  const categories = [
    'All',
    'Medical Reports',
    'Lab Reports',
    'Imaging Reports',
    'Prescriptions',
    'Discharge Summaries',
    'Insurance Documents',
    'Consent Forms',
    'Referral Letters',
    'Previous Medical Records',
  ];

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          doc.documentName.toLowerCase().includes(q) ||
          doc.uploadedBy.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [documents, selectedCategory, searchQuery]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: ClinicalDocument = {
      id: `doc-${Date.now()}`,
      documentName: uploadName.endsWith('.pdf') ? uploadName : `${uploadName}.pdf`,
      category: uploadCategory,
      uploadedBy: 'Dr. Elena Vance, MD',
      uploadedDate: 'Today',
      fileType: 'PDF',
      fileSize: '512 KB',
      verificationStatus: 'Verified',
      aiSummaryNotes: `Clinical ${uploadCategory} record authenticated for patient ${patient.name}.`,
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
    setUploadName('');
    onToast(`Document "${newDoc.documentName}" uploaded to patient archive.`);
  };

  const handleConfirmDelete = () => {
    if (!deletingDoc) return;
    setDocuments((prev) => prev.filter((d) => d.id !== deletingDoc.id));
    onToast(`Document "${deletingDoc.documentName}" removed.`);
    setDeletingDoc(null);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Medical Records & Clinical Documentation
              </h3>
              <p className="text-xs text-slate-500">
                Encrypted clinical vault, consent agreements, insurance approvals & AI document analysis
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents by name or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            />
          </div>

          <span className="text-xs text-slate-400 font-medium">
            {filteredDocs.length} Total Documents Archived
          </span>
        </div>

        {/* Categories Ribbon */}
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

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-200 transition-all text-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                {doc.fileType}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-sora font-bold text-sm text-slate-900 truncate">
                    {doc.documentName}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {doc.verificationStatus}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Category: <strong>{doc.category}</strong> • Size: {doc.fileSize} • Uploaded by {doc.uploadedBy} on {doc.uploadedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <button
                onClick={() => setAnalyzingDoc(doc)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-[#5C24FF] hover:bg-purple-100 font-semibold"
                title="AI Document Summary"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Insights</span>
              </button>

              <button
                onClick={() => setPreviewDoc(doc)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => onToast(`Downloading ${doc.documentName}...`)}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#5C24FF]"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setDeletingDoc(doc)}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
            No clinical documents found matching current filter.
          </div>
        )}
      </div>

      {/* PDF Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">{previewDoc.documentName}</h4>
                <p className="text-slate-500">{previewDoc.category} • {previewDoc.uploadedDate}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-center">
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <FileCheck className="w-12 h-12 text-[#5C24FF] mx-auto" />
                <h5 className="font-sora font-bold text-base text-slate-900">{previewDoc.documentName}</h5>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Signed and verified clinical document in Mednevo EHR. File size: {previewDoc.fileSize}.
                </p>
                {previewDoc.aiSummaryNotes && (
                  <div className="p-3 bg-purple-50 rounded-xl text-left text-slate-700 leading-relaxed border border-purple-100">
                    <strong>Document Summary:</strong> {previewDoc.aiSummaryNotes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onToast(`Downloading ${previewDoc.documentName}...`)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-5 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Document Analysis Modal */}
      {analyzingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#5C24FF]" />
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">AI Document Analysis</h4>
                  <p className="text-slate-500">{analyzingDoc.documentName}</p>
                </div>
              </div>
              <button
                onClick={() => setAnalyzingDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2 text-slate-800 leading-relaxed">
                <span className="font-bold text-[#5C24FF] block">Synthesized Extraction:</span>
                <p>
                  {analyzingDoc.aiSummaryNotes ||
                    'Document verified with 100% optical character recognition confidence. Key entities extracted: Patient ID PT10256, Attending Provider Dr. Elena Vance.'}
                </p>
                <ul className="space-y-1 text-slate-600 pt-1">
                  <li>• Document Authenticity: <strong>Cryptographically verified signature</strong></li>
                  <li>• Sensitive Data (PHI): <strong>HIPAA & GDPR Compliant encryption</strong></li>
                  <li>• Follow-up Trigger: <strong>No acute emergency triggers identified</strong></li>
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setAnalyzingDoc(null)}
                  className="px-4 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Document Confirmation Dialog */}
      {deletingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden text-xs p-5 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-sora font-bold text-base text-slate-900">Delete Document</h4>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong>{deletingDoc.documentName}</strong> from the patient's records? This action is logged in the clinical audit history.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeletingDoc(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-xs">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-sora font-bold text-base text-slate-900">Upload Clinical Record</h4>
                <p className="text-slate-500">PDF, DICOM or scanned diagnostic attachments</p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ophthalmology Retina Evaluation 2026"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="Medical Reports">Medical Reports</option>
                  <option value="Lab Reports">Lab Reports</option>
                  <option value="Imaging Reports">Imaging Reports</option>
                  <option value="Prescriptions">Prescriptions</option>
                  <option value="Discharge Summaries">Discharge Summaries</option>
                  <option value="Insurance Documents">Insurance Documents</option>
                  <option value="Consent Forms">Consent Forms</option>
                  <option value="Referral Letters">Referral Letters</option>
                  <option value="Previous Medical Records">Previous Medical Records</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-purple-200 rounded-2xl text-center bg-purple-50/30 space-y-1">
                <FileText className="w-6 h-6 text-[#5C24FF] mx-auto" />
                <span className="font-semibold text-slate-700 block">Click to select PDF or drag and drop</span>
                <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 25MB</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C24FF] text-white font-sora font-semibold rounded-xl shadow-md"
                >
                  Upload & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
