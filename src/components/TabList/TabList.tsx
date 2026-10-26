import { Composite } from '@floating-ui/react';
import { TabListContext } from './context';
import { useTabList } from './hooks';
import { tabListClassName } from './TabList.styles';
import type { TabListProps } from './TabList.types';

export function TabList({ ref, className, children, onKeyDown, onBlur, ...rest }: TabListProps) {
  const list = useTabList({ ref, onKeyDown, onBlur });
  return (
    <Composite
      {...rest}
      ref={list.ref}
      rtl={list.rtl}
      role="tablist"
      orientation={list.orientation}
      loop
      activeIndex={list.activeIndex}
      onNavigate={list.navigate}
      onKeyDown={list.onKeyDown}
      onBlur={list.onBlur}
      className={tabListClassName(
        { orientation: list.orientation, variant: list.variant },
        className,
      )}
    >
      <TabListContext value={list.context}>{children}</TabListContext>
    </Composite>
  );
}
