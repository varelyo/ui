import type { ElementType } from 'react';
import type { TypographyVariant } from '../../generated/maps';

export const TYPOGRAPHY_DEFAULT_VARIANT: TypographyVariant = 'body-md';

export const TYPOGRAPHY_DEFAULT_ELEMENTS: Readonly<Record<string, ElementType>> = {
  display: 'h1',
  headline: 'h2',
  title: 'h3',
  body: 'p',
  label: 'span',
};
