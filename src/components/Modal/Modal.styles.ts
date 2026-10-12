import { cx, type ClassValue } from '../../utils';

export const modalRootClassName = cx(
  'group z-modal transition-opacity duration-md ease-standard starting:opacity-none data-closed:opacity-none motion-reduce:transition-none',
);

export const modalBackdropClassName = cx('z-auto');

export const modalContainerClassName = (className?: ClassValue) =>
  cx('pointer-events-none relative h-full outline-none *:pointer-events-auto', className);
