import { useCallback, useEffect, useRef, useState } from 'react';
import BackgroundFx from './components/BackgroundFx';
import Confetti from './components/Confetti';
import DoctorsGuide from './components/DoctorsGuide';
import { Icon } from './components/Icon';
import ParticleHero from './components/ParticleHero';
import Stepper from './components/Stepper';
import AccountScreen from './components/screens/AccountScreen';
import ApprovedScreen from './components/screens/ApprovedScreen';
import AvailabilityScreen from './components/screens/AvailabilityScreen';
import IdentityScreen from './components/screens/IdentityScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PracticeScreen from './components/screens/PracticeScreen';
import RoleScreen from './components/screens/RoleScreen';
import UnderReviewScreen from './components/screens/UnderReviewScreen';
import type { StepProps } from './components/screens/types';
import { DelightProvider, useDelight } from './context/DelightContext';
import { GREETINGS, HERO } from './data/content';
import { stepCompletion } from './lib/completion';
import { isFieldValid } from './lib/validation';
import { initialForm, type FormState, type UpdateField } from './state/form';

const STEP_SCREENS = [RoleScreen, AccountScreen, IdentityScreen, PracticeScreen, AvailabilityScreen, PaymentScreen];
const REVIEW = 6;
const APPROVED = 7;
const LAST = APPROVED;

function doctorDisplayName(fullName: string): string {
  const name = fullName.trim();
  if (!name) return 'Doctor';
  return /^dr\.?\s/i.test(name) ? name : `Dr. ${name}`;
}

export interface ProviderRegistrationViewProps {
  onCompleteRegistration?: (doctorName?: string) => void;
  onSkipToDashboard?: () => void;
}

function RegistrationFlow({ onCompleteRegistration, onSkipToDashboard }: ProviderRegistrationViewProps) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const cardRef = useRef<HTMLDivElement>(null);
  const { say, burst, rain } = useDelight();

  const update = useCallback<UpdateField>((key, value) => setForm((f) => ({ ...f, [key]: value })), []);

  const go = useCallback(
    (next: number) => {
      if (leaving || next < 0 || next > LAST || next === step) return;
      setLeaving(true);
      window.setTimeout(() => {
        setStep(next);
        setLeaving(false);
      }, 230);
    },
    [leaving, step],
  );

  // What happens when a new screen opens.
  useEffect(() => {
    say(GREETINGS[step]);
    if (window.scrollY > 60 && window.innerWidth >= 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step === REVIEW) {
      const t = window.setTimeout(() => {
        const r = cardRef.current?.getBoundingClientRect();
        if (r) burst(r.left + r.width / 2, r.top + 40, 90);
      }, 350);
      return () => window.clearTimeout(t);
    }
    if (step === APPROVED) {
      const t = window.setTimeout(() => rain(160), 300);
      return () => window.clearTimeout(t);
    }
  }, [step, say, burst, rain]);

  const hero = HERO[step];
  const heroTitle = step === 2 && form.fullName.trim() ? `Nice to meet you, ${doctorDisplayName(form.fullName)}.` : hero.title;

  const renderScreen = () => {
    if (step === REVIEW) {
      return (
        <UnderReviewScreen
          email={isFieldValid('email', form.email) ? form.email : '[your email]'}
          onPreviewApproved={() => go(APPROVED)}
          onHome={() => go(0)}
          onGoToDashboard={() => onCompleteRegistration?.(doctorDisplayName(form.fullName))}
        />
      );
    }
    if (step === APPROVED) {
      return (
        <ApprovedScreen
          doctorName={doctorDisplayName(form.fullName)}
          onReplay={() => go(0)}
          onGoToDashboard={() => onCompleteRegistration?.(doctorDisplayName(form.fullName))}
        />
      );
    }
    const Screen = STEP_SCREENS[step];
    const props: StepProps = {
      form,
      update,
      progress: stepCompletion(step, form),
      onNext: () => go(step + 1),
      onBack: () => go(step - 1),
      onSkipToDashboard,
    };
    return <Screen {...props} />;
  };

  return (
    <>
      <BackgroundFx />
      <Confetti />

      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 gap-3 p-2.5 lg:my-8 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1fr)] lg:gap-[18px] lg:rounded-[40px] lg:border lg:border-white/85 lg:bg-white/40 lg:p-4 lg:backdrop-blur-[18px] lg:shadow-[0_40px_90px_-50px_rgb(92_36_255/0.35)]">
        <ParticleHero
          shape={hero.shape}
          kicker={hero.kicker}
          title={heroTitle}
          text={hero.text}
          filled={step >= REVIEW ? 5 : step}
          complete={step >= REVIEW}
          textKey={step}
        />

        <main className="relative flex min-w-0 flex-col rounded-[24px] border border-white bg-linear-to-b from-[#F9F7FF] to-[#F2EDFF] p-3.5 lg:min-h-[max(640px,calc(100vh-96px))] lg:rounded-[30px] lg:px-[26px] lg:py-[22px]">
          <header className="mb-[140px] flex flex-none items-center justify-between gap-4 rounded-[20px] border border-line-soft bg-white px-[18px] py-3 lg:mb-[172px]">
            <Stepper step={step} />
            <button
              type="button"
              onClick={onSkipToDashboard}
              className="flex-none border-l border-line pl-4 text-[13.5px] font-semibold text-brand hover:text-brand-deep cursor-pointer"
            >
              Save &amp; exit
            </button>
          </header>

          <div ref={cardRef} className="relative my-auto w-full rounded-[28px] border border-line-soft bg-white px-[22px] pt-8 pb-[30px] lg:px-[clamp(22px,3vw,36px)]">
            <DoctorsGuide step={step} />
            <div key={step} className={leaving ? 'animate-screen-out' : 'animate-screen-in'}>
              {renderScreen()}
            </div>
          </div>

          <p className="mt-3.5 mb-0 flex items-center justify-center gap-2 text-[12.5px] text-muted-2">
            <Icon name="lock" size={14} className="text-brand" />
            Your information is encrypted and kept private.
            <a href="#" className="font-semibold text-brand">
              Need help?
            </a>
          </p>
        </main>
      </div>
    </>
  );
}

export function ProviderRegistrationView(props: ProviderRegistrationViewProps) {
  return (
    <DelightProvider>
      <RegistrationFlow {...props} />
    </DelightProvider>
  );
}

export default ProviderRegistrationView;
