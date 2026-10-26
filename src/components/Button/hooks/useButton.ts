import { componentTokens } from '../../../generated/maps';
import { addonProps, hasAddon, mapResponsive } from '../../../utils';
import { BUTTON_COMPONENT_NAME_KEY } from '../Button.constants';
import type { Addon } from '../../../types';
import type { ButtonLoadingPosition, UseButtonParams, UseButtonResult } from '../Button.types';

const slotState = (
  addon: Addon,
  position: ButtonLoadingPosition,
  { loading, loadingPosition }: Pick<UseButtonParams, 'loading' | 'loadingPosition'>,
) => {
  const slotLoading = loading && loadingPosition === position;
  return {
    rendered: slotLoading || hasAddon(addon),
    loading: slotLoading,
    transparent: loading && loadingPosition === 'center',
  };
};

export function useButton({
  size,
  startAddon,
  endAddon,
  loading,
  loadingPosition,
}: UseButtonParams): UseButtonResult {
  const childProps = componentTokens[BUTTON_COMPONENT_NAME_KEY].childProps;
  return {
    centered: loading && loadingPosition === 'center',
    start: slotState(startAddon, 'start', { loading, loadingPosition }),
    end: slotState(endAddon, 'end', { loading, loadingPosition }),
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
    progressSize: mapResponsive(size, (step) => childProps[step].progress.size) ?? 'md',
    addon: addonProps(
      size,
      (step) => childProps[step].icon.size,
      (step) => childProps[step].addon.size,
    ),
  };
}
