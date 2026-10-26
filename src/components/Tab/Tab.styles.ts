import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TABS_SIZE, type TabsOrientation } from '../Tabs';
import { TAB_COMPONENT_NAME_KEY } from './Tab.constants';
import type { TabStyleProps } from './Tab.types';

const tabs = componentTokens[TAB_COMPONENT_NAME_KEY];

const orientations: Record<TabsOrientation, string> = {
  horizontal: 'justify-center',
  vertical: 'justify-start text-left',
};

export const tabClassName = (
  { orientation, variant, color }: TabStyleProps,
  className?: ClassValue,
) =>
  cx(
    tabs.variants[variant][color],
    responsiveClasses(TABS_SIZE, tabs.sizes, TABS_SIZE),
    responsiveClasses(TABS_SIZE, tabs.styleSizes[variant], TABS_SIZE),
    tabs.slots.tab,
    'group relative flex shrink-0 items-center transition-colors duration-sm ease-standard motion-reduce:transition-none',
    orientations[orientation],
    className,
  );
