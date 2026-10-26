import { hasAddon } from '../../../utils';
import { InputAdornment } from '../../InputAdornment';
import { INPUT_BASE_SLOT } from '../../InputBase';
import { useSelectTrigger } from '../hooks';
import {
  selectInputClassName,
  selectTriggerClassName,
  selectValueClassName,
} from '../Select.styles';
import type { SelectTriggerProps } from '../Select.types';
import { SelectIndicator } from './SelectIndicator';
import { SelectValue } from './SelectValue';

export function SelectTrigger({
  triggerRef,
  triggerProps,
  open,
  labels,
  optionLabels,
  indicatorSize,
  name,
  formValue,
  required,
  disabled,
  autofill,
  startAddon,
  endAddon,
}: SelectTriggerProps) {
  const { slots } = useSelectTrigger();
  return (
    <div
      {...triggerProps}
      ref={triggerRef}
      data-slot={INPUT_BASE_SLOT}
      className={selectTriggerClassName(slots)}
    >
      {hasAddon(startAddon) ? <InputAdornment position="start" addon={startAddon} /> : null}
      <SelectValue labels={labels} options={optionLabels} className={selectValueClassName(slots)} />
      {hasAddon(endAddon) ? <InputAdornment position="end" addon={endAddon} /> : null}
      <SelectIndicator open={open} size={indicatorSize} />
      <input
        aria-hidden="true"
        tabIndex={-1}
        name={name}
        value={formValue}
        required={required}
        disabled={disabled}
        onChange={autofill}
        className={selectInputClassName}
      />
    </div>
  );
}
