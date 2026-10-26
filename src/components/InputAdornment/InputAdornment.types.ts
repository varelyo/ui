import type { ComponentPropsWithRef } from 'react';
import type { IconSize } from '../../generated/maps';
import type { Addon, AddonProps, Responsive } from '../../types';
import type { FormControlSlots } from '../FormControl';
import type { INPUT_ADORNMENT_SLOTS } from './InputAdornment.constants';

export type InputAdornmentPosition = keyof typeof INPUT_ADORNMENT_SLOTS;

export type InputAdornmentProps = Omit<ComponentPropsWithRef<'span'>, 'color' | 'style'> & {
  position: InputAdornmentPosition;
  addon?: Addon;
};

export interface UseInputAdornmentResult {
  slots: FormControlSlots;
  iconSize: Responsive<IconSize> | undefined;
  addon: AddonProps;
}
