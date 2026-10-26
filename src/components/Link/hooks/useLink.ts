import type { ElementType, MouseEvent } from 'react';
import type { UseLinkParams, UseLinkResult } from '../Link.types';

export function useLink({
  component,
  href,
  disabled,
  type,
  role,
  tabIndex,
  onClick,
}: UseLinkParams): UseLinkResult {
  const Component: ElementType = component ?? 'a';
  const native = Component === 'button';
  return {
    Component,
    rootProps: {
      href: disabled ? undefined : href,
      type: native ? (type ?? 'button') : type,
      disabled: native && disabled ? true : undefined,
      role: role ?? (disabled && !native ? 'link' : undefined),
      tabIndex: disabled && !native ? -1 : tabIndex,
      'aria-disabled': disabled && !native ? true : undefined,
      'data-disabled': disabled ? '' : undefined,
      onClick: (event: MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
    },
  };
}
