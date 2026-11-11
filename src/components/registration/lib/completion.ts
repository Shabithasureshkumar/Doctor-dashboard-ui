import { OTHER, type FormState } from '../state/form';
import { isFieldValid } from './validation';

const text = (v: string) => isFieldValid('text', v);

/** Fraction (0–1) of the required items filled in on a given step. Drives the completion ring. */
export function stepCompletion(step: number, f: FormState): number {
  const checks: boolean[] = [];

  switch (step) {
    case 0:
      checks.push(true);
      if (f.role === 'other') checks.push(text(f.roleOther));
      break;
    case 1:
      checks.push(f.accountMethod !== null);
      if (f.accountMethod === 'email') {
        checks.push(
          isFieldValid('email', f.email),
          isFieldValid('tel', f.phone),
          isFieldValid('password', f.password),
          isFieldValid('password', f.confirmPassword) && f.confirmPassword === f.password,
        );
      }
      break;
    case 2:
      checks.push(text(f.fullName), f.specialty !== null);
      if (f.specialty === OTHER) checks.push(text(f.specialtyOther));
      checks.push(f.credentials.length > 0);
      if (f.credentials.includes(OTHER)) checks.push(text(f.credentialsOther));
      checks.push(text(f.license), text(f.npi), f.languages.length > 0);
      if (f.languages.includes(OTHER)) checks.push(text(f.languagesOther));
      break;
    case 3:
      checks.push(true, f.locationMethod !== null);
      if (f.locationMethod === 'manual') checks.push(text(f.address), text(f.city), text(f.state), text(f.zip));
      break;
    case 4:
      checks.push(true);
      if (f.schedule === 'custom') checks.push(f.days.length > 0, text(f.startTime), text(f.endTime));
      checks.push(f.visitTypes.length > 0);
      break;
    case 5:
      checks.push(f.payMethod !== null);
      if (f.payMethod === 'bank') checks.push(text(f.accountHolder), text(f.routingNumber), text(f.accountNumber), text(f.tin));
      if (f.payMethod === 'card') checks.push(text(f.cardNumber), text(f.cardExpiry), text(f.cardZip), text(f.tin));
      break;
    default:
      return 1;
  }

  return checks.filter(Boolean).length / checks.length;
}
