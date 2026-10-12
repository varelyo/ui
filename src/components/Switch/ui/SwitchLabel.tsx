import type { ReactNode } from 'react';
import { switchLabelClassName } from '../Switch.styles';

export function SwitchLabel({ children }: { children: ReactNode }) {
  return <span className={switchLabelClassName}>{children}</span>;
}
