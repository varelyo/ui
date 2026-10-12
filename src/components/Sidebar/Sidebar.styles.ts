import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SIDEBAR_COMPONENT_NAME_KEY, SIDEBAR_SIZE } from './Sidebar.constants';
import type { SidebarDockStyleProps, SidebarVariant } from './Sidebar.types';

const sidebar = componentTokens[SIDEBAR_COMPONENT_NAME_KEY];

const docks: Record<SidebarVariant, string> = {
  docked: 'grid',
  responsive: 'hidden md:grid',
};

export const sidebarDockClassName = ({ variant, color }: SidebarDockStyleProps) =>
  cx(
    sidebar.variants.standard[color],
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes.standard[color], SIDEBAR_SIZE),
    sidebar.slots.root,
    'border-y-0 border-l-0',
    docks[variant],
  );

export const sidebarPanelClassName = (className?: ClassValue) =>
  cx(
    responsiveClasses(SIDEBAR_SIZE, sidebar.sizes.standard.primary, SIDEBAR_SIZE),
    sidebar.slots.panel,
    'flex h-full max-w-full flex-col',
    className,
  );
