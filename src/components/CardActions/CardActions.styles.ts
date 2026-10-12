import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { CARD_ACTIONS_COMPONENT_NAME_KEY } from './CardActions.constants';

const card = componentTokens[CARD_ACTIONS_COMPONENT_NAME_KEY];

export const cardActionsClassName = (className?: ClassValue) =>
  cx(card.variants.standard.primary, card.slots.actions, 'flex items-center', className);
