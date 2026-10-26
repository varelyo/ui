import { useFormControl } from '../../FormControl';
import type { UseInputAdornmentResult } from '../InputAdornment.types';

export function useInputAdornment(): UseInputAdornmentResult {
  const { slots, adornmentSize, addon } = useFormControl();
  return { slots, iconSize: adornmentSize, addon };
}
