import { IconSizeContext } from '../../../Icon';
import type { ListItemEndProps } from '../../ListItem.types';
import { listItemEndClassName } from './ListItemEnd.styles';

export function ListItemEnd({ iconSize, children }: ListItemEndProps) {
  return (
    <div data-list-item-end="" className={listItemEndClassName}>
      <IconSizeContext value={iconSize}>{children}</IconSizeContext>
    </div>
  );
}
