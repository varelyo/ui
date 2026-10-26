import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { MENU_COMPONENT_NAME_KEY, MENU_SIZE } from './Menu.constants';
import type { MenuVariant } from './Menu.types';

const menu = componentTokens[MENU_COMPONENT_NAME_KEY];

export const menuLayerClassName = cx('flex flex-col');

export const menuListClassName = (variant: MenuVariant, className?: ClassValue) =>
  cx(
    responsiveClasses(MENU_SIZE, menu.sizes, MENU_SIZE),
    menu.slots.root,
    menu.slots.separator,
    'flex min-h-0 flex-col overflow-y-auto outline-none',
    className,
  );
