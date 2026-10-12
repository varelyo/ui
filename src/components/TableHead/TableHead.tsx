import { TableSectionContext } from '../Table';
import { TABLE_HEAD_SECTION } from './TableHead.constants';
import type { TableHeadProps } from './TableHead.types';

export function TableHead(props: TableHeadProps) {
  return (
    <TableSectionContext value={TABLE_HEAD_SECTION}>
      <thead {...props} />
    </TableSectionContext>
  );
}
