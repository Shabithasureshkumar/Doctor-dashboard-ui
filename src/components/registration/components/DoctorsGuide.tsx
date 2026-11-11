import { useDelight } from '../context/DelightContext';
import doctors from '../assets/doctors.webp';

/**
 * The two doctors standing behind the form card, with a speech bubble.
 * They rise in on every new screen and do a little jump when they cheer.
 */
export default function DoctorsGuide({ step }: { step: number }) {
  const { message, messageKey, cheerKey } = useDelight();
  const animKind = cheerKey > 0 ? 'cheer' : 'rise';
  const animKey = `${step}-${cheerKey}`;

  return (
    <>
      <div
        key={`say-${messageKey}`}
        aria-live="polite"
        className="say-tail absolute right-[calc(50%+112px)] bottom-[calc(100%+76px)] z-[2] hidden max-w-[190px] origin-bottom-right animate-say-pop rounded-[14px_14px_4px_14px] border border-[#E4DAFF] bg-white px-3 py-2 text-[12.5px] leading-snug font-semibold text-ink md:block shadow-sm"
      >
        {message}
      </div>
      <div className="pointer-events-none absolute bottom-[calc(100%-1px)] left-1/2 w-[220px] -translate-x-1/2 select-none lg:w-[252px]">
        <img
          key={`docs-${animKey}`}
          src={doctors}
          alt="Two Mednevo doctors welcoming you"
          width={560}
          height={341}
          className={`block h-auto w-full ${animKind === 'rise' ? 'animate-docs-rise' : 'animate-docs-cheer'}`}
        />
      </div>
    </>
  );
}
