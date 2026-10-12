import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Chip } from '../Chip';
import { IconButton } from '../IconButton';
import { Table, type TableSize, type TableSortDirection } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHead } from '../TableHead';
import { TableRow } from '../TableRow';
import { TableSortLabel } from './TableSortLabel';

type MemberColumn = 'name' | 'role' | 'joined';

const members = [
  { name: 'Ada Lovelace', role: 'Owner', invited: false, joined: '2026-01-14' },
  { name: 'Grace Hopper', role: 'Admin', invited: false, joined: '2026-03-02' },
  { name: 'Alan Turing', role: 'Member', invited: true, joined: '2026-09-28' },
  { name: 'Katherine Johnson', role: 'Member', invited: false, joined: '2026-05-19' },
];
const columns: ReadonlyArray<readonly [MemberColumn, string]> = [
  ['name', 'Name'],
  ['role', 'Role'],
  ['joined', 'Joined'],
];
const sizes: ReadonlyArray<readonly [TableSize, TableSortDirection]> = [
  ['sm', 'asc'],
  ['md', 'desc'],
  ['lg', 'asc'],
];

export function TableSortLabelStory() {
  const [orderBy, setOrderBy] = useState<MemberColumn>('name');
  const [order, setOrder] = useState<TableSortDirection>('asc');
  const requestSort = (column: MemberColumn) => () => {
    setOrder(orderBy === column && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(column);
  };
  const rows = [...members].sort(
    (first, second) => first[orderBy].localeCompare(second[orderBy]) * (order === 'asc' ? 1 : -1),
  );
  return (
    <Stack spacing="xl">
      <Example title="Members sorted by the page: aria-sort on the header, a button in it">
        <Table data-testid="members">
          <TableHead>
            <TableRow>
              {columns.map(([column, label]) => (
                <TableCell
                  key={column}
                  sortDirection={orderBy === column ? order : false}
                  data-testid={`header-${column}`}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={requestSort(column)}
                    data-testid={`sort-${column}`}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((member) => (
              <TableRow key={member.name}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.joined}</TableCell>
                <TableCell>
                  {member.invited ? (
                    <Chip size="sm" label="Invited" />
                  ) : (
                    <Chip size="sm" color="success" label="Active" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="sm" aria-label={`Actions for ${member.name}`}>
                    <Icon name="more-horizontal" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>
      <Example title="The arrow follows the table size, in either direction">
        <Stack direction="row" spacing="lg" alignItems="flex-start">
          {sizes.map(([size, direction]) => (
            <Table key={size} size={size} data-testid={`sorted-${size}`}>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={direction}>
                    <TableSortLabel active direction={direction}>
                      {`Name ${size}`}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Amount</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Harbor</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </Stack>
      </Example>
    </Stack>
  );
}

export const tableSortLabelStory: Story = {
  id: 'table-sort-label',
  title: 'TableSortLabel',
  render: () => <TableSortLabelStory />,
};
