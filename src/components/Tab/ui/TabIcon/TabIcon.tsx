import { IconSizeContext } from '../../../../foundation/Icon';
import type { TabIconProps } from '../../Tab.types';
import { tabIconClassName } from './TabIcon.styles';

export function TabIcon({ size, children }: TabIconProps) {
  return (
    <span aria-hidden="true" className={tabIconClassName}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
