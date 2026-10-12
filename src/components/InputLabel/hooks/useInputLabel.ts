import { useFormControl } from '../../FormControl';
import type { UseInputLabelResult } from '../InputLabel.types';

export function useInputLabel(): UseInputLabelResult {
  const { required, slots } = useFormControl();
  return { required, slots };
}
