import { cx } from '../../../../utils';

export const buttonAddonClassName = (transparent: boolean) =>
  cx('inline-flex shrink-0 items-center', transparent && 'text-transparent-default');
