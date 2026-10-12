import type { OpenChangeReason } from '@floating-ui/react';
import { PADDING_VARIABLES } from '../../utils';
import type { PopperCloseReason } from './Popper.types';

export const POPPER_COLLISION_PADDING = PADDING_VARIABLES.sm;

export const POPPER_CLOSE_REASONS: Partial<Record<OpenChangeReason, PopperCloseReason>> = {
  'escape-key': 'escapeKeyDown',
  'outside-press': 'backdropClick',
  'focus-out': 'tabKeyDown',
};
