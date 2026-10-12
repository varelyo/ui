import { Box, Button, Container, Grid, Icon, Stack, TextField, Typography } from '../../src';
import type {
  BoxFlexGrow,
  BoxMinHeight,
  Breakpoint,
  ButtonSize,
  ContainerWidth,
  GapStep,
  GridCount,
  GridOffset,
  IconSize,
  Padding,
  PaddingStep,
  Responsive,
  Spacing,
  StackAlignItems,
  StackDirection,
  StackJustifyContent,
  TextFieldSize,
  TypographyVariant,
} from '../../src';

export const matrixBreakpoints: readonly Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const matrixSteps: readonly (GapStep & PaddingStep)[] = [
  'none',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
];
export const matrixCounts: readonly GridCount[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const matrixOffsets: readonly GridOffset[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const matrixWidths: readonly ContainerWidth[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const matrixDirections: readonly StackDirection[] = [
  'row',
  'column',
  'row-reverse',
  'column-reverse',
];
export const matrixAlignments: readonly StackAlignItems[] = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
export const matrixJustifications: readonly StackJustifyContent[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
export const matrixVariants: readonly TypographyVariant[] = [
  'display-lg',
  'headline-md',
  'title-sm',
  'body-lg',
  'body-sm',
  'label-md',
];
export const matrixIconSizes: readonly IconSize[] = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
];
export const matrixControlSizes: readonly (ButtonSize & TextFieldSize)[] = ['sm', 'md', 'lg'];
export const matrixGrowth: readonly BoxFlexGrow[] = [0, 1];
export const matrixMinHeights: readonly BoxMinHeight[] = ['auto', 'viewport'];

export const paddingForms = (step: PaddingStep): ReadonlyArray<readonly [string, Padding]> => [
  ['all', step],
  ['vertical', [step, 'none']],
  ['horizontal', ['none', step]],
  ['three-top', [step, 'none', 'none']],
  ['three-horizontal', ['none', step, 'none']],
  ['three-bottom', ['none', 'none', step]],
  ['four-top', [step, 'none', 'none', 'none']],
  ['four-right', ['none', step, 'none', 'none']],
  ['four-bottom', ['none', 'none', step, 'none']],
  ['four-left', ['none', 'none', 'none', step]],
];

const at = <T,>(breakpoint: Breakpoint, value: T, base: T): Responsive<T> => {
  if (breakpoint === 'xs') return value;
  const result: { [K in Breakpoint]?: T } = { xs: base };
  result[breakpoint] = value;
  return result;
};

export function MatrixStory() {
  return (
    <Stack spacing="md">
      {matrixBreakpoints.map((breakpoint) => (
        <Stack key={breakpoint} spacing="none" data-breakpoint={breakpoint}>
          {matrixSteps.map((step) => (
            <Stack
              key={`gap-${step}`}
              direction="row"
              spacing={at(breakpoint, step, 'none')}
              data-case={`gap:${breakpoint}:${step}`}
            >
              <span />
              <span />
            </Stack>
          ))}
          {matrixSteps.flatMap((step) =>
            (
              [
                ['row', [step, 'none']],
                ['column', ['none', step]],
              ] as const
            ).map(([axis, pair]) => (
              <Stack
                key={`pair-${axis}-${step}`}
                direction="row"
                spacing={at<Spacing>(breakpoint, pair, ['none', 'none'])}
                data-case={`pair-${axis}:${breakpoint}:${step}`}
              >
                <span />
                <span />
              </Stack>
            )),
          )}
          {matrixSteps.flatMap((step) =>
            paddingForms(step).map(([form, value]) => (
              <Stack
                key={`padding-${form}-${step}`}
                p={at<Padding>(breakpoint, value, 'none')}
                data-case={`padding-${form}:${breakpoint}:${step}`}
              />
            )),
          )}
          {matrixCounts.map((count) => (
            <Grid
              key={`columns-${count}`}
              container
              columns={at<GridCount>(breakpoint, count, 1)}
              data-case={`columns:${breakpoint}:${count}`}
            >
              <span />
            </Grid>
          ))}
          <Grid container columns={12}>
            {matrixCounts.map((count) => (
              <Grid
                key={`span-${count}`}
                size={at<GridCount>(breakpoint, count, 12)}
                data-case={`span:${breakpoint}:${count}`}
              />
            ))}
            {matrixOffsets.map((offset) => (
              <Grid
                key={`offset-${offset}`}
                offset={at<GridOffset>(breakpoint, offset, 0)}
                data-case={`offset:${breakpoint}:${offset}`}
              />
            ))}
          </Grid>
          {matrixWidths.map((width) => (
            <Container
              key={`width-${width}`}
              maxWidth={at<ContainerWidth | false>(breakpoint, width, false)}
              data-case={`max-width:${breakpoint}:${width}`}
            />
          ))}
          <Stack
            display={at<'none' | 'flex'>(breakpoint, 'flex', 'none')}
            data-case={`display-stack:${breakpoint}:flex`}
          />
          <Grid
            container
            display={at<'none' | 'grid'>(breakpoint, 'grid', 'none')}
            data-case={`display-grid:${breakpoint}:grid`}
          />
          <Container
            display={at<'none' | 'block'>(breakpoint, 'block', 'none')}
            data-case={`display-container:${breakpoint}:block`}
          />
          {matrixGrowth.map((growth) => (
            <Box
              key={`grow-${growth}`}
              flexGrow={at<BoxFlexGrow>(breakpoint, growth, growth === 1 ? 0 : 1)}
              data-case={`grow:${breakpoint}:${growth}`}
            />
          ))}
          {matrixMinHeights.map((minHeight) => (
            <Box
              key={`min-height-${minHeight}`}
              minHeight={at<BoxMinHeight>(
                breakpoint,
                minHeight,
                minHeight === 'viewport' ? 'auto' : 'viewport',
              )}
              data-case={`min-height:${breakpoint}:${minHeight}`}
            />
          ))}
          {matrixDirections.map((direction) => (
            <Stack
              key={`direction-${direction}`}
              direction={at(breakpoint, direction, 'column')}
              data-case={`direction:${breakpoint}:${direction}`}
            />
          ))}
          {matrixAlignments.map((alignment) => (
            <Stack
              key={`align-${alignment}`}
              alignItems={at(breakpoint, alignment, 'stretch')}
              data-case={`align:${breakpoint}:${alignment}`}
            />
          ))}
          {matrixJustifications.map((justification) => (
            <Stack
              key={`justify-${justification}`}
              justifyContent={at(breakpoint, justification, 'flex-start')}
              data-case={`justify:${breakpoint}:${justification}`}
            />
          ))}
          {matrixVariants.map((variant) => (
            <Typography
              key={`variant-${variant}`}
              variant={at(breakpoint, variant, 'body-md')}
              data-case={`variant:${breakpoint}:${variant}`}
            >
              Aa
            </Typography>
          ))}
          {matrixIconSizes.map((size) => (
            <Icon
              key={`icon-${size}`}
              name="star"
              size={at(breakpoint, size, 'md')}
              data-case={`icon:${breakpoint}:${size}`}
            />
          ))}
          {matrixControlSizes.map((size) => (
            <Button
              key={`button-${size}`}
              variant="outlined"
              size={at(breakpoint, size, 'md')}
              data-case={`button:${breakpoint}:${size}`}
            >
              Aa
            </Button>
          ))}
          {matrixControlSizes.map((size) => (
            <TextField
              key={`field-${size}`}
              aria-label={`field ${breakpoint} ${size}`}
              size={at(breakpoint, size, 'md')}
              data-case={`field:${breakpoint}:${size}`}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
