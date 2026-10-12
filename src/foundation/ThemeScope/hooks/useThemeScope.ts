import { use, useMemo } from 'react';
import { defaultBrand, defaultMode } from '../../../generated/maps';
import { outermostScope, ThemeScopeContext } from '../context';
import type { ThemeScopeState, UseThemeScopeParams } from '../ThemeScope.types';
import { resolveScopeMode } from '../utils';

export function useThemeScope({ brand, mode }: UseThemeScopeParams): ThemeScopeState {
  const parent = use(ThemeScopeContext);
  const outermost = parent === outermostScope;
  const renderedBrand = brand ?? (outermost ? defaultBrand : undefined);
  const renderedMode = mode ?? (outermost ? defaultMode : undefined);
  const scopeBrand = renderedBrand ?? parent.brand;
  const scopeMode = renderedMode ?? parent.mode;
  const resolvedMode = renderedMode
    ? resolveScopeMode(renderedMode, parent.resolvedMode ?? defaultMode)
    : parent.resolvedMode;
  const value = useMemo(
    () => ({ brand: scopeBrand, mode: scopeMode, resolvedMode }),
    [scopeBrand, scopeMode, resolvedMode],
  );
  return { value, brand: renderedBrand, mode: renderedMode };
}
