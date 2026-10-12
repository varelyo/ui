import type { ElementType, ReactNode } from 'react';
import type { Brand, Mode, ScopeMode } from '../../generated/maps';
import type { PolymorphicProps } from '../../types';

export type ThemeScopeProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    brand?: Brand;
    mode?: ScopeMode;
    children?: ReactNode;
  }
>;

export interface ThemeScopeValue {
  brand: Brand | undefined;
  mode: ScopeMode | undefined;
  resolvedMode: Mode | undefined;
}

export interface ThemeScopeState {
  value: ThemeScopeValue;
  brand: Brand | undefined;
  mode: ScopeMode | undefined;
}

export interface UseThemeScopeParams {
  brand: Brand | undefined;
  mode: ScopeMode | undefined;
}
