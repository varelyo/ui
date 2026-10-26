import { TabsContext } from './context';
import { useTabs } from './hooks';
import { tabsClassName } from './Tabs.styles';
import type { TabsProps } from './Tabs.types';

export function Tabs({
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  selectionFollowsFocus = false,
  variant = 'standard',
  color = 'neutral',
  className,
  children,
  ...rest
}: TabsProps) {
  const tabs = useTabs({
    value,
    defaultValue,
    onChange,
    orientation,
    selectionFollowsFocus,
    variant,
    color,
  });
  return (
    <div {...rest} data-orientation={orientation} className={tabsClassName(orientation, className)}>
      <TabsContext value={tabs.context}>{children}</TabsContext>
    </div>
  );
}
