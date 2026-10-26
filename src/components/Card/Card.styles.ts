import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { CARD_COMPONENT_NAME_KEY } from './Card.constants';
import type { CardAppearance } from './Card.types';

const card = componentTokens[CARD_COMPONENT_NAME_KEY];

export const cardClassName = (appearance: CardAppearance, className?: ClassValue) =>
  cx(card.variants[appearance].primary, 'flex flex-col overflow-hidden', className);
