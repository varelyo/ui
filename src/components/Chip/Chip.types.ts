import type { ElementType, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { ColorOf, PolymorphicProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { CHIP_COMPONENT_NAME_KEY } from './Chip.constants';

export type ChipTokens = ComponentTokens[typeof CHIP_COMPONENT_NAME_KEY];
export type ChipVariant = VariantOf<ChipTokens>;
export type ChipColor = ColorOf<ChipTokens>;
export type ChipSize = SizeOf<ChipTokens>;
export type ChipDeleteEvent = MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>;

type ChipOwnProps = {
  label?: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: Responsive<ChipSize>;
  avatar?: ReactElement;
  icon?: ReactElement;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: ChipDeleteEvent) => void;
  disabled?: boolean;
  deleteIcon?: ReactElement;
  deleteLabel?: string;
};

export type ChipProps<C extends ElementType = 'span'> = PolymorphicProps<C, ChipOwnProps>;

export interface ChipStyleProps {
  variant: ChipVariant;
  color: ChipColor;
  size: Responsive<ChipSize>;
}

export interface UseChipParams {
  variant: ChipVariant;
  color: ChipColor;
  size: Responsive<ChipSize>;
  label: ReactNode;
  deleteLabel: string | undefined;
  disabled: boolean;
  onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
  onDelete: ((event: ChipDeleteEvent) => void) | undefined;
}

export interface ChipRootProps {
  'data-disabled'?: '';
}

export interface UseChipResult {
  clickable: boolean;
  deletable: boolean;
  deleteName: string;
  iconSize: Responsive<IconSize> | undefined;
  rootProps: ChipRootProps;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface ChipContentProps {
  avatar: ReactElement | undefined;
  icon: ReactElement | undefined;
  iconSize: Responsive<IconSize> | undefined;
  label: ReactNode;
}

export interface ChipActionProps extends ChipContentProps {
  disabled: boolean;
  onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export interface ChipDeleteProps {
  name: string;
  disabled: boolean;
  icon: ReactElement | undefined;
  iconSize: Responsive<IconSize> | undefined;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}
