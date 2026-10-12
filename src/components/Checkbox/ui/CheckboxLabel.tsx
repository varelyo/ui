import type { ReactNode } from 'react';
import { checkboxLabelClassName } from '../Checkbox.styles';

export function CheckboxLabel({ children }: { children: ReactNode }) {
  return <span className={checkboxLabelClassName}>{children}</span>;
}
