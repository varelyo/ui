import { cx, type ClassValue } from '../../utils';
import type { FormControlSlots } from '../FormControl';

export const inputLabelClassName = (slots: FormControlSlots, className?: ClassValue) =>
  cx(slots.label, className);
