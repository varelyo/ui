import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { ListContext } from '../List';
import { useListItemButton } from './hooks';
import { listItemButtonClassName } from './ListItemButton.styles';
import type {
  ListItemButtonInternalProps,
  ListItemButtonLinkProps,
  ListItemButtonProps,
} from './ListItemButton.types';

export function ListItemButton(props: ListItemButtonLinkProps): ReactElement;
export function ListItemButton<C extends ElementType = 'button'>(
  props: ListItemButtonProps<C>,
): ReactElement;
export function ListItemButton(props: ListItemButtonLinkProps | ListItemButtonProps<ElementType>) {
  const {
    color,
    size,
    selected = false,
    disabled = false,
    divider = false,
    disableGutters = false,
    alignItems = 'center',
    autoFocus = false,
    'aria-current': ariaCurrent,
    className,
    children,
    ref,
    ...rest
  } = props as ListItemButtonInternalProps;
  const button = useListItemButton({ color, size, selected, autoFocus, ref, ariaCurrent });
  return (
    <ButtonBase
      {...(rest as ButtonBaseProps<ElementType>)}
      {...button.rootProps}
      ref={button.ref}
      disabled={disabled}
      data-list-item-button=""
      className={listItemButtonClassName(
        {
          variant: button.context.variant,
          size: button.context.size,
          color: button.context.color,
          end: button.end,
          divider,
          disableGutters,
          alignItems,
        },
        className,
      )}
    >
      <ListContext value={button.context}>{children}</ListContext>
    </ButtonBase>
  );
}
