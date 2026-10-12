import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { DIVIDER_COMPONENT_NAME_KEY } from '../../Divider.constants';
import type { DividerOrientation } from '../../Divider.types';

const divider = componentTokens[DIVIDER_COMPONENT_NAME_KEY];

const sides: Record<DividerOrientation, string> = {
  horizontal: 'border-x-0 border-b-0',
  vertical: 'border-y-0 border-r-0',
};

export const dividerLineClassName = (orientation: DividerOrientation) =>
  cx(divider.slots.line, 'min-w-0 flex-1', sides[orientation]);
