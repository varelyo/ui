import type { Breakpoint, GapStep, PaddingStep } from '../generated/maps';

export type Responsive<T> = T | { readonly [K in Breakpoint]?: T };

export type Spacing = GapStep | readonly [row: GapStep, column: GapStep];

export type Padding =
  | PaddingStep
  | readonly [all: PaddingStep]
  | readonly [vertical: PaddingStep, horizontal: PaddingStep]
  | readonly [top: PaddingStep, horizontal: PaddingStep, bottom: PaddingStep]
  | readonly [top: PaddingStep, right: PaddingStep, bottom: PaddingStep, left: PaddingStep];
