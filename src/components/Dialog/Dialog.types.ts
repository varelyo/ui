import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ComponentTokens, ContainerWidth } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { ModalClose } from '../Modal';
import type { DIALOG_COMPONENT_NAME_KEY } from './Dialog.constants';

export type DialogTokens = ComponentTokens[typeof DIALOG_COMPONENT_NAME_KEY];
export type DialogVariant = VariantOf<DialogTokens>;

export type DialogMaxWidth = ContainerWidth | false;

type DialogOwnProps = {
  open: boolean;
  onClose?: ModalClose;
  children?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: DialogMaxWidth;
  keepMounted?: boolean;
  disableEscapeKeyDown?: boolean;
  variant?: DialogVariant;
};

export type DialogProps = DialogOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof DialogOwnProps | 'style'>;

export type DialogWidth = ContainerWidth | 'none';

export interface DialogContextValue {
  variant: DialogVariant;
  titleId: string | undefined;
  registerTitle: (id: string) => () => void;
}

export interface DialogStyleProps {
  fullWidth: boolean;
  width: DialogWidth;
}

export interface UseDialogParams {
  variant: DialogVariant;
  maxWidth: DialogMaxWidth;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
}

export interface DialogLabelProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface UseDialogResult {
  context: DialogContextValue;
  labelProps: DialogLabelProps;
  width: DialogWidth;
}
