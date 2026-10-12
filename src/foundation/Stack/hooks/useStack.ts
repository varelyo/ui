import { Children, isValidElement } from 'react';
import type { UseStackParams, UseStackResult } from '../Stack.types';

export function useStack({ children, divider }: UseStackParams): UseStackResult {
  const separated = divider !== undefined && divider !== null;
  return {
    items: Children.toArray(children).map((node, index) => ({
      key: isValidElement(node) && node.key !== null ? node.key : `text-${index}`,
      node,
      separated: separated && index > 0,
    })),
  };
}
