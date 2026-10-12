import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import type { SelectOptionEntry, SelectValue } from '../Select.types';

interface OptionElementProps {
  value?: unknown;
  disabled?: unknown;
  children?: ReactNode;
}

const optionValue = (value: unknown): value is SelectValue =>
  typeof value === 'string' || typeof value === 'number';

export function collectOptions(children: ReactNode): SelectOptionEntry[] {
  return Children.toArray(children).flatMap((child): SelectOptionEntry[] => {
    if (!isValidElement<OptionElementProps>(child)) return [];
    if (child.type === Fragment) return collectOptions(child.props.children);
    const { value, disabled, children: label } = child.props;
    return optionValue(value) ? [{ value, label, disabled: disabled === true }] : [];
  });
}
