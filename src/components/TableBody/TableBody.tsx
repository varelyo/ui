import { TableSectionContext } from '../Table';
import { TABLE_BODY_SECTION } from './TableBody.constants';
import type { TableBodyProps } from './TableBody.types';

export function TableBody(props: TableBodyProps) {
  return (
    <TableSectionContext value={TABLE_BODY_SECTION}>
      <tbody {...props} />
    </TableSectionContext>
  );
}
