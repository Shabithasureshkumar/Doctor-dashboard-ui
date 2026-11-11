import { GoogleLogo, Icon, MicrosoftLogo } from '../Icon';
import { RowOption } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Checkbox, Collapse, Lead, Reveal, ScreenHeader, StepFooter } from '../ui/Layout';
import type { StepProps } from './types';

export default function AccountScreen({ form, update, progress, onNext, onBack }: StepProps) {
  const mismatch = form.confirmPassword.length > 0 && form.confirmPassword !== form.password;

  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader icon={<Icon name="lockKey" size={26} strokeWidth={1.9} />} title="Create your account" progress={progress} />
      </Reveal>
      <Reveal i={1}>
        <Lead>Pick a quick sign-up, or enter your details manually.</Lead>
      </Reveal>

      <div role="radiogroup" aria-label="Sign-up method" className="mt-7 flex flex-col gap-3">
        <Reveal i={2}>
          <RowOption selected={form.accountMethod === 'google'} onSelect={() => update('accountMethod', 'google')} icon={<GoogleLogo />}>
            Continue with Google
          </RowOption>
        </Reveal>
        <Reveal i={3}>
          <RowOption selected={form.accountMethod === 'microsoft'} onSelect={() => update('accountMethod', 'microsoft')} icon={<MicrosoftLogo />}>
            Continue with Microsoft
          </RowOption>
        </Reveal>
        <Reveal i={4}>
          <RowOption selected={form.accountMethod === 'email'} onSelect={() => update('accountMethod', 'email')} isOther icon={<Icon name="mail" />}>
            Enter email manually
          </RowOption>
        </Reveal>
      </div>

      <Collapse open={form.accountMethod === 'email'}>
        <Field id="email" kind="email" label="Professional email" value={form.email} onChange={(v) => update('email', v)} placeholder="you@yourpractice.com" autoComplete="email" />
        <Field id="phone" kind="tel" label="Mobile number" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+1 (555) 123-4567" hint="For two-factor sign-in and urgent alerts." autoComplete="tel" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="password" kind="password" label="Password" value={form.password} onChange={(v) => update('password', v)} placeholder="8+ characters" autoComplete="new-password" />
          <Field
            id="confirm-password"
            kind="password"
            label="Confirm password"
            value={form.confirmPassword}
            onChange={(v) => update('confirmPassword', v)}
            placeholder="Re-enter"
            autoComplete="new-password"
            hint={mismatch ? "Passwords don't match yet." : undefined}
          />
        </div>
      </Collapse>

      <Reveal i={5} className="mt-5">
        <Checkbox checked={form.agreeTerms} onChange={(v) => update('agreeTerms', v)}>
          I agree to the{' '}
          <a href="#" className="text-brand">Provider Terms</a>,{' '}
          <a href="#" className="text-brand">Privacy Policy</a> and{' '}
          <a href="#" className="text-brand">Telehealth Consent Agreement</a>.
        </Checkbox>
      </Reveal>

      <Reveal i={6}>
        <StepFooter onBack={onBack} onNext={onNext} nextLabel="Continue" ready={progress >= 1} />
      </Reveal>
    </section>
  );
}
