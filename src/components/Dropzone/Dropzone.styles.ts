import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { DROPZONE_COMPONENT_NAME_KEY } from './Dropzone.constants';
import type { DropzoneStyleProps } from './Dropzone.types';

const dropzone = componentTokens[DROPZONE_COMPONENT_NAME_KEY];

export const dropzoneClassName = ({ size, intent }: DropzoneStyleProps, className?: ClassValue) =>
  cx(
    dropzone.slots.root,
    dropzone.variants.standard[intent],
    responsiveClasses(size, dropzone.sizes.standard[intent], 'md'),
    'flex w-full flex-col items-center justify-center text-center',
    className,
  );
