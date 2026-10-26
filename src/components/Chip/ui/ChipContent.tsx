import { hasAddon } from '../../../utils';
import { CHIP_ADDON_SLOTS } from '../Chip.constants';
import { chipLabelClassName } from '../Chip.styles';
import type { ChipContentProps } from '../Chip.types';
import { ChipAddon } from './ChipAddon';

export function ChipContent({ startAddon, addon, iconSize, label }: ChipContentProps) {
  return (
    <>
      {hasAddon(startAddon) ? (
        <ChipAddon
          slot={CHIP_ADDON_SLOTS.start}
          addon={startAddon}
          props={addon}
          iconSize={iconSize}
        />
      ) : null}
      <span className={chipLabelClassName}>{label}</span>
    </>
  );
}
