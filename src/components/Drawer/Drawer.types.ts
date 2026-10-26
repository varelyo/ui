import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { ModalClose } from '../Modal';
import type { DRAWER_COMPONENT_NAME_KEY } from './Drawer.constants';

export type DrawerTokens = ComponentTokens[typeof DRAWER_COMPONENT_NAME_KEY];
export type DrawerAppearance = VariantOf<DrawerTokens>;

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
export type DrawerVariant = 'temporary' | 'persistent' | 'permanent';

type DrawerOwnProps = {
  open?: boolean;
  onClose?: ModalClose;
  anchor?: DrawerAnchor;
  variant?: DrawerVariant;
  appearance?: DrawerAppearance;
  children?: ReactNode;
  keepMounted?: boolean;
};

export type DrawerProps = DrawerOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof DrawerOwnProps | 'style'>;

export type DrawerPanelAttributes = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'>;

export interface DrawerTemporaryProps {
  appearance: DrawerAppearance;
  open: boolean;
  onClose: ModalClose | undefined;
  anchor: DrawerAnchor;
  keepMounted: boolean;
  children: ReactNode;
  panelProps: DrawerPanelAttributes;
}

export interface DrawerDockedProps {
  appearance: DrawerAppearance;
  open: boolean;
  anchor: DrawerAnchor;
  animated: boolean;
  keepMounted: boolean;
  children: ReactNode;
  panelProps: DrawerPanelAttributes;
}

export interface UseDrawerResult {
  temporary: boolean;
  animated: boolean;
}

export interface DrawerStyleProps {
  appearance: DrawerAppearance;
  anchor: DrawerAnchor;
}

export interface DrawerDockedStyleProps extends DrawerStyleProps {
  animated: boolean;
}

export interface UseDrawerDockedParams {
  open: boolean;
  animated: boolean;
  keepMounted: boolean;
  ref: Ref<HTMLDivElement> | undefined;
}

export interface DrawerDockedLayerProps {
  'data-closed'?: '';
  hidden?: true;
}

export interface UseDrawerDockedResult {
  rendered: boolean;
  ref: (node: HTMLDivElement | null) => void;
  layerProps: DrawerDockedLayerProps;
}

export interface DrawerModalLabelProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface UseDrawerTemporaryResult {
  labelProps: DrawerModalLabelProps;
  panelProps: DrawerPanelAttributes;
}
