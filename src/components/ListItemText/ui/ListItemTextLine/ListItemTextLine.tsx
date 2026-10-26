import { Typography } from '../../../Typography';
import type { ListItemTextLineProps } from '../../ListItemText.types';
import { listItemTextLineClassName } from './ListItemTextLine.styles';

export function ListItemTextLine({ slot, variant, noWrap, children }: ListItemTextLineProps) {
  return (
    <span className={listItemTextLineClassName({ slot, noWrap })}>
      {variant ? (
        <Typography component="span" variant={variant}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </span>
  );
}
