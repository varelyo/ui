import type { ReactNode } from 'react';

export type Story = { id: string; title: string; render: () => ReactNode };
