import type { ReactNode } from 'react';
import { Stack, Typography } from '../../src';

export function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack spacing="sm" component="section">
      <Typography variant="label-md" color="on-surface-variant-default" component="h2">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
