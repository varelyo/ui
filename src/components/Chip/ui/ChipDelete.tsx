import { Icon, IconSizeContext } from '../../../foundation/Icon';
import { CHIP_DELETE_ICON } from '../Chip.constants';
import { chipDeleteClassName } from '../Chip.styles';
import type { ChipDeleteProps } from '../Chip.types';

export function ChipDelete({
  name,
  disabled,
  icon,
  iconSize,
  onClick,
  onKeyDown,
}: ChipDeleteProps) {
  return (
    <button
      type="button"
      data-slot="delete"
      aria-label={name}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={chipDeleteClassName}
    >
      <IconSizeContext value={iconSize}>{icon ?? <Icon name={CHIP_DELETE_ICON} />}</IconSizeContext>
    </button>
  );
}
