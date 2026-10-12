import { Children, isValidElement, useEffect, useRef, useState } from 'react';
import { BREADCRUMBS_REVEALED_ATTRIBUTE } from '../Breadcrumbs.constants';
import type { UseBreadcrumbsParams, UseBreadcrumbsResult } from '../Breadcrumbs.types';
import { breadcrumbEntries } from '../Breadcrumbs.utils';

export function useBreadcrumbs({
  children,
  maxItems,
  itemsBeforeCollapse,
  itemsAfterCollapse,
}: UseBreadcrumbsParams): UseBreadcrumbsResult {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLOListElement | null>(null);
  const items = Children.toArray(children).map((node, index) => ({
    key: isValidElement(node) && node.key !== null ? node.key : `item-${index}`,
    node,
  }));
  const collapsible =
    items.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse < items.length;
  useEffect(() => {
    if (!expanded) return;
    const revealed = listRef.current?.querySelector<HTMLElement>(
      `[${BREADCRUMBS_REVEALED_ATTRIBUTE}]`,
    );
    const target =
      revealed?.querySelector<HTMLElement>('a[href], button, [tabindex]') ?? revealed ?? null;
    target?.focus();
  }, [expanded]);
  return {
    entries: breadcrumbEntries(
      items,
      collapsible && !expanded,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      collapsible && expanded ? itemsBeforeCollapse : null,
    ),
    listRef,
    expand: () => setExpanded(true),
  };
}
