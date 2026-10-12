import { CircularProgress } from '../../CircularProgress';
import type { IconButtonLoaderProps } from '../IconButton.types';

export function IconButtonLoader({ size }: IconButtonLoaderProps) {
  return <CircularProgress aria-hidden color="inherit" size={size} />;
}
