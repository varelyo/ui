import type { ElementType, ReactNode } from 'react';
import type { PolymorphicProps } from '../../types';

export type DialogTitleProps<C extends ElementType = 'h2'> = PolymorphicProps<
  C,
  { children?: ReactNode }
>;

export interface UseDialogTitleParams {
  id: string | undefined;
}

export interface UseDialogTitleResult {
  id: string;
}
