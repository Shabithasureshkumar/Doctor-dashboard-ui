export type FieldKind = 'text' | 'email' | 'tel' | 'password' | 'time';

/** Light, friendly validation used for the field ticks and the completion rings. */
export function isFieldValid(kind: FieldKind, value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  switch (kind) {
    case 'email':
      return /^\S+@\S+\.\S+$/.test(v);
    case 'tel':
      return v.replace(/\D/g, '').length >= 7;
    case 'password':
      return v.length >= 8;
    default:
      return v.length >= 2;
  }
}
