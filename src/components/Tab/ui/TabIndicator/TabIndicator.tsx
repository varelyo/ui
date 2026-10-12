import type { TabIndicatorProps } from '../../Tab.types';
import { tabIndicatorClassName } from './TabIndicator.styles';

export function TabIndicator({ orientation }: TabIndicatorProps) {
  return (
    <span aria-hidden="true" data-slot="indicator" className={tabIndicatorClassName(orientation)} />
  );
}
