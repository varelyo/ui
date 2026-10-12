import { Icon, IconSizeContext } from '../../../foundation/Icon';
import { SELECT_INDICATOR_ICON } from '../Select.constants';
import { selectIndicatorClassName } from '../Select.styles';
import type { SelectIndicatorProps } from '../Select.types';

export function SelectIndicator({ open, size }: SelectIndicatorProps) {
  return (
    <span aria-hidden="true" className={selectIndicatorClassName(open)}>
      <IconSizeContext value={size}>
        <Icon name={SELECT_INDICATOR_ICON} />
      </IconSizeContext>
    </span>
  );
}
