import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { CARD_COMPONENT_NAME_KEY } from './Card.constants';

const card = componentTokens[CARD_COMPONENT_NAME_KEY];

export const cardClassName = (className?: ClassValue) =>
  cx(card.variants.standard.primary, 'flex flex-col overflow-hidden', className);
