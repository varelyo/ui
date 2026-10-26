import type { Breakpoint, SpaceStep } from '../generated/maps';

export type Responsive<T> = T | { readonly [K in Breakpoint]?: T };

export type Spacing = SpaceStep | readonly [row: SpaceStep, column: SpaceStep];

export type Padding =
  | SpaceStep
  | readonly [all: SpaceStep]
  | readonly [vertical: SpaceStep, horizontal: SpaceStep]
  | readonly [top: SpaceStep, horizontal: SpaceStep, bottom: SpaceStep]
  | readonly [top: SpaceStep, right: SpaceStep, bottom: SpaceStep, left: SpaceStep];
