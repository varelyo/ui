import { useContext } from 'react';
import { FormControlContext } from '../context';
import type { FormControlContextValue } from '../FormControl.types';

export function useFormControl(): FormControlContextValue {
  return useContext(FormControlContext);
}
