import { FloatingList } from '@floating-ui/react';
import { FormControl } from '../../FormControl';
import { FormHelperText } from '../../FormHelperText';
import { InputLabel } from '../../InputLabel';
import { Paper } from '../../Paper';
import { Popper } from '../../Popper';
import { SelectContext } from '../context';
import { useSelect } from '../hooks';
import { selectLayerClassName } from '../Select.styles';
import type { SelectFieldLayerProps } from '../Select.types';
import { SelectTrigger } from './SelectTrigger';

export function SelectField({ startAddon, endAddon, ...props }: SelectFieldLayerProps) {
  const select = useSelect(props);
  return (
    <FormControl {...select.fieldProps}>
      {select.ids.label ? (
        <InputLabel id={select.ids.label} onClick={select.focusTrigger}>
          {select.label}
        </InputLabel>
      ) : null}
      <SelectTrigger
        triggerRef={select.triggerRef}
        triggerProps={select.triggerProps}
        open={select.open}
        labels={select.labels}
        optionLabels={select.optionLabels}
        indicatorSize={select.indicatorSize}
        name={select.name}
        formValue={select.formValue}
        required={select.required}
        disabled={select.disabled}
        autofill={select.autofill}
        startAddon={startAddon}
        endAddon={endAddon}
      />
      {select.ids.helper ? (
        <FormHelperText id={select.ids.helper}>{select.helperText}</FormHelperText>
      ) : null}
      <Popper
        popper={select.popper}
        focusManager={select.focusManager}
        className={selectLayerClassName}
      >
        <Paper elevation="md" {...select.listboxProps} className={select.popupClassName}>
          <FloatingList elementsRef={select.elementsRef} labelsRef={select.labelsRef}>
            <SelectContext value={select.context}>{select.children}</SelectContext>
          </FloatingList>
        </Paper>
      </Popper>
    </FormControl>
  );
}
