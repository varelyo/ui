import { useMergeRefs } from '@floating-ui/react';
import { useLayoutEffect, useRef, type ChangeEvent, type ReactNode } from 'react';
import { useControllableState, useFormReset } from '../../../hooks';
import type { UseCheckboxParams, UseCheckboxResult } from '../Checkbox.types';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useCheckbox({
  checked,
  defaultChecked,
  indeterminate,
  onChange,
  inputRef,
  label,
}: UseCheckboxParams): UseCheckboxResult {
  const [current, setCurrent] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
  });
  const input = useRef<HTMLInputElement | null>(null);
  const initialChecked = useRef(defaultChecked);
  useFormReset(input, () => {
    setCurrent(initialChecked.current);
    if (input.current) {
      input.current.checked = checked ?? initialChecked.current;
      input.current.indeterminate = indeterminate;
    }
  });
  useLayoutEffect(() => {
    if (input.current) input.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const merged = useMergeRefs<HTMLInputElement>([input, inputRef]);
  return {
    checked: current,
    marked: current || indeterminate,
    labelled: present(label),
    inputRef: (node) => merged?.(node),
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setCurrent(event.target.checked);
      onChange?.(event, event.target.checked);
    },
  };
}
