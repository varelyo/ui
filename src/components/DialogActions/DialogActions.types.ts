import type { ComponentPropsWithRef } from 'react';
import type { DialogVariant } from '../Dialog';

export type DialogActionsProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseDialogActionsResult {
  variant: DialogVariant;
}
