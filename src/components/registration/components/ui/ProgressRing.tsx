import { useEffect, useRef } from 'react';
import { useDelight } from '../../context/DelightContext';
import { Icon } from '../Icon';

const CIRC = 97.4; // 2πr for r = 15.5

/** Section completion ring. Turns solid with a tick, confetti and "All set" when it reaches 100%. */
export function ProgressRing({ value, celebrate = true }: { value: number; celebrate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const { cheer, burst } = useDelight();
  const full = value >= 1;
  const pct = Math.round(value * 100);

  useEffect(() => {
    if (celebrate && value >= 1 && prev.current < 1) {
      cheer('All set — tap Continue!', true);
      const r = ref.current?.getBoundingClientRect();
      if (r) burst(r.left + r.width / 2, r.top + r.height / 2, 18);
    }
    prev.current = value;
  }, [value, celebrate, cheer, burst]);

  return (
    <span ref={ref} className="relative ml-auto h-[46px] w-[46px] flex-none" title="Section completion" role="img" aria-label={`Section ${pct}% complete`}>
      <svg viewBox="0 0 36 36" className="h-[46px] w-[46px] -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ring-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#9A6AFB" />
            <stop offset="1" stopColor="#5C24FF" />
          </linearGradient>
        </defs>
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ECE6FB" strokeWidth="3.2" />
        <circle
          className="ring-fg"
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDashoffset={CIRC * (1 - value)}
        />
      </svg>
      {full && <span className="absolute inset-[5px] animate-pop-in rounded-full bg-brand" />}
      <span className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${full ? 'text-white' : 'text-brand'}`}>
        {full ? <Icon name="check" size={14} strokeWidth={3.5} /> : `${pct}%`}
      </span>
    </span>
  );
}
