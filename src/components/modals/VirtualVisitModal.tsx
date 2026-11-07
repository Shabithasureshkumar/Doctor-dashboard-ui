import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Sparkles } from 'lucide-react';

interface VirtualVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

export const VirtualVisitModal: React.FC<VirtualVisitModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Sarah Johnson',
}) => {
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [aiScribeActive, setAiScribeActive] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Telehealth Visit — ${patientName}`}
      subtitle="Encrypted HIPAA-compliant video session"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Video Simulation Canvas */}
        <div className="relative aspect-video w-full rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-800">
          {cameraActive ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#5C24FF] to-[#9A6AFB] mx-auto flex items-center justify-center text-white text-2xl font-bold font-sora shadow-lg mb-3">
                {patientName.split(' ').map((n) => n[0]).join('')}
              </div>
              <p className="text-white font-sora font-semibold text-sm">{patientName}</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full mt-1 border border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Connected (04:12)
              </span>
            </div>
          ) : (
            <div className="text-slate-500 text-xs">Camera is turned off</div>
          )}

          {/* Self View Floating Box */}
          <div className="absolute bottom-3 right-3 w-28 h-20 rounded-xl bg-slate-800 border border-slate-700 shadow-md flex items-center justify-center text-slate-300 text-[10px]">
            <span>Dr. Brock (You)</span>
          </div>

          {/* AI Live Transcribing Indicator */}
          {aiScribeActive && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-purple-500/30 text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#9A6AFB] animate-spin" />
              <span>AI Scribe Active</span>
            </div>
          )}
        </div>

        {/* Call Controls Toolbar */}
        <div className="flex items-center justify-center gap-3 py-2 border-t border-slate-100">
          <button
            onClick={() => setMicActive(!micActive)}
            className={`p-3 rounded-full transition-all ${
              micActive
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-rose-100 text-rose-600'
            }`}
            title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setCameraActive(!cameraActive)}
            className={`p-3 rounded-full transition-all ${
              cameraActive
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-rose-100 text-rose-600'
            }`}
            title={cameraActive ? 'Turn off camera' : 'Turn on camera'}
          >
            {cameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setAiScribeActive(!aiScribeActive)}
            className={`px-3.5 py-2.5 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all ${
              aiScribeActive
                ? 'bg-purple-100 text-[#5C24FF] border border-purple-200'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Scribe</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Visit</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
