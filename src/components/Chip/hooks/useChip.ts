import type { KeyboardEvent, MouseEvent } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { CHIP_COMPONENT_NAME_KEY, CHIP_DELETE_KEYS } from '../Chip.constants';
import type { UseChipParams, UseChipResult } from '../Chip.types';

export function useChip({
  variant,
  color,
  size,
  label,
  deleteLabel,
  disabled,
  onClick,
  onDelete,
}: UseChipParams): UseChipResult {
  const childProps = componentTokens[CHIP_COMPONENT_NAME_KEY].childProps[variant][color];
  const deleteName = deleteLabel ?? (typeof label === 'string' ? `Remove ${label}` : 'Remove');
  return {
    clickable: onClick !== undefined,
    deletable: onDelete !== undefined,
    deleteName,
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
    rootProps: disabled ? { 'data-disabled': '' } : {},
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || !onDelete || !CHIP_DELETE_KEYS.has(event.key)) return;
      event.preventDefault();
      onDelete(event);
    },
    onDeleteClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) onDelete?.(event);
    },
  };
}
