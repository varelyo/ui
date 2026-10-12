import { ButtonBase } from '../ButtonBase';
import { dropzoneClassName } from './Dropzone.styles';
import type { DropzoneProps } from './Dropzone.types';
import { useDropzone } from './hooks';
import { DropzoneHelperText, DropzoneIcon, DropzoneInput, DropzoneLabel } from './ui';

export function Dropzone({
  accept,
  multiple = false,
  capture,
  maxSize,
  maxFiles,
  onFilesSelected,
  onFilesRejected,
  onDragVerdictChange,
  inputRef,
  label,
  helperText,
  icon,
  error = false,
  disabled = false,
  size = 'md',
  color = 'neutral',
  id,
  className,
  onClick,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: DropzoneProps) {
  const dropzone = useDropzone({
    id,
    accept,
    multiple,
    capture,
    maxSize,
    maxFiles,
    disabled,
    error,
    size,
    color,
    label,
    helperText,
    icon,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    onFilesSelected,
    onFilesRejected,
    onDragVerdictChange,
    inputRef,
    onClick,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
  });
  return (
    <>
      <ButtonBase
        component="div"
        {...rest}
        {...dropzone.rootProps}
        aria-label={ariaLabel}
        disabled={disabled}
        className={dropzoneClassName(dropzone.styleProps, className)}
      >
        {dropzone.hasIcon ? <DropzoneIcon size={dropzone.iconSize}>{icon}</DropzoneIcon> : null}
        {dropzone.hasLabel ? <DropzoneLabel id={dropzone.labelId}>{label}</DropzoneLabel> : null}
        {dropzone.hasHelperText ? (
          <DropzoneHelperText id={dropzone.helperId}>{helperText}</DropzoneHelperText>
        ) : null}
      </ButtonBase>
      <DropzoneInput {...dropzone.inputProps} />
    </>
  );
}
