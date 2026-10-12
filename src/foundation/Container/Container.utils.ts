import { breakpoints, type ContainerWidth } from '../../generated/maps';
import type { Responsive } from '../../types';
import { atBreakpoints, mapResponsive } from '../../utils';

export const widestWidth = (maxWidth: Responsive<ContainerWidth | false>): ContainerWidth =>
  atBreakpoints(maxWidth)
    .map(([, width]) => (width === false ? 'xl' : width))
    .reduce<ContainerWidth>(
      (largest, width) =>
        breakpoints.indexOf(width) > breakpoints.indexOf(largest) ? width : largest,
      'xs',
    );

export const maxWidthSteps = (maxWidth: Responsive<ContainerWidth | false>) =>
  mapResponsive(maxWidth, (width) => (width === false ? 'none' : width));
