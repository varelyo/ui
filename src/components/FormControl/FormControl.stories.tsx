import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { FormHelperText } from '../FormHelperText';
import { InputBase } from '../InputBase';
import { InputLabel } from '../InputLabel';
import { FormControl } from './FormControl';

export function FormControlStory() {
  return (
    <Stack spacing="xl">
      <Example title="A field assembled from its parts">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          <FormControl fullWidth required>
            <InputLabel htmlFor="assembled-name">Project name</InputLabel>
            <InputBase
              id="assembled-name"
              placeholder="Harbor redesign"
              aria-describedby="assembled-name-helper"
            />
            <FormHelperText id="assembled-name-helper">Shown on the dashboard</FormHelperText>
          </FormControl>
          <FormControl variant="filled" size="lg" error fullWidth>
            <InputLabel htmlFor="assembled-budget">Budget</InputLabel>
            <InputBase
              id="assembled-budget"
              defaultValue="-40"
              startAdornment={<Icon name="payment-card" />}
              aria-describedby="assembled-budget-helper"
            />
            <FormHelperText id="assembled-budget-helper">Must be positive</FormHelperText>
          </FormControl>
          <FormControl size={{ xs: 'sm', md: 'md' }} disabled fullWidth>
            <InputLabel htmlFor="assembled-owner">Owner</InputLabel>
            <InputBase id="assembled-owner" defaultValue="Design team" />
          </FormControl>
        </Grid>
      </Example>
    </Stack>
  );
}

export const formControlStory: Story = {
  id: 'form-control',
  title: 'FormControl',
  render: () => <FormControlStory />,
};
