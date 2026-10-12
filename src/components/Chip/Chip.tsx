import type { ElementType } from 'react';
import { chipClassName } from './Chip.styles';
import type { ChipProps } from './Chip.types';
import { useChip } from './hooks';
import { ChipAction, ChipDelete, ChipLabelGroup } from './ui';

export function Chip<C extends ElementType = 'span'>({
  label,
  color = 'neutral',
  variant = 'filled',
  size = 'md',
  avatar,
  icon,
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
  const chip = useChip({ variant, color, size, label, deleteLabel, disabled, onClick, onDelete });
  return (
    <Component
      {...rest}
      {...chip.rootProps}
      className={chipClassName({ variant, color, size }, className)}
    >
      {chip.clickable ? (
        <ChipAction
          avatar={avatar}
          icon={icon}
          iconSize={chip.iconSize}
          label={label}
          disabled={disabled}
          onClick={onClick}
          onKeyDown={chip.onKeyDown}
        />
      ) : (
        <ChipLabelGroup avatar={avatar} icon={icon} iconSize={chip.iconSize} label={label} />
      )}
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
