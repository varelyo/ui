import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { MENU_ITEM_COMPONENT_NAME_KEY } from '../../MenuItem.constants';

const menu = componentTokens[MENU_ITEM_COMPONENT_NAME_KEY];

export const menuItemIconClassName = cx(menu.slots.icon, 'inline-flex shrink-0');
