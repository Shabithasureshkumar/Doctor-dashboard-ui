import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { User } from 'lucide-react';
import { Appointment } from '../../types';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Appointment) => void;
  initialDay?: string;
  initialTime?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment,
  initialDay = 'MON',
  initialTime = '08:00 AM',
}) => {
  const [patientName, setPatientName] = useState('Sarah Johnson');
  const [day, setDay] = useState<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'>('MON');
  const [time, setTime] = useState('08:00 AM');
  const [prevInitial, setPrevInitial] = useState({ initialDay, initialTime });

  if (prevInitial.initialDay !== initialDay || prevInitial.initialTime !== initialTime) {
    setPrevInitial({ initialDay, initialTime });
    if (initialDay && ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].includes(initialDay)) {
      setDay(initialDay as any);
    }
    if (initialTime) {
      setTime(initialTime);
    }
  }

  const [type, setType] = useState<'Video Visit' | 'In-person' | 'Follow-up' | 'Procedure' | 'New Patient'>('Video Visit');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map day to date number in current week
    const dateMap: Record<string, number> = {
      MON: 17,
      TUE: 18,
      WED: 19,
      THU: 20,
      FRI: 21,
      SAT: 22,
      SUN: 23,
    };

    const initials = patientName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    // Determine start hour formatted
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: `p-${Date.now()}`,
      patientName,
      day,
      dateNumber: dateMap[day] || 17,
      time,
      startTime: time.includes('PM') && !time.startsWith('12')
        ? `${parseInt(time, 10) + 12}:00`
        : `${parseInt(time, 10).toString().padStart(2, '0')}:00`,
      durationMinutes: 60,
      type,
      status: 'Upcoming',
      colorTag: type === 'Video Visit' ? 'purple' : type === 'In-person' ? 'rose' : 'emerald',
      avatarInitials: initials || 'PT',
    };

    onAddAppointment(newAppointment);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Appointment"
      subtitle="Schedule visit on clinical calendar"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
            Patient Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
            >
              <option value="MON">MON (Jun 17)</option>
              <option value="TUE">TUE (Jun 18)</option>
              <option value="WED">WED (Jun 19)</option>
              <option value="THU">THU (Jun 20)</option>
              <option value="FRI">FRI (Jun 21)</option>
              <option value="SAT">SAT (Jun 22)</option>
              <option value="SUN">SUN (Jun 23)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
              Time Slot
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
            >
              <option>8:00 AM</option>
              <option>9:00 AM</option>
              <option>9:30 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
              <option>5:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
            Visit Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
          >
            <option value="Video Visit">Video Visit</option>
            <option value="In-person">In-person Visit</option>
            <option value="Follow-up">Routine Follow-up</option>
            <option value="Procedure">Clinical Procedure</option>
            <option value="New Patient">New Patient Intake</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-sora font-semibold text-slate-700 mb-1">
            Clinical Notes / Chief Complaint (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Reason for visit or symptoms..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#6E56CF]/20 focus:border-[#6E56CF] focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#6E56CF] hover:bg-[#5E45BE] text-white px-4 py-2 rounded-xl text-xs font-sora font-semibold shadow-sm transition-all active:scale-95"
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
};
