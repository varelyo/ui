import { useIcon } from './hooks';
import { ICON_VIEW_BOX } from './Icon.constants';
import { iconClassName } from './Icon.styles';
import type { IconProps } from './Icon.types';
import { IconShape } from './ui';

export function Icon({ name, size, color, titleAccess, className, ...rest }: IconProps) {
  const icon = useIcon({ name, size, titleAccess });
  return (
    <svg
      viewBox={ICON_VIEW_BOX}
      focusable="false"
      {...rest}
      {...icon.accessibilityProps}
      data-icon={name}
      className={iconClassName({ size: icon.size, color }, className)}
    >
      {icon.labelled ? <title id={icon.titleId}>{titleAccess}</title> : null}
      {icon.elements.map((element, index) => (
        <IconShape key={index} element={element} />
      ))}
    </svg>
  );
}
