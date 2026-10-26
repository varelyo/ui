import { cssVariables, type DwellStep, type MotionStep, type SpaceStep } from '../generated/maps';

export const SPACE_VARIABLES: Readonly<Record<SpaceStep, string>> = cssVariables.space;

export const MOTION_DURATION_VARIABLES: Readonly<Record<MotionStep, string>> =
  cssVariables.motionDuration;

export const DWELL_VARIABLES: Readonly<Record<DwellStep, string>> = cssVariables.dwell;

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
