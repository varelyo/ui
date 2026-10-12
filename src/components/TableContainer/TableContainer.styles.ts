import { cx, type ClassValue } from '../../utils';

export const tableContainerClassName = (className?: ClassValue) =>
  cx('max-w-full overflow-auto', className);
