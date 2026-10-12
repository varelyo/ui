import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SIDEBAR_SIZE } from '../Sidebar';
import { SIDEBAR_CONTENT_COMPONENT_NAME_KEY } from './SidebarContent.constants';

const sidebar = componentTokens[SIDEBAR_CONTENT_COMPONENT_NAME_KEY];

export const sidebarContentClassName = (className?: ClassValue) =>
  cx(
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes.standard.primary, SIDEBAR_SIZE),
    sidebar.slots.content,
    'flex min-h-0 flex-1 flex-col overflow-y-auto',
    className,
  );
