import { Icon } from '../Icon';
import { RowOption } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Collapse, Lead, Reveal, ScreenHeader, StepFooter } from '../ui/Layout';
import type { StepProps } from './types';

/** Placeholder until the real platform fee is confirmed. */
const PLATFORM_FEE = '[FEE]%';

export default function PaymentScreen({ form, update, progress, onNext, onBack }: StepProps) {
  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader icon={<Icon name="wallet" size={26} strokeWidth={1.9} />} title="How should we pay you?" progress={progress} />
      </Reveal>
      <Reveal i={1}>
        <Lead>Weekly payouts. Details are encrypted and never shown in full again.</Lead>
      </Reveal>

      <div role="radiogroup" aria-label="Payout method" className="mt-7 flex flex-col gap-2.5">
        <Reveal i={2}>
          <RowOption selected={form.payMethod === 'bank'} onSelect={() => update('payMethod', 'bank')} icon={<Icon name="bank" />}>
            Bank account <small className="ml-1.5 text-[13px] font-normal text-muted">2–3 days · no fee</small>
          </RowOption>
        </Reveal>
        <Reveal i={3}>
          <RowOption selected={form.payMethod === 'card'} onSelect={() => update('payMethod', 'card')} icon={<Icon name="card" />}>
            Debit card <small className="ml-1.5 text-[13px] font-normal text-muted">instant · small fee</small>
          </RowOption>
        </Reveal>
        <Reveal i={4}>
          <RowOption selected={form.payMethod === 'later'} onSelect={() => update('payMethod', 'later')} icon={<Icon name="clock" />}>
            Set up later
          </RowOption>
        </Reveal>
      </div>

      <Collapse open={form.payMethod === 'bank'}>
        <Field id="account-holder" label="Account holder name" value={form.accountHolder} onChange={(v) => update('accountHolder', v)} placeholder="Name on account" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="routing" label="Routing number" value={form.routingNumber} onChange={(v) => update('routingNumber', v)} placeholder="9 digits" inputMode="numeric" />
          <Field id="account-number" kind="password" label="Account number" value={form.accountNumber} onChange={(v) => update('accountNumber', v)} placeholder="••••••••" />
        </div>
        <Field id="tin-bank" kind="password" label="TIN (SSN or EIN)" value={form.tin} onChange={(v) => update('tin', v)} placeholder="For tax reporting" />
      </Collapse>

      <Collapse open={form.payMethod === 'card'}>
        <Field id="card-number" label="Card number" value={form.cardNumber} onChange={(v) => update('cardNumber', v)} placeholder="•••• •••• •••• ••••" inputMode="numeric" autoComplete="cc-number" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="card-expiry" label="Expiry" value={form.cardExpiry} onChange={(v) => update('cardExpiry', v)} placeholder="MM / YY" autoComplete="cc-exp" />
          <Field id="card-zip" label="ZIP" value={form.cardZip} onChange={(v) => update('cardZip', v)} placeholder="ZIP" autoComplete="postal-code" />
        </div>
        <Field id="tin-card" kind="password" label="TIN (SSN or EIN)" value={form.tin} onChange={(v) => update('tin', v)} placeholder="For tax reporting" />
      </Collapse>

      <Reveal i={5}>
        <p className="mt-5 mb-0 text-[13.5px] text-muted">
          Platform fee: <b className="text-brand">{PLATFORM_FEE}</b> per completed consultation. No hidden fees.
        </p>
      </Reveal>

      <Reveal i={6}>
        <StepFooter onBack={onBack} onNext={onNext} nextLabel="Complete registration" nextIcon="check" ready={progress >= 1} />
      </Reveal>
    </section>
  );
}
