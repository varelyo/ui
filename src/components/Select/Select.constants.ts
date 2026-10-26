import type { IconName } from '../Icon';

export const SELECT_COMPONENT_NAME_KEY = 'select' as const;

export const SELECT_INDICATOR_ICON: IconName = 'chevron-down';

export const SELECT_LABEL_ID_SUFFIX = '-label' as const;

export const SELECT_HELPER_ID_SUFFIX = '-helper-text' as const;

export const SELECT_LISTBOX_ID_SUFFIX = '-listbox' as const;

export const SELECT_VALUE_SLOT = 'value' as const;

export const SELECT_MULTIPLE_SEPARATOR = ', ' as const;

export const SELECT_FORM_VALUE_SEPARATOR = ',' as const;

export const SELECT_OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])' as const;

export const SELECT_SELECTED_OPTION_SELECTOR = '[aria-selected="true"]' as const;
