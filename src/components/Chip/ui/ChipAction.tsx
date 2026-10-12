import { chipActionClassName } from '../Chip.styles';
import type { ChipActionProps } from '../Chip.types';
import { ChipContent } from './ChipContent';

export function ChipAction({ disabled, onClick, onKeyDown, ...content }: ChipActionProps) {
  return (
    <button
      type="button"
      data-slot="action"
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={chipActionClassName}
    >
      <ChipContent {...content} />
    </button>
  );
}
