import { createContext } from 'react';
import type { ThemeScopeValue } from '../ThemeScope.types';

export const outermostScope: ThemeScopeValue = {
  brand: undefined,
  mode: undefined,
  resolvedMode: undefined,
};

export const ThemeScopeContext = createContext<ThemeScopeValue>(outermostScope);
