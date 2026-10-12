import { tableContainerClassName } from './TableContainer.styles';
import type { TableContainerProps } from './TableContainer.types';

export function TableContainer({ className, ...rest }: TableContainerProps) {
  return <div {...rest} className={tableContainerClassName(className)} />;
}
