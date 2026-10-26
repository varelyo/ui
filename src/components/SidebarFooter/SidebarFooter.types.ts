import type { ComponentPropsWithRef } from 'react';
import type { SidebarAppearance } from '../Sidebar';

export type SidebarFooterProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseSidebarFooterResult {
  appearance: SidebarAppearance;
}
