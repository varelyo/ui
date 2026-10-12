import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { MENU_SIZE } from '../Menu';
import { MENU_ITEM_COMPONENT_NAME_KEY } from './MenuItem.constants';

const menu = componentTokens[MENU_ITEM_COMPONENT_NAME_KEY];

export const menuItemClassName = (className?: ClassValue) =>
  cx(
    menu.variants.standard.primary,
    responsiveClasses(MENU_SIZE, menu.sizes.standard.primary, MENU_SIZE),
    menu.slots.item,
    'flex w-full shrink-0 items-center justify-start text-left transition-colors duration-xs ease-standard motion-reduce:transition-none',
    className,
  );
