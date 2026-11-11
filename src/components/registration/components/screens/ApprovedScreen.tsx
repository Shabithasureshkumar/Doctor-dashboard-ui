import logoIcon from '../../assets/logo-icon.png';
import { Icon, type IconName } from '../Icon';
import { PrimaryButton, SecondaryButton } from '../ui/Button';
import { Lead, Reveal, ScreenHeader } from '../ui/Layout';

const NEXT: { icon: IconName; label: string }[] = [
  { icon: 'checklist', label: 'Set up clinical defaults' },
  { icon: 'calendar', label: 'Add upcoming time off' },
  { icon: 'eye', label: 'Preview your public profile' },
];

const STATUS = [
  { label: 'Submitted', tone: 'done' },
  { label: 'License verified', tone: 'done' },
  { label: 'Profile live', tone: 'live' },
] as const;

interface Props {
  doctorName: string;
  onReplay: () => void;
  onGoToDashboard?: () => void;
}

export default function ApprovedScreen({ doctorName, onReplay, onGoToDashboard }: Props) {
  return (
    <section>
      <Reveal i={0}>
        <ScreenHeader
          badgeClassName="flex h-[52px] w-[52px] flex-none animate-pop-in items-center justify-center rounded-[15px] border border-[#E1D6FF] bg-tint"
          icon={<img src={logoIcon} alt="" width={36} height={36} />}
          title={`You're approved! Welcome to Mednevo, ${doctorName}.`}
        />
      </Reveal>
      <Reveal i={1}>
        <Lead>Your license and credentials are verified. Your Doctor Portal is unlocked and patients can now book you.</Lead>
      </Reveal>

      <Reveal i={2} className="mt-6 flex flex-wrap gap-2">
        {STATUS.map((s) => (
          <span
            key={s.label}
            className={`inline-flex h-8 items-center gap-2 rounded-[10px] px-3 text-[12.5px] font-semibold ${s.tone === 'live' ? 'bg-brand text-white' : 'bg-tint text-brand'}`}
          >
            <i className={`h-[7px] w-[7px] rounded-full ${s.tone === 'live' ? 'animate-blink bg-white' : 'bg-brand'}`} />
            {s.label}
          </span>
        ))}
      </Reveal>

      <Reveal i={3} className="mt-5">
        {NEXT.map((n, i) => (
          <a
            key={n.label}
            href="#"
            className={`flex items-center gap-3.5 py-4 text-[15px] font-semibold text-ink transition-[padding,color] duration-300 hover:pl-2 hover:text-brand ${i < NEXT.length - 1 ? 'border-b border-line' : ''}`}
          >
            <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-tint text-brand">
              <Icon name={n.icon} size={18} />
            </span>
            {n.label}
            <Icon name="arrowRight" size={16} className="ml-auto" />
          </a>
        ))}
      </Reveal>

      <Reveal i={4}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE9FB] pt-5">
          <SecondaryButton onClick={onReplay}>Replay flow</SecondaryButton>
          <PrimaryButton onClick={onGoToDashboard}>
            Go to dashboard <Icon name="arrowRight" size={18} strokeWidth={2.2} />
          </PrimaryButton>
        </div>
      </Reveal>
    </section>
  );
}
