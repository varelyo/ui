import { createContext } from 'react';
import { MENU_ICON_SIZE } from '../Menu.constants';
import type { MenuContextValue } from '../Menu.types';

export const MenuContext = createContext<MenuContextValue>({
  variant: 'standard',
  activeIndex: null,
  iconSize: MENU_ICON_SIZE,
  getItemProps: (props) => ({ ...props }),
});
