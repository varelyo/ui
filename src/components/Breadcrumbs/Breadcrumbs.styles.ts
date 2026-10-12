import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { BREADCRUMBS_COMPONENT_NAME_KEY } from './Breadcrumbs.constants';

const breadcrumbs = componentTokens[BREADCRUMBS_COMPONENT_NAME_KEY];

export const breadcrumbsRootClassName = (className?: ClassValue) =>
  cx(breadcrumbs.variants.standard.primary, className);

export const breadcrumbsListClassName = cx(breadcrumbs.slots.root, 'flex flex-wrap items-center');

export const breadcrumbsItemClassName = cx('inline-flex items-center outline-none');

export const breadcrumbsSeparatorClassName = cx(
  breadcrumbs.slots.separator,
  'inline-flex select-none items-center',
);

export const breadcrumbsCollapseItemClassName = cx('inline-flex');

export const breadcrumbsCollapseClassName = cx(
  breadcrumbs.variants.standard.primary,
  breadcrumbs.slots.collapse,
  'vy-focus-ring inline-flex cursor-pointer items-center transition-colors duration-xs ease-standard motion-reduce:transition-none',
);
