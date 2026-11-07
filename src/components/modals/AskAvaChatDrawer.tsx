import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';

interface AskAvaChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChart?: (name: string) => void;
}

interface Message {
  sender: 'ava' | 'user';
  text: string;
}

export const AskAvaChatDrawer: React.FC<AskAvaChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenChart: _onOpenChart,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ava',
      text: `Hello Dr. Rivers! I'm Ava, your clinical intelligence copilot. I'm monitoring your 8 appointments today, lab results, and patient queues. How can I help you right now?`,
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    "What's Mike Lee's K+ result?",
    "Summarize Sarah Johnson's visit",
    'Draft prescription refill for Lisinopril',
    "Show today's open slots",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs: Message[] = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInput('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = "I've checked the clinical records. Everything looks up to date.";
      const lower = text.toLowerCase();

      if (lower.includes('mike lee') || lower.includes('k+') || lower.includes('potassium')) {
        reply = `Mike Lee's potassium came in at 6.1 mmol/L (Critical High). Recommended actions: 1) Order immediate repeat BMP, 2) Hold ACE inhibitors / ARBs and potassium supplements, 3) Perform stat 12-lead ECG.`;
      } else if (lower.includes('sarah') || lower.includes('bp')) {
        reply = `Sarah Johnson (61 F) is scheduled at 10:30 AM for Hypertension follow-up. Her 5-day home BP average trended up to 152/103 mmHg. AI pre-visit intake is complete and ready in her chart.`;
      } else if (lower.includes('refill') || lower.includes('lisinopril')) {
        reply = `Prepared e-prescription draft: Lisinopril 20mg PO Daily (titrated from 10mg), 30 tablets, 2 refills to CVS Pharmacy #4128.`;
      } else if (lower.includes('slot') || lower.includes('schedule')) {
        reply = `You have 8 visits today from 08:30 AM to 12:00 PM. Open consultation slots are available at 02:00 PM, 03:30 PM, and 04:15 PM.`;
      }

      setMessages([...newMsgs, { sender: 'ava', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sora font-semibold text-sm leading-tight">Ava AI Assistant</h3>
              <span className="text-[11px] text-purple-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Active Clinical Copilot
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ava' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9A6AFB] to-[#5C24FF] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] text-white rounded-br-xs font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Quick Prompts */}
          <div className="pt-2">
            <span className="text-[10px] font-sora font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Suggested Prompts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qp)}
                  className="text-[11px] bg-white hover:bg-purple-50 hover:text-[#5C24FF] hover:border-purple-200 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-600 transition-all text-left"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Ava anything about patients or schedule..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5C24FF]/20 focus:border-[#5C24FF]"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#9A6AFB] to-[#5C24FF] hover:opacity-95 text-white p-2.5 rounded-xl shadow-[0_2px_8px_rgba(154,106,251,0.35)] transition-transform active:scale-95 flex-shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
