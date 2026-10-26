import { baseValue } from '../../../utils';
import { TYPOGRAPHY_DEFAULT_ELEMENTS, TYPOGRAPHY_DEFAULT_VARIANT } from '../Typography.constants';
import type { UseTypographyParams, UseTypographyResult } from '../Typography.types';

export function useTypography({ variant, component }: UseTypographyParams): UseTypographyResult {
  const family = baseValue(variant, TYPOGRAPHY_DEFAULT_VARIANT).split('-')[0] ?? 'body';
  return { Component: component ?? TYPOGRAPHY_DEFAULT_ELEMENTS[family] ?? 'p' };
}
