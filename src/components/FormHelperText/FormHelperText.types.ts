import type { ComponentPropsWithRef } from 'react';
import type { FormControlSlots } from '../FormControl';

export type FormHelperTextProps = Omit<ComponentPropsWithRef<'p'>, 'color' | 'style'>;

export interface UseFormHelperTextResult {
  slots: FormControlSlots;
}
