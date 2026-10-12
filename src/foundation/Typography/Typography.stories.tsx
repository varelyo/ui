import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import type { TypographyVariant } from '../../generated/maps';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from './Typography';

const variants: readonly TypographyVariant[] = [
  'display-lg',
  'display-md',
  'display-sm',
  'headline-lg',
  'headline-md',
  'headline-sm',
  'title-lg',
  'title-md',
  'title-sm',
  'body-lg',
  'body-md',
  'body-sm',
  'label-lg',
  'label-md',
  'label-sm',
];

export function TypographyStory() {
  return (
    <Stack spacing="xl">
      <Example title="Variants">
        <Stack spacing="sm">
          {variants.map((variant) => (
            <Typography key={variant} variant={variant}>
              {`${variant} · Ship the interface people trust`}
            </Typography>
          ))}
        </Stack>
      </Example>
      <Example title="Colour, alignment and truncation">
        <Stack spacing="sm">
          <Typography color="on-surface-variant-default">
            Subtle supporting copy for a quiet caption.
          </Typography>
          <Typography color="primary-default">Primary emphasis</Typography>
          <Typography color="error-default">Something needs attention</Typography>
          <Typography align="center">Centred paragraph</Typography>
          <Grid container columns={3}>
            <Typography noWrap>
              A very long line that is cut with an ellipsis instead of wrapping onto the next line
            </Typography>
          </Grid>
        </Stack>
      </Example>
      <Example title="Responsive variant (body-sm, headline-sm from md)">
        <Typography variant={{ xs: 'body-sm', md: 'headline-sm' }} data-testid="responsive-text">
          This text grows at the md breakpoint
        </Typography>
      </Example>
    </Stack>
  );
}

export const typographyStory: Story = {
  id: 'typography',
  title: 'Typography',
  render: () => <TypographyStory />,
};
