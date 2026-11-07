import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Mic, Check, Copy, Save } from 'lucide-react';

interface AIScribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

export const AIScribeModal: React.FC<AIScribeModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Sarah Johnson',
}) => {
  const [isRecording, setIsRecording] = useState(true);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const soapNote = {
    subjective: `Patient presents for hypertension follow-up. Reports mild morning headaches over the past 5 days. Denies chest pain, shortness of breath, or visual disturbances. Patient notes taking Lisinopril consistently.`,
    objective: `BP: 152/103 mmHg (elevated, trending up from 133/86 avg). HR: 74 bpm regular. Heart sounds normal S1/S2, no murmurs. Lungs clear to auscultation bilaterally. No peripheral edema.`,
    assessment: `1. Essential Hypertension, uncontrolled on current regimen.\n2. Potential secondary factors or need for dosage titration.`,
    plan: `1. Titrate Lisinopril from 10mg to 20mg once daily.\n2. Add home BP log twice daily for 14 days.\n3. Routine BMP lab ordered to monitor renal function and potassium.\n4. Follow-up telemedicine visit in 2 weeks.`,
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(
      `SOAP NOTE — ${patientName}\n\nS: ${soapNote.subjective}\n\nO: ${soapNote.objective}\n\nA: ${soapNote.assessment}\n\nP: ${soapNote.plan}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ava AI Clinical Scribe"
      subtitle={`Ambient visit documentation for ${patientName}`}
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Recording Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 border border-purple-100">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-3 h-3 rounded-full ${
                isRecording ? 'bg-rose-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span className="font-sora font-semibold text-xs text-slate-800">
              {isRecording ? 'Listening & Transcribing live session...' : 'Recording paused'}
            </span>
          </div>

          <button
            onClick={() => setIsRecording(!isRecording)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isRecording ? 'Pause' : 'Resume'}</span>
          </button>
        </div>

        {/* Structured SOAP Note */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {/* S */}
          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <h5 className="font-sora font-bold text-xs text-[#6E56CF] uppercase tracking-wider mb-1">
              Subjective (S)
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed">{soapNote.subjective}</p>
          </div>

          {/* O */}
          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <h5 className="font-sora font-bold text-xs text-[#6E56CF] uppercase tracking-wider mb-1">
              Objective (O)
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed">{soapNote.objective}</p>
          </div>

          {/* A */}
          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <h5 className="font-sora font-bold text-xs text-[#6E56CF] uppercase tracking-wider mb-1">
              Assessment (A)
            </h5>
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
              {soapNote.assessment}
            </p>
          </div>

          {/* P */}
          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <h5 className="font-sora font-bold text-xs text-[#6E56CF] uppercase tracking-wider mb-1">
              Plan (P)
            </h5>
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
              {soapNote.plan}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy SOAP Note'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-[#6E56CF] hover:bg-[#5E45BE] text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-sm transition-all active:scale-95"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saved ? 'Saved' : 'Save to Patient Chart'}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
