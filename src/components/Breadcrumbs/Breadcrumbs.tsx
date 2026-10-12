import { Fragment } from 'react';
import { breadcrumbsListClassName, breadcrumbsRootClassName } from './Breadcrumbs.styles';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import { useBreadcrumbs } from './hooks';
import { BreadcrumbsCollapse, BreadcrumbsItem, BreadcrumbsSeparator } from './ui';

export function Breadcrumbs({
  children,
  separator = '/',
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  expandText = 'Show path',
  className,
  ...rest
}: BreadcrumbsProps) {
  const breadcrumbs = useBreadcrumbs({
    children,
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
  });
  return (
    <nav aria-label="Breadcrumb" {...rest} className={breadcrumbsRootClassName(className)}>
      <ol ref={breadcrumbs.listRef} className={breadcrumbsListClassName}>
        {breadcrumbs.entries.map((entry, index) => (
          <Fragment key={entry.key}>
            {index > 0 ? <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator> : null}
            {entry.kind === 'collapse' ? (
              <BreadcrumbsCollapse label={expandText} onExpand={breadcrumbs.expand} />
            ) : (
              <BreadcrumbsItem current={entry.current} revealed={entry.revealed}>
                {entry.node}
              </BreadcrumbsItem>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
