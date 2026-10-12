import { breadcrumbsSeparatorClassName } from '../Breadcrumbs.styles';
import type { BreadcrumbsSeparatorProps } from '../Breadcrumbs.types';

export function BreadcrumbsSeparator({ children }: BreadcrumbsSeparatorProps) {
  return (
    <li aria-hidden="true" className={breadcrumbsSeparatorClassName}>
      {children}
    </li>
  );
}
