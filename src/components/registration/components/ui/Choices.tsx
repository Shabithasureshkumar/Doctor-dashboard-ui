import type { ReactNode } from 'react';
import { useChoiceFeedback } from '../../context/DelightContext';
import { Icon, type IconName } from '../Icon';
import { usePop } from './usePop';

/* ───────────── Chips ───────────── */

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  /** Dashed "Other" chip that opens a manual field. */
  other?: boolean;
}

export function Chip({ selected, onClick, children, other }: ChipProps) {
  const { popClass, trigger, onAnimationEnd } = usePop();
  return (
    <button
      type="button"
      aria-pressed={selected}
      onAnimationEnd={onAnimationEnd}
      onClick={() => {
        trigger();
        onClick();
      }}
      className={[
        'inline-flex h-[38px] items-center gap-1.5 rounded-[11px] border-[1.5px] px-[15px] text-[13.5px] font-medium transition-colors',
        selected ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-[#C7B8FA]',
        other && !selected ? 'border-dashed text-brand' : '',
        popClass,
      ].join(' ')}
    >
      {other && <Icon name="pencil" size={14} />}
      {children}
    </button>
  );
}

export interface ChipOption {
  value: string;
  label: ReactNode;
}

interface ChipGroupProps {
  label: string;
  options: ChipOption[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Value used for the trailing "Other" chip, if any. */
  otherValue?: string;
}

/** A labelled row of chips. Works for single or multiple selection — the caller decides in `onToggle`. */
export function ChipGroup({ label, options, selected, onToggle, otherValue }: ChipGroupProps) {
  const feedback = useChoiceFeedback();
  const handle = (value: string) => {
    feedback(!selected.includes(value), value === otherValue);
    onToggle(value);
  };
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o.value} selected={selected.includes(o.value)} onClick={() => handle(o.value)}>
          {o.label}
        </Chip>
      ))}
      {otherValue && (
        <Chip other selected={selected.includes(otherValue)} onClick={() => handle(otherValue)}>
          Other
        </Chip>
      )}
    </div>
  );
}

/* ───────────── Option buttons ───────────── */

interface OptionProps {
  selected: boolean;
  onSelect: () => void;
  isOther?: boolean;
}

const optionBase =
  'relative overflow-hidden rounded-2xl border-[1.5px] text-left transition-[transform,border-color,background-color] duration-300 ease-expo';
const optionIdle = 'border-line bg-white hover:-translate-y-0.5 hover:border-[#C7B8FA]';
const optionOn = 'card-selected';

function useOption({ selected, onSelect, isOther }: OptionProps) {
  const feedback = useChoiceFeedback();
  const { popClass, trigger, onAnimationEnd } = usePop();
  const onClick = () => {
    trigger();
    feedback(!selected, isOther);
    onSelect();
  };
  return { onClick, onAnimationEnd, popClass };
}

/** Large role card with icon, description and tag (Role screen). */
export function RoleCard(props: OptionProps & { icon: IconName; title: string; description: string; tag: string }) {
  const { onClick, onAnimationEnd, popClass } = useOption(props);
  const { selected, icon, title, description, tag } = props;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      className={`${optionBase} ${selected ? `${optionOn} card-glow` : optionIdle} ${popClass} flex flex-col items-start gap-1 rounded-[18px] p-[18px] pb-4`}
    >
      <span
        className={`absolute top-3.5 right-3.5 z-[1] flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] text-white transition-all duration-300 ${selected ? 'border-brand bg-brand' : 'border-[#D6CDF3] bg-white'}`}
      >
        <Icon name="check" size={12} strokeWidth={3.5} className={`transition-all duration-300 ${selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      </span>
      <span
        className={`mb-2 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] transition-all duration-300 ease-expo ${selected ? '-rotate-6 bg-linear-135 from-brand-light to-brand text-white' : 'bg-tint text-brand'}`}
      >
        <Icon name={icon} size={22} />
      </span>
      <span className="text-[15px] font-semibold text-ink">{title}</span>
      <span className="text-[13px] leading-snug text-muted">{description}</span>
      <span className={`mt-2 rounded-md px-2 py-[3px] text-[11px] font-semibold transition-colors ${selected ? 'bg-[#EBE2FF] text-brand' : 'bg-[#F4F1FC] text-muted-2'}`}>{tag}</span>
    </button>
  );
}

/** Full-width row option with a leading icon (sign-up methods, location, payout method). */
export function RowOption(props: OptionProps & { icon: ReactNode; children: ReactNode }) {
  const { onClick, onAnimationEnd, popClass } = useOption(props);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={props.selected}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      className={`${optionBase} ${props.selected ? optionOn : optionIdle} ${popClass} flex min-h-[54px] w-full items-center gap-3 rounded-[14px] px-[18px] text-[15px] font-semibold text-ink`}
    >
      <span className="flex flex-none text-brand">{props.icon}</span>
      <span>{props.children}</span>
    </button>
  );
}

/** Square tile with a centred icon (In clinic / Online / Both). */
export function TileOption(props: OptionProps & { icon: IconName; label: string }) {
  const { onClick, onAnimationEnd, popClass } = useOption(props);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={props.selected}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      className={`${optionBase} ${props.selected ? optionOn : optionIdle} ${popClass} flex flex-col items-center gap-2.5 px-2.5 py-[18px]`}
    >
      <span className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl transition-colors ${props.selected ? 'bg-brand text-white' : 'bg-tint text-brand'}`}>
        <Icon name={props.icon} size={20} />
      </span>
      <span className="text-[15px] font-semibold text-ink">{props.label}</span>
    </button>
  );
}

/** Two-line card (schedule presets). */
export function CardOption(props: OptionProps & { title: string; description: string }) {
  const { onClick, onAnimationEnd, popClass } = useOption(props);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={props.selected}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      className={`${optionBase} ${props.selected ? optionOn : optionIdle} ${popClass} flex flex-col items-start gap-[3px] px-[18px] py-4`}
    >
      <span className="text-[15px] font-semibold text-ink">{props.title}</span>
      <span className="text-[13.5px] text-muted">{props.description}</span>
    </button>
  );
}
