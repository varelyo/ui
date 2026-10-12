import { BREADCRUMBS_REVEALED_ATTRIBUTE } from '../Breadcrumbs.constants';
import { breadcrumbsItemClassName } from '../Breadcrumbs.styles';
import type { BreadcrumbsItemProps } from '../Breadcrumbs.types';

export function BreadcrumbsItem({ current, revealed, children }: BreadcrumbsItemProps) {
  return (
    <li
      className={breadcrumbsItemClassName}
      aria-current={current ? 'page' : undefined}
      {...(revealed ? { [BREADCRUMBS_REVEALED_ATTRIBUTE]: '', tabIndex: -1 } : {})}
    >
      {children}
    </li>
  );
}
