import type { ComponentPropsWithRef, ReactNode } from 'react';

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
  hasTitle: boolean;
  hasSubheader: boolean;
  hasAvatar: boolean;
  hasAction: boolean;
}

export type CardHeaderProps = CardHeaderOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof CardHeaderOwnProps | 'style' | 'children'>;
