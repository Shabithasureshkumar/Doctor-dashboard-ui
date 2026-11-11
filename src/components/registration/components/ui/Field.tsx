import type { HTMLAttributes } from 'react';
import { useDelight } from '../../context/DelightContext';
import { isFieldValid, type FieldKind } from '../../lib/validation';

export const inputClass =
  'w-full h-[50px] rounded-xl border-[1.5px] border-line bg-[#FCFBFF] px-4 text-[15px] text-ink placeholder:text-[#7B7499] ' +
  'transition-[border-color,background-color,box-shadow] hover:border-[#CFC4F5] ' +
  'focus:border-brand focus:bg-white focus:ring-[3px] focus:ring-brand/15 focus:outline-none';

export const labelClass = 'mb-[7px] block text-[13px] font-semibold text-ink-2';

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  kind?: FieldKind;
  placeholder?: string;
  optional?: boolean;
  hint?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  maxLength?: number;
  /** Hide the visible label (still announced to screen readers). */
  hideLabel?: boolean;
}

/** Text input that shows a purple tick once it's valid, nudges the particles while typing, and cheers on blur. */
export function Field({ id, label, value, onChange, kind = 'text', placeholder, optional, hint, inputMode, autoComplete, maxLength, hideLabel }: FieldProps) {
  const { poke, cheer } = useDelight();
  const ok = isFieldValid(kind, value);
  const type = kind === 'text' ? 'text' : kind;

  return (
    <div>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : labelClass}>
        {label} {optional && <span className="font-normal text-muted-2">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => {
          onChange(e.target.value);
          poke(6);
        }}
        onBlur={() => ok && cheer()}
        className={`${inputClass} ${ok ? 'field-ok' : ''}`}
      />
      {hint && <p className="mt-1.5 text-xs text-muted-2">{hint}</p>}
    </div>
  );
}
