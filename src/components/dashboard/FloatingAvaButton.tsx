import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAvaButtonProps {
  onClick: () => void;
}

export const FloatingAvaButton: React.FC<FloatingAvaButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5E45BE] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-[0_4px_20px_rgba(110,86,207,0.45)] hover:shadow-[0_6px_25px_rgba(110,86,207,0.6)] transition-all duration-200 active:scale-95 group"
      aria-label="Ask Ava AI Assistant"
    >
      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
      <span className="font-sora font-semibold text-xs sm:text-sm tracking-tight">
        Ask Ava
      </span>
    </button>
  );
};
