import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { POPOVER_COMPONENT_NAME_KEY } from './Popover.constants';
import type { PopoverVariant } from './Popover.types';

const popover = componentTokens[POPOVER_COMPONENT_NAME_KEY];

export const popoverLayerClassName = cx('flex flex-col');

export const popoverPaperClassName = (variant: PopoverVariant, className?: ClassValue) =>
  cx(
    popover.variants[variant].primary,
    popover.slots.paper,
    'min-h-0 overflow-auto outline-none',
    className,
  );
