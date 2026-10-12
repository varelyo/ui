import type { ReactNode } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { BUTTON_COMPONENT_NAME_KEY } from '../Button.constants';
import type { ButtonLoadingPosition, UseButtonParams, UseButtonResult } from '../Button.types';

const present = (node: ReactNode) => node !== undefined && node !== null;

const slotState = (
  icon: ReactNode,
  position: ButtonLoadingPosition,
  { loading, loadingPosition }: Pick<UseButtonParams, 'loading' | 'loadingPosition'>,
) => {
  const slotLoading = loading && loadingPosition === position;
  return {
    rendered: slotLoading || present(icon),
    loading: slotLoading,
    transparent: loading && loadingPosition === 'center',
  };
};

export function useButton({
  variant,
  color,
  size,
  startIcon,
  endIcon,
  loading,
  loadingPosition,
}: UseButtonParams): UseButtonResult {
  const childProps = componentTokens[BUTTON_COMPONENT_NAME_KEY].childProps[variant][color];
  return {
    centered: loading && loadingPosition === 'center',
    start: slotState(startIcon, 'start', { loading, loadingPosition }),
    end: slotState(endIcon, 'end', { loading, loadingPosition }),
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
    progressSize: mapResponsive(size, (step) => childProps[step].progress.size) ?? 'md',
  };
}
