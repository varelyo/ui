import { componentTokens } from '../../generated/maps';

export const MENU_COMPONENT_NAME_KEY = 'menu' as const;

export const MENU_SIZE = 'md' as const;

export const MENU_ICON_SIZE =
  componentTokens[MENU_COMPONENT_NAME_KEY].childProps.standard.primary[MENU_SIZE].item.size;

export const MENU_ITEM_SELECTOR =
  '[role^="menuitem"]:not(:disabled):not([aria-disabled="true"])' as const;

export const MENU_SELECTED_ITEM_SELECTOR = '[data-selected]' as const;
