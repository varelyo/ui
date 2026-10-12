import { cx, type ClassValue } from '../../utils';
import type { FormControlSlots } from '../FormControl';

export const inputAdornmentClassName = (slots: FormControlSlots, className?: ClassValue) =>
  cx('inline-flex shrink-0 items-center', slots.adornment, className);
