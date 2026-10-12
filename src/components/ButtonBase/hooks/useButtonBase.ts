import type { ElementType, KeyboardEvent, MouseEvent } from 'react';
import type { UseButtonBaseParams, UseButtonBaseResult } from '../ButtonBase.types';

export function useButtonBase({
  component,
  href,
  to,
  disabled,
  loading,
  type,
  role,
  tabIndex,
  onClick,
  onKeyDown,
  onKeyUp,
}: UseButtonBaseParams): UseButtonBaseResult {
  const Component: ElementType = component ?? (href === undefined ? 'button' : 'a');
  const native = Component === 'button';
  const link = href !== undefined || to !== undefined;
  const blocked = disabled || loading;
  const activate = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && !blocked) event.currentTarget.click();
  };
  return {
    Component,
    rootProps: {
      href,
      type: native ? (type ?? 'button') : type,
      disabled: native && disabled ? true : undefined,
      role: role ?? (native || link ? undefined : 'button'),
      tabIndex: !native && disabled ? -1 : (tabIndex ?? (native || link ? undefined : 0)),
      'aria-disabled': blocked && !(native && disabled) ? true : undefined,
      'aria-busy': loading ? true : undefined,
      'data-disabled': disabled ? '' : undefined,
      'data-loading': loading ? '' : undefined,
      onClick: (event: MouseEvent<HTMLElement>) => {
        if (blocked) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);
        if (native || link || event.defaultPrevented) return;
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') {
          event.preventDefault();
          activate(event);
        }
      },
      onKeyUp: (event: KeyboardEvent<HTMLElement>) => {
        onKeyUp?.(event);
        if (native || link || event.defaultPrevented) return;
        if (event.key === ' ') activate(event);
      },
    },
  };
}
