import { useFormControl } from '../../FormControl';
import type { UseFormHelperTextResult } from '../FormHelperText.types';

export function useFormHelperText(): UseFormHelperTextResult {
  const { slots } = useFormControl();
  return { slots };
}
