import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { CardAppearance } from '../Card';
import { CARD_ACTIONS_COMPONENT_NAME_KEY } from './CardActions.constants';

const card = componentTokens[CARD_ACTIONS_COMPONENT_NAME_KEY];

export const cardActionsClassName = (appearance: CardAppearance, className?: ClassValue) =>
  cx(card.variants[appearance].primary, card.slots.actions, 'flex items-center', className);
