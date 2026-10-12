import { useId } from 'react';

export function useFallbackId(id: string | undefined): string {
  const generated = useId();
  return id ?? generated;
}
