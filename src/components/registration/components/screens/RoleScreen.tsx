import type { RoleId } from '../../state/form';
import { Icon, type IconName } from '../Icon';
import { PrimaryButton } from '../ui/Button';
import { RoleCard } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Collapse, Lead, Reveal, ScreenHeader } from '../ui/Layout';
import type { StepProps } from './types';

const ROLES: { id: RoleId; title: string; description: string; tag: string; icon: IconName }[] = [
  { id: 'independent', title: 'Independent clinician', description: 'I see patients on my own and manage my practice.', tag: 'Solo practice', icon: 'stethoscope' },
  { id: 'clinic', title: 'Clinic-affiliated provider', description: "I'm joining a clinic on Mednevo with an invite code.", tag: 'Invite code', icon: 'building' },
  { id: 'resident', title: 'Resident or fellow', description: "I'm in training and practice under supervision.", tag: 'Supervised', icon: 'graduation' },
  { id: 'other', title: 'Something else', description: 'Tell us your role in your own words.', tag: 'Custom', icon: 'pencil' },
];

const PERKS: { icon: IconName; label: string }[] = [
  { icon: 'video', label: 'Telehealth built in' },
  { icon: 'calendar', label: 'Smart scheduling' },
  { icon: 'wallet', label: 'Weekly payouts' },
];

export default function RoleScreen({ form, update, progress, onNext, onSkipToDashboard }: StepProps) {
  const current = ROLES.find((r) => r.id === form.role);
  const continueLabel = form.role === 'other' ? 'Continue' : `Continue as ${current?.title ?? ''}`;

  return (
    <section aria-labelledby="role-title">
      <Reveal i={0}>
        <ScreenHeader
          icon={<Icon name="stethoscope" size={26} strokeWidth={1.9} />}
          eyebrow="Welcome to Mednevo"
          title={<span id="role-title">Join as a provider</span>}
          progress={progress}
          celebrate={false}
        />
      </Reveal>
      <Reveal i={1}>
        <Lead>Tell us how you practice so we can set up your portal the right way. You can change this later in Settings.</Lead>
      </Reveal>

      <div role="radiogroup" aria-label="Provider role" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROLES.map((r, i) => (
          <Reveal key={r.id} i={i + 2} className="grid">
            <RoleCard
              selected={form.role === r.id}
              onSelect={() => update('role', r.id)}
              isOther={r.id === 'other'}
              icon={r.icon}
              title={r.title}
              description={r.description}
              tag={r.tag}
            />
          </Reveal>
        ))}
      </div>

      <Collapse open={form.role === 'other'}>
        <Field id="role-other" label="Your role" value={form.roleOther} onChange={(v) => update('roleOther', v)} placeholder="e.g. Locum physician, Nurse practitioner…" />
      </Collapse>

      <Reveal i={6}>
        <ul aria-label="What you get" className="mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[13px] font-medium text-muted">
          {PERKS.map((p) => (
            <li key={p.label} className="flex items-center gap-[7px]">
              <Icon name={p.icon} size={16} className="text-brand" />
              {p.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal i={7}>
        <div className="mt-8 border-t border-[#EEE9FB] pt-5">
          <PrimaryButton wide celebrate onClick={onNext}>
            {continueLabel}
            <Icon name="arrowRight" size={18} strokeWidth={2.2} />
          </PrimaryButton>
          <p className="mt-4 mb-0 text-center text-sm text-muted">
            Already registered?{' '}
            <button
              type="button"
              onClick={onSkipToDashboard}
              className="font-semibold text-brand hover:text-brand-deep cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
