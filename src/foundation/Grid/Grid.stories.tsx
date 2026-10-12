import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Button } from '../../components/Button';
import { Stack } from '../Stack';
import { Grid } from './Grid';

const tiles = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

export function GridColumnsExample() {
  return (
    <Example title="Grid: two columns, three from md">
      <Grid container columns={{ xs: 2, md: 3 }} spacing="md" data-testid="grid">
        {tiles.map((tile) => (
          <Button key={tile} variant="outlined" fullWidth>
            {tile}
          </Button>
        ))}
      </Grid>
    </Example>
  );
}

export function GridSpanExample() {
  return (
    <Example title="Grid: spans and offsets on a twelve-column grid">
      <Grid container spacing={['sm', 'md']}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Button variant="contained" fullWidth>
            Eight
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button variant="contained" color="secondary" fullWidth>
            Four
          </Button>
        </Grid>
        <Grid size={6} offset={3}>
          <Button variant="outlined" fullWidth>
            Six, offset three
          </Button>
        </Grid>
      </Grid>
    </Example>
  );
}

export function GridStory() {
  return (
    <Stack spacing="xl">
      <GridColumnsExample />
      <GridSpanExample />
    </Stack>
  );
}

export const gridStory: Story = {
  id: 'grid',
  title: 'Grid',
  render: () => <GridStory />,
};
