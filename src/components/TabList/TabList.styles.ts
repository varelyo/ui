import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TABS_SIZE, type TabsOrientation } from '../Tabs';
import { TAB_LIST_COMPONENT_NAME_KEY } from './TabList.constants';

const tabs = componentTokens[TAB_LIST_COMPONENT_NAME_KEY];

const orientations: Record<TabsOrientation, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
};

export const tabListClassName = (orientation: TabsOrientation, className?: ClassValue) =>
  cx(
    responsiveClasses(TABS_SIZE, tabs.sizes.standard.primary, TABS_SIZE),
    tabs.slots.list,
    'flex',
    orientations[orientation],
    className,
  );
