import { useTabPanel } from './hooks';
import { tabPanelClassName } from './TabPanel.styles';
import type { TabPanelProps } from './TabPanel.types';

export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const panel = useTabPanel({ value });
  return (
    <div {...rest} {...panel.panelProps} className={tabPanelClassName(className)}>
      {panel.selected ? children : null}
    </div>
  );
}
