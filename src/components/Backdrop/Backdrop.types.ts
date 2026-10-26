import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { BACKDROP_COMPONENT_NAME_KEY } from './Backdrop.constants';

export type BackdropTokens = ComponentTokens[typeof BACKDROP_COMPONENT_NAME_KEY];
export type BackdropVariant = VariantOf<BackdropTokens>;

export type BackdropProps = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'> & {
  open: boolean;
  invisible?: boolean;
  variant?: BackdropVariant;
  children?: ReactNode;
};

export interface BackdropStyleProps {
  variant: BackdropVariant;
  invisible: boolean;
}

export interface UseBackdropParams {
  open: boolean;
  ref: Ref<HTMLDivElement> | undefined;
}

export interface BackdropLayerProps {
  'data-closed'?: '';
}

export interface UseBackdropResult {
  rendered: boolean;
  ref: (node: HTMLDivElement | null) => void;
  layerProps: BackdropLayerProps;
}
