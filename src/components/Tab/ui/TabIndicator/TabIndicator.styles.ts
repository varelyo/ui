import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import type { TabsOrientation } from '../../../Tabs';
import { TAB_COMPONENT_NAME_KEY } from '../../Tab.constants';

const tabs = componentTokens[TAB_COMPONENT_NAME_KEY];

const orientations: Record<TabsOrientation, string> = {
  horizontal: 'inset-x-0 bottom-0 border-x-0 border-t-0 scale-x-0 group-aria-selected:scale-x-100',
  vertical: 'inset-y-0 right-0 border-y-0 border-l-0 scale-y-0 group-aria-selected:scale-y-100',
};

export const tabIndicatorClassName = (orientation: TabsOrientation) =>
  cx(
    tabs.slots.indicator,
    'pointer-events-none absolute transition-transform duration-sm ease-standard motion-reduce:transition-none',
    orientations[orientation],
  );
