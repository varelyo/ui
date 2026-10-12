import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SIDEBAR_SIZE } from '../Sidebar';
import { SIDEBAR_FOOTER_COMPONENT_NAME_KEY } from './SidebarFooter.constants';

const sidebar = componentTokens[SIDEBAR_FOOTER_COMPONENT_NAME_KEY];

export const sidebarFooterClassName = (className?: ClassValue) =>
  cx(
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes.standard.primary, SIDEBAR_SIZE),
    sidebar.slots.footer,
    'flex shrink-0 flex-col',
    className,
  );
