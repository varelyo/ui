import type { ComponentPropsWithRef } from 'react';
import type { DialogVariant } from '../Dialog';

export type DialogContentProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseDialogContentResult {
  variant: DialogVariant;
}
