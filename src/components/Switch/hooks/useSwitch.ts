import { useMergeRefs } from '@floating-ui/react';
import { useRef, type ChangeEvent, type ReactNode } from 'react';
import { useControllableState, useFormReset } from '../../../hooks';
import type { UseSwitchParams, UseSwitchResult } from '../Switch.types';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useSwitch({
  checked,
  defaultChecked,
  onChange,
  inputRef,
  label,
}: UseSwitchParams): UseSwitchResult {
  const [current, setCurrent] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
  });
  const input = useRef<HTMLInputElement | null>(null);
  const initialChecked = useRef(defaultChecked);
  useFormReset(input, () => {
    setCurrent(initialChecked.current);
    if (input.current) input.current.checked = checked ?? initialChecked.current;
  });
  const merged = useMergeRefs<HTMLInputElement>([input, inputRef]);
  return {
    checked: current,
    labelled: present(label),
    inputRef: (node) => merged?.(node),
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setCurrent(event.target.checked);
      onChange?.(event, event.target.checked);
    },
  };
}
