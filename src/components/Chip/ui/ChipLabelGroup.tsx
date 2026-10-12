import { chipContentClassName } from '../Chip.styles';
import type { ChipContentProps } from '../Chip.types';
import { ChipContent } from './ChipContent';

export function ChipLabelGroup(props: ChipContentProps) {
  return (
    <span className={chipContentClassName}>
      <ChipContent {...props} />
    </span>
  );
}
