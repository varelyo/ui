import { TABS_PANEL_ID_PART, TABS_TAB_ID_PART } from '../Tabs.constants';
import type { TabValue } from '../Tabs.types';

const idOf = (baseId: string, part: string, value: TabValue) =>
  `${baseId}-${part}-${encodeURIComponent(String(value))}`;

export const tabId = (baseId: string, value: TabValue) => idOf(baseId, TABS_TAB_ID_PART, value);

export const panelId = (baseId: string, value: TabValue) => idOf(baseId, TABS_PANEL_ID_PART, value);
