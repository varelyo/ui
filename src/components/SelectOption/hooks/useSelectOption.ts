import { useListItem, useMergeRefs } from '@floating-ui/react';
import { use, type MouseEvent } from 'react';
import { SelectContext } from '../../Select';
import type { UseSelectOptionParams, UseSelectOptionResult } from '../SelectOption.types';

export function useSelectOption({
  value,
  ref,
  onClick,
}: UseSelectOptionParams): UseSelectOptionResult {
  const select = use(SelectContext);
  const item = useListItem();
  const merged = useMergeRefs<HTMLDivElement>([item.ref, ref]);
  const active = item.index !== -1 && item.index === select.activeIndex;
  return {
    ref: (node) => merged?.(node),
    tabIndex: active ? 0 : -1,
    variant: select.variant,
    getItemProps: (props) =>
      select.getItemProps({
        ...props,
        active,
        selected: select.isSelected(value),
        onClick: (event: MouseEvent<HTMLDivElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) select.choose(value, event.nativeEvent);
        },
      }),
  };
}
