import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { CardAppearance } from '../Card';
import { CARD_CONTENT_COMPONENT_NAME_KEY } from './CardContent.constants';

const card = componentTokens[CARD_CONTENT_COMPONENT_NAME_KEY];

export const cardContentClassName = (appearance: CardAppearance, className?: ClassValue) =>
  cx(card.variants[appearance].primary, card.slots.content, 'flex flex-col', className);
