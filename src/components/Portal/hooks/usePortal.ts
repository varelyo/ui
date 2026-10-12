import { use } from 'react';
import { ThemeScopeContext } from '../../../foundation/ThemeScope';
import type { UsePortalParams, UsePortalResult } from '../Portal.types';

export function usePortal({ container }: UsePortalParams): UsePortalResult {
  const { brand, mode, resolvedMode } = use(ThemeScopeContext);
  const boundaryMode = mode === 'inverse' ? (resolvedMode ?? mode) : mode;
  return {
    boundaryProps: {
      ...(brand ? { 'data-vy-brand': brand } : {}),
      ...(boundaryMode ? { 'data-vy-mode': boundaryMode } : {}),
    },
    rootProps: container ? { root: container } : {},
  };
}
