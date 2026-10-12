import { useEffect, useState } from 'react';
import type { AvatarImageStatus } from '../Avatar.types';

export function useAvatarImage(src: string | undefined, srcSet: string | undefined) {
  const [status, setStatus] = useState<AvatarImageStatus>(src || srcSet ? 'loading' : 'none');
  useEffect(() => {
    if (!src && !srcSet) {
      setStatus('none');
      return undefined;
    }
    let active = true;
    const image = new Image();
    image.onload = () => active && setStatus('loaded');
    image.onerror = () => active && setStatus('error');
    if (srcSet) image.srcset = srcSet;
    if (src) image.src = src;
    setStatus('loading');
    return () => {
      active = false;
    };
  }, [src, srcSet]);
  return status;
}
