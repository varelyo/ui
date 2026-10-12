import { cx, type ClassValue } from '../../utils';
import type { TabsOrientation } from './Tabs.types';

const orientations: Record<TabsOrientation, string> = {
  horizontal: 'flex flex-col',
  vertical: 'flex flex-row',
};

export const tabsClassName = (orientation: TabsOrientation, className?: ClassValue) =>
  cx(orientations[orientation], className);
