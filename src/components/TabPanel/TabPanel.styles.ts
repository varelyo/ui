import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TABS_SIZE } from '../Tabs';
import { TAB_PANEL_COMPONENT_NAME_KEY } from './TabPanel.constants';

const tabs = componentTokens[TAB_PANEL_COMPONENT_NAME_KEY];

export const tabPanelClassName = (className?: ClassValue) =>
  cx(
    responsiveClasses(TABS_SIZE, tabs.sizes.standard.primary, TABS_SIZE),
    tabs.slots.panel,
    'vy-focus-ring min-w-0 flex-1',
    className,
  );
