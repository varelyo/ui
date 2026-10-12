import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TABS_SIZE, type TabsColor, type TabsOrientation } from '../Tabs';
import { TAB_COMPONENT_NAME_KEY } from './Tab.constants';

const tabs = componentTokens[TAB_COMPONENT_NAME_KEY];

const orientations: Record<TabsOrientation, string> = {
  horizontal: 'justify-center',
  vertical: 'justify-start text-left',
};

export const tabClassName = (
  orientation: TabsOrientation,
  color: TabsColor,
  className?: ClassValue,
) =>
  cx(
    tabs.variants.standard[color],
    responsiveClasses(TABS_SIZE, tabs.sizes.standard[color], TABS_SIZE),
    tabs.slots.tab,
    'group relative flex shrink-0 items-center transition-colors duration-xs ease-standard motion-reduce:transition-none',
    orientations[orientation],
    className,
  );
