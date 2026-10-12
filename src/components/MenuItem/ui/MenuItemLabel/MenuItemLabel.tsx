import type { MenuItemLabelProps } from '../../MenuItem.types';
import { menuItemLabelClassName } from './MenuItemLabel.styles';

export function MenuItemLabel({ children }: MenuItemLabelProps) {
  return <span className={menuItemLabelClassName}>{children}</span>;
}
