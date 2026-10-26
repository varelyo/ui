import type { ComponentPropsWithRef } from 'react';
import type { SidebarAppearance } from '../Sidebar';

export type SidebarHeaderProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseSidebarHeaderResult {
  appearance: SidebarAppearance;
}
