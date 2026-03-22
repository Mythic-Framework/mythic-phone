import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * App color defaults — the original hardcoded accent color for each app.
 * When no custom color is saved, these are used as the fallback.
 */
export const APP_COLOR_DEFAULTS: Record<string, string> = {
  // Home & common teal apps
  home:          '#208692',
  contacts:      '#208692',
  bank:          '#208692',
  blueline:      '#208692',
  calculator:    '#208692',
  comanager:     '#208692',
  crypto:        '#208692',
  documents:     '#208692',
  email:         '#208692',
  labor:         '#208692',
  leoassist:     '#1a5fa8',
  loans:         '#208692',
  messages:      '#208692',
  phone:         '#208692',
  redline:       '#208692',
  store:         '#208692',
  twitter:       '#208692',
  // Unique-color apps
  adverts:       '#f9a825',
  dyn8:          '#136231',
  garage:        '#eb34de',
  govt:          '#5597d0',
  homemanage:    '#30518c',
  irc:           '#1de9b6',
  lsunderground: '#E95200',
  pingem:        '#8E1467',
};

/**
 * useAppColor(appKey)
 *
 * Returns the current accent color for the given app from Redux settings.
 * Falls back to the app's original default color if nothing is saved.
 *
 * Usage:
 *   const T = useAppColor('bank');
 *
 * Then use T anywhere you previously used a hardcoded color constant.
 */
export function useAppColor(appKey: string): string {
  const colors = useSelector(
    (state: RootState) => state.data.data.player?.PhoneSettings?.colors
  );
  const saved = colors?.[appKey];
  if (saved && saved !== '#ffffff') return saved;
  return APP_COLOR_DEFAULTS[appKey] ?? '#208692';
}

/** Helper: hex color → rgba string */
export function hexAlpha(hex: string, alpha: number): string {
  try {
    const clean = hex.replace('#', '');
    const full = clean.length === 3
      ? clean.split('').map(c => c + c).join('')
      : clean;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  } catch {
    return `rgba(32,134,146,${alpha})`;
  }
}
