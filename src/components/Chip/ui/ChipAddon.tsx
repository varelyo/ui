import { renderAddon } from '../../../utils';
import { IconSizeContext } from '../../Icon';
import { chipAddonClassName } from '../Chip.styles';
import type { ChipAddonProps } from '../Chip.types';

export function ChipAddon({ slot, addon, props, iconSize }: ChipAddonProps) {
  return (
    <span data-slot={slot} className={chipAddonClassName}>
      <IconSizeContext value={iconSize}>{renderAddon(addon, props)}</IconSizeContext>
    </span>
  );
}
