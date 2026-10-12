import type { TabLabelProps } from '../../Tab.types';
import { tabLabelClassName } from './TabLabel.styles';

export function TabLabel({ children }: TabLabelProps) {
  return <span className={tabLabelClassName}>{children}</span>;
}
