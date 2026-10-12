import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { FORM_CONTROL_COMPONENT_NAME_KEY } from '../FormControl.constants';
import type { UseFormControlStateParams, UseFormControlStateResult } from '../FormControl.types';

const field = componentTokens[FORM_CONTROL_COMPONENT_NAME_KEY];

export function useFormControlState({
  variant,
  size,
  disabled,
  error,
  required,
}: UseFormControlStateParams): UseFormControlStateResult {
  const childProps = field.childProps[variant].primary;
  return {
    context: {
      disabled,
      error,
      required,
      slots: field.slots,
      adornmentSize: mapResponsive(size, (step) => childProps[step].adornment.size),
    },
    rootProps: {
      'data-disabled': disabled ? '' : undefined,
      'data-error': error && !disabled ? '' : undefined,
    },
  };
}
