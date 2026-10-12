import type { DwellStep, GapStep, MotionStep, PaddingStep } from '../generated/maps';

export const GAP_VARIABLES: Readonly<Record<GapStep, string>> = {
  none: '--vy-gap-none',
  '2xs': '--vy-gap-2xs',
  xs: '--vy-gap-xs',
  sm: '--vy-gap-sm',
  md: '--vy-gap-md',
  lg: '--vy-gap-lg',
  xl: '--vy-gap-xl',
  '2xl': '--vy-gap-2xl',
  '3xl': '--vy-gap-3xl',
};

export const PADDING_VARIABLES: Readonly<Record<PaddingStep, string>> = {
  none: '--vy-padding-none',
  '2xs': '--vy-padding-2xs',
  xs: '--vy-padding-xs',
  sm: '--vy-padding-sm',
  md: '--vy-padding-md',
  lg: '--vy-padding-lg',
  xl: '--vy-padding-xl',
  '2xl': '--vy-padding-2xl',
  '3xl': '--vy-padding-3xl',
};

export const MOTION_DURATION_VARIABLES: Readonly<Record<MotionStep, string>> = {
  none: '--vy-motion-duration-none',
  '2xs': '--vy-motion-duration-2xs',
  xs: '--vy-motion-duration-xs',
  sm: '--vy-motion-duration-sm',
  md: '--vy-motion-duration-md',
  lg: '--vy-motion-duration-lg',
  xl: '--vy-motion-duration-xl',
  '2xl': '--vy-motion-duration-2xl',
  '3xl': '--vy-motion-duration-3xl',
};

export const DWELL_VARIABLES: Readonly<Record<DwellStep, string>> = {
  short: '--vy-dwell-short',
  medium: '--vy-dwell-medium',
  long: '--vy-dwell-long',
};

const rootFontSize = (element: Element) =>
  Number.parseFloat(getComputedStyle(element.ownerDocument.documentElement).fontSize);

const milliseconds = (value: string) => {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.trim().endsWith('ms') ? amount : amount * 1000;
};

export function cssLength(element: Element, variable: string): number {
  const value = getComputedStyle(element).getPropertyValue(variable).trim();
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0;
  return value.endsWith('rem') ? amount * rootFontSize(element) : amount;
}

export function cssTime(element: Element, variable: string): number {
  return milliseconds(getComputedStyle(element).getPropertyValue(variable));
}

export function transitionTime(element: Element): number {
  const styles = getComputedStyle(element);
  const durations = styles.transitionDuration.split(',').map(milliseconds);
  const delays = styles.transitionDelay.split(',').map(milliseconds);
  return Math.max(
    0,
    ...durations.map((duration, index) => duration + (delays[index % delays.length] ?? 0)),
  );
}
