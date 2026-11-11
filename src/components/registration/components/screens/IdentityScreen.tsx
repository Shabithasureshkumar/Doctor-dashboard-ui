import { CREDENTIALS, LANGUAGES, SPECIALTIES } from '../../data/content';
import { OTHER, toggleIn } from '../../state/form';
import { Icon } from '../Icon';
import { ChipGroup } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Collapse, Lead, Reveal, ScreenHeader, SectionLabel, StepFooter } from '../ui/Layout';
import type { StepProps } from './types';

const asOptions = (list: string[]) => list.map((v) => ({ value: v, label: v }));

export default function IdentityScreen({ form, update, progress, onNext, onBack }: StepProps) {
  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader icon={<Icon name="idCard" size={26} strokeWidth={1.9} />} title="Your credentials" progress={progress} />
      </Reveal>
      <Reveal i={1}>
        <Lead>Tap to choose, or enter your own.</Lead>
      </Reveal>

      <div className="mt-7 flex flex-col gap-[18px]">
        <Reveal i={2}>
          <Field id="full-name" label="Full name (as on license)" value={form.fullName} onChange={(v) => update('fullName', v)} placeholder="Dr. Jane Doe" autoComplete="name" />
        </Reveal>

        <Reveal i={3}>
          <SectionLabel>Primary specialty</SectionLabel>
          <ChipGroup
            label="Primary specialty"
            options={asOptions(SPECIALTIES)}
            selected={form.specialty ? [form.specialty] : []}
            onToggle={(v) => update('specialty', form.specialty === v ? null : v)}
            otherValue={OTHER}
          />
          <Collapse open={form.specialty === OTHER}>
            <Field id="specialty-other" label="Your specialty" hideLabel value={form.specialtyOther} onChange={(v) => update('specialtyOther', v)} placeholder="Type your specialty" />
          </Collapse>
        </Reveal>

        <Reveal i={4}>
          <SectionLabel>Credentials</SectionLabel>
          <ChipGroup
            label="Credentials"
            options={asOptions(CREDENTIALS)}
            selected={form.credentials}
            onToggle={(v) => update('credentials', toggleIn(form.credentials, v))}
            otherValue={OTHER}
          />
          <Collapse open={form.credentials.includes(OTHER)}>
            <Field id="credentials-other" label="Other credentials" hideLabel value={form.credentialsOther} onChange={(v) => update('credentialsOther', v)} placeholder="e.g. FRCS, DNB" />
          </Collapse>
        </Reveal>

        <Reveal i={5} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="license" label="License number" value={form.license} onChange={(v) => update('license', v)} placeholder="State license no." />
          <Field id="npi" label="NPI number" value={form.npi} onChange={(v) => update('npi', v.replace(/\D/g, ''))} placeholder="10 digits" inputMode="numeric" maxLength={10} />
        </Reveal>

        <Reveal i={6}>
          <SectionLabel>Languages with patients</SectionLabel>
          <ChipGroup
            label="Languages with patients"
            options={asOptions(LANGUAGES)}
            selected={form.languages}
            onToggle={(v) => update('languages', toggleIn(form.languages, v))}
            otherValue={OTHER}
          />
          <Collapse open={form.languages.includes(OTHER)}>
            <Field id="languages-other" label="Other languages" hideLabel value={form.languagesOther} onChange={(v) => update('languagesOther', v)} placeholder="Other languages, comma separated" />
          </Collapse>
        </Reveal>
      </div>

      <Reveal i={7}>
        <StepFooter onBack={onBack} onNext={onNext} nextLabel="Continue" ready={progress >= 1} />
      </Reveal>
    </section>
  );
}
