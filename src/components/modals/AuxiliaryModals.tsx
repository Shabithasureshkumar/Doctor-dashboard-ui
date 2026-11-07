import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Check, Download } from 'lucide-react';

// 1. Refer Patient Modal
export const ReferPatientModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}> = ({ isOpen, onClose, patientName = 'Sarah Johnson' }) => {
  const [specialty, setSpecialty] = useState('Cardiology');
  const [specialist, setSpecialist] = useState('Dr. Priya Patel, MD (Cardiology)');
  const [urgency, setUrgency] = useState('Routine (Within 2-4 weeks)');
  const [notes, setNotes] = useState('Referral for refractory hypertension evaluation and titration.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refer a Patient" subtitle={`Creating referral for ${patientName}`} maxWidth="md">
      {submitted ? (
        <div className="py-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h4 className="font-sora font-semibold text-slate-900 text-base">Referral Sent</h4>
          <p className="text-xs text-slate-500">Forwarded to {specialist}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Target Specialty</label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            >
              <option>Cardiology</option>
              <option>Endocrinology</option>
              <option>Nephrology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Select Provider / Clinic</label>
            <select
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            >
              <option>Dr. Priya Patel, MD (Cardiology)</option>
              <option>Dr. Marcus Vance, MD (Cardiology)</option>
              <option>St. Jude Cardiovascular Institute</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Urgency</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            >
              <option>Routine (Within 2-4 weeks)</option>
              <option>Urgent (Within 48-72 hours)</option>
              <option>Stat (Same day consult)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Clinical Rationale & Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-[0_4px_14px_rgba(154,106,251,0.35)] transition-all active:scale-95">
              Transmit Referral
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

// 2. Adjust Schedule Modal
export const AdjustScheduleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [saved, setSaved] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Provider Schedule" subtitle="Configure clinic hours and buffer intervals" maxWidth="md">
      {saved ? (
        <div className="py-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h4 className="font-sora font-semibold text-slate-900 text-base">Schedule Updated</h4>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Start Time</label>
              <input type="text" defaultValue="08:00 AM" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">End Time</label>
              <input type="text" defaultValue="05:00 PM" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Appointment Slot Duration</label>
            <select defaultValue="30 mins" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800">
              <option>15 mins</option>
              <option>20 mins</option>
              <option>30 mins</option>
              <option>45 mins</option>
              <option>60 mins</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">Buffer Between Visits</label>
            <select defaultValue="5 mins" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800">
              <option>0 mins</option>
              <option>5 mins</option>
              <option>10 mins</option>
              <option>15 mins</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => {
                  setSaved(false);
                  onClose();
                }, 1000);
              }}
              className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-[0_4px_14px_rgba(154,106,251,0.35)] transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

// 3. Export Modal
export const ExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Clinical Data" subtitle="Download reports, schedules, or encounter data" maxWidth="sm">
      <div className="space-y-4">
        <p className="text-xs text-slate-600">Choose export format for today's schedule and encounters:</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="export-fmt" defaultChecked className="accent-[#5C24FF]" />
            <div>
              <span className="font-sora font-semibold text-xs text-slate-900 block">PDF Summary Report</span>
              <span className="text-[10px] text-slate-400">Includes charts, vitals overview, and alerts</span>
            </div>
          </label>
          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="export-fmt" className="accent-[#5C24FF]" />
            <div>
              <span className="font-sora font-semibold text-xs text-slate-900 block">CSV / Excel Spreadsheet</span>
              <span className="text-[10px] text-slate-400">Raw appointment metrics and patient counts</span>
            </div>
          </label>
          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="export-fmt" className="accent-[#5C24FF]" />
            <div>
              <span className="font-sora font-semibold text-xs text-slate-900 block">iCal / Calendar File</span>
              <span className="text-[10px] text-slate-400">Sync with Outlook, Apple, or Google Calendar</span>
            </div>
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-[0_4px_14px_rgba(154,106,251,0.35)] transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Preparing...' : 'Download File'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

// 4. Tasks Modal
export const TasksModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sign off on Mike Lee repeat BMP requisition', done: false, priority: 'Critical' },
    { id: 2, text: 'Review ECG tracing for Sarah Johnson', done: false, priority: 'Critical' },
    { id: 3, text: 'Renew Atorvastatin e-prescription for Emily Chen', done: false, priority: 'Overdue' },
    { id: 4, text: 'Submit specialist consult reply to Dr. Patel', done: true, priority: 'Today' },
    { id: 5, text: 'Sign 3 outpatient SOAP visit notes from morning sessions', done: false, priority: 'Today' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pending Clinical Tasks" subtitle="Tasks requiring physician review or signature" maxWidth="md">
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 rounded accent-[#5C24FF] cursor-pointer"
              />
              <span className={`text-xs ${task.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                {task.text}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                task.priority === 'Critical'
                  ? 'bg-rose-50 text-rose-600'
                  : task.priority === 'Overdue'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};
