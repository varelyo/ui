import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { DIVIDER_COMPONENT_NAME_KEY } from '../../Divider.constants';

const divider = componentTokens[DIVIDER_COMPONENT_NAME_KEY];

export const dividerLabelClassName = cx(divider.slots.label, 'shrink-0 text-center');
