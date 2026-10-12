import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Table } from '../Table';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';
import { TableBody } from './TableBody';

export function TableBodyStory() {
  return (
    <Example title="A body section renders data cells">
      <Table>
        <TableBody data-testid="table-body-part">
          <TableRow>
            <TableCell>Harbor</TableCell>
            <TableCell align="right">12</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  );
}

export const tableBodyStory: Story = {
  id: 'table-body',
  title: 'TableBody',
  render: () => <TableBodyStory />,
};
