import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ContainerWidth } from '../../generated/maps';
import type { ModalClose } from '../Modal';

export type DialogMaxWidth = ContainerWidth | false;

type DialogOwnProps = {
  open: boolean;
  onClose?: ModalClose;
  children?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: DialogMaxWidth;
  keepMounted?: boolean;
  disableEscapeKeyDown?: boolean;
};

export type DialogProps = DialogOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof DialogOwnProps | 'style'>;

export type DialogWidth = ContainerWidth | 'none';

export interface DialogContextValue {
  titleId: string | undefined;
  registerTitle: (id: string) => () => void;
}

export interface DialogStyleProps {
  fullWidth: boolean;
  width: DialogWidth;
}

export interface UseDialogParams {
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
