import type { ComponentPropsWithRef } from 'react';

export type CardContentProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;
