import { cx } from '../../../../utils';

export const buttonIconClassName = (transparent: boolean) =>
  cx('inline-flex shrink-0', transparent && 'text-transparent-default');
