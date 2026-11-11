import type { PracticeMode } from '../../state/form';
import { Icon, type IconName } from '../Icon';
import { RowOption, TileOption } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Collapse, Lead, Reveal, ScreenHeader, SectionLabel, StepFooter } from '../ui/Layout';
import type { StepProps } from './types';

const MODES: { id: PracticeMode; label: string; icon: IconName }[] = [
  { id: 'clinic', label: 'In clinic', icon: 'building' },
  { id: 'online', label: 'Online', icon: 'video' },
  { id: 'both', label: 'Both', icon: 'plus' },
];

export default function PracticeScreen({ form, update, progress, onNext, onBack }: StepProps) {
  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader icon={<Icon name="pin" size={26} strokeWidth={1.9} />} title="Where do you practice?" progress={progress} />
      </Reveal>
      <Reveal i={1}>
        <Lead>Choose how patients will meet you.</Lead>
      </Reveal>

      <div role="radiogroup" aria-label="Practice type" className="mt-7 grid grid-cols-3 gap-3">
        {MODES.map((m, i) => (
          <Reveal key={m.id} i={i + 2} className="grid">
            <TileOption selected={form.practiceMode === m.id} onSelect={() => update('practiceMode', m.id)} icon={m.icon} label={m.label} />
          </Reveal>
        ))}
      </div>

      <Reveal i={5} className="mt-6">
        <SectionLabel>Clinic location</SectionLabel>
        <div role="radiogroup" aria-label="Clinic location" className="flex flex-col gap-2.5">
          <RowOption selected={form.locationMethod === 'current'} onSelect={() => update('locationMethod', 'current')} icon={<Icon name="locate" />}>
            Use my current location
          </RowOption>
          <RowOption selected={form.locationMethod === 'manual'} onSelect={() => update('locationMethod', 'manual')} isOther icon={<Icon name="pencil" />}>
            Enter address manually
          </RowOption>
        </div>
        <Collapse open={form.locationMethod === 'manual'}>
          <Field id="clinic-name" label="Clinic name" optional value={form.clinicName} onChange={(v) => update('clinicName', v)} placeholder="e.g. Riverside Family Clinic" />
          <Field id="address" label="Address" value={form.address} onChange={(v) => update('address', v)} placeholder="Street address" autoComplete="street-address" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field id="city" label="City" value={form.city} onChange={(v) => update('city', v)} placeholder="City" />
            <Field id="state" label="State" value={form.state} onChange={(v) => update('state', v)} placeholder="State" />
            <Field id="zip" label="ZIP" value={form.zip} onChange={(v) => update('zip', v)} placeholder="ZIP code" autoComplete="postal-code" />
          </div>
        </Collapse>
      </Reveal>

      <Reveal i={6}>
        <StepFooter onBack={onBack} onNext={onNext} nextLabel="Continue" ready={progress >= 1} />
      </Reveal>
    </section>
  );
}
