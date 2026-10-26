import { createContext } from 'react';
import type { IconSize } from '../../../generated/maps';
import type { Responsive } from '../../../types';

export const IconSizeContext = createContext<Responsive<IconSize> | undefined>(undefined);
