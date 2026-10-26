import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DRAWER_COMPONENT_NAME_KEY } from './Drawer.constants';
import type {
  DrawerAnchor,
  DrawerAppearance,
  DrawerDockedStyleProps,
  DrawerStyleProps,
} from './Drawer.types';

const drawer = componentTokens[DRAWER_COMPONENT_NAME_KEY];

const temporaryAnchors: Record<DrawerAnchor, string> = {
  left: 'inset-y-0 left-0 starting:-translate-x-full group-data-closed:-translate-x-full',
  right: 'inset-y-0 right-0 starting:translate-x-full group-data-closed:translate-x-full',
  top: 'inset-x-0 top-0 w-full starting:-translate-y-full group-data-closed:-translate-y-full',
  bottom: 'inset-x-0 bottom-0 w-full starting:translate-y-full group-data-closed:translate-y-full',
};

const dockedAnchors: Record<DrawerAnchor, string> = {
  left: 'border-y-0 border-l-0',
  right: 'border-y-0 border-r-0',
  top: 'w-full border-x-0 border-t-0',
  bottom: 'w-full border-x-0 border-b-0',
};

const dockedMotion: Record<DrawerAnchor, string> = {
  left: 'starting:-translate-x-full data-closed:-translate-x-full',
  right: 'starting:translate-x-full data-closed:translate-x-full',
  top: 'starting:-translate-y-full data-closed:-translate-y-full',
  bottom: 'starting:translate-y-full data-closed:translate-y-full',
};

export const drawerContainerClassName = (appearance: DrawerAppearance) =>
  cx(drawer.variants[appearance].primary);

export const drawerTemporaryPaperClassName = (
  { anchor }: DrawerStyleProps,
  className?: ClassValue,
) =>
  cx(
    drawer.slots.paper,
    'absolute flex max-h-full max-w-full flex-col overflow-y-auto transition-transform duration-lg ease-enter group-data-closed:duration-sm group-data-closed:ease-exit data-closed:duration-sm data-closed:ease-exit motion-reduce:transition-none',
    temporaryAnchors[anchor],
    className,
  );

export const drawerDockedPaperClassName = (
  { appearance, anchor, animated }: DrawerDockedStyleProps,
  className?: ClassValue,
) =>
  cx(
    drawer.variants[appearance].primary,
    drawer.slots.paper,
    'flex max-w-full shrink-0 flex-col overflow-y-auto transition-transform duration-lg ease-enter group-data-closed:duration-sm group-data-closed:ease-exit data-closed:duration-sm data-closed:ease-exit motion-reduce:transition-none',
    dockedAnchors[anchor],
    animated && dockedMotion[anchor],
    className,
  );
