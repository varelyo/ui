import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { TableSection } from '../Table';
import { TABLE_ROW_COMPONENT_NAME_KEY } from './TableRow.constants';

const table = componentTokens[TABLE_ROW_COMPONENT_NAME_KEY];

const sections: Record<TableSection, string> = {
  head: '',
  body: cx(
    table.variants.standard.primary,
    table.slots.row,
    'vy-focus-ring transition-colors duration-xs ease-standard motion-reduce:transition-none',
  ),
};

export const tableRowClassName = (section: TableSection, className?: ClassValue) =>
  cx(sections[section], className);
