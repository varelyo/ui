import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { CardAppearance } from '../Card';
import { CARD_HEADER_COMPONENT_NAME_KEY } from './CardHeader.constants';

const card = componentTokens[CARD_HEADER_COMPONENT_NAME_KEY];

export const cardHeaderClassName = (appearance: CardAppearance, className?: ClassValue) =>
  cx(card.variants[appearance].primary, card.slots.header, 'flex items-center', className);

export const cardHeaderTextClassName = cx('flex min-w-0 flex-1 flex-col');

export const cardHeaderTitleClassName = cx(card.slots.title);

export const cardHeaderSubheaderClassName = cx(card.slots.subheader);

export const cardHeaderSlotClassName = cx('inline-flex shrink-0');
