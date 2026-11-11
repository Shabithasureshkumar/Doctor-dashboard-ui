import type { FormState, UpdateField } from '../../state/form';

export interface StepProps {
  form: FormState;
  update: UpdateField;
  /** 0–1 completion of this step. */
  progress: number;
  onNext: () => void;
  onBack: () => void;
  onSkipToDashboard?: () => void;
}
