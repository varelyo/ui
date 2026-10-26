import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { CHIP_COMPONENT_NAME_KEY } from './Chip.constants';
import type { ChipStyleProps } from './Chip.types';

const chip = componentTokens[CHIP_COMPONENT_NAME_KEY];

export const chipClassName = ({ variant, color, size }: ChipStyleProps, className?: ClassValue) =>
  cx(
    chip.slots.root,
    chip.slots.addonStart,
    chip.slots.addonEnd,
    chip.slots.addonInsetStart,
    chip.slots.addonInsetEnd,
    chip.variants[variant][color],
    responsiveClasses(size, chip.sizes, 'md'),
    'vy-focus-ring-within inline-flex max-w-full items-center whitespace-nowrap transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );

export const chipContentClassName = cx(chip.slots.content, 'inline-flex min-w-0 items-center');

export const chipActionClassName = cx(
  chip.slots.content,
  'inline-flex min-w-0 cursor-pointer items-center outline-none disabled:cursor-default',
);

export const chipAddonClassName = cx('inline-flex shrink-0 items-center');

export const chipLabelClassName = cx('min-w-0 overflow-hidden text-ellipsis');

export const chipDeleteClassName = cx(
  'inline-flex shrink-0 cursor-pointer items-center outline-none disabled:cursor-default',
);
