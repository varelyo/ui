import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { SIDEBAR_ITEM_COMPONENT_NAME_KEY } from '../../SidebarItem.constants';

const sidebar = componentTokens[SIDEBAR_ITEM_COMPONENT_NAME_KEY];

export const sidebarItemIconClassName = cx(sidebar.slots.icon, 'inline-flex shrink-0');
