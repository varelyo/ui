import { componentTokens } from '../../../generated/maps';
import { addonProps, mapResponsive } from '../../../utils';
import { FORM_CONTROL_COMPONENT_NAME_KEY } from '../FormControl.constants';
import type { UseFormControlStateParams, UseFormControlStateResult } from '../FormControl.types';

const field = componentTokens[FORM_CONTROL_COMPONENT_NAME_KEY];

export function useFormControlState({
  size,
  disabled,
  error,
  required,
}: UseFormControlStateParams): UseFormControlStateResult {
  const childProps = field.childProps;
  return {
    context: {
      disabled,
      error,
      required,
      slots: field.slots,
      adornmentSize: mapResponsive(size, (step) => childProps[step].adornment.size),
      addon: addonProps(
        size,
        (step) => childProps[step].adornment.size,
        (step) => childProps[step].addon.size,
      ),
    },
    rootProps: {
      'data-disabled': disabled ? '' : undefined,
      'data-error': error && !disabled ? '' : undefined,
    },
  };
}
