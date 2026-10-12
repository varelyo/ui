import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Table } from '../Table';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';
import { TableHead } from './TableHead';

export function TableHeadStory() {
  return (
    <Example title="A head section renders header cells">
      <Table>
        <TableHead data-testid="table-head-part">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Example>
  );
}

export const tableHeadStory: Story = {
  id: 'table-head',
  title: 'TableHead',
  render: () => <TableHeadStory />,
};
