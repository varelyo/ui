import type { ChangeEvent, ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { SWITCH_COMPONENT_NAME_KEY } from './Switch.constants';

export type SwitchTokens = ComponentTokens[typeof SWITCH_COMPONENT_NAME_KEY];
export type SwitchVariant = VariantOf<SwitchTokens>;
export type SwitchColor = ColorOf<SwitchTokens>;
export type SwitchSize = SizeOf<SwitchTokens>;

type SwitchOwnProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: Responsive<SwitchSize>;
  color?: SwitchColor;
  variant?: SwitchVariant;
  label?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
};

export type SwitchProps = SwitchOwnProps &
  Omit<ComponentPropsWithRef<'label'>, keyof SwitchOwnProps | 'style' | 'children'>;

export interface SwitchStyleProps {
  variant: SwitchVariant;
  color: SwitchColor;
  size: Responsive<SwitchSize>;
}

export interface UseSwitchParams {
  checked: boolean | undefined;
  defaultChecked: boolean;
  onChange: ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
  inputRef: Ref<HTMLInputElement> | undefined;
  label: ReactNode;
}

export interface UseSwitchResult {
  checked: boolean;
  labelled: boolean;
  inputRef: (node: HTMLInputElement | null) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
