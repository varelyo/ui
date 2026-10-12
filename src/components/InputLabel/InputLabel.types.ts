import type { ComponentPropsWithRef } from 'react';
import type { FormControlSlots } from '../FormControl';

export type InputLabelProps = Omit<ComponentPropsWithRef<'label'>, 'color' | 'style'>;

export interface UseInputLabelResult {
  required: boolean;
  slots: FormControlSlots;
}
