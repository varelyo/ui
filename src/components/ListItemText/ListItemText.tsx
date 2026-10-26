import { useListItemText } from './hooks';
import { LIST_ITEM_TEXT_LINES } from './ListItemText.constants';
import { listItemTextClassName } from './ListItemText.styles';
import type { ListItemTextProps } from './ListItemText.types';
import { ListItemTextLine } from './ui';

export function ListItemText({
  primary,
  secondary,
  inset = false,
  noWrap = false,
  primaryVariant,
  secondaryVariant,
  className,
  children,
  ...rest
}: ListItemTextProps) {
  const text = useListItemText({ primary, secondary, children });
  return (
    <div {...rest} className={listItemTextClassName({ size: text.size, inset }, className)}>
      <ListItemTextLine
        slot={LIST_ITEM_TEXT_LINES.primary}
        variant={primaryVariant}
        noWrap={noWrap}
      >
        {text.primary}
      </ListItemTextLine>
      {text.secondaryShown ? (
        <ListItemTextLine
          slot={LIST_ITEM_TEXT_LINES.secondary}
          variant={secondaryVariant}
          noWrap={noWrap}
        >
          {text.secondary}
        </ListItemTextLine>
      ) : null}
    </div>
  );
}
