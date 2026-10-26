import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { ICON_BUTTON_COMPONENT_NAME_KEY } from '../IconButton.constants';
import type { UseIconButtonParams, UseIconButtonResult } from '../IconButton.types';

export function useIconButton({ size, loading }: UseIconButtonParams): UseIconButtonResult {
  const childProps = componentTokens[ICON_BUTTON_COMPONENT_NAME_KEY].childProps;
  return {
    showLoader: loading,
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
    progressSize: mapResponsive(size, (step) => childProps[step].progress.size) ?? 'md',
  };
}
