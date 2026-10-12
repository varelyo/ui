import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { SizeOf, VariantOf } from '../../types';
import type { COLLAPSE_COMPONENT_NAME_KEY } from './Collapse.constants';

export type CollapseTokens = ComponentTokens[typeof COLLAPSE_COMPONENT_NAME_KEY];
export type CollapseOrientation = VariantOf<CollapseTokens>;
export type CollapseSize = SizeOf<CollapseTokens>;

type CollapseOwnProps = {
  in?: boolean;
  orientation?: CollapseOrientation;
  collapsedSize?: CollapseSize;
  unmountOnExit?: boolean;
  children?: ReactNode;
};

export type CollapseProps = CollapseOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof CollapseOwnProps | 'style'>;

export interface CollapseStyleProps {
  orientation: CollapseOrientation;
  collapsedSize: CollapseSize;
}

export interface UseCollapseParams {
  open: boolean;
  collapsedSize: CollapseSize;
  unmountOnExit: boolean;
  ref: Ref<HTMLDivElement> | undefined;
}

export interface CollapseRootProps {
  'data-closed'?: '';
}

export interface CollapseContentProps {
  inert?: true;
}

export interface UseCollapseResult {
  ref: (node: HTMLDivElement | null) => void;
  rendered: boolean;
  rootProps: CollapseRootProps;
  contentProps: CollapseContentProps;
}
