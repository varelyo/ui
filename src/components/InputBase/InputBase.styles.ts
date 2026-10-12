import { cx, type ClassValue } from '../../utils';
import type { FormControlSlots } from '../FormControl';
import type { InputBaseStyleProps } from './InputBase.types';

export const inputBaseBoxClassName = (
  { multiline, file }: InputBaseStyleProps,
  slots: FormControlSlots,
  className?: ClassValue,
) =>
  cx(
    'vy-focus-ring-within flex cursor-text transition-colors duration-sm ease-standard',
    file && 'cursor-pointer',
    multiline ? 'items-start' : 'items-center',
    slots.input,
    className,
  );

export const inputBaseControlClassName = (
  { multiline, file }: InputBaseStyleProps,
  slots: FormControlSlots,
) =>
  cx(
    'min-w-0 flex-1 bg-transparent-default outline-none disabled:cursor-default',
    multiline && 'resize-none self-stretch',
    file &&
      'cursor-pointer file:m-0 file:cursor-pointer file:border-0 disabled:file:cursor-default',
    slots.htmlInput,
    file && slots.fileSelectorButton,
  );
