import { createContext } from 'react';
import { componentTokens } from '../../../generated/maps';
import { FORM_CONTROL_COMPONENT_NAME_KEY } from '../FormControl.constants';
import type { FormControlContextValue } from '../FormControl.types';

export const FormControlContext = createContext<FormControlContextValue>({
  disabled: false,
  error: false,
  required: false,
  slots: componentTokens[FORM_CONTROL_COMPONENT_NAME_KEY].slots,
  adornmentSize: undefined,
});
