import type { ElementType } from 'react';
import { ThemeScopeContext } from './context';
import { useThemeScope } from './hooks';
import type { ThemeScopeProps } from './ThemeScope.types';

export function ThemeScope<C extends ElementType = 'div'>({
  brand,
  mode,
  component,
  ...rest
}: ThemeScopeProps<C>) {
  const Component: ElementType = component ?? 'div';
  const scope = useThemeScope({ brand, mode });
  return (
    <ThemeScopeContext value={scope.value}>
      <Component {...rest} data-vy-brand={scope.brand} data-vy-mode={scope.mode} />
    </ThemeScopeContext>
  );
}
