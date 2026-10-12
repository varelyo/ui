import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHead } from '../TableHead';
import { TableRow } from '../TableRow';
import { TableContainer } from './TableContainer';

const columns = Array.from({ length: 16 }, (_, index) => `Column ${index + 1}`);
export function TableContainerStory() {
  return (
    <Example title="A wide table scrolls inside its container">
      <TableContainer data-testid="table-container-part">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{`${column} value`}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Example>
  );
}

export const tableContainerStory: Story = {
  id: 'table-container',
  title: 'TableContainer',
  render: () => <TableContainerStory />,
};
