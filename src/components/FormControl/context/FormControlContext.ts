import { createContext } from 'react';
import { componentTokens } from '../../../generated/maps';
import {
  FORM_CONTROL_ADDON_DEFAULTS,
  FORM_CONTROL_COMPONENT_NAME_KEY,
} from '../FormControl.constants';
import type { FormControlContextValue } from '../FormControl.types';

export const FormControlContext = createContext<FormControlContextValue>({
  disabled: false,
  error: false,
  required: false,
  slots: componentTokens[FORM_CONTROL_COMPONENT_NAME_KEY].slots,
  adornmentSize: undefined,
  addon: {
    icon: { size: FORM_CONTROL_ADDON_DEFAULTS.icon },
    iconButton: { size: FORM_CONTROL_ADDON_DEFAULTS.control, 'data-addon-inset': '' },
    avatar: { size: FORM_CONTROL_ADDON_DEFAULTS.control, 'data-addon-inset': '' },
  },
});
