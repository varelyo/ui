import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { CARD_CONTENT_COMPONENT_NAME_KEY } from './CardContent.constants';

const card = componentTokens[CARD_CONTENT_COMPONENT_NAME_KEY];

export const cardContentClassName = (className?: ClassValue) =>
  cx(card.variants.standard.primary, card.slots.content, 'flex flex-col', className);
