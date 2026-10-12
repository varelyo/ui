import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { POPOVER_COMPONENT_NAME_KEY } from './Popover.constants';

const popover = componentTokens[POPOVER_COMPONENT_NAME_KEY];

export const popoverLayerClassName = cx('flex flex-col');

export const popoverPaperClassName = (className?: ClassValue) =>
  cx(
    popover.variants.standard.primary,
    popover.slots.paper,
    'min-h-0 overflow-auto outline-none',
    className,
  );
