import { use, type ReactNode } from 'react';
import { CardContext } from '../../Card';
import type { UseCardHeaderParams, UseCardHeaderResult } from '../CardHeader.types';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useCardHeader({
  title,
  subheader,
  avatar,
  action,
}: UseCardHeaderParams): UseCardHeaderResult {
  const { appearance } = use(CardContext);
  return {
    appearance,
    hasTitle: present(title),
    hasSubheader: present(subheader),
    hasAvatar: present(avatar),
    hasAction: present(action),
  };
}
