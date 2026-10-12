import { componentTokens } from '../../generated/maps';
import type { Responsive } from '../../types';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import type { FormControlSlots } from '../FormControl';
import { SELECT_COMPONENT_NAME_KEY } from './Select.constants';
import type { SelectSize, SelectVariant } from './Select.types';

const select = componentTokens[SELECT_COMPONENT_NAME_KEY];

export const selectRootClassName = (variant: SelectVariant, className?: ClassValue) =>
  cx(select.variants[variant].primary, className);

export const selectTriggerClassName = (slots: FormControlSlots) =>
  cx(
    'vy-focus-ring relative flex cursor-pointer items-center transition-colors duration-sm ease-standard select-none aria-disabled:cursor-default',
    slots.input,
  );

export const selectValueClassName = (slots: FormControlSlots) =>
  cx('grid min-w-0 flex-1 grid-cols-1', slots.htmlInput);

export const selectValueLabelClassName = cx(
  'col-start-1 row-start-1 overflow-hidden text-ellipsis whitespace-nowrap',
);

export const selectValueSizerClassName = cx(
  'pointer-events-none col-start-1 row-start-1 overflow-hidden whitespace-nowrap opacity-none',
);

export const selectIndicatorClassName = (open: boolean) =>
  cx(
    select.slots.indicator,
    'inline-flex shrink-0 transition-transform duration-sm ease-standard motion-reduce:transition-none',
    open && 'rotate-180',
  );

export const selectInputClassName = cx(
  'pointer-events-none absolute bottom-0 left-0 w-full opacity-none',
);

export const selectLayerClassName = cx('flex flex-col');

export const selectPopupClassName = (variant: SelectVariant, size: Responsive<SelectSize>) =>
  cx(
    responsiveClasses(size, select.sizes[variant].primary, 'md'),
    select.slots.popup,
    'flex min-h-0 flex-col overflow-y-auto outline-none',
  );
