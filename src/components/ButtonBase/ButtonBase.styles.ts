import { cx, type ClassValue } from '../../utils';

export const buttonBaseClassName = (className?: ClassValue) =>
  cx(
    'vy-focus-ring inline-flex cursor-pointer items-center justify-center text-center transition-colors duration-sm ease-standard select-none disabled:cursor-default data-disabled:cursor-default',
    className,
  );
