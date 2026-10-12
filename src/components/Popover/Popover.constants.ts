import type { PopperFocusManager } from '../Popper';

export const POPOVER_COMPONENT_NAME_KEY = 'popover' as const;

export const POPOVER_FOCUS_MANAGER: PopperFocusManager = { initialFocus: 0 };
