import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TABLE_COMPONENT_NAME_KEY } from './Table.constants';
import type { TableStyleProps } from './Table.types';

const table = componentTokens[TABLE_COMPONENT_NAME_KEY];

export const tableClassName = ({ variant, size }: TableStyleProps, className?: ClassValue) =>
  cx(
    table.variants[variant].primary,
    responsiveClasses(size, table.sizes, 'md'),
    'w-full border-separate border-spacing-0 text-left',
    className,
  );
