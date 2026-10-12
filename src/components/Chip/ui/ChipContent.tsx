import { IconSizeContext } from '../../../foundation/Icon';
import { chipLabelClassName } from '../Chip.styles';
import type { ChipContentProps } from '../Chip.types';

export function ChipContent({ avatar, icon, iconSize, label }: ChipContentProps) {
  return (
    <>
      {avatar}
      <IconSizeContext value={iconSize}>{icon}</IconSizeContext>
      <span className={chipLabelClassName}>{label}</span>
    </>
  );
}
