import type { ReactNode } from 'react';
import type { Brand, ScopeMode } from '../../generated/maps';

export type PortalProps = {
  children?: ReactNode;
  container?: HTMLElement | null | undefined;
  disablePortal?: boolean;
};

export interface OverlayRootProps {
  children: ReactNode;
}

export interface OverlayPortalProps {
  children?: ReactNode;
  container: HTMLElement | null | undefined;
  disablePortal: boolean;
  preserveTabOrder: boolean;
}

export interface PortalBoundaryProps {
  'data-vy-brand'?: Brand;
  'data-vy-mode'?: ScopeMode;
}

export interface UsePortalParams {
  container: HTMLElement | null | undefined;
}

export interface UsePortalResult {
  boundaryProps: PortalBoundaryProps;
  rootProps: { root?: HTMLElement };
}
