import { useState } from 'react';
import { Icon, type IconName } from '../Icon';
import { PrimaryButton } from '../ui/Button';
import { Lead, Reveal, ScreenHeader } from '../ui/Layout';

interface Props {
  email: string;
  /** Prototype only: jump to the approved state. Remove in production. */
  onPreviewApproved: () => void;
  onHome: () => void;
  onGoToDashboard?: () => void;
}

const STAGES: { title: string; note: string; state: 'done' | 'active' | 'todo' }[] = [
  { title: 'Submitted', note: 'All details received', state: 'done' },
  { title: 'Verifying', note: 'License & credentials', state: 'active' },
  { title: 'Approved', note: 'Portal unlocks', state: 'todo' },
];

/** Shown after submitting, and every time the doctor signs in until an admin approves them. */
export default function UnderReviewScreen({ email, onPreviewApproved, onHome, onGoToDashboard }: Props) {
  // In production these come from the API response.
  const [applicationId] = useState('MN-849201');
  const [submittedOn] = useState(() => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState<'idle' | 'checking' | 'done'>('idle');
  const [spinKey, setSpinKey] = useState(0);

  const copyId = () => {
    try {
      void navigator.clipboard?.writeText(applicationId).catch(() => undefined);
    } catch {
      /* clipboard not available */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const checkStatus = () => {
    setSpinKey((k) => k + 1);
    setChecking('checking');
    window.setTimeout(() => setChecking('done'), 1000);
  };

  const actions: { icon: IconName; label: string; onClick?: () => void }[] = [
    { icon: 'pencil', label: 'Review application' },
    { icon: 'refresh', label: checking === 'checking' ? 'Checking…' : checking === 'done' ? 'Still in review' : 'Check status', onClick: checkStatus },
    { icon: 'chat', label: 'Contact support' },
  ];

  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader
          badgeClassName="relative flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[15px] bg-gradient-to-br from-[#9a6afb] to-[#5c24ff] text-white shadow-md shadow-purple-500/25"
          icon={
            <>
              <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-[15px] border-2 border-brand" />
              <Icon name="hourglass" size={26} className="animate-hourglass" />
            </>
          }
          eyebrow="Application received"
          title="Thank you for submitting your application"
        />
      </Reveal>
      <Reveal i={1}>
        <Lead>We're reviewing your details and verifying your medical license. Your Doctor Portal unlocks as soon as you're approved.</Lead>
      </Reveal>

      <Reveal i={2} className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-line-soft bg-[#F7F4FE] px-2.5 text-[12.5px] text-muted">
          Application ID <b className="font-semibold tracking-wide text-ink tabular-nums">{applicationId}</b>
          <button
            type="button"
            onClick={copyId}
            aria-label="Copy application ID"
            className={`flex rounded-[5px] p-0.5 transition-colors hover:bg-tint ${copied ? 'text-emerald-600' : 'text-brand'}`}
          >
            <Icon name={copied ? 'check' : 'copy'} size={14} />
          </button>
        </span>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-line-soft bg-[#F7F4FE] px-2.5 text-[12.5px] text-muted">
          Submitted <b className="font-semibold text-ink tabular-nums">{submittedOn}</b>
        </span>
      </Reveal>

      <Reveal i={3}>
        <div className="card-selected card-glow relative mt-[18px] overflow-hidden rounded-[18px] border-[1.5px] px-[18px] pt-[18px] pb-4">
          <div className="relative z-[1] flex flex-wrap items-center justify-between gap-2.5">
            <span className="flex items-center gap-[9px] text-[14.5px] font-semibold">
              <span className="h-2 w-2 animate-live rounded-full bg-brand" />
              Verification in progress
            </span>
            <span className="rounded-full bg-[#EBE2FF] px-2.5 py-1 text-xs font-semibold text-brand">Usually under 24 hours</span>
          </div>
          <div aria-hidden="true" className="relative my-4 h-1.5 overflow-hidden rounded-md bg-[#E9E2FB]">
            <i className="bar-fill absolute inset-y-0 left-0 w-[62%] overflow-hidden rounded-md bg-gradient-to-r from-[#9a6afb] to-[#5c24ff]" />
          </div>
          <ol aria-label="Application status" className="relative z-[1] m-0 grid list-none grid-cols-3 gap-2.5 p-0">
            {STAGES.map((s) => (
              <li key={s.title} aria-current={s.state === 'active' ? 'step' : undefined} className="flex flex-col gap-0.5">
                <span
                  className={[
                    'mb-1.5 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px]',
                    s.state === 'done' ? 'border-brand bg-brand text-white' : '',
                    s.state === 'active' ? 'animate-step-ring border-brand bg-white outline-4 outline-brand/15 outline-solid' : '',
                    s.state === 'todo' ? 'border-[#DCD4F5] bg-white text-muted-2' : '',
                  ].join(' ')}
                >
                  {s.state === 'done' && <Icon name="check" size={12} strokeWidth={3.5} />}
                  {s.state === 'active' && <i className="h-2 w-2 animate-blink rounded-full bg-brand" />}
                  {s.state === 'todo' && <Icon name="lock" size={12} strokeWidth={2.4} />}
                </span>
                <b className={`text-[13.5px] ${s.state === 'todo' ? 'text-muted-2' : 'text-ink'}`}>{s.title}</b>
                <small className="text-xs text-muted">{s.note}</small>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal i={4}>
        <div className="mt-6 flex items-center gap-3 rounded-[14px] bg-tint px-4 py-3.5 text-sm leading-normal text-ink-2">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[11px] border border-[#E4DAFF] bg-white text-brand">
            <Icon name="mail" size={18} />
          </span>
          <span>
            We'll email <b>{email}</b> the moment you're approved. You can safely close this page.
          </span>
        </div>
      </Reveal>

      <Reveal i={5} className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {actions.map((a) => (
          <button
            key={a.icon}
            type="button"
            onClick={a.onClick}
            className="group flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-line bg-white p-3.5 text-left text-[13.5px] font-semibold text-ink transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#C7B8FA] sm:flex-col sm:items-start"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Icon key={a.icon === 'refresh' ? spinKey : undefined} name={a.icon} size={18} className={a.icon === 'refresh' && spinKey > 0 ? 'animate-spin-once' : ''} />
            </span>
            {a.label}
          </button>
        ))}
      </Reveal>

      <Reveal i={6}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE9FB] pt-5">
          <button type="button" onClick={onPreviewApproved} title="Prototype only" className="py-2 text-sm font-semibold text-muted hover:text-ink">
            Demo: view approved state →
          </button>
          <PrimaryButton onClick={onGoToDashboard || onHome}>Return to homepage</PrimaryButton>
        </div>
      </Reveal>
    </section>
  );
}
