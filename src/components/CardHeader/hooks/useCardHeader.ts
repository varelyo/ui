import type { ReactNode } from 'react';
import type { UseCardHeaderParams, UseCardHeaderResult } from '../CardHeader.types';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useCardHeader({
  title,
  subheader,
  avatar,
  action,
}: UseCardHeaderParams): UseCardHeaderResult {
  return {
    hasTitle: present(title),
    hasSubheader: present(subheader),
    hasAvatar: present(avatar),
    hasAction: present(action),
  };
}
