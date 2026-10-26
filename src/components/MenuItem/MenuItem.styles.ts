import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { MENU_SIZE, type MenuVariant } from '../Menu';
import { MENU_ITEM_COMPONENT_NAME_KEY } from './MenuItem.constants';

const menu = componentTokens[MENU_ITEM_COMPONENT_NAME_KEY];

export const menuItemClassName = (variant: MenuVariant, className?: ClassValue) =>
  cx(
    menu.variants[variant].primary,
    responsiveClasses(MENU_SIZE, menu.sizes, MENU_SIZE),
    menu.slots.item,
    'flex w-full shrink-0 items-center justify-start text-left transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );
