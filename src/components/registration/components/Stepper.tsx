import { Icon } from './Icon';

const STEPS = ['Account', 'Identity', 'Practice', 'Availability', 'Payment'];

/** 1 → 5 step tracker. Only the current step shows its name, so it fits the top bar. */
export default function Stepper({ step }: { step: number }) {
  return (
    <ol aria-label="Registration steps" className="m-0 flex min-w-0 flex-1 list-none items-center p-0">
      {STEPS.map((label, i) => {
        const k = i + 1;
        const done = step > k || step >= 6;
        const now = step === k;
        const last = i === STEPS.length - 1;
        return (
          <li key={label} aria-current={now ? 'step' : undefined} className={`flex min-w-0 items-center gap-2 text-[13px] font-semibold ${last ? 'flex-none' : 'flex-1'} ${now || done ? 'text-ink' : 'text-muted-2'}`}>
            <span
              className={[
                'inline-flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-[1.5px] text-xs font-bold transition-all duration-300',
                done ? 'animate-pop-in border-brand bg-brand text-white' : 'border-[#DCD4F5] bg-white',
                now ? 'animate-step-ring border-brand text-brand outline-[3px] outline-brand/15 outline-solid' : '',
              ].join(' ')}
            >
              {done ? <Icon name="check" size={12} strokeWidth={3.5} /> : k}
            </span>
            <span className={now ? 'hidden whitespace-nowrap sm:inline' : 'sr-only'}>{label}</span>
            {!last && <span aria-hidden="true" className={`mx-1.5 h-0.5 min-w-4 flex-1 rounded transition-colors duration-500 sm:mx-2.5 ${done ? 'bg-brand' : 'bg-[#E7E1F8]'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
