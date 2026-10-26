import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SIDEBAR_SIZE, type SidebarAppearance } from '../Sidebar';
import { SIDEBAR_HEADER_COMPONENT_NAME_KEY } from './SidebarHeader.constants';

const sidebar = componentTokens[SIDEBAR_HEADER_COMPONENT_NAME_KEY];

export const sidebarHeaderClassName = (appearance: SidebarAppearance, className?: ClassValue) =>
  cx(
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes, SIDEBAR_SIZE),
    sidebar.slots.header,
    'flex shrink-0 flex-col',
    className,
  );
