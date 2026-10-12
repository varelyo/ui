import { ButtonBase } from '../ButtonBase';
import { useTab } from './hooks';
import { tabClassName } from './Tab.styles';
import type { TabProps } from './Tab.types';
import { TabIcon, TabIndicator, TabLabel } from './ui';

export function Tab({
  value,
  label,
  icon,
  disabled = false,
  className,
  ref,
  onClick,
  onFocus,
  ...rest
}: TabProps) {
  const tab = useTab({ value, disabled, ref, onClick, onFocus });
  return (
    <ButtonBase
      {...rest}
      {...tab.tabProps}
      ref={tab.ref}
      disabled={disabled}
      className={tabClassName(tab.orientation, tab.color, className)}
    >
      {icon ? <TabIcon size={tab.iconSize}>{icon}</TabIcon> : null}
      <TabLabel>{label}</TabLabel>
      <TabIndicator orientation={tab.orientation} />
    </ButtonBase>
  );
}
