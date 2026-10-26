import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { SelectVariant } from '../Select';
import { SELECT_OPTION_COMPONENT_NAME_KEY } from './SelectOption.constants';

const select = componentTokens[SELECT_OPTION_COMPONENT_NAME_KEY];

export const selectOptionClassName = (variant: SelectVariant, className?: ClassValue) =>
  cx(
    select.variants[variant].primary,
    select.slots.option,
    'flex w-full shrink-0 items-center justify-start text-left transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );
