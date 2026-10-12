import { BUTTON_LABEL_SLOT, BUTTON_LOADING_SLOT } from './ButtonLabel.constants';
import {
  buttonLabelClassName,
  buttonLabelLoaderClassName,
  buttonLabelTextClassName,
} from './ButtonLabel.styles';
import type { ButtonLabelProps } from './ButtonLabel.types';

export function ButtonLabel({ loader, children }: ButtonLabelProps) {
  return (
    <span data-slot={BUTTON_LABEL_SLOT} className={buttonLabelClassName}>
      <span className={buttonLabelTextClassName}>{children}</span>
      <span data-slot={BUTTON_LOADING_SLOT} className={buttonLabelLoaderClassName}>
        {loader}
      </span>
    </span>
  );
}
