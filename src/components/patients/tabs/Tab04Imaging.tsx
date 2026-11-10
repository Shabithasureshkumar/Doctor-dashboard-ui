import React, { useState, useMemo } from 'react';
import {
  Scan,
  Download,
  Upload,
  Eye,
  FileText,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sun,
  Contrast,
  CheckCircle2,
} from 'lucide-react';
import { ImagingStudy } from '../../../types/clinical';
import { MOCK_IMAGING_STUDIES } from '../../../mockData/clinicalDetailsData';
import { PatientRecord } from '../../../mockData/patientsData';

interface Tab04ImagingProps {
  patient: PatientRecord;
  onToast: (msg: string) => void;
}

export const Tab04Imaging: React.FC<Tab04ImagingProps> = ({ patient, onToast }) => {
  const [studies, setStudies] = useState<ImagingStudy[]>(MOCK_IMAGING_STUDIES);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Modals
  const [viewingStudy, setViewingStudy] = useState<ImagingStudy | null>(null);
  const [dicomStudy, setDicomStudy] = useState<ImagingStudy | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // DICOM Viewer controls
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isInverted, setIsInverted] = useState(false);
  const [contrastLevel, setContrastLevel] = useState(50);

  // Upload Form
  const [newType, setNewType] = useState<ImagingStudy['imagingType']>('X-Ray');
  const [newBodyPart, setNewBodyPart] = useState('');
  const [newImpression, setNewImpression] = useState('');

  const categories = ['All', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'Mammogram', 'ECG / Echo'];

  const filteredStudies = useMemo(() => {
    if (activeCategory === 'All') return studies;
    return studies.filter((s) => s.imagingType === activeCategory);
  }, [studies, activeCategory]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudy: ImagingStudy = {
      id: `img-${Date.now()}`,
      imagingType: newType,
      bodyPart: newBodyPart,
      scanDate: 'Today',
      referringDoctor: 'Dr. Elena Vance, MD',
      radiologist: 'Dr. S. Kulkarni, MD',
      imagingCenter: 'Mednevo Diagnostics Facility',
      clinicalFindings: 'No acute abnormal focal mass or acute bony pathology.',
      impression: newImpression,
      reportStatus: 'Verified',
      dicomAvailable: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300',
    };
    setStudies([newStudy, ...studies]);
    setIsUploadOpen(false);
    setNewBodyPart('');
    setNewImpression('');
    onToast(`Imaging study ${newStudy.imagingType} (${newStudy.bodyPart}) added to records.`);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5C24FF] flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base sm:text-lg text-slate-900">
                Radiology & Diagnostic Imaging
              </h3>
              <p className="text-xs text-slate-500">
                PACS/DICOM imaging studies, radiologist interpretations & impressions
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToast('Exporting imaging history dossier...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All</span>
          </button>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Imaging</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#5C24FF] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-purple-50 hover:text-[#5C24FF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Studies List */}
      <div className="space-y-4">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 hover:border-purple-200 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5C24FF] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {study.imagingType.substring(0, 3).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-sora font-bold text-base text-slate-900">
                      {study.imagingType} – {study.bodyPart}
                    </h4>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {study.reportStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Scan Date: {study.scanDate} • Facility: {study.imagingCenter}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {study.dicomAvailable && (
                  <button
                    onClick={() => {
                      setDicomStudy(study);
                      setZoomLevel(100);
                      setIsInverted(false);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 text-[#5C24FF] hover:bg-purple-100 text-xs font-semibold transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View DICOM</span>
                  </button>
                )}
                <button
                  onClick={() => setViewingStudy(study)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5C24FF] text-white hover:opacity-95 text-xs font-semibold shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Report</span>
                </button>
              </div>
            </div>

            {/* Findings & Impressions Brief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Clinical Findings</span>
                <p className="text-slate-700 leading-relaxed">{study.clinicalFindings}</p>
              </div>

              <div className="p-3.5 bg-purple-50/40 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#5C24FF] block">Radiologist Impression</span>
                <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">{study.impression}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Referring MD: {study.referringDoctor}</span>
              <span>Signed by Radiologist: {study.radiologist}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View Structured Report Modal */}
      {viewingStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">
                    {viewingStudy.imagingType} Report
                  </h4>
                  <p className="text-xs text-slate-500">{viewingStudy.bodyPart} • {viewingStudy.scanDate}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingStudy(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient</span>
                  <span className="font-bold text-slate-900">{patient.name} ({patient.patientId})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Facility</span>
                  <span className="font-bold text-slate-900">{viewingStudy.imagingCenter}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Referring MD</span>
                  <span className="text-slate-800">{viewingStudy.referringDoctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Radiologist</span>
                  <span className="text-slate-800">{viewingStudy.radiologist}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wide text-slate-400">
                  Detailed Findings:
                </h5>
                <p className="p-3 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed">
                  {viewingStudy.clinicalFindings}
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#5C24FF] text-xs uppercase tracking-wide">
                  Clinical Impression:
                </h5>
                <p className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 text-slate-900 leading-relaxed font-medium whitespace-pre-line">
                  {viewingStudy.impression}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => onToast(`Downloading PDF Report for ${viewingStudy.imagingType}...`)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Signed Report</span>
                </button>
                <button
                  onClick={() => setViewingStudy(null)}
                  className="px-4 py-2 bg-[#5C24FF] text-white rounded-xl font-semibold hover:opacity-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive DICOM Viewer Modal */}
      {dicomStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
            {/* Top Toolbar */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Scan className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-sm text-white">
                    DICOM PACS Viewer: {dicomStudy.imagingType} – {dicomStudy.bodyPart}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Patient: {patient.name} • Series 1 / Slice 4 • 512x512 matrix 16-bit
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDicomStudy(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* DICOM Display Canvas */}
            <div className="p-6 flex-1 flex items-center justify-center bg-black min-h-[360px] relative overflow-hidden">
              <div
                className={`transition-all duration-150 relative ${isInverted ? 'invert' : ''}`}
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  filter: `contrast(${contrastLevel + 50}%)`,
                }}
              >
                {dicomStudy.thumbnailUrl ? (
                  <img
                    src={dicomStudy.thumbnailUrl}
                    alt="DICOM Slice"
                    className="max-h-[320px] rounded-lg shadow-2xl border border-slate-800 object-cover"
                  />
                ) : (
                  <div className="w-72 h-72 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    Radiology Slice Render
                  </div>
                )}
              </div>

              {/* Watermark overlay */}
              <div className="absolute top-4 left-4 text-[10px] text-emerald-400/80 font-mono space-y-0.5 pointer-events-none">
                <div>MEDNEVO PACS WORKSTATION</div>
                <div>WL: 40 / WW: 350</div>
                <div>TE: 20ms / TR: 600ms</div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-slate-400">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-700 mx-1" />

                <button
                  onClick={() => setIsInverted((v) => !v)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    isInverted
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  Invert Gray
                </button>

                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={contrastLevel}
                    onChange={(e) => setContrastLevel(parseInt(e.target.value))}
                    className="w-20 accent-purple-500"
                  />
                  <Contrast className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <button
                onClick={() => setDicomStudy(null)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Imaging Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5C24FF] text-white flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-base text-slate-900">Upload Imaging Study</h4>
                  <p className="text-xs text-slate-500">Attach DICOM or diagnostic radiology report</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Imaging Modality</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI">MRI (Magnetic Resonance)</option>
                  <option value="CT Scan">CT Scan (Computed Tomography)</option>
                  <option value="Ultrasound">Ultrasound (Sonogram)</option>
                  <option value="Mammogram">Mammogram</option>
                  <option value="ECG / Echo">ECG / Echocardiogram</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Anatomical Body Part</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumbar Spine (L1-S1)"
                  value={newBodyPart}
                  onChange={(e) => setNewBodyPart(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Radiologist Impression Summary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Clinical impression and findings..."
                  value={newImpression}
                  onChange={(e) => setNewImpression(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
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
                  Upload Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
