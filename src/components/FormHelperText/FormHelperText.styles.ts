import { cx, type ClassValue } from '../../utils';
import type { FormControlSlots } from '../FormControl';

export const formHelperTextClassName = (slots: FormControlSlots, className?: ClassValue) =>
  cx(slots.helperText, className);
