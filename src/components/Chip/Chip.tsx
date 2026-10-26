import type { ElementType } from 'react';
import { chipClassName } from './Chip.styles';
import type { ChipProps } from './Chip.types';
import { useChip } from './hooks';
import { hasAddon } from '../../utils';
import { CHIP_ADDON_SLOTS } from './Chip.constants';
import { ChipAction, ChipAddon, ChipDelete, ChipLabelGroup } from './ui';

export function Chip<C extends ElementType = 'span'>({
  label,
  color = 'neutral',
  variant = 'filled',
  size = 'md',
  startAddon,
  endAddon,
  onClick,
  onDelete,
  disabled = false,
  deleteIcon,
  deleteLabel,
  component,
  className,
  ...rest
}: ChipProps<C>) {
  const Component: ElementType = component ?? 'span';
  const chip = useChip({ size, label, deleteLabel, disabled, onClick, onDelete });
  return (
    <Component
      {...rest}
      {...chip.rootProps}
      className={chipClassName({ variant, color, size }, className)}
    >
      {chip.clickable ? (
        <ChipAction
          startAddon={startAddon}
          addon={chip.addon}
          iconSize={chip.iconSize}
          label={label}
          disabled={disabled}
          onClick={onClick}
          onKeyDown={chip.onKeyDown}
        />
      ) : (
        <ChipLabelGroup
          startAddon={startAddon}
          addon={chip.addon}
          iconSize={chip.iconSize}
          label={label}
        />
      )}
      {hasAddon(endAddon) ? (
        <ChipAddon
          slot={CHIP_ADDON_SLOTS.end}
          addon={endAddon}
          props={chip.addon}
          iconSize={chip.iconSize}
        />
      ) : null}
      {chip.deletable ? (
        <ChipDelete
          name={chip.deleteName}
          disabled={disabled}
          icon={deleteIcon}
          iconSize={chip.iconSize}
          onClick={chip.onDeleteClick}
          onKeyDown={chip.onKeyDown}
        />
      ) : null}
    </Component>
  );
}
