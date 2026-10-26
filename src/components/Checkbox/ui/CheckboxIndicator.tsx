import { Icon } from '../../Icon';
import { checkboxIndicatorClassName, checkboxMarkClassName } from '../Checkbox.styles';

export function CheckboxIndicator({
  marked,
  indeterminate,
}: {
  marked: boolean;
  indeterminate: boolean;
}) {
  return (
    <span aria-hidden="true" className={checkboxIndicatorClassName}>
      {marked ? (
        <Icon name={indeterminate ? 'minus' : 'check'} className={checkboxMarkClassName} />
      ) : null}
    </span>
  );
}
