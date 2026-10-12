import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableRow } from '../TableRow';
import { TableCell } from './TableCell';

export function TableCellStory() {
  return (
    <Example title="Cells aligned left, centre and right">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Left</TableCell>
            <TableCell align="center">Centre</TableCell>
            <TableCell align="right" data-testid="table-cell-part">
              Right
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  );
}

export const tableCellStory: Story = {
  id: 'table-cell',
  title: 'TableCell',
  render: () => <TableCellStory />,
};
