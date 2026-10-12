import { layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import type { ContainerStyleProps } from './Container.types';
import { maxWidthSteps, widestWidth } from './Container.utils';

export const containerClassName = (
  { maxWidth, fixed, disableGutters, display }: ContainerStyleProps,
  className?: ClassValue,
) =>
  cx(
    'mx-auto w-full',
    responsiveClasses(display, layout.display),
    fixed
      ? layout.fixed[widestWidth(maxWidth)]
      : responsiveClasses(maxWidthSteps(maxWidth), layout.maxWidth),
    !disableGutters && `${layout.padding.px.lg.xs} ${layout.padding.px.xl.sm}`,
    className,
  );
