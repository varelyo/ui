import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SIDEBAR_SIZE, type SidebarColor } from '../Sidebar';
import { SIDEBAR_ITEM_COMPONENT_NAME_KEY } from './SidebarItem.constants';

const sidebar = componentTokens[SIDEBAR_ITEM_COMPONENT_NAME_KEY];

export const sidebarItemClassName = (color: SidebarColor, className?: ClassValue) =>
  cx(
    sidebar.variants.standard[color],
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes.standard[color], SIDEBAR_SIZE),
    sidebar.slots.item,
    'flex w-full shrink-0 items-center justify-start text-left transition-colors duration-xs ease-standard motion-reduce:transition-none',
    className,
  );
