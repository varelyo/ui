import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableRow } from './TableRow';

export function TableRowStory() {
  return (
    <Example title="Rows: default and selected">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Default row</TableCell>
          </TableRow>
          <TableRow selected data-testid="table-row-part">
            <TableCell>Selected row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  );
}

export const tableRowStory: Story = {
  id: 'table-row',
  title: 'TableRow',
  render: () => <TableRowStory />,
};
