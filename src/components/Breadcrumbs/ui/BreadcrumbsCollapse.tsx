import { Icon } from '../../../foundation/Icon';
import { BREADCRUMBS_ICON_SIZE } from '../Breadcrumbs.constants';
import {
  breadcrumbsCollapseClassName,
  breadcrumbsCollapseItemClassName,
} from '../Breadcrumbs.styles';
import type { BreadcrumbsCollapseProps } from '../Breadcrumbs.types';

export function BreadcrumbsCollapse({ label, onExpand }: BreadcrumbsCollapseProps) {
  return (
    <li className={breadcrumbsCollapseItemClassName}>
      <button
        type="button"
        aria-label={label}
        onClick={onExpand}
        className={breadcrumbsCollapseClassName}
      >
        <Icon name="more-horizontal" size={BREADCRUMBS_ICON_SIZE} />
      </button>
    </li>
  );
}
