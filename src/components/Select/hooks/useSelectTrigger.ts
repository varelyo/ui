import { useFormControl } from '../../FormControl';
import type { UseSelectTriggerResult } from '../Select.types';

export function useSelectTrigger(): UseSelectTriggerResult {
  const { slots } = useFormControl();
  return { slots };
}
