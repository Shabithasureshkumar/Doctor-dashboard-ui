import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Send,
  ExternalLink,
} from 'lucide-react';
import { SETTINGS_FAQS } from '../../../mockData/settingsData';

interface HelpSupportSectionProps {
  onOpenLiveChat?: () => void;
  onToast: (msg: string) => void;
}

export const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({
  onOpenLiveChat,
  onToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Report a problem state
  const [reportSubject, setReportSubject] = useState('');
  const [reportCategory, setReportCategory] = useState('Technical Issue');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = SETTINGS_FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSubject.trim() || !reportDetails.trim()) {
      onToast('Please fill out all required fields before submitting.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReportSubject('');
      setReportDetails('');
      onToast('Clinical support ticket #TK-84920 submitted. Our engineering team will review.');
    }, 600);
  };

  return (
    <div className="space-y-5">
      {/* 1. 24/7 Priority Clinical Concierge Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                24/7 Clinical Support Online
              </span>
            </div>
            <h3 className="font-sora font-extrabold text-xl text-slate-900">
              Need Assistance, Doctor?
            </h3>
            <p className="text-xs text-slate-500 max-w-xl">
              Our dedicated clinical technical operations team is available around the clock to support telemetry, e-Rx transmission, and EHR sync.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => onOpenLiveChat ? onOpenLiveChat() : onToast('Initiating 24/7 Physician Live Concierge...')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:opacity-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Live Chat</span>
            </button>

            <a
              href="tel:+18005550199"
              onClick={() => onToast('Calling Physician Priority Line: +1 (800) 555-0199')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#5C24FF] font-sora font-semibold text-xs sm:text-sm rounded-2xl transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Searchable FAQs Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
              Frequently Asked Questions &amp; Knowledge Base
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quick answers for schedule customization, buffer times, EPCS signatures &amp; billing
            </p>
          </div>

          {/* FAQ Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-1">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'border-purple-200 bg-purple-50/20' : 'border-slate-100 hover:border-slate-200 bg-slate-50/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#5C24FF]">
                      {faq.category}
                    </span>
                    <span className="font-sora font-semibold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-purple-100/60 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No help articles found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>

      {/* 3. Report a Problem / Feedback Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4">
        <div>
          <h3 className="font-sora font-bold text-base sm:text-lg text-slate-900">
            Submit a Clinical or Technical Ticket
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Directly notify the Mednevo Engineering &amp; Compliance Team of system issues or feature requests
          </p>
        </div>

        <form onSubmit={handleSubmitReport} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Subject / Summary</label>
              <input
                type="text"
                placeholder="Brief summary of the issue..."
                value={reportSubject}
                onChange={(e) => setReportSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Issue Category</label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
              >
                <option value="Technical Issue">Technical / UI Glitch</option>
                <option value="E-Prescribing">E-Prescription / Surescripts</option>
                <option value="Billing & Claims">Billing &amp; Clearinghouse Payouts</option>
                <option value="Telehealth Video">Telehealth Video / Audio Quality</option>
                <option value="Feature Request">Clinical Feature Suggestion</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Detailed Description &amp; Reproduction Steps</label>
            <textarea
              rows={3}
              placeholder="Describe what occurred, patient ID if applicable, and expected behavior..."
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9A6AFB] resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Diagnostic logs and browser session telemetry will be automatically attached.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white font-sora font-semibold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting...' : 'Submit Ticket'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. Legal Compliance, Privacy & Application Version */}
      <div className="p-6 rounded-3xl bg-slate-100/70 border border-slate-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mednevo Doctor Portal • Enterprise Release v4.2.8</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Build #849204-PROD • HIPAA, SOC-2 Type II, HITECH &amp; GDPR Certified Architecture
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#5C24FF]">
          <button
            onClick={() => onToast('Opening Clinical Compliance & BAA Documentation...')}
            className="hover:underline flex items-center gap-1"
          >
            <span>BAA Agreement</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={() => onToast('Opening Terms of Service...')}
            className="hover:underline flex items-center gap-1"
          >
            <span>Terms of Service</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={() => onToast('Opening Privacy Policy...')}
            className="hover:underline flex items-center gap-1"
          >
            <span>Privacy Policy</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
