import { useState, type MouseEvent, type ReactNode } from 'react';
import { useDelight } from '../../context/DelightContext';
import { Icon } from '../Icon';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** Pulses to invite a click when the section is complete. */
  ready?: boolean;
  /** Full-width variant. */
  wide?: boolean;
  /** Small confetti burst on click. */
  celebrate?: boolean;
  type?: 'button' | 'submit';
  title?: string;
}

/** Brand gradient button with a moving shine, click ripple and optional confetti. */
export function PrimaryButton({ children, onClick, ready, wide, celebrate, type = 'button', title }: PrimaryButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { burst } = useDelight();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const x = (e.clientX || r.left + r.width / 2) - r.left - size / 2;
    const y = (e.clientY || r.top + r.height / 2) - r.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((list) => [...list, { id, x, y, size }]);
    window.setTimeout(() => setRipples((list) => list.filter((rp) => rp.id !== id)), 650);
    if (celebrate) burst(r.left + r.width / 2, r.top + r.height / 2, 26);
    onClick?.();
  };

  return (
    <button
      type={type}
      title={title}
      onClick={handleClick}
      className={[
        'btn-shine relative inline-flex h-[52px] items-center justify-center gap-2.5 overflow-hidden rounded-[14px] px-7',
        'bg-gradient-to-r from-[#8A4BFF] to-[#5C24FF] text-[15px] font-semibold text-white shadow-md shadow-purple-500/20',
        'transition-all duration-200 hover:from-[#7A3BF5] hover:to-[#4A15E8] hover:shadow-purple-500/30 active:scale-[.97]',
        'focus-visible:ring-4 focus-visible:ring-brand/25 focus-visible:outline-none',
        wide ? 'w-full' : '',
        ready ? 'animate-ready' : '',
      ].join(' ')}
    >
      {ripples.map((rp) => (
        <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y, width: rp.size, height: rp.size }} />
      ))}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[52px] rounded-[14px] border-[1.5px] border-line bg-white px-[22px] text-sm font-semibold text-ink transition-colors hover:border-[#C7B8FA]"
    >
      {children}
    </button>
  );
}

export function BackButton({ onClick, children = 'Back' }: { onClick: () => void; children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 border-0 bg-transparent py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
    >
      <Icon name="arrowLeft" size={16} />
      {children}
    </button>
  );
}
