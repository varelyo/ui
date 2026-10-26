import type { ComponentPropsWithRef, Key, ReactNode, RefObject } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { BREADCRUMBS_COMPONENT_NAME_KEY } from './Breadcrumbs.constants';

export type BreadcrumbsTokens = ComponentTokens[typeof BREADCRUMBS_COMPONENT_NAME_KEY];
export type BreadcrumbsVariant = VariantOf<BreadcrumbsTokens>;

type BreadcrumbsOwnProps = {
  children?: ReactNode;
  separator?: ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  expandText?: string;
  variant?: BreadcrumbsVariant;
};

export type BreadcrumbsProps = BreadcrumbsOwnProps &
  Omit<ComponentPropsWithRef<'nav'>, keyof BreadcrumbsOwnProps | 'style'>;

export type BreadcrumbsEntry =
  | { kind: 'item'; key: Key; node: ReactNode; current: boolean; revealed: boolean }
  | { kind: 'collapse'; key: Key };

export interface UseBreadcrumbsParams {
  children: ReactNode;
  maxItems: number;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
}

export interface UseBreadcrumbsResult {
  entries: BreadcrumbsEntry[];
  listRef: RefObject<HTMLOListElement | null>;
  expand: () => void;
}

export interface BreadcrumbsItemProps {
  current: boolean;
  revealed: boolean;
  children: ReactNode;
}

export interface BreadcrumbsSeparatorProps {
  children: ReactNode;
}

export interface BreadcrumbsCollapseProps {
  variant: BreadcrumbsVariant;
  label: string;
  onExpand: () => void;
}
