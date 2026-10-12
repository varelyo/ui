import { useSwitch } from './hooks';
import { switchClassName, switchInputClassName, switchTrackClassName } from './Switch.styles';
import type { SwitchProps } from './Switch.types';
import { SwitchLabel, SwitchThumb } from './ui';

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  name,
  value,
  size = 'md',
  color = 'primary',
  label,
  inputRef,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  className,
  ...rest
}: SwitchProps) {
  const control = useSwitch({ checked, defaultChecked, onChange, inputRef, label });
  return (
    <label {...rest} className={switchClassName({ color, size }, className)}>
      <span className={switchTrackClassName}>
        <input
          ref={control.inputRef}
          type="checkbox"
          role="switch"
          checked={control.checked}
          onChange={control.onChange}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          className={switchInputClassName}
        />
        <SwitchThumb />
      </span>
      {control.labelled ? <SwitchLabel>{label}</SwitchLabel> : null}
    </label>
  );
}
