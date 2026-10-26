import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { TableSection, TableVariant } from '../Table';
import { TABLE_ROW_COMPONENT_NAME_KEY } from './TableRow.constants';

const table = componentTokens[TABLE_ROW_COMPONENT_NAME_KEY];

const bodySections: Record<TableSection, boolean> = { head: false, body: true };

export const tableRowClassName = (
  variant: TableVariant,
  section: TableSection,
  className?: ClassValue,
) =>
  cx(
    bodySections[section] && table.variants[variant].primary,
    bodySections[section] && table.slots.row,
    bodySections[section] &&
      'vy-focus-ring transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );
