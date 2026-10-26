import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { CardAppearance } from '../Card';

type CardHeaderOwnProps = {
  title?: ReactNode;
  subheader?: ReactNode;
  avatar?: ReactNode;
  action?: ReactNode;
};

export interface UseCardHeaderParams {
  title: ReactNode;
  subheader: ReactNode;
  avatar: ReactNode;
  action: ReactNode;
}

export interface UseCardHeaderResult {
  appearance: CardAppearance;
  hasTitle: boolean;
  hasSubheader: boolean;
  hasAvatar: boolean;
  hasAction: boolean;
}

export type CardHeaderProps = CardHeaderOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof CardHeaderOwnProps | 'style' | 'children'>;
