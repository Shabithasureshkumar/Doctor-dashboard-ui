import { AppearanceSettings } from '../types/settings';

const SETTINGS_STORAGE_KEY = 'mednevo_doctor_settings_v1';

let systemMediaListener: ((e: MediaQueryListEvent) => void) | null = null;
let currentMediaQuery: MediaQueryList | null = null;

export const ACCENT_COLOR_MAP: Record<
  AppearanceSettings['accentColor'],
  {
    primary: string;
    hover: string;
    light: string;
    gradient: string;
    border: string;
    ring: string;
    name: string;
  }
> = {
  purple: {
    primary: '#5C24FF',
    hover: '#4A15E8',
    light: '#F5F1FF',
    gradient: 'linear-gradient(135deg, #9A6AFB 0%, #5C24FF 100%)',
    border: 'rgba(92, 36, 255, 0.25)',
    ring: 'rgba(92, 36, 255, 0.4)',
    name: 'Mednevo Violet',
  },
  cyan: {
    primary: '#0891B2',
    hover: '#0E7490',
    light: '#ECFEFF',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    border: 'rgba(8, 145, 178, 0.25)',
    ring: 'rgba(8, 145, 178, 0.4)',
    name: 'Oceanic Cyan',
  },
  indigo: {
    primary: '#4F46E5',
    hover: '#4338CA',
    light: '#EEF2FF',
    gradient: 'linear-gradient(135deg, #818CF8 0%, #4338CA 100%)',
    border: 'rgba(79, 70, 229, 0.25)',
    ring: 'rgba(79, 70, 229, 0.4)',
    name: 'Royal Indigo',
  },
  emerald: {
    primary: '#059669',
    hover: '#047857',
    light: '#ECFDF5',
    gradient: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
    border: 'rgba(5, 150, 105, 0.25)',
    ring: 'rgba(5, 150, 105, 0.4)',
    name: 'Clinical Emerald',
  },
};

/**
 * Resolves effective theme ('light' or 'dark') given user's preference
 */
export function getEffectiveTheme(theme: AppearanceSettings['theme']): 'light' | 'dark' {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Applies the entire Appearance configuration to the DOM in real-time
 */
export function applyThemeSettings(appearance: AppearanceSettings) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // 1. Clean up prior system media listener if any
  if (currentMediaQuery && systemMediaListener) {
    try {
      currentMediaQuery.removeEventListener('change', systemMediaListener);
    } catch {
      // old browser fallback
      currentMediaQuery.removeListener?.(systemMediaListener as any);
    }
    systemMediaListener = null;
    currentMediaQuery = null;
  }

  // 2. Determine and apply dark/light class
  const applyDarkState = (isDark: boolean) => {
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  if (appearance.theme === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      currentMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyDarkState(currentMediaQuery.matches);

      systemMediaListener = (e: MediaQueryListEvent) => {
        applyDarkState(e.matches);
      };

      try {
        currentMediaQuery.addEventListener('change', systemMediaListener);
      } catch {
        currentMediaQuery.addListener?.(systemMediaListener as any);
      }
    } else {
      applyDarkState(false);
    }
  } else {
    applyDarkState(appearance.theme === 'dark');
  }

  // 3. Brand Accent Color via CSS variables
  const accent = ACCENT_COLOR_MAP[appearance.accentColor] || ACCENT_COLOR_MAP.purple;
  root.style.setProperty('--brand-primary', accent.primary);
  root.style.setProperty('--brand-primary-hover', accent.hover);
  root.style.setProperty('--brand-light', accent.light);
  root.style.setProperty('--brand-gradient', accent.gradient);
  root.style.setProperty('--brand-border', accent.border);
  root.style.setProperty('--brand-ring', accent.ring);
  root.setAttribute('data-accent', appearance.accentColor);

  // 4. Typography Scale
  if (typeof appearance.fontScale === 'number' && appearance.fontScale >= 75 && appearance.fontScale <= 150) {
    root.style.fontSize = `${appearance.fontScale}%`;
  } else if (appearance.fontSize === 'small') {
    root.style.fontSize = '90%';
  } else if (appearance.fontSize === 'large') {
    root.style.fontSize = '110%';
  } else {
    root.style.fontSize = '100%';
  }
  root.setAttribute('data-font-size', appearance.fontSize);
  if (appearance.fontScale) {
    root.setAttribute('data-font-scale', `${appearance.fontScale}%`);
  }

  // 5. Layout Density
  if (appearance.layoutDensity === 'compact') {
    root.classList.add('density-compact');
  } else {
    root.classList.remove('density-compact');
  }
  root.setAttribute('data-density', appearance.layoutDensity);

  // 6. High Contrast Mode
  if (appearance.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  // 7. Reduced Motion
  if (appearance.reducedMotion) {
    root.classList.add('reduced-motion');
  } else {
    root.classList.remove('reduced-motion');
  }

  // 8. Screen Reader Optimized
  if (appearance.screenReaderOptimized) {
    root.classList.add('screen-reader-optimized');
    root.setAttribute('data-accessibility-level', 'AAA');
  } else {
    root.classList.remove('screen-reader-optimized');
    root.removeAttribute('data-accessibility-level');
  }
}

/**
 * Initializes the theme engine from localStorage when the app boots
 */
export function initThemeEngine(): AppearanceSettings | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.appearance) {
        applyThemeSettings(parsed.appearance);
        return parsed.appearance;
      }
    }
  } catch (err) {
    console.error('Failed to initialize theme engine:', err);
  }

  // Default fallback if nothing stored yet
  const defaultAppearance: AppearanceSettings = {
    theme: 'light',
    accentColor: 'purple',
    fontSize: 'standard',
    layoutDensity: 'comfortable',
    highContrast: false,
    reducedMotion: false,
    screenReaderOptimized: false,
  };
  applyThemeSettings(defaultAppearance);
  return defaultAppearance;
}
