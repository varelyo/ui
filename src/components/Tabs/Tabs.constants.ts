import { componentTokens } from '../../generated/maps';

export const TABS_COMPONENT_NAME_KEY = 'tabs' as const;

export const TABS_SIZE = 'md' as const;

export const TABS_ICON_SIZE =
  componentTokens[TABS_COMPONENT_NAME_KEY].childProps.standard.primary[TABS_SIZE].tab.size;

export const TABS_TAB_ID_PART = 'tab' as const;

export const TABS_PANEL_ID_PART = 'panel' as const;
