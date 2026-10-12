import { Fragment } from 'react';
import { SELECT_MULTIPLE_SEPARATOR, SELECT_VALUE_SLOT } from '../Select.constants';
import { selectValueLabelClassName, selectValueSizerClassName } from '../Select.styles';
import type { SelectValueProps } from '../Select.types';

export function SelectValue({ labels, options, className }: SelectValueProps) {
  return (
    <span className={className}>
      <span data-slot={SELECT_VALUE_SLOT} className={selectValueLabelClassName}>
        {labels.map((label, index) => (
          <Fragment key={index}>
            {index > 0 ? SELECT_MULTIPLE_SEPARATOR : null}
            {label}
          </Fragment>
        ))}
      </span>
      {options.map((label, index) => (
        <span key={index} aria-hidden="true" className={selectValueSizerClassName}>
          {label}
        </span>
      ))}
    </span>
  );
}
