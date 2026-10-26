import { breakpoints, type Breakpoint, type ByBreakpoint } from '../generated/maps';
import type { Responsive } from '../types';

const isBreakpointObject = <T>(value: Responsive<T>): value is { readonly [K in Breakpoint]?: T } =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function atBreakpoints<T>(
  value: Responsive<T> | undefined,
  fallback?: T,
): ReadonlyArray<readonly [Breakpoint, T]> {
  if (value === undefined) return fallback === undefined ? [] : [['xs', fallback]];
  if (!isBreakpointObject(value)) return [['xs', value as T]];
  const entries: Array<readonly [Breakpoint, T]> = [];
  for (const breakpoint of breakpoints) {
    const item = value[breakpoint];
    if (item !== undefined) entries.push([breakpoint, item]);
  }
  if (fallback !== undefined && value.xs === undefined) entries.unshift(['xs', fallback]);
  return entries;
}

export function baseValue<T>(value: Responsive<T> | undefined, fallback: T): T {
  return atBreakpoints(value, fallback)[0]?.[1] ?? fallback;
}

export function mapResponsive<T, U>(value: Responsive<T>, map: (item: T) => U): Responsive<U>;
export function mapResponsive<T, U>(
  value: Responsive<T> | undefined,
  map: (item: T) => U,
): Responsive<U> | undefined;
export function mapResponsive<T, U>(
  value: Responsive<T> | undefined,
  map: (item: T) => U,
): Responsive<U> | undefined {
  if (value === undefined) return undefined;
  if (!isBreakpointObject(value)) return map(value as T);
  const result: { [K in Breakpoint]?: U } = {};
  for (const [breakpoint, item] of atBreakpoints(value)) result[breakpoint] = map(item);
  return result;
}

export function responsiveClasses<K extends string | number>(
  value: Responsive<K> | undefined,
  map: { readonly [key in K]: ByBreakpoint | null },
  fallback?: K,
): string {
  return atBreakpoints(value, fallback)
    .map(([breakpoint, key]) => map[key]?.[breakpoint])
    .filter(Boolean)
    .join(' ');
}
