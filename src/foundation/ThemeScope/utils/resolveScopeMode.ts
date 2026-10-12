import type { Mode, ScopeMode } from '../../../generated/maps';

export function resolveScopeMode(mode: ScopeMode, parent: Mode | undefined): Mode | undefined {
  if (mode !== 'inverse') return mode;
  if (!parent) return undefined;
  return parent === 'dark' ? 'light' : 'dark';
}
