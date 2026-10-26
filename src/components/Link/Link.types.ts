import type { ElementType, MouseEvent, ReactNode } from 'react';
import type { ComponentTokens, TypographyVariant } from '../../generated/maps';
import type { ColorOf, PolymorphicProps, Responsive, VariantOf } from '../../types';
import type { LINK_COMPONENT_NAME_KEY } from './Link.constants';

export type LinkTokens = ComponentTokens[typeof LINK_COMPONENT_NAME_KEY];
export type LinkUnderline = VariantOf<LinkTokens>;
export type LinkColor = ColorOf<LinkTokens>;

type LinkOwnProps = {
  underline?: LinkUnderline;
  color?: LinkColor;
  variant?: Responsive<TypographyVariant>;
  disabled?: boolean;
  children?: ReactNode;
};

export type LinkProps<C extends ElementType = 'a'> = PolymorphicProps<C, LinkOwnProps>;

export type LinkInternalProps = LinkOwnProps & {
  component?: ElementType;
  href?: string;
  type?: string;
  role?: string;
  tabIndex?: number;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export interface LinkStyleProps {
  underline: LinkUnderline;
  color: LinkColor;
  variant: Responsive<TypographyVariant> | undefined;
}

export interface UseLinkParams {
  component: ElementType | undefined;
  href: string | undefined;
  disabled: boolean;
  type: string | undefined;
  role: string | undefined;
  tabIndex: number | undefined;
  onClick: ((event: MouseEvent<HTMLElement>) => void) | undefined;
}

export interface UseLinkResult {
  Component: ElementType;
  rootProps: {
    href: string | undefined;
    type: string | undefined;
    disabled: true | undefined;
    role: string | undefined;
    tabIndex: number | undefined;
    'aria-disabled': true | undefined;
    'data-disabled': '' | undefined;
    onClick: (event: MouseEvent<HTMLElement>) => void;
  };
}
