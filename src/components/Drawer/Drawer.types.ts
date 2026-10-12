import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ModalClose } from '../Modal';

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
export type DrawerVariant = 'temporary' | 'persistent' | 'permanent';

type DrawerOwnProps = {
  open?: boolean;
  onClose?: ModalClose;
  anchor?: DrawerAnchor;
  variant?: DrawerVariant;
  children?: ReactNode;
  keepMounted?: boolean;
};

export type DrawerProps = DrawerOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof DrawerOwnProps | 'style'>;

export type DrawerPanelAttributes = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'>;

export interface DrawerTemporaryProps {
  open: boolean;
  onClose: ModalClose | undefined;
  anchor: DrawerAnchor;
  keepMounted: boolean;
  children: ReactNode;
  panelProps: DrawerPanelAttributes;
}

export interface DrawerDockedProps {
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
