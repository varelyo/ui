import { useDismiss, useInteractions, useListNavigation, useTypeahead } from '@floating-ui/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { usePopper } from '../../Popper';
import { MENU_ICON_SIZE, MENU_ITEM_SELECTOR, MENU_SELECTED_ITEM_SELECTOR } from '../Menu.constants';
import type { UseMenuParams, UseMenuResult } from '../Menu.types';

export function useMenu({
  open,
  onClose,
  anchorEl,
  placement,
  autoFocus,
}: UseMenuParams): UseMenuResult {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const initialItem = useRef<HTMLElement | null>(null);
  const popper = usePopper({ open, onClose, anchorEl, placement, offset: 'xs' });
  const listNavigation = useListNavigation(popper.context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: false,
  });
  const typeahead = useTypeahead(popper.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: (index) => {
      if (open) setActiveIndex(index);
    },
  });
  const dismiss = useDismiss(popper.context);
  const interactions = useInteractions([listNavigation, typeahead, dismiss]);
  const floating = popper.elements.floating;
  useLayoutEffect(() => {
    if (!open || !floating) return;
    const items = [...floating.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR)];
    initialItem.current =
      items.find((item) => item.matches(MENU_SELECTED_ITEM_SELECTOR)) ?? items[0] ?? null;
  }, [open, floating]);
  const labelledBy = anchorEl?.id ? { 'aria-labelledby': anchorEl.id } : {};
  return {
    popper,
    focusManager: { initialFocus: autoFocus ? initialItem : 0 },
    getFloatingProps: (props) =>
      interactions.getFloatingProps({ role: 'menu', ...labelledBy, ...props }),
    elementsRef,
    labelsRef,
    context: {
      activeIndex,
      iconSize: MENU_ICON_SIZE,
      getItemProps: (props) => interactions.getItemProps(props),
    },
  };
}
