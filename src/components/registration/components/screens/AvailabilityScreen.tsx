import { DAYS, SCHEDULES, VISIT_TYPES } from '../../data/content';
import { toggleIn } from '../../state/form';
import { Icon } from '../Icon';
import { CardOption, ChipGroup } from '../ui/Choices';
import { Field } from '../ui/Field';
import { Collapse, Lead, Reveal, ScreenHeader, SectionLabel, StepFooter } from '../ui/Layout';
import type { StepProps } from './types';

export default function AvailabilityScreen({ form, update, progress, onNext, onBack }: StepProps) {
  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader icon={<Icon name="clock" size={26} strokeWidth={1.9} />} title="Set your availability" progress={progress} />
      </Reveal>
      <Reveal i={1}>
        <Lead>Pick a ready schedule, or build your own.</Lead>
      </Reveal>

      <div role="radiogroup" aria-label="Schedule" className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SCHEDULES.map((s, i) => (
          <Reveal key={s.id} i={i + 2} className="grid">
            <CardOption
              selected={form.schedule === s.id}
              onSelect={() => update('schedule', s.id)}
              isOther={s.id === 'custom'}
              title={s.title}
              description={s.desc}
            />
          </Reveal>
        ))}
      </div>

      <Collapse open={form.schedule === 'custom'}>
        <div>
          <SectionLabel>Working days</SectionLabel>
          <ChipGroup
            label="Working days"
            options={DAYS.map((d) => ({ value: d, label: d }))}
            selected={form.days}
            onToggle={(v) => update('days', toggleIn(form.days, v))}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="start-time" kind="time" label="Start" value={form.startTime} onChange={(v) => update('startTime', v)} />
          <Field id="end-time" kind="time" label="End" value={form.endTime} onChange={(v) => update('endTime', v)} />
        </div>
      </Collapse>

      <Reveal i={6} className="mt-6">
        <SectionLabel>Visit types</SectionLabel>
        <ChipGroup
          label="Visit types"
          options={VISIT_TYPES.map((v) => ({
            value: v.id,
            label: (
              <>
                {v.label} <small className="text-[11.5px] opacity-80">{v.duration}</small>
              </>
            ),
          }))}
          selected={form.visitTypes}
          onToggle={(v) => update('visitTypes', toggleIn(form.visitTypes, v))}
        />
      </Reveal>

      <Reveal i={7}>
        <StepFooter onBack={onBack} onNext={onNext} nextLabel="Continue" ready={progress >= 1} />
      </Reveal>
    </section>
  );
}
