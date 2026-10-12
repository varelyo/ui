import { useFormControl } from '../../FormControl';
import type { UseInputAdornmentResult } from '../InputAdornment.types';

export function useInputAdornment(): UseInputAdornmentResult {
  const { slots, adornmentSize } = useFormControl();
  return { slots, iconSize: adornmentSize };
}
