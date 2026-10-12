import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { TableSection } from '../Table';
import { TABLE_CELL_COMPONENT_NAME_KEY } from './TableCell.constants';
import type { TableCellAlign, TableCellStyleProps } from './TableCell.types';

const table = componentTokens[TABLE_CELL_COMPONENT_NAME_KEY];

const sections: Record<TableSection, string> = {
  head: table.slots.head,
  body: table.slots.body,
};

const aligns: Record<TableCellAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const tableCellClassName = (
  { section, sticky, align }: TableCellStyleProps,
  className?: ClassValue,
) =>
  cx(
    table.slots.cell,
    sections[section],
    'border-x-0 border-t-0 align-middle',
    aligns[align],
    sticky && 'sticky top-0',
    className,
  );
