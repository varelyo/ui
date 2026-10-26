import { renderAddon } from '../../../../utils';
import { IconSizeContext } from '../../../Icon';
import { buttonAddonClassName } from './ButtonAddon.styles';
import type { ButtonAddonProps } from './ButtonAddon.types';

export function ButtonAddon({ slot, transparent, size, addon, props, loader }: ButtonAddonProps) {
  return (
    <span data-slot={slot} className={buttonAddonClassName(transparent)}>
      <IconSizeContext value={size}>{loader ?? renderAddon(addon, props)}</IconSizeContext>
    </span>
  );
}
