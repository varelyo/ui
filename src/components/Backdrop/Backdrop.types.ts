import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';

export type BackdropProps = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'> & {
  open: boolean;
  invisible?: boolean;
  children?: ReactNode;
};

export interface BackdropStyleProps {
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
