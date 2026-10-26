import type { ComponentPropsWithRef } from 'react';
import type { SidebarAppearance, SidebarColor } from '../Sidebar';

export type SidebarContentProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseSidebarContentResult {
  appearance: SidebarAppearance;
  color: SidebarColor;
}
