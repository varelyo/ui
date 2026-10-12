import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../../foundation/Stack';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHead } from '../TableHead';
import { TableRow } from '../TableRow';
import { Table } from './Table';
import type { TableSize } from './Table.types';

const invoices = [
  { id: 'INV-201', client: 'Harbor Ltd', status: 'Paid', amount: '1 250.00' },
  { id: 'INV-202', client: 'Orchard Co', status: 'Pending', amount: '480.00' },
  { id: 'INV-203', client: 'Northwind', status: 'Overdue', amount: '2 010.50' },
];
const sizes: readonly TableSize[] = ['sm', 'md', 'lg'];
const many = Array.from({ length: 30 }, (_, index) => ({
  id: `ROW-${index + 1}`,
  value: (index + 1) * 7,
}));

export function TableStory() {
  const [selected, setSelected] = useState('INV-202');
  return (
    <Stack spacing="xl">
      <Example title="Invoices with a selectable row and right-aligned amounts">
        <Table data-testid="table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                selected={selected === invoice.id}
                onClick={() => setSelected(invoice.id)}
                data-testid={`row-${invoice.id}`}
              >
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell align="right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>
      <Example title="Sizes">
        <Stack direction="row" spacing="lg" alignItems="flex-start">
          {sizes.map((size) => (
            <Table key={size} size={size} data-testid={`table-${size}`}>
              <TableHead>
                <TableRow>
                  <TableCell>Size</TableCell>
                  <TableCell align="right">Rows</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{size}</TableCell>
                  <TableCell align="right">1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </Stack>
      </Example>
      <Example title="A sticky header while the page scrolls">
        <Table stickyHeader size="sm" data-testid="table-sticky">
          <TableHead>
            <TableRow>
              <TableCell>Row</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {many.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>
    </Stack>
  );
}

export const tableStory: Story = {
  id: 'table',
  title: 'Table',
  render: () => <TableStory />,
};
