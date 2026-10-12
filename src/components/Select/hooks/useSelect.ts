import {
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { componentTokens, type IconSize } from '../../../generated/maps';
import { useControllableState, useFallbackId, useFormReset } from '../../../hooks';
import { mapResponsive } from '../../../utils';
import { usePopper } from '../../Popper';
import {
  SELECT_COMPONENT_NAME_KEY,
  SELECT_FORM_VALUE_SEPARATOR,
  SELECT_HELPER_ID_SUFFIX,
  SELECT_LABEL_ID_SUFFIX,
  SELECT_LISTBOX_ID_SUFFIX,
  SELECT_OPTION_SELECTOR,
  SELECT_SELECTED_OPTION_SELECTOR,
} from '../Select.constants';
import { selectPopupClassName, selectRootClassName } from '../Select.styles';
import type {
  SelectFieldLayerProps,
  SelectSize,
  SelectValue,
  UseSelectResult,
} from '../Select.types';
import { collectOptions } from '../utils';

const select = componentTokens[SELECT_COMPONENT_NAME_KEY];

const present = (node: ReactNode) => node !== undefined && node !== null;

const isList = (value: unknown): value is readonly SelectValue[] => Array.isArray(value);

const toValues = (
  value: SelectValue | readonly SelectValue[] | undefined,
): readonly SelectValue[] | undefined => {
  if (value === undefined) return undefined;
  if (isList(value)) return value;
  return value === '' ? [] : [value];
};

export function useSelect({
  ref,
  id,
  label,
  helperText,
  error,
  disabled,
  required,
  name,
  size,
  variant,
  fullWidth,
  className,
  children,
  multiple,
  value,
  defaultValue,
  onChange,
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  ...attributes
}: SelectFieldLayerProps): UseSelectResult {
  const trigger = useFallbackId(id);
  const ids = {
    trigger,
    label: present(label) ? `${trigger}${SELECT_LABEL_ID_SUFFIX}` : undefined,
    helper: present(helperText) ? `${trigger}${SELECT_HELPER_ID_SUFFIX}` : undefined,
    listbox: `${trigger}${SELECT_LISTBOX_ID_SUFFIX}`,
  };
  const options = useMemo(() => collectOptions(children), [children]);
  const [values, setValues] = useControllableState<readonly SelectValue[]>({
    value: toValues(value),
    defaultValue: toValues(defaultValue) ?? [],
  });
  const [requestedOpen, setOpen] = useState(false);
  const open = requestedOpen && !disabled;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const initialOption = useRef<HTMLElement | null>(null);
  const triggerNode = useRef<HTMLElement | null>(null);
  const initialValues = useRef(toValues(defaultValue) ?? []);
  useFormReset(triggerNode, () => {
    setValues(initialValues.current);
    setOpen(false);
  });
  useLayoutEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const popper = usePopper({
    open,
    onOpenChange: (next) => setOpen(next),
    placement: 'bottom-start',
    offset: 'xs',
    matchWidth: true,
  });
  const click = useClick(popper.context, { enabled: !disabled });
  const dismiss = useDismiss(popper.context);
  const role = useRole(popper.context, { role: 'select' });
  const listNavigation = useListNavigation(popper.context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: false,
    enabled: !disabled,
  });
  const typeahead = useTypeahead(popper.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: (index) => {
      if (open) setActiveIndex(index);
    },
    enabled: open,
  });
  const interactions = useInteractions([click, dismiss, role, listNavigation, typeahead]);
  const triggerRef = useMergeRefs<HTMLElement>([popper.refs.setReference, triggerNode]);
  const floating = popper.elements.floating;
  useLayoutEffect(() => {
    if (!open || !floating) return;
    const items = [...floating.querySelectorAll<HTMLElement>(SELECT_OPTION_SELECTOR)];
    initialOption.current =
      items.find((item) => item.matches(SELECT_SELECTED_OPTION_SELECTOR)) ?? items[0] ?? null;
  }, [open, floating]);
  const commit = (next: readonly SelectValue[], event: Event | undefined) => {
    if (disabled) return;
    setValues(next);
    if (multiple) onChange?.({ target: { value: [...next], name }, nativeEvent: event });
    else onChange?.({ target: { value: next[0] ?? '', name }, nativeEvent: event });
  };
  const choose = (option: SelectValue, event: Event | undefined) => {
    if (disabled) return;
    if (multiple) {
      commit(
        values.includes(option) ? values.filter((item) => item !== option) : [...values, option],
        event,
      );
      return;
    }
    setOpen(false);
    if (values[0] !== option) commit([option], event);
  };
  const described = [describedBy, ids.helper].filter(Boolean).join(' ') || undefined;
  return {
    ids,
    label,
    helperText,
    children,
    name,
    disabled,
    required,
    fieldProps: {
      ref,
      variant,
      size,
      disabled,
      error,
      required,
      fullWidth,
      className: selectRootClassName(variant, className),
    },
    open,
    popper,
    focusManager: { initialFocus: initialOption },
    labels: options.filter((option) => values.includes(option.value)).map((option) => option.label),
    optionLabels: options.map((option) => option.label),
    formValue: values.map(String).join(SELECT_FORM_VALUE_SEPARATOR),
    indicatorSize: mapResponsive<SelectSize, IconSize>(
      size,
      (step) => select.childProps[variant].primary[step].indicator.size,
    ),
    triggerRef: (node) => triggerRef?.(node),
    triggerProps: interactions.getReferenceProps({
      ...attributes,
      id: ids.trigger,
      tabIndex: disabled ? -1 : 0,
      'aria-labelledby': labelledBy ?? ids.label,
      'aria-describedby': described,
      'aria-invalid': error || undefined,
      'aria-required': required || undefined,
      'aria-disabled': disabled || undefined,
    }),
    listboxProps: interactions.getFloatingProps({
      id: ids.listbox,
      'aria-labelledby': labelledBy ?? ids.label,
      'aria-multiselectable': multiple || undefined,
    }),
    popupClassName: selectPopupClassName(variant, size),
    focusTrigger: () => triggerNode.current?.focus(),
    autofill: (event: ChangeEvent<HTMLInputElement>) => {
      const match = options.find((option) => String(option.value) === event.target.value);
      if (match && !match.disabled) commit([match.value], event.nativeEvent);
    },
    elementsRef,
    labelsRef,
    context: {
      activeIndex,
      variant,
      isSelected: (option) => values.includes(option),
      choose,
      getItemProps: (props) => interactions.getItemProps(props),
    },
  };
}
