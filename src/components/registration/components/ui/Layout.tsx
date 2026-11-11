import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { BackButton, PrimaryButton } from './Button';
import { Icon } from '../Icon';
import { ProgressRing } from './ProgressRing';

/** Staggered fade-up for blocks inside a screen. */
export function Reveal({ i, children, className = '' }: { i: number; children: ReactNode; className?: string }) {
  const style: CSSProperties = { animationDelay: `${i * 60 + 120}ms` };
  return (
    <div className={`animate-rise ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Smooth open/close for the "enter manually" fields. Focuses the first input when it opens. */
export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(open);
  useEffect(() => {
    if (open && !wasOpen.current) {
      const t = window.setTimeout(() => ref.current?.querySelector('input')?.focus({ preventScroll: true }), 300);
      wasOpen.current = open;
      return () => window.clearTimeout(t);
    }
    wasOpen.current = open;
  }, [open]);
  return (
    <div
      ref={ref}
      aria-hidden={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-expo ${open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'}`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="flex flex-col gap-3.5 pt-4">{children}</div>
      </div>
    </div>
  );
}

interface ScreenHeaderProps {
  icon: ReactNode;
  title: ReactNode;
  eyebrow?: string;
  /** 0–1 section completion. Omit to hide the ring. */
  progress?: number;
  /** Fire confetti + "All set" when the ring completes. */
  celebrate?: boolean;
  badgeClassName?: string;
}

/** Icon badge + title (+ eyebrow) + completion ring. */
export function ScreenHeader({ icon, title, eyebrow, progress, celebrate = true, badgeClassName }: ScreenHeaderProps) {
  return (
    <div className="flex items-center gap-3.5 lg:gap-[18px]">
      <span
        className={
          badgeClassName ??
          'relative flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[15px] border border-[#E1D6FF] bg-tint text-brand'
        }
      >
        {icon}
      </span>
      <div className="min-w-0">
        {eyebrow && <span className="mb-1 block text-xs font-semibold tracking-[0.06em] text-brand uppercase">{eyebrow}</span>}
        <h1 className="m-0 font-display text-[22px] leading-tight font-bold tracking-[-0.02em] lg:text-[clamp(22px,1.9vw,26px)]">{title}</h1>
      </div>
      {progress !== undefined && <ProgressRing value={progress} celebrate={celebrate} />}
    </div>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-3 mb-0 text-[14.5px] leading-relaxed text-muted">{children}</p>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block text-[13px] font-semibold text-ink-2">{children}</span>;
}

interface StepFooterProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: ReactNode;
  ready?: boolean;
  nextIcon?: 'arrowRight' | 'check';
}

/** Divider + Back / Continue row used on every form step. */
export function StepFooter({ onBack, onNext, nextLabel, ready, nextIcon = 'arrowRight' }: StepFooterProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE9FB] pt-5">
      {onBack ? <BackButton onClick={onBack} /> : <span />}
      <PrimaryButton onClick={onNext} ready={ready} celebrate>
        {nextLabel}
        <Icon name={nextIcon} size={18} strokeWidth={2.2} />
      </PrimaryButton>
    </div>
  );
}

export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-normal text-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-[19px] w-[19px] flex-none cursor-pointer accent-brand"
      />
      <span>{children}</span>
    </label>
  );
}
