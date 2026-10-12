import type { ComponentPropsWithRef, ElementType } from 'react';

export type PolymorphicProps<C extends ElementType, Own extends object> = Own & {
  readonly component?: C;
} & Omit<ComponentPropsWithRef<C>, keyof Own | 'component' | 'style'>;
