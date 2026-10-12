import type { ElementType, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { PolymorphicProps } from '../../types';

type ButtonBaseOwnProps = {
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
};

export type ButtonBaseProps<C extends ElementType = 'button'> = PolymorphicProps<
  C,
  ButtonBaseOwnProps
>;

export type ButtonBaseLinkProps = PolymorphicProps<'a', ButtonBaseOwnProps & { href: string }> & {
  component?: undefined;
};

export type ButtonBaseInternalProps = ButtonBaseOwnProps & {
  href?: string;
  component?: ElementType;
  className?: string;
  type?: string;
  role?: string;
  tabIndex?: number;
  to?: unknown;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLElement>) => void;
};

export interface UseButtonBaseParams {
  component: ElementType | undefined;
  href: string | undefined;
  to: unknown;
  disabled: boolean;
  loading: boolean;
  type: string | undefined;
  role: string | undefined;
  tabIndex: number | undefined;
  onClick: ((event: MouseEvent<HTMLElement>) => void) | undefined;
  onKeyDown: ((event: KeyboardEvent<HTMLElement>) => void) | undefined;
  onKeyUp: ((event: KeyboardEvent<HTMLElement>) => void) | undefined;
}

export interface UseButtonBaseResult {
  Component: ElementType;
  rootProps: {
    href: string | undefined;
    type: string | undefined;
    disabled: true | undefined;
    role: string | undefined;
    tabIndex: number | undefined;
    'aria-disabled': true | undefined;
    'aria-busy': true | undefined;
    'data-disabled': '' | undefined;
    'data-loading': '' | undefined;
    onClick: (event: MouseEvent<HTMLElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    onKeyUp: (event: KeyboardEvent<HTMLElement>) => void;
  };
}
