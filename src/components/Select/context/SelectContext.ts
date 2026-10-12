import { createContext } from 'react';
import type { SelectContextValue } from '../Select.types';

export const SelectContext = createContext<SelectContextValue>({
  activeIndex: null,
  variant: 'outlined',
  isSelected: () => false,
  choose: () => undefined,
  getItemProps: (props) => ({ ...props }),
});
