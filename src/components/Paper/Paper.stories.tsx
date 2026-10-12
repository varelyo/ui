import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Paper } from './Paper';
import type { PaperElevation } from './Paper.types';

const elevations: readonly PaperElevation[] = [
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

export function PaperStory() {
  return (
    <Stack spacing="xl">
      <Example title="Elevation">
        <Grid container columns={{ xs: 3, md: 9 }} spacing="lg">
          {elevations.map((elevation) => (
            <Grid key={elevation} size={1}>
              <Paper elevation={elevation} data-testid={`paper-${elevation}`}>
                <Stack p="lg">
                  <Typography variant="label-md">{elevation}</Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="Outlined and square">
        <Stack direction="row" spacing="lg">
          <Paper variant="outlined" elevation="lg" data-testid="paper-outlined">
            <Stack p="lg">
              <Typography variant="body-md">Outlined never casts a shadow</Typography>
            </Stack>
          </Paper>
          <Paper square data-testid="paper-square" component="section" aria-label="Square">
            <Stack p="lg">
              <Typography variant="body-md">Square</Typography>
            </Stack>
          </Paper>
        </Stack>
      </Example>
    </Stack>
  );
}

export const paperStory: Story = {
  id: 'paper',
  title: 'Paper',
  render: () => <PaperStory />,
};
