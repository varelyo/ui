import type { Responsive } from '../../../types';
import { CircularProgress, type CircularProgressSize } from '../../CircularProgress';

export function ButtonLoader({ size }: { size: Responsive<CircularProgressSize> }) {
  return <CircularProgress aria-hidden color="inherit" size={size} />;
}
